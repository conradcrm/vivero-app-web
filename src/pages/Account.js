import React, { useEffect, useRef, useState } from 'react'
import HeaderBarTitle from '../component/headerbar/tittle'
import { useAuth } from '../context/Auth';
import LoadingData from '../component/loading/data';
import profile_default from '../resources/profile/profile.svg';
import { FaEdit } from "react-icons/fa";
import { notify } from '../component/notification';
import { RiCloseCircleFill, RiCheckboxCircleFill } from 'react-icons/ri'
import ServerError from '../component/error/server';
import storage from '../firebase';

export default function Profile() {
    const { user, loadingUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false)
    const [previewImage, setPreviewImage] = useState();
    const [photo, setPhoto] = useState(undefined)
    const [file, setFile] = useState();

    let inputRef;

    const [data, setData] = useState({
        name: '',
        email: ''
    });

    function handleChangeFile(target) {
        setFile(target.files[0]);
    }

    async function handleDonwload() {
        setIsLoading(true)
        let ref = storage.ref(`/profile/${user.email}`);
        try {
            await ref.getDownloadURL().then((url) => {
                setIsLoading(false)
                setPreviewImage(undefined)
                setPhoto(url)
            })
        } catch (error) {
            setIsLoading(false)
            setPreviewImage(undefined)
        }
    }

    useEffect(() => {
        if (user) {
            handleDonwload();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [photo, user])


    function handleUploadFile(event) {
        setIsLoading(true)
        event.preventDefault();
        if (previewImage) {
            try {
                const uploadTask = storage.ref(`/profile/${user.email}`).put(file);
                uploadTask.on("state_changed", snapshot => {
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 1000);
                }, error => {
                    setIsLoading(false)
                    notify("error", `Ha ocurrido un error al intentar subir la imagen, inténtelo más tarde. ${error}`)
                },
                    () => {
                        handleDonwload();
                        notify('success', 'Tu foto de perfil fue cambiada con éxito.')
                    }
                );
            } catch (error) {
                setIsLoading(false)
                setPreviewImage(undefined)
                notify("error", `Ha ocurrido un error al intentar subir la imagen, inténtelo más tarde. ${error}`)
            }
        }
        else {
            setPreviewImage(undefined)
            setIsLoading(false)
            notify('info', 'Seleccione una imagen válida.')
        }
    };

    if (loadingUser) {
        return <LoadingData />
    }

    if (!loadingUser && !user) {
        return <ServerError />
    }

    const InputImage = () => {
        inputRef = useRef();
        return (
            <div className="absolute -bottom-14 p-2 border-4 border-gray grid items-center justify-center bg-center bg-no-repeat bg-cover rounded-full">
                <div className={`rounded-full w-44 h-44 p-3 flex items-center justify-center z-50
                                 bg-center bg-no-repeat bg-cover
                                 ${isLoading ? 'animate-pulse' : ''}
                                 `}
                    style={{ backgroundImage: (previewImage && `url(${previewImage})`) || (photo && `url(${photo})`) }}>
                    {!photo && !previewImage && (
                        <div className={`w-full h-full rounded-full z-0 ${isLoading ? 'opacity-0 animate-pulse': 'opacity-30'}`}>
                            <div className="bg-white rounded-full w-full h-full flex justify-center items-center">
                                <img
                                    className="rounded-full"
                                    src={profile_default}
                                    alt="Foto de perfil"
                                />
                            </div>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={({ target }) => {
                            handleChangeFile(target)
                            setPreviewImage(URL.createObjectURL(target.files[0]));
                        }}
                        className="hidden"
                        ref={inputRef}
                    />
                </div>
            </div>
        )
    }

    const Option = (props) => {
        return (
            <div
                onClick={props.action}
                className=" h-10 w-10 bg-white rounded-full flex justify-center items-center z-30 shadow-md cursor-pointer transition duration-150 ease-in-out transform hover:scale-110">
                <div className="flex outline-none border-none focus:outline-none">
                    {props.children}
                </div>
            </div>
        )
    }
    return (
        <div>
            <HeaderBarTitle module="Perfil" />
            <div className="h-36 mb-16 bg-gray mt-6 rounded-xl grid justify-center">
                <div className="flex justify-center items-center h-44 w-44 relative z-10">
                    <InputImage />
                </div>

                <div className="w-full h-12 flex justify-between">
                    {previewImage ?
                        <>
                            <Option action={(e) => handleUploadFile(e)}>
                                <RiCheckboxCircleFill size={28} className="text-b_icon_gray text-darkgreen cursor-pointer" />
                            </Option>
                            <Option action={() => setPreviewImage(undefined)}>
                                <RiCloseCircleFill size={28} className="text-b_icon_gray text-darkred cursor-pointer" />
                            </Option>
                        </> :
                        <Option action={() => inputRef.current.click()}>
                            <FaEdit size={22} className="text-b_icon_gray text-darkgreen cursor-pointer" />
                        </Option>
                    }
                </div>

            </div>
            <p className="pt-5 text-center font-bold text-2xl opacity-80 select-none">
                {user.name}
            </p>
            <p className="pt-3 text-center text-name font-bold text-lg opacity-80">
                {user.email}
            </p>
            <div className="mt-3 flex justify-center py-8">
                <button className="shadow-md bg-white px-4 py-2 rounded-lg focus:outline-none transition duration-150 ease-in-out transform hover:scale-110">
                    Modificar datos
                </button>
            </div>
        </div>
    )
}