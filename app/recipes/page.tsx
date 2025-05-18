import { sanityClient } from '@/lib/sanity'
import { recipesQuery } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import Link from 'next/link'

type Recipe = {
  _id: string
  title: string
  slug: { current: string }
  mainImage: {
    asset: {
      _id: string
      url: string
    },
    alt?: string
  }
  shortDescription: string
  categories: string[]
}

export default async function RecipesPage() {
  const recipes: Recipe[] = await sanityClient.fetch(recipesQuery)

  return (
    <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <Link key={recipe._id} href={`/recipes/${recipe.slug.current}`} className="block rounded-xl overflow-hidden shadow hover:shadow-lg transition">
          <img
            src={urlFor(recipe.mainImage).width(400).height(300).url()}
            alt={recipe.mainImage.alt || recipe.title}
            className="w-full h-60 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">{recipe.title}</h3>
            <p className="text-gray-600 text-sm">{recipe.shortDescription}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
