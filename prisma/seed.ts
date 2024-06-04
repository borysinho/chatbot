import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedUsers() {
  // const usuario = await prisma.cliente.create({
  //   data: {
  //     whatsappNumber: "59177685777",
  //     profileName: "Borys Quiroga",
  //   },
  // });

  const unidades = await prisma.unidadDeMedida.createMany({
    data: [
      {
        nombre: "unidad",
        descripcion: "unidad",
        nombrePlural: "unidades",
        abreviatura: "und",
      },
    ],
  });

  const producto = await prisma.productos.create({
    data: {
      nombre: "Alquiler de sillas plásticas",
      esProducto: true,
      precioProducto: 100,
      moneda: "Bs",
      esServicio: true,
      precioServicio: 5,
      tiempoServicioHoras: 24,
      seVende: true,
      stock: 200,
      descripcion: "Servicio de alquiler de sillas",
      unidadDeMedida: {
        connect: {
          id: 1,
        },
      },
      Caracteristicas: {
        create: [
          {
            nombre: "Color",
            valor: "Blanco",
          },
          {
            nombre: "Material",
            valor: "Plástico",
          },
          {
            nombre: "PesoMaximoSoportado",
            valor: "180 Kg",
          },
          {
            nombre: "Marca",
            valor: "Rey",
          },
        ],
      },
      StockPorFecha: {
        create: [
          {
            fecha: new Date(2024, 10, 1),
            stock: 160,
          },
        ],
      },
      DetalleDeCategoriaDeProductos: {
        create: {
          categoria: {
            create: {
              nombre: "sillas",
              descripcion: "sillas",
            },
          },
        },
      },
      ImagenProducto: {
        create: {
          urlImagen:
            "https://images.freeimages.com/images/large-previews/5bc/old-chair-1530158.jpg",
        },
      },
    },
  });

  // const productoEmbedding = await prisma.productosEmbeddings.create({
  //   data: {
  //     Categorias: "sillas",
  //     Descripcion: "Servicio de alquiler de sillas",
  //     NombreProducto: "Alquiler de sillas plásticas",
  //     idProducto: 1,
  //   },
  // });

  // const productosInput: Prisma.ProductosCreateInput[] = [
  //   {
  //     nombre: "sillas plásticas",
  //     esProducto: true,
  //     precioProducto: 100,
  //     moneda: "Bs",
  //     esServicio: true,
  //     precioServicio: 5,
  //     seVende: true,
  //     stock: 200,
  //     descripcion: "",
  //     unidadDeMedida: {
  //       connect: {
  //         id: unidades[0].id,
  //       },
  //     },
  //     Caracteristicas: {
  //       create: [
  //         {
  //           nombre: "color",
  //           valor: "blanco",
  //         },
  //         {
  //           nombre: "material",
  //           valor: "plástico",
  //         },
  //         {
  //           nombre: "pesoMaximoSoportado",
  //           valor: "180 Kg",
  //         },
  //         {
  //           nombre: "marca",
  //           valor: "Rey",
  //         },
  //       ],
  //     },
  //   },
  // ];

  // const productos = await prisma.productos.create({
  //   data: productosInput,
  // });
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
