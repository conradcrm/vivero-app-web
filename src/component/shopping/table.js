import React, { useState } from "react";
import ItemShopping from "./rows";
import ModalChangeStatus from "../modal";
import { Modal } from 'react-responsive-modal';
import { useDeleteProvider, useMutationStatusShopping } from "../../hooks/mutation/mutation";
import { useShopping } from "../../hooks/query";
import ModalDelete from "../modal/delete";

export default function ProviderList({ data }) {
  const [selectedShopping, setSelectedShopping] = useState(data);
  const [state, setState] = useState({status:""})
  const [openDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [isActivate, setisActivate] = useState(false);
  const { mutate, isLoading } = useMutationStatusShopping(selectedShopping.folio_compra, state,setOpen);
  const deleteProvider = useDeleteProvider(selectedShopping.id_proveedor, setOpenDelete);
  const queryProv = useShopping()
  function handleClick() {
    mutate();
    console.log("state",state) 
  }
  
  function handleClickDelete(){
    deleteProvider.mutate();
    console.log("state",selectedShopping)
  }

  let message = {
    title: "¿Desea continuar?",
    description: "El estado de la compra cambiará."
  }
  
  let messageD = {
    title: "¿Está seguro de quieres eliminar el registro de compra?",
    description: "Esta acción no se puede deshacer. Los datos no se podrán recuperar."
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
            data.map((shopping) =>
              <ItemShopping
                onOpenModal={setOpen}
                onOpenDeleteModal = {setOpenDelete}
                setSelected={() => setSelectedShopping(shopping)}
                statusShop = {setState}
                isActivate={isActivate}
                setisActivate={setisActivate}
                {...shopping}
                key={shopping.folio_compra} />)
          }
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} center>
        {selectedShopping !== undefined &&
          <ModalChangeStatus
            title={message.title}
            message={message.description}
            cancel={() => setOpen(false)}
            action={() => handleClick()}
            isActivate={isActivate}
            isLoading={isLoading}
          />
        }
      </Modal>
      <Modal open={openDelete} onClose={() => setOpenDelete(false)} center>
        {selectedShopping !== undefined &&
          <ModalDelete
            title={messageD.title}
            message={messageD.description}
            cancel={() => setOpenDelete(false)}
            action={() => handleClickDelete()}
            isLoading={deleteProvider.isLoading}
          />
        }
      </Modal>
    </div>
  );
}