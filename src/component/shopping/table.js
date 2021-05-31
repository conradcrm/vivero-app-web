import React, { useState } from "react";
import { Modal } from 'react-responsive-modal';
import ModalChangeStatus from "../modal";
import { useMutation } from "react-query";
import { updateStatusItem } from "../../hooks/mutation/mutation";
import { notify } from "../notification";

export default function ShoppingList({ data }) {
  const [selectedProvider, setSelectedProvider] = useState(data);
  const [open, setOpen] = useState(false);
  const [isActivate, setisActivate] = useState(false);

  const { mutate, isLoading } = useMutation(updateStatusItem,{
    variables: {
      id: selectedProvider.id_proveedor,
      endpoint: "status-provider"
    },
     onSuccess: (data)=>{
       notify(data.status, data.message)
       setOpen(false);
     },
     onerror: (data)=>{
      notify(data.status, data.message)
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
    <div className="bg-white h-5/6 w-full flex justify-center">
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
