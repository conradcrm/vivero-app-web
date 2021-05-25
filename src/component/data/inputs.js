export default function Inputs(module, mode, selectedItem) {
  const url = "http://127.0.0.1:8000/";
  let endpoint = undefined;
  let datos = undefined;
  let method = undefined;

  switch (module) {
    case "plant":
      if (mode === "create") {
        endpoint = "api/create-plant";
        method="POST"
        datos = {
          nombre: "",
          descripcion: "",
          precio_venta: "",
          precio_compra: "",
          imagen: "",
          cantidad: "",
          id_categoria: undefined,
          id_proveedor: undefined,
        };
      }
      if (mode == "edit") {
        endpoint = "api/update-plant/"+selectedItem.id_planta;
        method="PATCH"
        datos = {
          nombre: selectedItem.nombre,
          descripcion: selectedItem.descripcion,
          imagen: selectedItem.imagen,
          precio_venta: selectedItem.precio_venta,
          precio_compra: selectedItem.precio_compra,
          cantidad: selectedItem.cantidad,
          id_categoria: selectedItem.id_categoria,
          id_proveedor: selectedItem.id_proveedor,
        };
      }
      if (mode === "delete") {
        endpoint = "api/delete-plant/"+selectedItem.id_planta;
        method="PATCH"
        datos = {
          estado: 2,
        };
      }
      break;

    case "category":
      if (mode === "create") {
        endpoint = "api/create-category";
        method="POST"
        datos = {
          nombre: "",
          descripcion: "",
          imagen: "",
        };
      }
      if (mode === "edit") {
        endpoint = "api/update-category/"+selectedItem.id_categoria;
        method="PATCH"
        datos = {
          nombre: selectedItem.nombre,
          descripcion: selectedItem.descripcion,
          imagen: selectedItem.imagen
        };
      }
      if (mode === "delete") {
        endpoint = "api/delete-category/"+selectedItem.id_categoria;
        method="PATCH"
        datos = {
          estado: 2,
        };
      }
      break;

    case "provider":
      if (mode === "create") {
        endpoint = "api/create-provider";
        datos = {
          nombre: "",
          direccion: "",
          telefono: "",
          correo: "",
          imagen: "",
        };
      }
      if (mode === "edit") {
        endpoint = "api/update-category/"+selectedItem.id_proveedor;
        method="PATCH"
        datos = {
          nombre: selectedItem.nombre,
          direccion: selectedItem.direccion,
          telefono: selectedItem.telefono,
          correo: selectedItem.correo,
          imagen: selectedItem.imagen
        };
      }
      if (mode === "delete") {
        endpoint = "api/delete-provider/"+selectedItem.id_proveedor;
        method="PATCH"
        datos = {
          estado: 2,
        };
      }
      
      break;
    default:
      break;
  }

  let query = `${url}${endpoint}`;
  return { datos, method, query}
}
