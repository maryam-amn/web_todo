import './style.css'

console.log('Hello from typescript')

const todoInput = document.querySelector<HTMLInputElement>('#todo-input')
const button = document.querySelector<HTMLButtonElement>('#add-todo-button')
const outputList = document.querySelector<HTMLUListElement>('#todo-list')
const deserialized = localStorage.getItem('value')

interface Todo {
  text: string
}

let todos: Todo[] = []
if (deserialized) {
  todos = JSON.parse(deserialized)
  todos.forEach(myList)
}

// do the list
function myList(todo: Todo) {
  if (outputList) {
    const addedTodoText = todo.text
    const newList = document.createElement('li')
    newList.textContent = addedTodoText
    outputList.appendChild(newList)
    // Button remove
    const TextRemove = 'Remove'
    const Buttons = document.createElement('button')
    Buttons.textContent = TextRemove
    const button = outputList.appendChild(Buttons)
    button.id = 'button'
    button.addEventListener('click', () => {
      if (newList) newList.remove()
      if (Buttons) Buttons.remove()

      const index = todos.findIndex((t) => t.text === todo.text)
      if (index !== -1) {
        todos.splice(index, 1)
        localStorage.setItem('value', JSON.stringify(todos))
      }
    })
  } else {
    alert('Please enter a todo ')
  }
}
if (button && todoInput && outputList) {
  button.addEventListener('click', () => {
    test()
  })

  todoInput.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      test()
    }
  })
}
// Stock la todo
function test(): void {
  if (todoInput) {
    const text: string = todoInput.value.trim()
    if (text) {
      const newTodo: Todo = { text }
      todos.push(newTodo)
      const serialized = JSON.stringify(todos)
      localStorage.setItem('value', serialized)
      myList(newTodo)
      todoInput.value = ''
    }
  }
}
