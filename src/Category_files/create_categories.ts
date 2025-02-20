import { deleteCategory } from './delete_category.ts'

export interface Categories {
  id: string
  title: string
  color: string
}
export const cat: Categories[] = []

const arr: Categories[] = []

export function renderSelectElement(
  categories: Categories[],
  selectElement: HTMLSelectElement,
  selectedCategorieId: string,
) {
  const option = document.createElement('option')
  option.innerText = 'Pas de categorie'
  selectElement.appendChild(option)

  for (const category of categories) {
    const option = document.createElement('option')
    option.innerHTML = category.title
    option.style.color = category.color

    option.value = category.id

    if (category.id === selectedCategorieId) {
      option.selected = true
    }
    selectElement.append(option)
  }
}

export async function loadCategoriesFromApi() {
  const response = await fetch('https://api.todos.in.jt-lab.ch/categories')
  if (response.ok) {
    const data = (await response.json()) as Categories[]
    return data
  }
  console.error('Cannot get categories')
  return []
}

// Récupère les catégories actuellement sur le serveur, avec GET
export function renderCategories(
  CategoryParagraph: HTMLParagraphElement,
  select: HTMLSelectElement,
  data: Categories[],
) {
  for (const category of data) {
    console.log(category)
    const div = document.createElement('div')
    CategoryParagraph.appendChild(div)
    div.classList.add('CategoryDiv')

    const paragraphElement = document.createElement('a')
    div.appendChild(paragraphElement)

    const addedTodoText = category.title
    const newList = document.createElement('a')
    newList.innerHTML = addedTodoText

    newList.style.color = category.color

    paragraphElement.appendChild(newList)
    newList.classList.add('CategoriesList')

    // il faudrai faire un if qui regarde si le champ et selection si selection prend
    // comme valeur de defaut ce qu'on a choist sinon creée un nouveau

    const Buttons = document.createElement('button')
    Buttons.innerHTML =
      '<img width="30" height="30" src="https://img.icons8.com/carbon-copy/100/filled-trash.png" alt="filled-trash"/>'
    const button = CategoryParagraph.appendChild(Buttons)
    button.id = 'button'
    div.appendChild(button)
    button.addEventListener('click', async () => {
      if (newList) newList.remove()
      if (Buttons) Buttons.remove()
      await deleteCategory(category)
      location.reload()
    })
  }
  renderSelectElement(data, select, '0')
}

export const addNewCategory = (
  textInput: HTMLInputElement,
  colorInput: HTMLInputElement,
) => {
  console.log(arr)
  const NewCategories: Categories = {
    title: textInput.value.trim(),
    color: colorInput.value.trim(),
    id: textInput.value.trim(),
  }

  arr.push(NewCategories)
  Post(NewCategories.title, NewCategories.color)
  console.log(arr)
  textInput.value = ' '
}

async function Post(title: string, color: string) {
  const myRequest = new Request('https://api.todos.in.jt-lab.ch/categories', {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      color: color,
    }),
    headers: {
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
  })

  const response = await fetch(myRequest)
  if (response.ok) {
    console.log('There is no error')
  }
}
