import React, { useState } from "react";
import CategoryItem from "./item";
import ModalChangeStatus from "../modal";
import { Modal } from 'react-responsive-modal';
import { useDeleteCategories, useMutationStatusCategories } from "../../hooks/mutation/mutation";
import ModalDelete from "../modal/delete";
import 'react-responsive-modal/styles.css';

export default function Categories({ data }) {
  const [selectedCategory, setSelectedCategory] = useState(data);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [isActivate, setisActivate] = useState(false);
  const { mutate, isLoading } = useMutationStatusCategories(selectedCategory.id_categoria, setOpen);
  const deleteCat = useDeleteCategories(selectedCategory.id_categoria, setOpenDelete);
  function handleClick() {
    mutate();
  }

  function handleClickDelete(){
    deleteCat.mutate();
  }

  let message = {
    title: "¿Está seguro de quieres dar de baja la categoría?",
    description: ""
  }
  if (isActivate) {
    message = {
      title: "¿Activar categoría?",
      description: "Esta acción no activará las plantas pertenecientes a la categoría."
    }
  }

  let messageD = {
    title: "¿Está seguro de quieres eliminar la categoría?",
    description: "Se eliminará la categoría t todas las plantas perteneciente a la misma. Esta acción no se puede deshacer. Los datos no se podrán recuperar."
  }

  return (
    <div className="w-full bg-white rounded-lg p-8">
      <div className="grid grid-cols-4 gap-3">
        {data.length > 0
          ? data.map((category) => (
            <CategoryItem
              onOpenModal={setOpen}
              onOpenDeleteModal = {setOpenDelete}
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
      <Modal open={openDelete} onClose={() => setOpenDelete(false)} center>
        {selectedCategory !== undefined &&
          <ModalDelete
            title={messageD.title}
            message={messageD.description}
            cancel={() => setOpenDelete(false)}
            action={() => handleClickDelete()}
            isLoading={deleteCat.isLoading}
          />
        }
      </Modal>
    </div>
  );
}