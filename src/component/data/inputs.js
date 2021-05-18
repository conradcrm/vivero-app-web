export default function Inputs(module, mode) {
    const url = "http://127.0.0.1:8000";
    let endpoint = "";
    let datos= undefined;
    switch (module) {
      case "plant":
        if (mode === "create") {
          endpoint = "/api/create-plant";
          datos = {
            nombre: "",
            descripcion: "",
            precio_venta: "",
            precio_compra: "",
            imagen: "",
            existencia: "",
            id_categoria: undefined,
            id_proveedor: undefined,
          };
        } 
        break;
  
      case "category":
        if (mode === "create") {
          endpoint = "/api/create-category";
          datos = {
              nombre: "",
              descripcion: "",
              imagen: "",
          };
        }
        break;
  
      case "provider":
          if (mode === "create") {
            endpoint = "/api/create-provider";
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
    return {datos,query}
  }
  