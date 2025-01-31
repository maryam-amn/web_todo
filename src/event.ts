import { Storage, todos } from './Storage_todo.ts'



export function disabled_button(
  todoInput: HTMLInputElement,
  button: HTMLButtonElement,
): void {
  if (todoInput && button)
    if (todoInput.value === '') {
      button.setAttribute('disabled', 'disabled')
    } else {
      button.removeAttribute('disabled')
    }
}


export function event(
  todoInput: HTMLInputElement,
  global_message: HTMLParagraphElement,
  error_message: HTMLParagraphElement,
  outputList: HTMLUListElement,
  delete_all: HTMLButtonElement,
  button: HTMLButtonElement,
  due_date: HTMLInputElement,
): void {
  if (todoInput) {
    todoInput.addEventListener('input', () => {
      disabled_button(todoInput, button)
    })
  }

  if (button && todoInput && outputList) {
    button.addEventListener('click', () => {
      Storage(
        todoInput,
        due_date,
        global_message,
        error_message,
        outputList,
        delete_all,
      )
    })

    todoInput.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        Storage(
          todoInput,
          due_date,
          global_message,
          error_message,
          outputList,
          delete_all,
        )
      }
    })
  }
}

export function overdueTodos(global_message: HTMLParagraphElement) {
  const today = new Date()
  const overdueTodos = todos.filter((todo) => new Date(todo.date) < today)

  if (overdueTodos.length > 0 && global_message) {
    global_message.innerHTML =
      "<p style='background-color: red; color: white; '>You have overdue todos !</p>"
  } else if (global_message) {
    global_message.innerHTML = ''
  }
}
