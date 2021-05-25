import React, { useState } from "react";
import ItemProvider from "./rows";
import { Modal } from 'react-responsive-modal';
import Inputs from "../data/inputs";
import { useMutation } from "../../hooks/mutation";
import ModalMessage from "../modal";

export default function ProviderList({ data }) {
  const [selectedProvider, setSelectedProvider] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const { datos, method, query } = Inputs("provider", "delete", selectedProvider);
  const [, fetchData] = useMutation(query, "Provider")
  const [open, setOpen] = useState(false);
  const [isActivate, setisActivate] = useState(false);

  const onCloseModal = () => setOpen(false);
  async function update() {
    await fetchData(method, datos, setIsLoading);
    onCloseModal()
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
  console.log(method)

  return (
    <div className="bg-white h-5/6 w-full flex justify-center">
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
        <div className="h-screen bg-ligth_gray text-sm">
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
      <Modal open={open} onClose={onCloseModal} center>
        {selectedProvider !== undefined &&
          <ModalMessage
            title={message.title}
            message={message.description}
            onClose={onCloseModal}
            update={update}
            isActivate={!isActivate}
            isLoading={isLoading}
          />
        }
      </Modal>
    </div>
  );
}
