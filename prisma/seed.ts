import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedUsers() {
  const clienteInput: Prisma.ClienteCreateInput[] = [
    {
      nombre: "Borys",
      profileName: "Borys Quiroga",
      whatsappNumber: 59177685777,
    },
    {
      nombre: "Marcelo",
      profileName: "Marce",
      whatsappNumber: 59174613450,
    },
    {
      nombre: "Nicole",
      profileName: "Nico",
      whatsappNumber: 59172151717,
    },
  ];

  const clientes = await prisma.cliente.createMany({ data: clienteInput });

  const salonInput: Prisma.SalonCreateInput[] = [
    {
      nombre: "Doña Flora",
      direccion: "https://g.co/kgs/naq5hXG",
      capacidad: 200,
      costoDia: 5000,
    },
    {
      nombre: "Salón de Eventos Elianne 1",
      direccion: "https://g.co/kgs/J15HXLC",
      capacidad: 150,
      costoDia: 7000,
    },
    {
      nombre: "Leonardo Salón de Eventos & Catering",
      direccion: "https://g.co/kgs/JYLiq8X",
      capacidad: 120,
      costoDia: 8000,
    },
  ];

  const salones = await prisma.salon.createMany({ data: salonInput });

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
