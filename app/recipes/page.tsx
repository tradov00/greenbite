import { sanityClient, urlFor } from '@/lib/sanity'
import Link from 'next/link'

const recipesQuery = `*[_type == "recipe" && defined(slug.current)]{
  _id,
  title,
  slug,
  mainImage {
    asset->{
      url
    },
    alt
  },
  shortDescription,
  "categories": categories[]->title
}`

type Recipe = {
  _id: string
  title: string
  slug: { current: string }
  mainImage: {
    asset: { url: string }
    alt?: string
  }
  shortDescription: string
  categories: string[]
}

export default async function RecipesPage({ searchParams }: { searchParams: { category?: string } }) {
  const allRecipes: Recipe[] = await sanityClient.fetch(recipesQuery)
  const categoryFilter = searchParams.category?.toLowerCase()

  const recipes = categoryFilter
    ? allRecipes.filter((r) =>
        r.categories?.some((c) => c.toLowerCase() === categoryFilter)
      )
    : allRecipes

  const uniqueCategories = Array.from(new Set(allRecipes.flatMap((r) => r.categories || [])))

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recipes</h1>

      {/* Category Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Link href="/recipes" className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          All
        </Link>
        {uniqueCategories.map((cat) => (
          <Link
            key={cat}
            href={`/recipes?category=${encodeURIComponent(cat)}`}
            className={`px-3 py-1 rounded ${
              cat.toLowerCase() === categoryFilter ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Recipe Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="block rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white"
          >
            <img
              src={urlFor(recipe.mainImage).width(400).height(300).url()}
              alt={recipe.mainImage.alt || recipe.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{recipe.shortDescription}</p>
              <Link
                href={`/recipes/${recipe.slug.current}`}
                className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
