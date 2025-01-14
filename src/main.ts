import './style.css'

console.log('Hello from typescript')

const todoInput = document.querySelector<HTMLInputElement>('#todo-input')
const button = document.querySelector<HTMLButtonElement>('#add-todo-button')
const outputList = document.querySelector<HTMLUListElement>('#todo-list')
const deserialized = localStorage.getItem('value')

interface Todo {
  text: string
  status: string
}

let todos: Todo[] = []
if (deserialized) {
  todos = JSON.parse(deserialized)
  todos.forEach(myList)
}

function done_todo(index: number) {
  if (outputList) {
    if (todos[index].status === 'done') {
      todos[index].status = 'undone'
    } else {
      todos[index].status = 'done'
    }
  }
  localStorage.setItem('value', JSON.stringify(todos))
}

// do the list
function myList(todo: Todo, index: number) {
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

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = todo.status === 'done'
    checkbox.addEventListener('change', () => {
      done_todo(index)
    })
    outputList.appendChild(checkbox)

    button.addEventListener('click', () => {
      if (newList) newList.remove()
      if (Buttons) Buttons.remove()
      if (checkbox) checkbox.remove()

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
      const newTodo: Todo = { text, status: 'undone' }
      todos.push(newTodo)
      const serialized = JSON.stringify(todos)
      localStorage.setItem('value', serialized)
      myList(newTodo, todos.length - 1)
      todoInput.value = ''
    }
  }
}
