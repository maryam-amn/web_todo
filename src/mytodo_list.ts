import { type Todo, done_todo, todos } from './Storage_todo.ts'
import { overdueTodos } from './event.ts'

export function myList(
  todo: Todo,
  index: number,
  outputList: HTMLUListElement,
  delete_all: HTMLButtonElement,
  global_message: HTMLParagraphElement,
  error_message: HTMLParagraphElement,
  todoInput: HTMLInputElement,
) {
  if (outputList) {
    const div = document.createElement('div')
    outputList.appendChild(div)
    div.classList.add('todo-div')

    const addedTodoText = todo.text
    const newList = document.createElement('li')
    newList.innerHTML = addedTodoText
    div.appendChild(newList)
    div.appendChild(newList)

    newList.classList.add('list')

    if (delete_all && global_message) {
      delete_all.addEventListener('click', () => {
        localStorage.removeItem('value')
        newList.remove()
        button.remove()
        checkbox.remove()
        global_message.innerHTML = ''
      })
    }
    //const TextRemove = "Remove"

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = todo.status === 'done'
    checkbox.addEventListener('change', () => {
      done_todo(index, outputList, todoInput, global_message)
    })

    div.appendChild(checkbox)
    const Buttons = document.createElement('button')
    Buttons.innerHTML =
      '<img width="30" height="30" src="https://img.icons8.com/carbon-copy/100/filled-trash.png" alt="filled-trash"/>'
    const button = outputList.appendChild(Buttons)
    button.id = 'button'

    div.appendChild(button)

    button.addEventListener('click', () => {
      if (newList) newList.remove()
      if (Buttons) Buttons.remove()
      if (checkbox) checkbox.remove()

      const index = todos.findIndex((t) => t.text === todo.text)
      if (index !== -1) {
        todos.splice(index, 1)
        localStorage.setItem('value', JSON.stringify(todos))
        if (global_message) {
          overdueTodos(global_message)
        }
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
