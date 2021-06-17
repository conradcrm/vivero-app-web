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
import { inputsValidate } from '../../validations';
import { notify } from '../../notification';

export default function CategoryEditForm() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const [previewImage, setPreviewImage] = useState(undefined);
    const [file, setFile] = useState();

    const [data, setData] = useState(
        {
            descripcion: '',
            id_categoria: '',
            imagen: '',
            nombre: '',
        });

    const [messageE,] = useState({
        description: "",
        names: "",
        image: "",
        result: false,
    })

    const query = useItemId(id, 'category', setData, setPreviewImage);
    const updateCategory = useUpdateCategory(id, data);

    function handleChangeFile(target) {
        setFile(target.files[0]);
    }

    const handleChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
        inputsValidate([event.target.name], event.target.value, messageE);
    };


    function handleUploadFile(event) {
        setIsLoading(true)
        event.preventDefault();
        if (previewImage) {
            try {
                const uploadTask = storage.ref(`/images/${file.name}`).put(file);
                uploadTask.on("state_changed", snapshot => {
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 1000);
                }, error => {
                    setIsLoading(false)
                    notify("error", `Ha ocurrido un error al intentar subir la imagen, inténtelo más tarde. ${error}`)
                },
                    () => {
                        storage.ref("images").child(file.name).getDownloadURL()
                            .then(url => {
                                setData({ ...data, imagen: url })
                                sendData()
                            });
                    }
                );
            } catch (error) {
                setIsLoading(false)
                notify("error", "Ha ocurrido un error al intentar subir la imagen, inténtelo más tarde.")
            }
        } else {
            sendData()
        }
    };

    function sendData() {
        if (messageE.result) {
            updateCategory.mutate()
            setIsLoading(false)
        }
        else {
            notify("info", "La información ingresada no es válida.")
            setIsLoading(false)
        }
    }

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
                                        value={previewImage ? previewImage : data.imagen}
                                        preview={previewImage}
                                        text="Actualice la imagen"
                                        cancel={() => setPreviewImage(undefined)}
                                        onChange={({ target }) => {
                                            if (target.files.length !== 0) {
                                                handleChange(
                                                    { target: { name: "imagen", value: target.files[0].name } }
                                                );
                                                handleChangeFile(target)
                                                setPreviewImage(URL.createObjectURL(target.files[0]));
                                            }
                                        }}
                                    />
                                    <div className="flex justify-end mb-6">
                                        <span className="block text-mediumred text-sm font-medium pt-0.5">{messageE.image}</span>
                                    </div>
                                </div>
                                <div className="col-span-4 bg-white rounded-r-xl">
                                    <form className="m-auto my-10 mx-28" onSubmit={handleUploadFile}>
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
                                            isLoading={updateCategory.isLoading || isLoading}
                                            mode={"edit"}
                                        />
                                    </form>
                                </div>
                            </div>
            }
        </div>
    )
}
