import React, { useState } from "react";
import ItemProvider from "./rows";
import ModalChangeStatus from "../modal";
import { Modal } from 'react-responsive-modal';
import ModalDelete from "../modal/delete";
import { useDeleteProvider, useMutationStatusProvider } from "../../hooks/mutation/mutation";

export default function ProviderList({ data }) {
  const [selectedProvider, setSelectedProvider] = useState(data);
  const [openDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [isActivate, setisActivate] = useState(false);
  const { mutate, isLoading } = useMutationStatusProvider(selectedProvider.id_proveedor, setOpen);
  const deleteProvider = useDeleteProvider(selectedProvider.id_proveedor, setOpenDelete);

  function handleClick() {
    mutate();
  }

  function handleClickDelete(){
    deleteProvider.mutate();
  }

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
  
  let messageD = {
    title: "¿Está seguro de quieres eliminar al proveedor?",
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
            data.map((provider) =>
              <ItemProvider
                onOpenModal={setOpen}
                onOpenDeleteModal = {setOpenDelete}
                setSelected={() => setSelectedProvider(provider)}
                isActivate={isActivate}
                setisActivate={setisActivate}
                {...provider}
                key={provider.id_proveedor} />)
          }
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} center>
        {selectedProvider !== undefined &&
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
        {selectedProvider !== undefined &&
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
