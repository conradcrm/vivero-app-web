import React, { useState } from "react";
import Select from "react-dropdown-select";
import InputText from "../Input/InputText";
import {FiPlus} from 'react-icons/fi';

export default function DynamicInputs({data, isLoading}) {
  const [inputList, setInputList] = useState([{ id_planta: "", cantidad: "" }]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleSelectChange = (value, index) => {
    const list = [...inputList];
    list[index]['id_planta'] = value;
    setInputList(list);
  };
  console.log(data)

  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { id_planta: "", cantidad: "" }]);
  };

    return (
    <div className="" style={{width:'30rem'}}>
      {inputList.map((x, index) => {
        return (
            <div className="" style={{ marginTop: 22, marginBottom: 22 }}>
                <div className="grid grid-cols-7 gap-3">
                    <div className="col-span-4">
                    <label className="block mb-2 font-semibold">
                        Planta<span className={`ml-1 text-mediumred`}>*</span>
                    </label> 
                    <Select
                    name="id_planta"
                    multi={false}
                    placeholder="Selecionar Planta"
                    searchable={true}
                    color= "#000"
                    options={data}
                    labelField="nombre"
                    valueField="nombre"
                    disabled={isLoading} 
                    onChange={ value => handleSelectChange(value[0].id_planta, index)}
                    values={
                        data.filter((opt) => opt.nombre === data.nombre)
                    }
                    />
                </div>
                    <div className="col-span-1">
                    <InputText
                    width="6.5rem"
                    title="Cantidad"
                    required={true}
                    name="cantidad"
                    placeholder="0"
                    value={x.cantidad}
                    onChange={e => handleInputChange(e, index)}
                    type="number"
                    />
                </div>
                    {
                        inputList.length !== 1 && 
                        <div className="col-span-2 flex justify-end items-center">
                            <div
                            className=" cursor-pointer mt-6 text-sm bg-ligth_gray px-3 py-2 rounded-lg text-b_ligth_gray hover:text-black transition duration-150 ease-in-out transform hover:scale-105"
                                onClick={() => handleRemoveClick(index)}>
                                Quitar
                            </div>  
                        </div>  
                    }
                </div>
                 <div className="mt-8">
                    {
                    inputList.length - 1 === index && 
                        <div 
                            className="w-28 cursor-pointer text-sm flex justify-center rounded-lg bg-white border border-b_ligth_gray px-4 py-2 transition duration-150 ease-in-out transform hover:scale-105"
                            onClick={handleAddClick}>
                            <FiPlus className="mt-1 mr-1"/>
                            <span className="">Agregar</span>
                        </div>
                    }
                </div>
            </div>
        );
      })}
    </div>
    )
}