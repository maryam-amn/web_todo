import {
  type Categories,
  renderSelectElement,
} from './Category_files/create_categories.ts'
//import {type Todo} from "./Storage_todo.ts";
import type { Todo } from './Storage_todo.ts'

export function get(
  outputList: HTMLUListElement,
  select: HTMLSelectElement,
  errorMessage: HTMLElement,
  categories: Categories[],
) {
  fetch('https://api.todos.in.jt-lab.ch/todos?select=*,categories(*)')
    .then((get) => get.json())
    .then((data) => {
      for (const item of data) {
        const div = document.createElement('div')
        outputList.appendChild(div)
        div.classList.add('todo-div')

        const newList = document.createElement('li')

        if (newList) {
          if (Number.isNaN(new Date(item.due_date).getTime())) {
            newList.innerHTML = `${item.title} nul `
            newList.style.color = 'white'
          } else {
            newList.innerHTML = `${item.title} ${item.due_date} `
          }
        }

        //newList.id = 'li'
        div.appendChild(newList)

        const newSelect = document.createElement('select')
        if (item.categories.length > 0) {
          renderSelectElement(categories, newSelect, item.categories[0].id)
        } else {
          renderSelectElement(categories, newSelect, '0')
        }
        newList.appendChild(newSelect)

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
          if (select) newSelect.remove()
          await fetchDelete(item)
        })
        const today = new Date()

        if (
          new Date(item.due_date).setHours(0, 0, 0, 0) ===
          new Date().setHours(0, 0, 0, 0)
        ) {
          newList.style.color = 'orange'
        } else if (new Date(item.due_date) < new Date()) {
          newList.style.color = 'red'
          errorMessage.innerHTML = 'You have overdue todos'
        } else if (
          new Date(item.due_date) < new Date(today.setDate(today.getDate() + 4))
        ) {
          newList.style.color = 'yellow'
        } else {
          newList.style.color = 'green'
        }
      }
    })
}

const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json')
myHeaders.append('Prefer', 'return=representation')

export async function fetchPost(
  title: string,
  done: boolean,
  due_date: string,
  category_id: string,
) {
  const myRequest = new Request('https://api.todos.in.jt-lab.ch/todos', {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      done: done,
      due_date: due_date,
    }),
    headers: myHeaders,
  })

  const response = await fetch(myRequest)
  if (response.ok) {
    console.log('There is no error')

    const data = await response.json()
    console.log(data[0].id)

    // faire un second POST a /categories_todos
    const post_categories_todos = new Request(
      'https://api.todos.in.jt-lab.ch:443/categories_todos',
      {
        method: 'POST',
        body: JSON.stringify({
          category_id: category_id,
          todo_id: data[0].id,
        }),
        headers: myHeaders,
      },
    )

    const test = await fetch(post_categories_todos)
    if (test.ok) {
      console.log('There is no error')
      console.log(category_id, data[0].id)
    }
  }

  // Associer la todo nouvellement créee a la categorie sélectionnée
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
