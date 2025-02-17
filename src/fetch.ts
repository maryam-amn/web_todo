//import {type Todo} from "./Storage_todo.ts";
import type { Todo } from './Storage_todo.ts'

export function get(outputList: HTMLUListElement) {
  fetch('https://api.todos.in.jt-lab.ch/todos')
    .then((get) => get.json())
    .then((data) => {
      for (const item of data) {
        const div = document.createElement('div')
        outputList.appendChild(div)
        div.classList.add('todo-div')

        const newList = document.createElement('li')
        newList.innerHTML = JSON.stringify(`${item.title} ${item.due_date}`)
        newList.id = 'li'

        div.appendChild(newList)
        div.appendChild(newList)
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'

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
          await fetchDelete(item)
        })
      }
    })
}

const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json')
myHeaders.append('Prefer', 'return=representation')

export async function fetchPost(
  title: string,
  due_date: string,
  done: boolean,
) {
  const myRequest = new Request('https://api.todos.in.jt-lab.ch/todos', {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      due_date: due_date,
      done: done,
    }),
    headers: myHeaders,
  })

  const response = await fetch(myRequest)
  if (response.ok) {
    console.log('There is no error')
  }
}

export async function fetchDelete(identification: Todo) {
  await fetch(
    `https://api.todos.in.jt-lab.ch/todos?id=eq.${identification.id}`,
    {
      method: 'DELETE',
      headers: myHeaders,
    },
  )
}

export async function fetchPatch(
  identification: Todo,
  todos: Todo[],
  index: number,
) {
  console.log(identification)
  await fetch(
    `https://api.todos.in.jt-lab.ch/todos?id=eq.${identification.id}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: todos[index].done }),
    },
  )
}
