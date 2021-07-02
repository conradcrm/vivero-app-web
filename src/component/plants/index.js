import React, { useRef, useState } from "react";
import PlantItem from "./item";
import ModalChangeStatus from "../modal";
import { Modal } from 'react-responsive-modal';
import { useDeletePlants, useMutationStatusPlants } from "../../hooks/mutation/mutation";
import ModalDelete from "../modal/delete";
import Paginate from "../paginate";
import 'react-responsive-modal/styles.css';


export default function Plants({ data, setPage, page }) {
  const [selectedPlant, setSelectedPlant] = useState(data);
  const [openDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [isActivate, setisActivate] = useState(false);
  const { mutate, isLoading } = useMutationStatusPlants(selectedPlant.id_planta, setOpen, page);
  const deletePlant = useDeletePlants(selectedPlant.id_planta, setOpenDelete, data);
  const ref = useRef(null)
  let last_page = data.last_page;

  function handleClick() {
    mutate();
  }

  const handleClickDelete = (callback) => {
    deletePlant.mutate();
    if (data.data.length === 1) {
      callback();
      last_page= data.last_page-2
    }
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
    <div ref={ref} className="w-full rounded-lg py-8 hidden-scroll">
      <div className="grid grid-cols-4 gap-3">
        {data.data.length > 0
          ? data.data.map((plant) => (
            <PlantItem
              onOpenModal={setOpen}
              onOpenDeleteModal={setOpenDelete}
              setSelected={() => setSelectedPlant(plant)}
              isActivate={isActivate}
              setisActivate={setisActivate}
              key={plant.id_planta}
              page={page}
              {...plant}
            />
          ))
          : ""}
      </div>
      {
        data.last_page > 1 &&
        <div className="mt-8 mx-1">
          <Paginate last_page={last_page} current_page={page - 1} setPage={setPage} refe={ref} />
        </div>
      }
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
            action={() => handleClickDelete(() => setPage(page - 1))}
            isLoading={deletePlant.isLoading}
          />
        }
      </Modal>
    </div>
  );
}