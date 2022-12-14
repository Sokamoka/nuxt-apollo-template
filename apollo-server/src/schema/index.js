export * from "./test.js";

// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const basename = path.basename(__filename);

// const Query = `
//   type Query {
//     _empty: String
//   }

//   type Mutation {
//     _empty: String
//   }
// `;

// export const typeDefs = [Query];
// console.log("typeDefs:", typeDefs);

// fs.readdirSync(__dirname)
//   .filter(
//     (file) =>
//       file !== basename && /\.(j|t)s$/.test(file) && !/\.d\.(j|t)s$/.test(file)
//   )
//   .forEach(async (file) => {
//     const { typeDefs: importetTypeDefs } = await import(
//       path.join(__dirname, file)
//     );
//     console.log(file, importetTypeDefs);
//     typeDefs.push(importetTypeDefs);
//   });
