import React, { useEffect, useRef, useState } from 'react'
import HeaderBarTitle from '../component/headerbar/tittle'
import profile_default from '../resources/profile/profile.svg';
import { FaEdit } from "react-icons/fa";
import { notify } from '../component/notification';
import { RiCloseCircleFill, RiCheckboxCircleFill } from 'react-icons/ri'
import storage from '../firebase';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import AccountForm from '../component/forms/account';
import { getPhoto, getUserCurrent, setPhotoUser } from '../helpers/helper-auth';

export default function Profile() {
    const [isLoading, setIsLoading] = useState(false)
    const [previewImage, setPreviewImage] = useState()
    const [photo, setPhoto] = useState(getPhoto())
    const [file, setFile] = useState()
    const [open, setOpen] = useState(false)
    let user = getUserCurrent()
    let inputRef;
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
                setPhotoUser(url)
                setPhoto(url)
            })
        } catch (error) {
            setIsLoading(false)
            setPreviewImage(undefined)
        }
    }

    useEffect(() => {
        if (getUserCurrent() === undefined) {
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

    const InputImage = () => {
        inputRef = useRef();
        return (
            <div className="absolute -bottom-12 p-2 border-4 border-gray grid items-center justify-center bg-center bg-no-repeat bg-cover rounded-full">
                <div className={`rounded-full w-44 h-44 p-3 flex items-center justify-center z-50
                                 bg-center bg-no-repeat bg-cover
                                 ${isLoading ? 'animate-pulse' : ''}
                                 `}
                    style={{ backgroundImage: (previewImage && `url(${previewImage})`) || (photo && `url(${photo})`) }}>
                    {!photo && !previewImage && (
                        <div className={`w-full h-full rounded-full z-0 ${isLoading ? 'opacity-0 animate-pulse' : 'opacity-30'}`}>
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
            <button
                disabled={isLoading}
                onClick={props.action}
                className={`-mt-5 h-10 w-10 bg-white rounded-full flex justify-center items-center z-30 shadow-md focus:outline-none
                           ${isLoading ? 'cursor-wait': 'cursor-pointer transition duration-150 ease-in-out transform hover:scale-110'}  `}>
                <div className="flex outline-none border-none focus:outline-none">
                    {props.children}
                </div>
            </button>
        )
    }

    return (
        <div className="h-full">
            <HeaderBarTitle module="Perfil" />
            <div className="bg-white rounded-md" style={{ height: "90%" }}>
                <div className="h-60 mb-7 bg-darkgreen mt-6 rounded-md grid justify-center">
                    <div className="flex justify-center items-center h-44 w-44 relative z-10">
                        <InputImage />
                    </div>

                    <div className="w-full h-12 flex justify-between">
                        {previewImage ?
                            <>
                                <Option action={(e) => handleUploadFile(e)}>
                                        {isLoading ? 
                                        <svg class="animate-spin bg-mediumgreen h-5 w-5" viewBox="0 0 24 24">
                                        </svg>
                                        :
                                        <RiCheckboxCircleFill size={28} className="text-b_icon_gray text-darkgreen" />

                                        }
                                </Option>
                                <Option action={() => setPreviewImage(undefined)}>
                                    <RiCloseCircleFill size={28} className="text-b_icon_gray text-darkred " />
                                </Option>
                            </> :
                            <Option action={() => inputRef.current.click()}>
                                <FaEdit size={22} className="text-b_icon_gray text-darkgreen" />
                            </Option>
                        }
                    </div>

                </div>
                <p className="text-center font-bold text-2xl opacity-80 select-none">
                    {user.name}
                </p>
                <p className="pt-3 text-center text-name font-bold text-lg opacity-80">
                    {user.email}
                </p>
                <div className="mt-3 flex justify-center py-8">
                    <button className="shadow-md bg-darkgreen text-white px-4 py-2 rounded-lg focus:outline-none transition duration-150 ease-in-out transform hover:scale-110"
                        onClick={() => setOpen(true)}
                    >
                        Actualizar datos
                    </button>
                </div>
                <p className="pb-5 text-base text-b_ligth_gray text-center">Una vez modificados sus datos, tendrá que iniciar sesión nuevamente.</p>
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <AccountForm name={user.name} email={user.email} />
            </Modal>
        </div>
    )
}