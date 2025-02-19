import { storage, todos } from './Storage_todo.ts'

export function disabledButton(
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
  globalMessage: HTMLParagraphElement,
  errorMessage: HTMLParagraphElement,
  outputList: HTMLUListElement,
  deleteAll: HTMLButtonElement,
  button: HTMLButtonElement,
  dueDate: HTMLInputElement,
  select: HTMLSelectElement,
): void {
  if (todoInput) {
    todoInput.addEventListener('input', () => {
      disabledButton(todoInput, button)
    })
  }

  if (button && todoInput && outputList) {
    button.addEventListener('click', () => {
      storage(
        todoInput,
        dueDate,
        globalMessage,
        errorMessage,
        outputList,
        deleteAll,
        select,
      )
    })

    todoInput.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
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
    })
  }
}

export function overdueTodos(globalMessage: HTMLParagraphElement) {
  const today = new Date()
  const overdueTodos = todos.filter((todo) => new Date(todo.due_date) < today)

  if (overdueTodos.length > 0 && globalMessage) {
    globalMessage.innerHTML =
      "<p style='background-color: red; color: white; '>You have overdue todos !</p>"
  } else if (globalMessage) {
    globalMessage.innerHTML = ''
  }
}
