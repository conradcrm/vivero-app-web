export default function Inputs(module, mode, selectedItem) {
  const url = "http://127.0.0.1:8000/";
  let endpoint = undefined;
  let datos = undefined;
  let method = undefined;
console.log(module, mode)
  switch (module) {
    case "plant":
      if (mode === "create") {
        endpoint = "api/create-plant";
        method = "POST"
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
      if (mode === "edit") {
        endpoint = "api/update-plant/" + selectedItem.id_planta;
        method = "PATCH"
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
        endpoint = "api/status-plant/" + selectedItem.id_planta;
        method = "PATCH"
        datos = {
          estado: 2,
        };
      }
      break;

    case "category":
      if (mode === "create") {
        endpoint = "api/create-category";
        method = "POST"
        datos = {
          nombre: "",
          descripcion: "",
          imagen: "",
        };
      }
      if (mode === "edit") {
        endpoint = "api/update-category/" + selectedItem.id_categoria;
        method = "PATCH"
        datos = {
          nombre: selectedItem.nombre,
          descripcion: selectedItem.descripcion,
          imagen: selectedItem.imagen
        };
      }
      if (mode === "delete") {
        endpoint = "api/status-category/" + selectedItem.id_categoria;
        method = "PATCH"
        datos = {
          estado: 2,
        };
      }
      break;

    case "provider":
      if (mode === "create") {
        endpoint = "api/create-provider";
        method = "POST"
        datos = {
          nombre: "",
          direccion: "",
          telefono: "",
          correo: "",
          imagen: "",
        };
      }
      if (mode === "edit") {
        console.log(mode)
        endpoint = "api/update-provider/" + selectedItem.id_proveedor;
        method = "PATCH"
        datos = {
          nombre: selectedItem.nombre,
          direccion: selectedItem.direccion,
          telefono: selectedItem.telefono,
          correo: selectedItem.correo,
          imagen: selectedItem.imagen
        };
      }
      if (mode === "delete") {
        endpoint = "api/status-provider/" + selectedItem.id_proveedor;
        method = "PATCH"
        datos = {
          estado: 2,
        };
      }
      break;

    case "shopping":
      if (mode === "create") {
        endpoint = "api/create-shopping";
        method = "POST"
        datos = {
          cantidad: "",
          id_planta: undefined,
          id_proveedor: undefined,
        };
      }
      if (mode === "edit") {
        endpoint = "api/update-shopping/" + selectedItem.folio_compra;
        method = "PATCH"
        datos = {
          cantidad: selectedItem.cantidad,
          id_planta: selectedItem.id_planta,
          id_proveedor: selectedItem.id_proveedor,
        };
      }
      if (mode === "delete") {
        endpoint = "api/status-plant/" + selectedItem.folio_compra;
        method = "PATCH"
        datos = {};
      }
      break;
    default:
      break;
  }

  let query = `${url}${endpoint}`;
  return {
    datos,
    method,
    query
  }
}