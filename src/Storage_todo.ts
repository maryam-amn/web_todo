import { overdueTodos } from './event.ts'
import { myList } from './mytodo_list.ts'

export interface Todo {
  text: string
  status: string
  date: string
}

export const todos: Todo[] = []

export function deserialized(
  outputList: HTMLUListElement,
  deleteAll: HTMLButtonElement,
  globalMessage: HTMLParagraphElement,
  errorMessage: HTMLParagraphElement,
  todoInput: HTMLInputElement,
) {
  const deserialized = localStorage.getItem('value')
  let todos: Todo[] = []
  if (deserialized) {
    todos = JSON.parse(deserialized)
    if (outputList && deleteAll && globalMessage && errorMessage) {
      todos.forEach((todo, index) => {
        myList(
          todo,
          index,
          outputList,
          deleteAll,
          globalMessage,
          errorMessage,
          todoInput,
        )
      })
    }
  }
}
export function doneTodo(
  index: number,
  outputList: HTMLUListElement,
  todoInput: HTMLInputElement,
  global_message: HTMLParagraphElement,
) {
  if (outputList && todoInput) {
    if (todos[index].status === 'done') {
      todos[index].status = 'undone'
    } else {
      todos[index].status = 'done'
    }
  }
  localStorage.setItem('value', JSON.stringify(todos))
  if (global_message) {
    overdueTodos(global_message)
  }
}

export function storage(
  todoInput: HTMLInputElement,
  dueDate: HTMLInputElement,
  globalMessage: HTMLParagraphElement,
  errorMessage: HTMLParagraphElement,
  outputList: HTMLUListElement,
  deleteAll: HTMLButtonElement,
): void {
  if (todoInput && dueDate) {
    const text: string = todoInput.value.trim()
    const date: string = dueDate.value.trim()
    if (text) {
      const newTodo: Todo = { text, status: 'undone', date }
      todos.push(newTodo)
      const serialized = JSON.stringify(todos)
      localStorage.setItem('value', serialized)

      myList(
        newTodo,
        todos.length - 1,
        outputList,
        deleteAll,
        globalMessage,
        errorMessage,
        todoInput,
      )

      todoInput.value = ' '
    }
  }

  if (globalMessage) {
    overdueTodos(globalMessage)
  }
}
