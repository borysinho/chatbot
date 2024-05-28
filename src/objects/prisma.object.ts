import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient().$extends({
//   result: {
//     user: {
//       fullNumber: {
//         needs: { countrycode: true, cellphone: true },
//         compute(user) {
//           return `${user.countrycode}${user.cellphone}`;
//         },
//       },
//     },
//   },
// });

export default new PrismaClient();
