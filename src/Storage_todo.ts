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
  delete_all: HTMLButtonElement,
  global_message: HTMLParagraphElement,
  error_message: HTMLParagraphElement,
  todoInput: HTMLInputElement,
) {
  const deserialized = localStorage.getItem('value')
  let todos: Todo[] = []
  if (deserialized) {
    todos = JSON.parse(deserialized)
    if (outputList && delete_all && global_message && error_message) {
      todos.forEach((todo, index) => {
        myList(
          todo,
          index,
          outputList,
          delete_all,
          global_message,
          error_message,
          todoInput,
        )
      })
    }
  }
}
export function done_todo(
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

export function Storage(
  todoInput: HTMLInputElement,
  due_date: HTMLInputElement,
  global_message: HTMLParagraphElement,
  error_message: HTMLParagraphElement,
  outputList: HTMLUListElement,
  delete_all: HTMLButtonElement,
): void {
  if (todoInput && due_date) {
    const text: string = todoInput.value.trim()
    const date: string = due_date.value.trim()
    if (text) {
      const newTodo: Todo = { text, status: 'undone', date }
      todos.push(newTodo)
      const serialized = JSON.stringify(todos)
      localStorage.setItem('value', serialized)

      myList(
        newTodo,
        todos.length - 1,
        outputList,
        delete_all,
        global_message,
        error_message,
        todoInput,
      )

      todoInput.value = ' '
    }
  }

  if (global_message) {
    overdueTodos(global_message)
  }
}
