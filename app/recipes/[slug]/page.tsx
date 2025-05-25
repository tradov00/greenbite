import Image from 'next/image';
import { sanityClient } from '@/lib/sanity';
import { groq } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';

interface Step {
  _key: string;
  children: { text: string }[];
}

interface Props {
  params: Promise<{ slug: string }>;
}

const recipeQuery = groq`*[_type == "recipe" && slug.current == $slug][0]{
  _id,
  title,
  mainImage {
    asset->{ _id, url },
    alt
  },
  shortDescription,
  ingredients,
  instructions[] {
    _key,
    children[] { text }
  },
  "categories": categories[]->title,
  body
}`;

export default async function RecipePage({ params }: Props) {
  const { slug } = await params;

  const recipe = await sanityClient.fetch(recipeQuery, { slug });

  if (!recipe) return <div className="p-6">Recipe not found.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {recipe.mainImage?.asset?.url && (
        <div className="relative w-full max-w-2xl aspect-video mx-auto mb-6">
          <Image
            src={recipe.mainImage.asset.url}
            alt={recipe.mainImage.alt || recipe.title}
            fill
            className="object-cover rounded"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
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
            {recipe.instructions.map((step: Step, index: number) => (
              <li key={step._key || index}>
                {step.children?.map((child) => child.text).join('') || `Step ${index + 1}`}
              </li>
            ))}
          </ol>
        </>
      )}

      {recipe.body && (
        <div className="prose prose-lg mb-10">
          <PortableText value={recipe.body} />
        </div>
      )}

      <div className="mt-8">
        <Link
          href="/recipes"
          className="inline-block bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
        >
          ← Back to Recipes
        </Link>
      </div>
    </div>
  );
}
