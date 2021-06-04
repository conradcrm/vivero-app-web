import React, { useState } from "react";
import ItemProvider from "./rows";
import { Modal } from 'react-responsive-modal';
import ModalChangeStatus from "../modal";
import { useMutation, useQueryClient } from "react-query";
import { updateStatusItem } from "../../hooks/mutation/mutation";
import { notify } from "../notification";

export default function ProviderList({ data }) {
  const [selectedProvider, setSelectedProvider] = useState(data);
  const [open, setOpen] = useState(false);
  const [isActivate, setisActivate] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updateStatusItem,{
    variables: {
      id: selectedProvider.id_proveedor,
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

  let message = {
    title: "¿Está seguro de quieres dar de baja al proveedor?",
    description: ""
  }
  if (isActivate) {
    message = {
      title: "¿Activar proveedor?",
      description: ""
    }
  }

  return (
    <div className="bg-white flex justify-center">
      <div className="bg-gray w-full rounded-md">
        <div className="grid grid-cols-11 text-sm font-semibold">
          <div className="col-span-9 grid grid-cols-11 mx-4 text-sm">
            <div className="col-span-7 grid grid-cols-2">
              <p className="py-3">Nombre</p>
              <p className="py-3 pl-4">Dirección</p>
            </div>
            <p className="col-span-2 py-3">Teléfono</p>
            <p className="col-span-2 py-3 pl-4">Estado</p>
          </div>
          <div className="col-span-2 py-3 ml-20">Acciones</div>
        </div>
        <div className=" bg-ligth_gray text-sm">
          {
            data.map((provider) =>
              <ItemProvider
                onOpenModal={setOpen}
                setSelected={() => setSelectedProvider(provider)}
                isActivate={isActivate}
                setisActivate={setisActivate}
                {...provider}
                key={provider.id_proveedor} />)
          }
        </div>
      </div>
      <Modal open={open} onClose={()=>setOpen(false)} center>
        {selectedProvider !== undefined &&
          <ModalChangeStatus
            title={message.title}
            message={message.description}
            cancel={() => setOpen(false)}
            action={() => mutate()}
            isActivate={isActivate}
            isLoading={isLoading}
          />
        }
      </Modal>
    </div>
  );
}
