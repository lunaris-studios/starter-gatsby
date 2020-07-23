module.exports = {
  client: {
    name: "@neptune/docs",
    tagName: "graphql",
    includes: [
      "packages/docs/src/**/*.{ts,tsx}",
      "packages/docs/src/api/gatsby/plugin-documents.graphql",
    ],
    service: {
      name: "GatsbyJS",
      localSchemaFile: "packages/docs/src/api/gatsby/schema.graphql",
    }
  },
}