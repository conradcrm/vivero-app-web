import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Modal from "react-responsive-modal";
import ModalMessageBack from "../../modal/goBack";

export default function ButtonGoBack({goBack}) {
  const [open, setOpen] = useState(false);
  const onCloseModal = () => setOpen(false);
  const onOpenModal = () => setOpen(true);
  return (
    <>
    <button
      onClick={onOpenModal}
      className="focus:outline-none border-0 flex self-center ml-8 rounded text-lg hover:underline"
    >
      <IoIosArrowBack className="self-center mr-1" />
      <p>Regresar</p>
    </button>
    <Modal open={open} onClose={onCloseModal} center>
          <ModalMessageBack
            title="¿Está seguro de regresar?"
            message="Se perderán los datos realizados en el formulario."
            onClose={onCloseModal}
            action={goBack}
          />
      </Modal>
    </>
  );
}
