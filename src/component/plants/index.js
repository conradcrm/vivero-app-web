import React, { useState } from "react";
import PlantItem from "./item";
import ModalChangeStatus from "../modal";
import { Modal } from 'react-responsive-modal';
import { useDeletePlants, useMutationStatusPlants } from "../../hooks/mutation/mutation";
import ModalDelete from "../modal/delete";
import 'react-responsive-modal/styles.css';

export default function Plants({ data }) {
  const [selectedPlant, setSelectedPlant] = useState(data);
  const [openDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [isActivate, setisActivate] = useState(false);
  const { mutate, isLoading } = useMutationStatusPlants(selectedPlant.id_planta, setOpen);
  const deletePlant = useDeletePlants(selectedPlant.id_planta, setOpenDelete);
   function handleClick() {
    mutate();
  }

  function handleClickDelete() {
    deletePlant.mutate();
  }

  let message = {
    title: "¿Está seguro de quieres dar de baja la planta?",
    description: ""
  }
  if (isActivate) {
    message = {
      title: "¿Activar planta?",
      description: ""
    }
  }

  let messageD = {
    title: "¿Está seguro de quieres eliminar la planta?",
    description: "Esta acción no se puede deshacer. Los datos no se podrán recuperar."
  }

  return (
    <div className="w-full bg-white rounded-lg p-8 hidden-scroll">
      <div className="grid grid-cols-4 gap-3">
        {data.length > 0
          ? data.map((plant) => (
            <PlantItem
              onOpenModal={setOpen}
              onOpenDeleteModal={setOpenDelete}
              setSelected={() => setSelectedPlant(plant)}
              isActivate={isActivate}
              setisActivate={setisActivate}
              key={plant.id_planta}
              {...plant}
            />
          ))
          : ""}
      </div>
      <div className="">

      </div>
      <Modal open={open} onClose={() => setOpen(false)} center>
        {selectedPlant !== undefined &&
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
        {selectedPlant !== undefined &&
          <ModalDelete
            title={messageD.title}
            message={messageD.description}
            cancel={() => setOpenDelete(false)}
            action={() => handleClickDelete()}
            isLoading={deletePlant.isLoading}
          />
        }
      </Modal>
    </div>
  );
}