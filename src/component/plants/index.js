import React, { useState } from "react";
import PlantItem from "./item";
import ModalChangeStatus from "../modal";
import { Modal } from 'react-responsive-modal';
import { useMutationStatusPlants } from "../../hooks/mutation/mutation";
import 'react-responsive-modal/styles.css';
import { usePlants } from "../../hooks/query";

export default function Plants({ data }) {
  const [selectedPlant, setSelectedPlant] = useState(data);
  const [open, setOpen] = useState(false);
  const [isActivate, setisActivate] = useState(false);
  const { mutate, isLoading } = useMutationStatusPlants(selectedPlant.id_planta, setOpen);
  const queryPlan = usePlants()
  function handleClick() {
    mutate();
  }

  let message = {
    title: "¿Está seguro de quieres dar de baja la planta?.",
    description: "Se darán de baja todas las plantas que pertenecen a la planta."
  }
  if (isActivate) {
    message = {
      title: "¿Activar planta?",
      description: ""
    }
  }

  return (
    <div className="w-full bg-white rounded-lg p-8 hidden-scroll">
      <div className="grid grid-cols-4 gap-3">
        {data.length > 0
          ? data.map((plant) => (
            <PlantItem
              onOpenModal={setOpen}
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
    </div>
  );
}