import React, { useState } from 'react'
import SubmitButton from '../../buttons/submit';
import ImageInput from '../../Input/Image'
import InputText from '../../Input/InputText';
import { useCreateCategory } from '../../../hooks/mutation/mutation';
import storage from "../../../firebase.js";
import { inputsValidate } from '../../validations';
import { notify } from '../../notification';

export default function CategoryForm() {
    const [, setChangeImage] = useState(false);
    const [previewImage, setPreviewImage] = useState();
    const [file, setFile] = useState();

    const [messageE,] = useState({
        description: "",
        names: "",
        image: "",
        result: false,
    })

    const [data, setData] = useState({
        descripcion: '',
        imagen: '',
        nombre: '',
    });

    const createCategory = useCreateCategory(data);

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
        inputsValidate([event.target.name], event.target.value, messageE);
    };

    function handleChangeFile(target) {
        setFile(target.files[0]);
    }

    function handleUpload() {
        let ref = storage.ref(`/images/${file.name}`);
        ref.put(file);
    }

    const send = (event) => {
        event.preventDefault();
        if (messageE.result) {
            createCategory.mutate()
        }
        else {
            notify("info", "La información ingresada no es válida.")
        }
    };

    return (
        <div className="flex w-full justify-center">
            <div className="h-full flex grid-cols-6 shadow-2xl">
                <div className=" bg-mediumgreen col-span-2 rounded-l-xl">
                    <h3 className="p-5 px-16 w-full text-center font-semibold text-2xl text-white">Módulo categoría</h3>
                    <ImageInput
                        value={previewImage}
                        onChange={({ target }) => {
                            handleChange({ target: { name: "imagen", value: target.files[0].name } });
                            handleChangeFile(target)
                            setChangeImage(true);
                            setPreviewImage(URL.createObjectURL(target.files[0]));
                        }}
                    />
                    <div className="flex justify-end mb-6">
                        <span className="block text-mediumred text-sm font-medium pt-0.5">{messageE.image}</span>
                    </div>
                </div>
                <div className="col-span-4 bg-white rounded-r-xl">
                    <form className="m-auto my-10 mx-28" onSubmit={send}>
                        <div>
                            <InputText
                                width="21.5rem"
                                title="Nombre"
                                required={true}
                                name="nombre"
                                placeholder="Suculentas"
                                value={data.nombre}
                                onChange={handleChange}
                                type="text"
                                message={messageE.name}
                            />
                            <div style={{ marginTop: 22, marginBottom: 22 }}>
                                <label className="block mb-2 font-semibold">
                                    Decripción<span className={`ml-1 text-mediumred`}>*</span>
                                </label>
                                <textarea
                                    className="rounded border-icon_gray py-1 px-4 text-sm bg-gray w-full"
                                    rows="9"
                                    value={data.descripcion}
                                    onChange={handleChange}
                                    name="descripcion"
                                    placeholder="Las suculentas son plantas perfectas para decorrar por su elegante forma" />
                                <span className="block text-mediumred text-sm font-medium pt-0.5">{messageE.description}</span>
                            </div>
                        </div>
                        <SubmitButton
                            isLoading={createCategory.isLoading}
                            mode={"create"}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}
