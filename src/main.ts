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

function myList(todo: Todo) {
  if (outputList) {
    const addedTodoText = todo.text
    const newList = document.createElement('li')
    newList.textContent = addedTodoText
    outputList.appendChild(newList)
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

// Define your function
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
