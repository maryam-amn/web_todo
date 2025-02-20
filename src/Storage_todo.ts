import { type Categories, cat } from './Category_files/create_categories.ts'
import { PatchCategory } from './Category_files/patch-category.ts'
import { overdueTodos } from './event.ts'
import { fetchPatch, fetchPost } from './fetch.ts'
import { myList } from './mytodo_list.ts'

export interface Todo {
  id: string
  title: string
  content: string
  due_date: string
  done: boolean
  select: string
}

export const todos: Todo[] = []

export function deserialized(
  outputList: HTMLUListElement,
  deleteAll: HTMLButtonElement,
  globalMessage: HTMLParagraphElement,
  errorMessage: HTMLParagraphElement,
  todoInput: HTMLInputElement,
  select: HTMLSelectElement,
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
          todo,
          select,
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
  identification: Todo,
) {
  if (outputList && todoInput) {
    if (todos[index].done === true) {
      todos[index].done = false
    } else {
      todos[index].done = true
    }
  }

  fetchPatch(identification, todos, index)
  localStorage.setItem('value', JSON.stringify(todos))
  if (global_message) {
    overdueTodos(global_message)
  }
}

export function ColorCategory(identification: Categories, index: number) {
  PatchCategory(identification, cat, index)
}

export async function storage(
  todoInput: HTMLInputElement,
  dueDate: HTMLInputElement,
  globalMessage: HTMLParagraphElement,
  errorMessage: HTMLParagraphElement,
  outputList: HTMLUListElement,
  deleteAll: HTMLButtonElement,
  select: HTMLSelectElement,
) {
  const text: string = todoInput.value.trim()
  const date: string = dueDate.value.trim()
  const selection = select.value.trim()
  if (text) {
    const newTodo: Todo = {
      title: text,
      done: false,
      due_date: date,
      id: text,
      content: text,
      select: selection,
    }
    await fetchPost(
      newTodo.title,
      newTodo.done,
      newTodo.due_date,
      newTodo.select,
    ) // de transférer l'id de la categorie
    todos.push(newTodo)
    myList(
      newTodo,
      todos.length - 1,
      outputList,
      deleteAll,
      globalMessage,
      errorMessage,
      todoInput,
      newTodo,
      select,
    )
    todoInput.value = ' '

    console.log('hi')
  }
}
