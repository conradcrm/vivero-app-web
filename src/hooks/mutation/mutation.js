import { useMutation, useQueryClient } from "react-query";
import { notify } from "../../component/notification";
const globalQuery = "http://localhost:8000/api/";
const headers = {
    "content-type": "application/json",
    Accept: "application/json",
}

export const updateStatusItem = async ({ id, endpoint }) => {
    const url = `${globalQuery}${endpoint}/${id}`;
    const response = await fetch(url, {
        method: "PATCH",
        headers: headers,
    });
    const resp = await response.json();
    return resp;
};

export const deleteItem = async ({ id, endpoint }) => {
  const url = `${globalQuery}${endpoint}/${id}`;
  const response = await fetch(url, {
      method: "DELETE",
      headers: headers,
  });
  const resp = await response.json();
  return resp;
};

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

export function useMutationStatusCategories(id_categoria, setOpen) {
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation(updateStatusItem, {
        variables: {
            id: id_categoria,
            endpoint: "status-category"
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

export function useMutationStatusProvider(id_proveedor, setOpen) {
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation(updateStatusItem,{
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
         onerror: (response)=>{
          notify(response.status, response.message)
          setOpen(false);
        }
      });
    return { mutate, isLoading }
}