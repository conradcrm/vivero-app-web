import React, { useState } from "react";
import ItemShopping from "./rows";
import ModalChangeStatus from "../modal";
import { Modal } from 'react-responsive-modal';
import { useDeleteShoppin, useMutationStatusShopping } from "../../hooks/mutation/mutation";
import ModalDelete from "../modal/delete";
import DetailsShopping from "../views/shopping";

export default function ShoppingList({ data }) {
  const [selectedShopping, setSelectedShopping] = useState(data);
  const [state, setState] = useState({ status: "" })
  const [openDelete, setOpenDelete] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [open, setOpen] = useState(false);
  const [isActivate, setisActivate] = useState(false);
  const { mutate, isLoading } = useMutationStatusShopping(selectedShopping.folio_compra, state, setOpen);
  const deleteShopping = useDeleteShoppin(selectedShopping.folio_compra, setOpenDelete);

  function handleClick() {
    mutate();
  }

  function handleClickDelete() {
    deleteShopping.mutate();
  }

  let message = {
    title: "¿Desea continuar?",
    description: `El estado de la compra cambiará a ${state.status ? state.status : ""}.`
  }
  console.log(state)
  let messageD = {
    title: "¿Está seguro de quieres eliminar el registro de compra?",
    description: "Esta acción no se puede deshacer. Los datos no se podrán recuperar."
  }

  return (
    <div className="bg-white flex justify-center">
      <div className="bg-gray w-full rounded-md">
        <div className="grid grid-cols-12 text-sm font-semibold items-center">
          <div className="col-span-10 h-14 grid grid-cols-12 mx-4 text-sm items-center">
            <p className="col-span-1">Folio</p>
            <p className="col-span-4">Proveedor</p>
            <p className="col-span-2">Fecha</p>
            <p className="col-span-2">Total</p>
            <p className="col-span-2">Estado</p>
          </div>
          <div className="col-span-2 flex justify-center -ml-12">Acciones</div>
        </div>
        <div className=" bg-ligth_gray text-sm">
          {
            data.map((shopping) =>
              <ItemShopping
                onOpenModal={setOpen}
                onOpenDeleteModal={setOpenDelete}
                onOpenView = {setOpenView}
                setSelected={() => setSelectedShopping(shopping)}
                statusShop={setState}
                state ={state} 
                isActivate={isActivate}
                setisActivate={setisActivate}
                {...shopping}
                key={shopping.folio_compra} />)
          }
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} center>
        {selectedShopping !== undefined &&
          <ModalChangeStatus
            title={message.title}
            message={message.description}
            cancel={() => { setOpen(false); setState("Pendiente") }}
            action={() => handleClick()}
            isActivate={true}
            isLoading={isLoading}
          />
        }
      </Modal>
      <Modal open={openDelete} onClose={() => setOpenDelete(false)} center>
        {selectedShopping !== undefined &&
          <ModalDelete
            title={messageD.title}
            message={messageD.description}
            cancel={() => setOpenDelete(false)}
            action={() => handleClickDelete()}
            isLoading={deleteShopping.isLoading}
          />
        }
      </Modal>
      <Modal open={openView} onClose={() => setOpenView(false)} center>
        {selectedShopping !== undefined &&
          <DetailsShopping shopping={selectedShopping}/>
        }
      </Modal>
    </div>
  );
}