import React, { useState } from "react";
import PlantItem from "./item";
import ModalChangeStatus from "../modal";
import { useMutation, useQueryClient } from "react-query";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { notify } from "../notification";
import { updateStatusItem } from "../../hooks/mutation/mutation";

export default function Plants({ data }) {
  const [selectedPlant, setSelectedPlant] = useState(data);
  const [open, setOpen] = useState(false);
  const [isActivate, setisActivate] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updateStatusItem, {
    variables: {
      id: selectedPlant.id_planta,
      endpoint: "status-plant"
    },
    onSuccess: (response) => {
      queryClient.setQueryData('PLANTS', function (oldData) {
        for (let index = 0; index < oldData.data.length; index++) {
          if (oldData.data[index].id_planta === response.data.id_planta) {
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
            action={() => mutate()}
            isActivate={isActivate}
            isLoading={isLoading}
          />
        }
      </Modal>
    </div>
  );
}