import React, { useState } from "react";
import CategoryItem from "./item";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import ModalChangeStatus from "../modal";
import { updateStatusItem } from "../../hooks/mutation/mutation";
import { useMutation, useQueryClient } from "react-query";
import { notify } from "../notification";


export default function Categories({ data }) {
  const [selectedCategory, setSelectedCategory] = useState(data);
  const [open, setOpen] = useState(false);
  const [isActivate, setisActivate] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updateStatusItem, {
    variables: {
      id: selectedCategory.id_categoria,
      endpoint: "status-category"
    },
    onSuccess: (response) => {
      let data = response.data;
      queryClient.setQueryData('CATEGORIES', function (oldData) {
        for (let index = 0; index < oldData.data.length; index++) {
          if (oldData.data[index].id_categoria === data.id_categoria) {
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
    onerror: (response) => {
      notify(response.status, response.message)
      setOpen(false);
    }
  });

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
            action={() => mutate()}
            isActivate={isActivate}
            isLoading={isLoading}
          />
        }
      </Modal>
    </div>
  );
}