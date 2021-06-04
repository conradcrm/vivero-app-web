import React, { useState } from "react";
import CategoryItem from "./item";
import ModalChangeStatus from "../modal";
import { Modal } from 'react-responsive-modal';
import { useMutationStatusCategories } from "../../hooks/mutation/mutation";
import 'react-responsive-modal/styles.css';

export default function Categories({ data }) {
  const [selectedCategory, setSelectedCategory] = useState(data);
  const [open, setOpen] = useState(false);
  const [isActivate, setisActivate] = useState(false);
  const { mutate, isLoading } = useMutationStatusCategories(selectedCategory.id_categoria, setOpen);
 
  function handleClick() {
    mutate();
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
      <Modal open={open} onClose={() => setOpen(false)} center>
        {selectedCategory !== undefined &&
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
    </div>
  );
}