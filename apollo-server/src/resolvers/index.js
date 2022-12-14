export * from "./test.js";
// import fs from "fs";
// import path from "path";

// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const basename = path.basename(__filename);

// export const resolvers = {};

// fs.readdirSync(__dirname)
//   .filter(
//     (file) =>
//       file !== basename && /\.(j|t)s$/.test(file) && !/\.d\.(j|t)s$/.test(file)
//   )
//   .forEach(async (file) => {
//     const { resolvers: importedResolvers } = await import(
//       path.join(__dirname, file)
//     );
//     return {
//       resolvers,
//       ...importedResolvers,
//     };
//   });
