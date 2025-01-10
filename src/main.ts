import './style.css'

console.log('Hello from typescript')

const todoInput = document.querySelector<HTMLInputElement>('#todo-input')
const button = document.querySelector<HTMLButtonElement>('#add-todo-button')
const outputList = document.querySelector<HTMLUListElement>('#todo-list')

function myList() {
  if (todoInput && outputList) {
    const addedTodoText = todoInput.value
    const newList = document.createElement('li')
    newList.textContent = addedTodoText
    outputList.appendChild(newList)
  } else {
    alert('Please enter a todo ')
  }
}
if (button && todoInput && outputList) {
  button.addEventListener('click', () => {
    myList()
  })

  todoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      myList()
    }
  })
}
