import './style.css'
export { myList }
console.log('Hello from typescript')
import { deserialized, doneTodo, storage, todos } from './Storage_todo.ts'
import { event, overdueTodos } from './event.ts'
import { myList } from './mytodo_list.ts'

console.log('Hello from typescript')

const todoInput = document.querySelector<HTMLInputElement>('#todo-input')
const button = document.querySelector<HTMLButtonElement>('#add-todo-button')
const outputList = document.querySelector<HTMLUListElement>('#todo-list')
const deleteAll = document.querySelector<HTMLButtonElement>('#delete-all')
const dueDate = document.querySelector<HTMLInputElement>('#due-date')
const errorMessage = document.querySelector<HTMLParagraphElement>(
  '#todo-creation-error',
)
const globalMessage =
  document.querySelector<HTMLParagraphElement>('#global_message')

if (outputList && deleteAll && globalMessage && errorMessage && todoInput) {
  deserialized(outputList, deleteAll, globalMessage, errorMessage, todoInput)
}
if (todos && outputList && todoInput && globalMessage) {
  todos.forEach((_, index) => {
    doneTodo(index, outputList, todoInput, globalMessage)
  })
}

if (outputList && deleteAll && globalMessage && errorMessage && todoInput) {
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

if (
  todoInput &&
  button &&
  outputList &&
  globalMessage &&
  outputList &&
  errorMessage &&
  deleteAll &&
  dueDate
) {
  event(
    todoInput,
    globalMessage,
    errorMessage,
    outputList,
    deleteAll,
    button,
    dueDate,
  )
}

if (
  todoInput &&
  dueDate &&
  globalMessage &&
  errorMessage &&
  outputList &&
  deleteAll
) {
  storage(
    todoInput,
    dueDate,
    globalMessage,
    errorMessage,
    outputList,
    deleteAll,
  )
}
if (globalMessage) {
  overdueTodos(globalMessage)
}

if (globalMessage) {
  overdueTodos(globalMessage)
}

// export {function }
