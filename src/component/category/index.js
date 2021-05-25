import React, { useState } from "react";
import CategoryItem from "./item";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import ModalMessage from "../modal";
import { useMutation } from "../../hooks/mutation";
import Inputs from "../data/inputs";

export default function Categories({ data }) {
  const [selectedCategory, setSelectedCategory] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const { datos, method, query } = Inputs("category", "delete", selectedCategory);
  const [, fetchData] = useMutation(query, "Category")
  const [open, setOpen] = useState(false);
  const [isActivate, setisActivate] = useState(false);
  
  const onCloseModal = () => setOpen(false);
  async function update() {
    await fetchData(method, datos, setIsLoading);
    onCloseModal()
  }
  let message = {
    title: "¿Está seguro de quieres dar de baja la categoría?",
    description: "Se darán de baja todas las plantas que pertenecen a la categoría."
  }
  if (isActivate) {
    message = {
      title: "¿Activar categoría?",
      description: "Esta acción no activará las plantas pertenecientes a la categoría."
    }
  }

  return (
    <div className="w-full bg-white rounded-lg p-8">
      <div className="grid grid-cols-4 gap-3">
        {data.length > 0
          ? data.map((category) => (
            <CategoryItem
              onOpenModal={setOpen}
              setSelected={() => setSelectedCategory(category)}
              isActivate={isActivate}
              setisActivate={setisActivate}
              key={category.id_categoria}
              {...category}
            />
          ))
          : ""}
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        {selectedCategory !== undefined &&
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