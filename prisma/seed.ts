import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedUsers() {
  const unidadesDeMedida: Prisma.UnidadDeMedidaCreateInput[] = [
    { nombre: "Unidad", abreviatura: "u", descripcion: "Unidad individual" },
    {
      nombre: "Servicio",
      abreviatura: "srv",
      descripcion: "Servicio prestado",
    },
    {
      nombre: "Paquete",
      abreviatura: "paq",
      descripcion: "Paquete de productos o servicios",
    },
    { nombre: "Persona", abreviatura: "pax", descripcion: "Por persona" },
    { nombre: "Hora", abreviatura: "hr", descripcion: "Por hora" },
  ];

  const unidades = await prisma.unidadDeMedida.createMany({
    data: unidadesDeMedida,
  });

  const clienteInput: Prisma.ClienteCreateInput[] = [
    {
      nombre: "Borys",
      profileName: "Borys Quiroga",
      whatsappNumber: "59177685777",
    },
    {
      nombre: "Marcelo",
      profileName: "Marce",
      whatsappNumber: "59174613450",
    },
    {
      nombre: "Nicole",
      profileName: "Nicole",
      whatsappNumber: "59172151717",
    },
  ];

  const clientes = await prisma.cliente.createMany({ data: clienteInput });

  const productosInput: Prisma.ProductoCreateManyInput[] = [
    {
      nombre: "Bucket de Novia",
      descripcion: "Ramo de flores para la novia",
      precio: 300.0,
      stock: 2,
      caracteristicas: {
        color: ["blanco", "amarillo"],
        tipo: ["rosas", "lirios", "tulipanes", "margaritas"],
      },
      idUnidadDeMedida: 1,
    },
    {
      nombre: "Centro de Mesa",
      descripcion: "Decoración floral para mesas",
      precio: 200.0,
      stock: 50,
      caracteristicas: { tipo: "floral", color: "variado" },
      idUnidadDeMedida: 1,
    },
    {
      nombre: "Fotografía y Filmación",
      descripcion:
        "Servicio de fotografía profesional y filmación para eventos de boda",
      precio: 1000.0,
      stock: 2,
      caracteristicas: {
        horas: 8,
        fotos: "ilimitadas",
        edición: "incluida",
        retratos: 2,
      },
      idUnidadDeMedida: 2,
    },
    {
      nombre: "Sistema de sonido profesional",
      descripcion:
        "Sonido Profesional JBL EON 615 con Micrófonos Inalámbricos y Cableados",
      precio: 700.0,
      stock: 2,
      caracteristicas: { potencia: "alta", micrófonos: 2 },
      idUnidadDeMedida: 5,
    },
    {
      nombre: "Catering - Menu 1",
      descripcion:
        "Pollo a la crema con champiñones, lomo marinado al horno y postre",
      precio: 100.0,
      stock: 500,

      caracteristicas: {
        platos: "Pollo al Horno y Cerdo a la caja china",
        postres: "Torta de tres leches",
      },
      idUnidadDeMedida: 1,
    },
  ];

  const productos = await prisma.producto.createMany({ data: productosInput });

  const categoriasInput: Prisma.CategoriaCreateManyInput[] = [
    { nombre: "Ramos de Novia", descripcion: "Ramos de flores para la novia" },
    { nombre: "Centros de Mesa", descripcion: "Decoración floral para mesas" },
    {
      nombre: "Fotografía y Filmación",
      descripcion: "Servicio de fotografía profesional y filmación",
    },
    {
      nombre: "Sonido Profesional",
      descripcion: "Sistema de sonido profesional para eventos",
    },
    {
      nombre: "Catering",
      descripcion: "Servicio de catering para eventos",
    },
  ];

  const categorias = await prisma.categoria.createMany({
    data: categoriasInput,
  });

  const categoriaProductoInput: Prisma.Categoria_ProductoCreateManyInput[] = [
    { idCategoria: 1, idProducto: 1 },
    { idCategoria: 2, idProducto: 2 },
    { idCategoria: 3, idProducto: 3 },
    { idCategoria: 4, idProducto: 4 },
    { idCategoria: 5, idProducto: 5 },
  ];

  const categoriaProductos = await prisma.categoria_Producto.createMany({
    data: categoriaProductoInput,
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
