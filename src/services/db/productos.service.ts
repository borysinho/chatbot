import client from "../../objects/prisma.object";

export const srvInsertarProducto = async (producto: any) => {
  const productoCreado = await client.productos.create({
    data: {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
    },
  });

  return productoCreado;
};

export const srvObtenerProductos = async () => {
  const productos = await client.productos.findMany();

  return productos;
};

export const srvObtenerProducto = async (producto_id: number) => {
  const producto = await client.productos.findUnique({
    where: {
      producto_id,
    },
  });

  return producto;
};

export const srvActualizarProducto = async (
  producto_id: number,
  producto: any
) => {
  const productoActualizado = await client.productos.update({
    where: {
      producto_id,
    },
    data: {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
    },
  });

  return productoActualizado;
};

export const srvEliminarProducto = async (producto_id: number) => {
  const productoEliminado = await client.productos.delete({
    where: {
      producto_id,
    },
  });

  return productoEliminado;
};
