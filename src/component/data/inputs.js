export default function Inputs(module, mode) {
    const url = "http://127.0.0.1:8000/";
    let endpoint = "";
    let data= undefined;
    switch (module) {
      case "plat":
        if (mode === "create") {
          endpoint = "/api/create-plant";
          data = {
            nombre: "",
            descripcion: "",
            precio_v: "",
            precio_c: "",
            imagen: "",
            id_categoria: undefined,
          };
        } 
        break;
  
      case "cateogry":
        if (mode === "CREATE") {
          endpoint = "/api/create-category";
          data = {
              nombre: "",
              imagen: "",
          };
        }
        break;
  
      case "provider":
          if (mode === "CREATE") {
            endpoint = "/api/create-provider";
            data = {
                nombre: "",
                imagen: "",
            };
          }
          break;
      default:
        break;
    }
    
    let query = `${url}${endpoint}`;
    return {data,query}
  }
  