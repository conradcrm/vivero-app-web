import React, { useState } from "react";
import ItemShopping from "./rows";
import { Modal } from 'react-responsive-modal';
import ModalChangeStatus from "../modal";
import { useMutation } from "react-query";
import { updateStatusItem } from "../../hooks/mutation/mutation";
import { notify } from "../notification";

export default function ShoppingList({ data }) {
  const [selectedShopping, setSelectedShopping] = useState(data);
  const [open, setOpen] = useState(false);
  const [isActivate, setisActivate] = useState(false);

  const { mutate, isLoading } = useMutation(updateStatusItem,{
    variables: {
      id: selectedShopping.folio_compra,
      endpoint: "status-shopping"
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
    title: "¿Está seguro de quieres dar de baja el registro de compra?",
    description: ""
  }
  if (isActivate) {
    message = {
      title: "¿Activar el registro de compra?",
      description: ""
    }
  }

  return (
    <div className="bg-white">
      <div className="bg-gray w-full rounded-md">
        <div className="grid grid-cols-11 text-sm font-semibold">
          <div className="col-span-9 grid grid-cols-11 mx-4 text-sm">
            <p className="col-span-1 py-3">Folio</p>
            <p className="col-span-3 py-3">Proveedor</p>
            <p className="col-span-4 py-3">Plantas</p>
            <p className="col-span-1 py-3">Estado</p>
          </div>
          <div className="col-span-2 py-3 ml-20">Acciones</div>
        </div>
        <div className=" bg-ligth_gray text-sm">
          {
            data.map((shopping) =>
              <ItemShopping
                onOpenModal={setOpen}
                setSelected={() => setSelectedShopping(shopping)}
                isActivate={isActivate}
                setisActivate={setisActivate}
                {...shopping}
                key={shopping.folio_compra} />)
          }
        </div>
      </div>
      <Modal open={open} onClose={()=>setOpen(false)} center>
        {selectedShopping !== undefined &&
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
