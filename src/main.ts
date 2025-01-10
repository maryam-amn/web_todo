import './style.css'

console.log('Hello from typescript')

const TodoInput = document.querySelector<HTMLInputElement>('#todo-input')
const button = document.querySelector<HTMLButtonElement>('#add-todo-button')
const outputList = document.querySelector<HTMLUListElement>('#todo-list')

function myList() {
  const addedTodoText = TodoInput?.value
  if (addedTodoText && outputList) {
    const newList = document.createElement('li')
    newList.textContent = addedTodoText
    outputList.appendChild(newList)
  } else {
    alert('Please enter a todo ')
  }
}
if (button && TodoInput && outputList) {
  button.addEventListener('click', () => {
    myList()
  })

  TodoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      myList()
    }
  })
}
