import { sanityClient } from '@/lib/sanity'
import { recipesQuery } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import Link from 'next/link'

type Recipe = {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: {
    asset?: {
      _id: string
      url: string
    },
    alt?: string
  }
  shortDescription: string
  categories: string[]
  ingredients: string[]
  instructions: {
    _key: string
    _type: string
    children: { text: string }[]
  }[]
}

export default async function RecipesPage() {
  const recipes: Recipe[] = await sanityClient.fetch(recipesQuery)

  return (
    <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => {
        const imageUrl = recipe.mainImage?.asset ? urlFor(recipe.mainImage).width(400).height(300).url() : null
        const imageAlt = recipe.mainImage?.alt || recipe.title

        return (
          <Link
            key={recipe._id}
            href={`/recipes/${recipe.slug.current}`}
            className="block rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-60 object-cover"
              />
            ) : (
              <div className="w-full h-60 bg-gray-200 flex items-center justify-center text-gray-500">
                No image available
              </div>
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{recipe.shortDescription}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
