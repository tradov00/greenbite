import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const config = {
  projectId: 'gjw4mkh7',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
}

export const sanityClient = createClient(config)

export const urlFor = (source: any) => imageUrlBuilder(config).image(source)
