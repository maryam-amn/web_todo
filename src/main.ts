import './style.css'

console.log('Hello from typescript')

const todoInput = document.querySelector<HTMLInputElement>('#todo-input')
const button = document.querySelector<HTMLButtonElement>('#add-todo-button')
const outputList = document.querySelector<HTMLUListElement>('#todo-list')
const deserialized = localStorage.getItem('value')
const delete_all = document.querySelector<HTMLButtonElement>('#delete-all')
const due_date = document.querySelector<HTMLInputElement>('#due-date')
const error_message = document.querySelector<HTMLParagraphElement>(
  '#todo-creation-error',
)
const global_message =
  document.querySelector<HTMLParagraphElement>('#global_message')

interface Todo {
  text: string
  status: string
  date: string
}

let todos: Todo[] = []
if (deserialized) {
  todos = JSON.parse(deserialized)
  todos.forEach(myList)
}

function done_todo(index: number) {
  if (outputList && todoInput) {
    if (todos[index].status === 'done') {
      todos[index].status = 'undone'
    } else {
      todos[index].status = 'done'
    }
  }
  localStorage.setItem('value', JSON.stringify(todos))
  overdueTodos()
}

function button_disabled() {
  if (todoInput && button)
    if (todoInput.value === '') {
      button.setAttribute('disabled', 'disabled')
    } else {
      button.removeAttribute('disabled')
    }
}

function overdueTodos() {
  const today = new Date()
  const overdueTodos = todos.filter((todo) => new Date(todo.date) < today)

  if (overdueTodos.length > 0 && global_message) {
    global_message.innerHTML =
      "<p style='background-color: red; color: white; '>You have overdue todos !</p>"
  } else if (global_message) {
    global_message.innerHTML = ''
  }
}

function myList(todo: Todo, index: number) {
  if (outputList) {
    const addedTodoText = todo.text
    const newList = document.createElement('li')
    newList.textContent = addedTodoText
    outputList.appendChild(newList)

    if (delete_all && global_message) {
      delete_all.addEventListener('click', () => {
        localStorage.removeItem('value')
        newList.remove()
        button.remove()
        checkbox.remove()
        global_message.innerHTML = ''
      })
    }
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
        overdueTodos()
      }
    })

    if (error_message) {
      if (Number.isNaN(new Date(todo.date).getTime())) {
        error_message.innerHTML =
          "<p style='color: red;'>" + 'Please enter a valid date</p>'
        newList.remove()
        Buttons.remove()
        checkbox.remove()

        if (index !== -1) {
          todos.splice(index, 1)
          localStorage.setItem('value', JSON.stringify(todos))
        }
      } else {
        error_message.innerHTML = ''
        const dates = document.createElement('p')
        const time = document.createElement('time')
        time.textContent = `\xa0${todo.date}`

        const today = new Date()
        if (
          new Date(todo.date).setHours(0, 0, 0, 0) ===
          new Date().setHours(0, 0, 0, 0)
        ) {
          newList.style.color = 'orange'
        } else if (new Date(todo.date) < new Date()) {
          newList.style.color = 'red'
        } else if (
          new Date(todo.date) < new Date(today.setDate(today.getDate() + 4))
        ) {
          newList.style.color = 'yellow'
        } else {
          newList.style.color = 'green'
        }

        dates.appendChild(time)
        newList.appendChild(dates)
        time.className = 'time'
      }
    }
  } else {
    alert('Please enter a todo ')
  }
}

if (todoInput) {
  todoInput.addEventListener('input', button_disabled)
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

function test(): void {
  if (todoInput && due_date) {
    const text: string = todoInput.value.trim()
    const date: string = due_date.value.trim()
    if (text) {
      const newTodo: Todo = { text, status: 'undone', date }
      todos.push(newTodo)
      const serialized = JSON.stringify(todos)
      localStorage.setItem('value', serialized)
      myList(newTodo, todos.length - 1)
      todoInput.value = ' '
    }
  }
  overdueTodos()
}
overdueTodos()
