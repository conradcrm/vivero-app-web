import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { notify } from "../../component/notification";
import { initAxiosInterceptors } from "../../helpers/helper-auth";

const globalURL = "https://vivero-app.herokuapp.com/api/";
// const globalURL = "http://127.0.0.1:8000/api/";
//General create item
export const createItem = async ({ data, endpoint }) => {
  initAxiosInterceptors();
  const url = `${globalURL}${endpoint}`;

  try {
    const { data: item } = await axios.post(url, data);
    return item;
  } catch (error) {
    notify('error', `Ha ocurrido un error, no se agregó el registro. ${error.response.data.message}`);
    return error;
  }
};

//GENERAL UPDATE STATUS
export const updateStatusItem = async ({ id, endpoint }) => {
  initAxiosInterceptors();
  const url = `${globalURL}${endpoint}/${id}`;
  try {
    const { data: item } = await axios.patch(url);
    return item;
  } catch (error) {
    notify('error', `Ha ocurrido un error, no se actualizó el registro. ${error.response.data.message}`);
    return error;
  }
};

//General delete item
export const deleteItem = async ({ id, endpoint }) => {
  initAxiosInterceptors();
  const url = `${globalURL}${endpoint}/${id}`;
  try {
    const { data: item } = await axios.delete(url);
    return item;
  } catch (error) {
    notify('error', `Ha ocurrido un error, no se eliminó el registro. ${error.response.data.message}`);
    return error;
  }
};

//General update item
export const updateItem = async ({ id, data, endpoint }) => {
  initAxiosInterceptors();
  const url = `${globalURL}${endpoint}/${id}`;
  try {
    const { data: item } = await axios.patch(url, data);
    return item;
  } catch (error) {
    notify('error', `Ha ocurrido un error, no se eliminó el registro. ${error.response.data.message}`);
    return error;
  }
};

/******
 * CATEGORY
**/

export function useCreateCategory(data) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createItem, {
    variables: {
      endpoint: "create-category",
      data: data
    },
    onSuccess: (response) => {
      if (response.status === "success") {
        const noData = queryClient.setQueryData('CATEGORIES', function (oldData) {
          if (oldData !== undefined) {
            const position = oldData.data.length;
            oldData.data.splice(position, 0, response.data)
            return oldData;
          }
        });
        if (noData === undefined) {
          queryClient.invalidateQueries('CATEGORIES');
        }
      }
      queryClient.invalidateQueries('STATISTICS');
      notify(response.status, response.message)
    },
    onerror: (response) => {
      notify(response.status, response.message)
    }
  });
  return { mutate, isLoading }
}

export function useUpdateCategory(id_categoria, data) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(updateItem, {
    variables: {
      id: id_categoria,
      endpoint: "update-category",
      data: data
    },
    onSuccess: (response) => {
      let data = response.data;
      const noData = queryClient.setQueryData('CATEGORIES', function (oldData) {
        if (oldData !== undefined) {
          for (let index = 0; index < oldData.data.length; index++) {
            if (oldData.data[index].id_categoria === data.id_categoria) {
              oldData.data.splice(index, 1)
              oldData.data.splice(index, 0, response.data)
              break;
            }
          }
        }
        return oldData;
      });

      if (noData === undefined) {
        queryClient.invalidateQueries('CATEGORIES');
      }
      queryClient.invalidateQueries('STATISTICS');
      notify(response.status, response.message)
    },
    onerror: (response) => {
      notify(response.status, response.message)
    }
  });
  return { mutate, isLoading }
}

export function useMutationStatusCategories(id_categoria, setOpen) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(updateItem, {
    variables: {
      id: id_categoria,
      endpoint: "status-category",
      data: []
    },
    onSuccess: (response) => {
      let data = response.data;
      queryClient.setQueryData('CATEGORIES', function (oldData) {
        for (let index = 0; index < oldData.data.length; index++) {
          if (oldData.data[index].id_categoria === data.id_categoria) {
            oldData.data.splice(index, 1)
            oldData.data.splice(index, 0, response.data)
            break;
          }
        }
        return oldData;
      });
      queryClient.invalidateQueries('STATISTICS');
      notify(response.status, response.message)
      setOpen(false);
    },
    onerror: (response) => {
      notify(response.status, response.message)
      setOpen(false);
    }
  });
  return { mutate, isLoading }
}

export function useDeleteCategories(id_categoria, setOpen, page) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(updateItem, {
    variables: {
      id: id_categoria,
      endpoint: "delete-category",
      data: []
    },
    onSuccess: (response) => {
      let data = response.data;
      queryClient.setQueryData('CATEGORIES', function (oldData) {
        for (let index = 0; index < oldData.data.length; index++) {
          if (oldData.data[index].id_categoria === data.id_categoria) {
            oldData.data.splice(index, 1)
            break;
          }
        }
        return oldData;
      });
      queryClient.invalidateQueries('STATISTICS');
      notify(response.status, response.message)
      setOpen(false);
    },
    onerror: (response) => {
      notify(response.status, response.message)
      setOpen(false);
    }
  });
  return { mutate, isLoading }
}


/******
 * PLANT
**/

export function useCreatePLant(data, isCompletedPage, page) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createItem, {
    variables: {
      endpoint: "create-plant",
      data: data
    },
    onSuccess: (response) => {
      if (isCompletedPage) {
        queryClient.invalidateQueries(`PLANTS-PAGE/${1}`);
      }
      else {
        const noData = queryClient.setQueryData(`PLANTS-PAGE/${page}`, function (oldData) {
          if (oldData !== undefined) {
            const position = oldData.data.data.length;
            oldData.data.data.splice(position, 0, response.data)
            return oldData;
          }
        });
        if (noData === undefined) {
          queryClient.invalidateQueries(`PLANTS-PAGE/${page}`);
        }
      }
      queryClient.invalidateQueries('STATISTICS');
      notify(response.status, response.message)
    },
    onerror: (response) => {
      notify(response.status, response.message)
    }
  });
  return { mutate, isLoading }
}

export function useUpdatePlant(id_planta, data, page) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(updateItem, {
    variables: {
      id: id_planta,
      endpoint: "update-plant",
      data: data
    },
    onSuccess: (response) => {
      let data = response.data;
      const noData = queryClient.setQueryData(`PLANTS-PAGE/${page}`, function (oldData) {
        if (oldData !== undefined) {
          for (let index = 0; index < oldData.data.data.length; index++) {
            if (oldData.data.data[index].id_planta === data.id_planta) {
              oldData.data.data.splice(index, 1)
              oldData.data.data.splice(index, 0, response.data)
              break;
            }
          }
        }
        return oldData;
      });

      if (noData === undefined) {
        queryClient.invalidateQueries(`PLANTS-PAGE/${page}`);
      }
      queryClient.invalidateQueries('STATISTICS');
      notify(response.status, response.message)
    },
    onerror: (response) => {
      notify(response.status, response.message)
    }
  });
  return { mutate, isLoading }
}

export function useMutationStatusPlants(id_planta, setOpen, page) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(updateStatusItem, {
    variables: {
      id: id_planta,
      endpoint: "status-plant"
    },
    onSuccess: (response) => {
      queryClient.setQueryData(`PLANTS-PAGE/${page}`, function (oldData) {
        for (let index = 0; index < oldData.data.data.length; index++) {
          if (oldData.data.data[index].id_planta === response.data.id_planta) {
            oldData.data.data.splice(index, 1)
            oldData.data.data.splice(index, 0, response.data)
            break;
          }
        }
        return oldData;
      });
      notify(response.status, response.message)
      setOpen(false);
    },
    onerror: (response) => {
      notify(response.status, response.message)
      setOpen(false);
    }
  });
  return { mutate, isLoading }
}

export function useDeletePlants(id_planta, setOpen, pages) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(updateItem, {
    variables: {
      id: id_planta,
      endpoint: "delete-plant",
      data: []
    },
    onSuccess: (response) => {
      let page = pages.current_page;
      if (pages.data.length === 1) {
        queryClient.invalidateQueries(`PLANTS-PAGE/${1}`);
        queryClient.invalidateQueries(`PLANTS-PAGE/${page}`);
      }
      else {
        let data = response.data;
        queryClient.setQueryData(`PLANTS-PAGE/${page}`, function (oldData) {
          for (let index = 0; index < oldData.data.data.length; index++) {
            if (oldData.data.data[index].id_planta === data.id_planta) {
              oldData.data.data.splice(index, 1)
              break;
            }
          }
          return oldData;
        });
      }
      queryClient.invalidateQueries('STATISTICS');
      notify(response.status, response.message)
      setOpen(false);
    },
    onerror: (response) => {
      notify(response.status, response.message)
      setOpen(false);
    }
  });
  return { mutate, isLoading }
}


/******
 * PROVIDER
**/

export function useCreateProvider(data) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createItem, {
    variables: {
      endpoint: "create-provider",
      data: data
    },
    onSuccess: (response) => {
      let noData = queryClient.setQueryData('PROVIDERS', function (oldData) {
        if (oldData !== undefined) {
          const position = oldData.data.length;
          oldData.data.splice(position, 0, response.data)
          return oldData;
        }
      });

      if (noData === undefined) {
        queryClient.invalidateQueries('PROVIDERS');
      }
      queryClient.invalidateQueries('STATISTICS');
      notify(response.status, response.message)
    },
    onerror: (response) => {
      notify(response.status, response.message)
    }
  });
  return { mutate, isLoading }
}

export function useUpdateProvier(id, data) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(updateItem, {
    variables: {
      id: id,
      endpoint: "update-provider",
      data: data
    },
    onSuccess: (response) => {
      let data = response.data;
      const noData = queryClient.setQueryData('PROVIDERS', function (oldData) {
        if (oldData !== undefined) {
          for (let index = 0; index < oldData.data.length; index++) {
            if (oldData.data[index].id_proveedor === data.id_proveedor) {
              oldData.data.splice(index, 1)
              oldData.data.splice(index, 0, response.data)
              break;
            }
          }
        }
        return oldData;
      });

      if (noData === undefined) {
        queryClient.invalidateQueries('PROVIDERS');
      }
      queryClient.invalidateQueries('STATISTICS');
      notify(response.status, response.message)
    },
    onerror: (response) => {
      notify(response.status, response.message)
    }
  });
  return { mutate, isLoading }
}

export function useMutationStatusProvider(id_proveedor, setOpen) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(updateStatusItem, {
    variables: {
      id: id_proveedor,
      endpoint: "status-provider"
    },
    onSuccess: (response) => {

      let data = response.data;
      const noData = queryClient.setQueryData('PROVIDERS', function (oldData) {
        for (let index = 0; index < oldData.data.length; index++) {
          if (oldData.data[index].id_proveedor === data.id_proveedor) {
            oldData.data.splice(index, 1)
            oldData.data.splice(index, 0, response.data)
            break;
          }
        }
        return oldData;
      });
      if (noData === undefined) {
        queryClient.invalidateQueries('PROVIDERS');
      }
      queryClient.invalidateQueries('STATISTICS');
      notify(response.status, response.message)
      setOpen(false);
    },
    onerror: (response) => {
      notify(response.status, response.message)
      setOpen(false);
    }
  });
  return { mutate, isLoading }
}

export function useDeleteProvider(id_proveedor, setOpen) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(updateItem, {
    variables: {
      id: id_proveedor,
      endpoint: "delete-provider",
      data: []
    },
    onSuccess: (response) => {
      let data = response.data;
      queryClient.setQueryData('PROVIDERS', function (oldData) {
        for (let index = 0; index < oldData.data.length; index++) {
          if (oldData.data[index].id_proveedor === data.id_proveedor) {
            oldData.data.splice(index, 1)
            break;
          }
        }
        return oldData;
      });
      queryClient.invalidateQueries('STATISTICS');
      notify(response.status, response.message)
      setOpen(false);
    },
    onerror: (response) => {
      notify(response.status, response.message)
      setOpen(false);
    }
  });
  return { mutate, isLoading }
}


/******
 * SHOPPING
**/

export function useCreateShopping(data, isCompletedPage, page, last) {
  
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createItem, {
    variables: {
      endpoint: "create-shopping",
      data: data
    },
    onSuccess: (response) => {
      if (isCompletedPage) {
        queryClient.invalidateQueries(`SHOPPING-PAGE/${last}`);
        queryClient.invalidateQueries(`SHOPPING-PAGE/${page}`);
      }
      else {
        const noData = queryClient.setQueryData(`SHOPPING-PAGE/${last}`, function (oldData) {
          if (oldData !== undefined) {
            const position = oldData.data.data.length;
            oldData.data.data.splice(position, 0, response.data)
            return oldData;
          }
        });
        if (noData === undefined) {
          queryClient.invalidateQueries(`SHOPPING-PAGE/${last}`);
        }
      }
      queryClient.invalidateQueries('STATISTICS');
      notify(response.status, response.message)
    },
    onerror: (response) => {
      notify(response.status, response.message)
    }
  });
  return { mutate, isLoading }
}

export function useMutationStatusShopping(folio_compra, data, setOpen, page) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(updateItem, {
    variables: {
      id: folio_compra,
      data: data,
      endpoint: "status-shopping",
    },
    onSuccess: (response) => {
      queryClient.setQueryData(`SHOPPING-PAGE/${page}`, function (oldData) {
        for (let index = 0; index < oldData.data.data.length; index++) {
          if (oldData.data.data[index].folio_compra === response.data.folio_compra) {
            oldData.data.data[index].estado = response.data.estado;
            break;
          }
        }
        return oldData;
      });
      queryClient.invalidateQueries('STATISTICS');
      notify(response.status, response.message)
      setOpen(false);
    },
    onerror: (response) => {
      notify(response.status, response.message)
      setOpen(false);
    }
  });
  return { mutate, isLoading }
}


export function useDeleteShoppin(folio_compra, setOpen, pages) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(updateItem, {
    variables: {
      id: folio_compra,
      endpoint: "delete-shopping",
      data: []
    },
    onSuccess: (response) => {
      let page = pages.current_page;
      if (pages.data.length === 1) {
        queryClient.invalidateQueries(`SHOPPING-PAGE/${1}`);
        queryClient.invalidateQueries(`SHOPPING-PAGE/${page}`);
      }
      else {
        let data = response.data;
        const noData = queryClient.setQueryData(`SHOPPING-PAGE/${page}`, function (oldData) {
          for (let index = 0; index < oldData.data.data.length; index++) {
            if (oldData.data.data[index].folio_compra === data.folio_compra) {
              oldData.data.data.splice(index, 1)
              break;
            }
          }
          return oldData;
        });

        if (noData === undefined) {
          queryClient.invalidateQueries(`SHOPPING-PAGE/${page}`);
        }
      }
      queryClient.invalidateQueries('STATISTICS');
      notify(response.status, response.message)
      setOpen(false);
    },
    onerror: (response) => {
      notify(response.status, response.message)
      setOpen(false);
    }
  });
  return { mutate, isLoading }
}

