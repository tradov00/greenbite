import { defineConfig } from 'sanity'
import { schema } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Greenbite',

  projectId: 'gjw4mkh7',
  dataset: 'production',

  schema,
})
