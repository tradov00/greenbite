import { sanityClient, urlFor } from '@/lib/sanity'
import { groq } from 'next-sanity'
import { PortableText } from '@portabletext/react'

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
  instructions[]{
    _key,
    children[]{
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
      {recipe.mainImage?.asset?.url && (
        <img
          src={urlFor(recipe.mainImage).width(800).height(400).url()}
          alt={recipe.mainImage.alt || recipe.title}
          className="w-full h-auto rounded mb-6"
        />
      )}
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <p className="text-gray-600 mb-6">{recipe.shortDescription}</p>

      {recipe.categories?.length > 0 && (
        <p className="text-sm text-gray-500 mb-6">
          Categories: {recipe.categories.join(', ')}
        </p>
      )}

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

      {recipe.body && (
        <div className="prose prose-lg">
          <PortableText value={recipe.body} />
        </div>
      )}
    </div>
  )
}
