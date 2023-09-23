import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api-v2-mumbai.lens.dev/",
  documents: "src/**/!(*.generated).{ts,tsx}",
  ignoreNoDocuments: true,
  generates: {
    "src/types.ts": { plugins: ["typescript"] },
    "src/": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.tsx",
        baseTypesPath: "types.ts",
        folder: "gql",
      },
      plugins: ["typescript-operations", "typescript-react-apollo"],
    },
  },
};
export default config;
