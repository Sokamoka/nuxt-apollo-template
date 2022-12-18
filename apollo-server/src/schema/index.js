import * as test from './test.js';
import * as auth from './auth.js';
import * as users from './users.js';

export const typeDefs = [test.typeDefs, auth.typeDefs, users.typeDefs];
// export const typeDefs = [];

// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import glob from 'glob';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const basename = path.basename(__filename);

// const files = glob.sync(__dirname + '/*.js', { ignore: __dirname + '/index.js' });
// console.log('files:', files);

// files.forEach(function (file) {
//   console.log('XXXX:', file);
//   fs.readFile(file, function (err, data) {
//     console.log('2222');
//     if (err) {
//       console.log(err);
//     } else {
//       // forFile(data.toString(), file);
//       console.log('data:', data.toString());
//       typeDefs.push(data.typeDefs);
//     }
//   });
// });

// const Query = `
//   type Query {
//     _empty: String
//   }

//   type Mutation {
//     _empty: String
//   }
// `;

// export const typeDefs = [Query];
// console.log('typeDefs:', typeDefs);

// fs.readdirSync(__dirname)
//   .filter((file) => file !== basename && /\.(j|t)s$/.test(file) && !/\.d\.(j|t)s$/.test(file))
//   .forEach(async (file) => {
//     const { typeDefs: importetTypeDefs } = await import(path.join(__dirname, file));
//     console.log(file, importetTypeDefs);
//     typeDefs.push(importetTypeDefs);
//   });
