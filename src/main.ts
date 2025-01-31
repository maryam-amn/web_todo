import './style.css'
export { myList }
console.log('Hello from typescript')
import { event, overdueTodos } from './event.ts'
import { myList } from './mytodo_list.ts'
import { todos, Storage, deserialized, done_todo } from './Storage_todo.ts'

console.log('Hello from typescript')

const todoInput = document.querySelector<HTMLInputElement>('#todo-input')
const button = document.querySelector<HTMLButtonElement>('#add-todo-button')
const outputList = document.querySelector<HTMLUListElement>('#todo-list')
const delete_all = document.querySelector<HTMLButtonElement>('#delete-all')
export const due_date = document.querySelector<HTMLInputElement>('#due-date')
const error_message = document.querySelector<HTMLParagraphElement>(
  '#todo-creation-error',
)
const global_message =
  document.querySelector<HTMLParagraphElement>('#global_message')

if (outputList && delete_all && global_message && error_message && todoInput) {
  deserialized(outputList, delete_all, global_message, error_message, todoInput)
}
if (todos && outputList && todoInput && global_message) {
  todos.forEach((_, index) => {
    done_todo(index, outputList, todoInput, global_message)
  })
}

if (outputList && delete_all && global_message && error_message && todoInput) {
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

if (
  todoInput &&
  button &&
  outputList &&
  global_message &&
  outputList &&
  error_message &&
  delete_all &&
  due_date
) {
  event(
    todoInput,
    global_message,
    error_message,
    outputList,
    delete_all,
    button,
    due_date,
  )
}

if (
  todoInput &&
  due_date &&
  global_message &&
  error_message &&
  outputList &&
  delete_all
) {
  Storage(
    todoInput,
    due_date,
    global_message,
    error_message,
    outputList,
    delete_all,
  )
}
if (global_message) {
  overdueTodos(global_message)
}

if (global_message) {
  overdueTodos(global_message)
}

// export {function }
