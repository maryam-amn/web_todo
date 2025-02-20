import type { Categories } from './create_categories.ts'

export async function PatchCategory(
  identification: Categories,
  cat: Categories[],
  index: number,
) {
  console.log(identification)
  await fetch(
    `https://api.todos.in.jt-lab.ch/categories?id=eq.${identification.id}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ color: cat[index].color }),
    },
  )
}
