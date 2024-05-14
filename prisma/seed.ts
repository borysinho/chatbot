import { Prisma, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

async function seedUsers() {
  const users: Prisma.UserCreateInput[] = [
    {
      countrycode: 591,
      cellphone: 77685777,
      name: "Borys",
      email: "borysquiroga@gmail.com",
    },
    {
      countrycode: 591,
      cellphone: 74613450,
      name: "Marcelo",
      email: "marcelo0920.z@gmail.com",
    },
    {
      countrycode: 591,
      cellphone: 72151717,
      name: "Nicole",
      email: "nicolericaldi@gmail.com",
    },
    {
      countrycode: 591,
      cellphone: 71321099,
      name: "Miguel",
      email: "migueljppx@gmail.com",
    },
    // Adicionar mas si hacen falta
  ];

  await prisma.user.createMany({
    data: users,
  });

  console.log("Users seeded successfully!");
}

seedUsers()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
