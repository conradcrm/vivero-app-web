import React, { useState } from 'react'
import SubmitButton from '../../buttons/submit';
import ImageInput from '../../Input/Image'
import InputText from '../../Input/InputText';
import { useUpdateCategory } from '../../../hooks/mutation/mutation';
import { useItemId } from '../../../hooks/query/index';
import { useParams } from 'react-router';
import ServerError from '../../error/server';
import LoadingData from '../../loading/data';
import storage from "../../../firebase.js";

export default function CategoryEditForm() {
    const { id } = useParams();
    const [, setChangeImage] = useState(false);
    const [previewImage, setPreviewImage] = useState();
    const [file, setFile] = useState();
    const [data, setData] = useState(
        {
            descripcion: '',
            id_categoria: '',
            imagen: '',
            nombre: '',
        });
    const query = useItemId(id, 'category', setData);
    const updateCategory = useUpdateCategory(id, data);

    if (!query.isLoading && query.data && !previewImage) {
        handleDonwload();
    }

    function handleDonwload() {
        let ref = storage.ref(`/images/${query.data.imagen}`);
        ref.getDownloadURL().then((url) => {
            setPreviewImage(url);
        })
    }

    function handleUpload() {
        let ref = storage.ref(`/images/${file.name}`);
        ref.put(file);
    }

    function handleChangeFile(target) {
        setFile(target.files[0]);
    }

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    };

    const send = (event) => {
        event.preventDefault();
        handleUpload();
        updateCategory.mutate()
    };

    return (
        <div className="flex w-full justify-center">
            {
                query.isError ? <ServerError /> :
                    query.isLoading ? <LoadingData /> :
                        !query.data ?
                            <p className="bg-white p-24 rounded-xl text-lg">No se econtró el recurso</p> :
                            <div className="h-full flex grid-cols-6 shadow-2xl">
                                <div className=" bg-mediumgreen col-span-2 rounded-l-xl">
                                    <h3 className="p-5 px-16 w-full text-center font-semibold text-2xl text-white">Módulo categoría</h3>
                                    <ImageInput
                                        value={previewImage}
                                        onChange={({ target }) => {
                                            handleChange({ target: { name: "imagen", value: target.files[0].name } });
                                            setChangeImage(true);
                                            handleChangeFile(target)
                                            setPreviewImage(URL.createObjectURL(target.files[0]));
                                        }}
                                    />
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
                                            </div>
                                        </div>
                                        <SubmitButton
                                            isLoading={updateCategory.isLoading}
                                            mode={"edit"}
                                        />
                                    </form>
                                </div>
                            </div>
            }
        </div>
    )
}
