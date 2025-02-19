import { type Todo, doneTodo, todos } from './Storage_todo.ts'

export function myList(
  todo: Todo,
  index: number,
  outputList: HTMLUListElement,
  deleteAll: HTMLButtonElement,
  globalMessage: HTMLParagraphElement,
  errorMessage: HTMLParagraphElement,
  todoInput: HTMLInputElement,
  identification: Todo,
  select: HTMLSelectElement,
) {
  if (outputList) {
    console.log('affichage : ', todo)

    const div = document.createElement('div')
    outputList.appendChild(div)
    div.classList.add('todo-div')

    const addedTodoText = todo.title
    const newList = document.createElement('li')
    newList.innerHTML = addedTodoText

    div.appendChild(newList)
    div.appendChild(newList)
    newList.id = 'li-myList-function'

    if (deleteAll && globalMessage) {
      deleteAll.addEventListener('click', () => {
        newList.remove()
        button.remove()
        checkbox.remove()
        globalMessage.innerHTML = ''
      })
    }
    //const TextRemove = "Remove"

    const newSelect = document.createElement('select')
    newSelect.innerHTML = select.innerHTML
    div.appendChild(newSelect)

    newList.style.color = newSelect.style.color
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = todo.done
    checkbox.addEventListener('change', () => {
      doneTodo(index, outputList, todoInput, globalMessage, identification)
    })

    div.appendChild(checkbox)

    const Buttons = document.createElement('button')
    Buttons.innerHTML =
      '<img width="30" height="30" src="https://img.icons8.com/carbon-copy/100/filled-trash.png" alt="filled-trash"/>'
    const button = outputList.appendChild(Buttons)
    button.id = 'button'

    div.appendChild(button)

    button.addEventListener('click', async () => {
      if (newList) newList.remove()
      if (Buttons) Buttons.remove()
      if (checkbox) checkbox.remove()
    })

    if (errorMessage) {
      errorMessage.innerHTML = ''
      const dates = document.createElement('p')
      const time = document.createElement('time')
      time.textContent = `\xa0${todo.due_date}`

      const today = new Date()
      if (Number.isNaN(new Date(todo.due_date).getTime())) {
        time.textContent = 'null'
        if (index !== -1) {
          todos.splice(index, 1)
          localStorage.setItem('value', JSON.stringify(todos))
        }
      }
      if (
        new Date(todo.due_date).setHours(0, 0, 0, 0) ===
        new Date().setHours(0, 0, 0, 0)
      ) {
        newList.style.color = 'orange'
      } else if (new Date(todo.due_date) < new Date()) {
        newList.style.color = 'red'
      } else if (
        new Date(todo.due_date) < new Date(today.setDate(today.getDate() + 4))
      ) {
        newList.style.color = 'yellow'
      } else {
        newList.style.color = 'green'
      }
      dates.appendChild(time)
      newList.appendChild(dates)
      time.className = 'time'
    }
  } else {
    alert('Please enter a todo ')
  }
}
