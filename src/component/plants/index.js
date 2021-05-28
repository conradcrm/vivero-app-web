import React, { useState } from "react";
import PlantItem from "./item";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import ModalMessage from "../modal";
import { useMutation } from "../../hooks/mutation";
import Inputs from "../data/inputs";

export default function Plants({ data }) {
  const [selectedPlant, setSelectedPlant] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const { datos, method, query } = Inputs("plant", "delete", selectedPlant);
  const [, fetchData] = useMutation(query, "Plant")
  const [open, setOpen] = useState(false);
  const [isActivate, setisActivate] = useState(false);
  
  const onCloseModal = () => setOpen(false);
  async function update() {
    await fetchData(method, datos, setIsLoading);
    onCloseModal()
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
    <div className="w-full bg-white rounded-lg p-8">
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
      <Modal open={open} onClose={onCloseModal} center>
        {selectedPlant !== undefined &&
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