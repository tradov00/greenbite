import { sanityClient, urlFor } from '@/lib/sanity'
import { groq } from 'next-sanity'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

type Props = {
  params: {
    slug: string
  }
}

const recipeQuery = groq`*[_type == "recipe" && slug.current == $slug][0]{
  _id,
  title,
  mainImage {
    asset->{
      _id,
      url
    },
    alt
  },
  shortDescription,
  ingredients,
  instructions[] {
    _key,
    children[] {
      text
    }
  },
  "categories": categories[]->title,
  body
}`

export default async function RecipePage({ params }: Props) {
  const recipe = await sanityClient.fetch(recipeQuery, { slug: params.slug })

  if (!recipe) {
    return <div className="p-6">Recipe not found.</div>
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Main Image */}
      {recipe.mainImage?.asset?.url && (
        <img
          src={urlFor(recipe.mainImage).width(800).height(400).url()}
          alt={recipe.mainImage.alt || recipe.title}
          className="w-full h-auto rounded mb-6"
        />
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

      {/* Short Description */}
      <p className="text-gray-600 mb-6">{recipe.shortDescription}</p>

      {/* Categories */}
      {recipe.categories?.length > 0 && (
        <p className="text-sm text-gray-500 mb-6">
          Categories:{' '}
          {recipe.categories.map((cat, idx) => (
            <Link
              key={idx}
              href={`/recipes?category=${encodeURIComponent(cat)}`}
              className="text-green-700 underline mr-2 hover:text-green-900"
            >
              {cat}
            </Link>
          ))}
        </p>
      )}

      {/* Ingredients */}
      {recipe.ingredients?.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside mb-6">
            {recipe.ingredients.map((ingredient: string, index: number) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </>
      )}

      {/* Instructions */}
      {recipe.instructions?.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <ol className="list-decimal list-inside mb-6">
            {recipe.instructions.map((step: any, index: number) => (
              <li key={step._key || index}>
                {step.children?.map((child: any) => child.text).join('') || `Step ${index + 1}`}
              </li>
            ))}
          </ol>
        </>
      )}

      {/* Optional Rich Body */}
      {recipe.body && (
        <div className="prose prose-lg mb-10">
          <PortableText value={recipe.body} />
        </div>
      )}

      {/* Back Button */}
      <div className="mt-8">
        <Link
          href="/recipes"
          className="inline-block bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
        >
          ← Back to Recipes
        </Link>
      </div>
    </div>
  )
}
