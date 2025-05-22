export const recipesQuery = `*[_type == "recipe"]{
  _id,
  title,
  slug,
  mainImage {
    asset->{
      _id,
      url
    },
    alt
  },
  shortDescription,
  "categories": categories[]->title,
  ingredients,
  instructions
}`;
