import type { Categories } from './create_categories.ts'

export async function deleteCategory(identification: Categories) {
  await fetch(
    `https://api.todos.in.jt-lab.ch/categories?id=eq.${identification.id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
    },
  )
}
