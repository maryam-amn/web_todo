import './style.css'
export { myList }
console.log('Hello from typescript')
import {
  addNewCategory,
  cat,
  loadCategoriesFromApi,
  renderCategories,
} from './Category_files/create_categories.ts'
import {
  ColorCategory,
  deserialized,
  doneTodo,
  storage,
  todos,
} from './Storage_todo.ts'
import { event, overdueTodos } from './event.ts'
import { get } from './fetch.ts'
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
const addCategoriesButton =
  document.querySelector<HTMLButtonElement>('#button-categories')
const categoryTextInput =
  document.querySelector<HTMLInputElement>('#text-catergories')
const categoryColorInput =
  document.querySelector<HTMLInputElement>('#color-picker')

const CategoryParagraph = document.querySelector<HTMLParagraphElement>('#text')

const select = document.querySelector<HTMLSelectElement>('#category-select')
if (
  outputList &&
  deleteAll &&
  globalMessage &&
  errorMessage &&
  todoInput &&
  select
) {
  deserialized(
    outputList,
    deleteAll,
    globalMessage,
    errorMessage,
    todoInput,
    select,
  )
}
if (todos && outputList && todoInput && globalMessage) {
  todos.forEach((_, index) => {
    doneTodo(index, outputList, todoInput, globalMessage, _)
  })
}

const categories = await loadCategoriesFromApi()
if (outputList && select && errorMessage)
  get(outputList, select, errorMessage, categories)
if (CategoryParagraph && select)
  renderCategories(CategoryParagraph, select, categories)

if (
  outputList &&
  deleteAll &&
  globalMessage &&
  errorMessage &&
  todoInput &&
  select
) {
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

if (
  outputList &&
  deleteAll &&
  globalMessage &&
  errorMessage &&
  todoInput &&
  select
) {
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
if (
  todoInput &&
  button &&
  outputList &&
  globalMessage &&
  outputList &&
  errorMessage &&
  deleteAll &&
  dueDate &&
  select
) {
  event(
    todoInput,
    globalMessage,
    errorMessage,
    outputList,
    deleteAll,
    button,
    dueDate,
    select,
  )
}

if (
  todoInput &&
  dueDate &&
  globalMessage &&
  errorMessage &&
  outputList &&
  deleteAll &&
  select
) {
  storage(
    todoInput,
    dueDate,
    globalMessage,
    errorMessage,
    outputList,
    deleteAll,
    select,
  )
}
if (globalMessage) {
  overdueTodos(globalMessage)
}

if (globalMessage) {
  overdueTodos(globalMessage)
}

if (addCategoriesButton && categoryTextInput && categoryColorInput) {
  addCategoriesButton.addEventListener('click', () => {
    addNewCategory(categoryTextInput, categoryColorInput)
    location.reload()
  })
}

if (addCategoriesButton && categoryTextInput && categoryColorInput) {
  categoryTextInput.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      addNewCategory(categoryTextInput, categoryColorInput)
      location.reload()
    }
  })
}

cat.forEach((_, index) => {
  ColorCategory(_, index)
})
// export {function }
// export {function }
