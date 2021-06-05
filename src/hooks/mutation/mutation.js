import { useMutation, useQueryClient } from "react-query";
import { notify } from "../../component/notification";

const globalQuery = "http://localhost:8000/api/";
const headers = {
  "content-type": "application/json",
  Accept: "application/json",
}

//General create item
export const createItem = async ({ data, endpoint }) => {
  const url = `${globalQuery}${endpoint}`;
  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });
  const resp = await response.json();
  return resp;
};

//GENERAL UPDATE STATUS
export const updateStatusItem = async ({ id, endpoint }) => {
  const url = `${globalQuery}${endpoint}/${id}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: headers,
  });
  const resp = await response.json();
  return resp;
};

//General delete item
export const deleteItem = async ({ id, endpoint }) => {
  const url = `${globalQuery}${endpoint}/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: headers,
  });
  const resp = await response.json();
  return resp;
};

//General update item
export const updateItem = async ({ id, data, endpoint }) => {
  const url = `${globalQuery}${endpoint}/${id}`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(data),
  });
  const resp = await response.json();
  return resp;
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

export function useDeleteCategories(id_categoria, setOpen) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(deleteItem, {
    variables: {
      id: id_categoria,
      endpoint: "delete-category"
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

export function useCreatePLant(data) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createItem, {
    variables: {
      endpoint: "create-plant",
      data: data
    },
    onSuccess: (response) => {
      const noData = queryClient.setQueryData('PLANTS', function (oldData) {
        if (oldData !== undefined) {
          const position = oldData.data.length;
          oldData.data.splice(position, 0, response.data)
          return oldData;
        }
      });
      if (noData === undefined) {
        queryClient.invalidateQueries('PLANTS');
      }
      notify(response.status, response.message)
    },
    onerror: (response) => {
      notify(response.status, response.message)
    }
  });
  return { mutate, isLoading }
}

export function useMutationStatusPlants(id_planta, setOpen) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(updateStatusItem, {
    variables: {
      id: id_planta,
      endpoint: "status-plant"
    },
    onSuccess: (response) => {
      queryClient.setQueryData('PLANTS', function (oldData) {
        for (let index = 0; index < oldData.data.length; index++) {
          if (oldData.data[index].id_planta === response.data.id_planta) {
            oldData.data.splice(index, 1)
            oldData.data.splice(index, 0, response.data)
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

export function useDeletePlants(id_planta, setOpen) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(deleteItem, {
    variables: {
      id: id_planta,
      endpoint: "delete-plant"
    },
    onSuccess: (response) => {
      let data = response.data;
      queryClient.setQueryData('PLANTS', function (oldData) {
        for (let index = 0; index < oldData.data.length; index++) {
          if (oldData.data[index].id_planta === data.id_planta) {
            oldData.data.splice(index, 1)
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
      queryClient.setQueryData('PROVIDERS', function (oldData) {
        for (let index = 0; index < oldData.data.length; index++) {
          if (oldData.data[index].id_proveedor === data.id_proveedor) {
            oldData.data.splice(index, 1)
            oldData.data.splice(index, 0, response.data)
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

export function useDeleteProvider(id_proveedor, setOpen) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(deleteItem, {
    variables: {
      id: id_proveedor,
      endpoint: "delete-provider"
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

export function useCreateShopping(data) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createItem, {
    variables: {
      endpoint: "create-shopping",
      data: data
    },
    onSuccess: (response) => {
      const noData = queryClient.setQueryData('SHOPPING', function (oldData) {
        if (oldData !== undefined) {
          const position = oldData.data.length;
          oldData.data.splice(position, 0, response.data)
          return oldData;
        }
      });
      if (noData === undefined) {
        queryClient.invalidateQueries('SHOPPING');
      }
      notify(response.status, response.message)
    },
    onerror: (response) => {
      notify(response.status, response.message)
    }
  });
  return { mutate, isLoading }
}

export function useMutationStatusShopping(folio_compra, data, setOpen) {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(updateItem, {
    variables: {
      id: folio_compra,
      data: data,
      endpoint: "status-shopping",
    },
    onSuccess: (response) => {
      let data = response.data;
      queryClient.setQueryData('SHOPPING', function (oldData) {
        for (let index = 0; index < oldData.data.length; index++) {
          if (oldData.data[index].folio_compra === data.folio_compra) {
            oldData.data.splice(index, 1)
            oldData.data.splice(index, 0, response.data)
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
