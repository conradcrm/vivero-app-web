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
          imagen: selectedItem.imagen,
          id_categoria:selectedItem.id_categoria,
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
      break;
    default:
      break;
  }

  let query = `${url}${endpoint}`;
  return { datos, method, query}
}
