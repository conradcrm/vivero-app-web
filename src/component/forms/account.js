import React, { useState } from "react";

import InputText from '../Input/InputText';
import { notify } from "../notification";
import Loading from "../loading";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { inputsValidate } from "../validations/auth";
import { useAuth } from "../../context/Auth";

export default function AccountForm({name, email}) {
    const {update} = useAuth()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [data, setData] = useState({
        name: name,
        email: email,
        password: '',
    });

    const [confirm, setConfirm] = useState("")

    const [validate, setValidate] = useState({
        name: '',
        email: '',
        password: '',
        result: false,
    });

    const handleInputChange = ({ target }) => {
        const { name, value } = target;
        setData({
            ...data,
            [name]: value,
        });

        setValidate({
            ...validate,
            [name]: inputsValidate(name, value).message,
            result: inputsValidate(name, value).result,
        });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (data.email === '' || data.password === '' || data.name === '') {
            notify('info', 'Los campos están vacíos, por favor ingrese sus datos.');
        }
        else if (data.password !== confirm) {
            notify('info', 'Las contraseñas no coinciden.');
        }
        else {
            if (validate.result) {
                try {
                    setIsLoading(true)
                    notify('success', `Los datos fueron cambiados con éxito. Inicie sesión nuevamente porfavor.`);
                    await update(data)
                    history.push('/');
                } catch (error) {
                    notify('error', `Se ha producido un error, inténtelo más tarde ${error}`);
                }
            }
            else {
                notify('error', 'Proceso denegado, los valores introducidos no son válidos.');
            }
        }
        setIsLoading(false)
    }

    return (
        <div className="flex justify-center items-center bg-ligth_gray rounded-xl">
            <div className="bg-white rounded-xl shadow-md px-10">
                <h3 className="text-center text-mediumgreen font-semibold text-2xl mb-6">Actualizar datos</h3>
                <form className="" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <InputText
                            width="22rem"
                            title="Nombre"
                            required={true}
                            name="name"
                            placeholder="Gavin Belson Sonjs"
                            value={data.name}
                            onChange={handleInputChange}
                            type="text"
                            message={validate.name}
                        />
                    </div>
                    {/* <div className="mb-5">
                        <InputText
                            width="22rem"
                            title="Correo"
                            required={true}
                            name="email"
                            placeholder="gavinbelson@gmail.com"
                            value={data.email}
                            onChange={handleInputChange}
                            type="text"
                            message={validate.email}
                        />
                    </div> */}
                    <div className="mb-5 relative flex justify-end">
                        <InputText
                            width="22rem"
                            title="Contraseña"
                            required={true}
                            name="password"
                            placeholder="************"
                            value={data.password}
                            onChange={handleInputChange}
                            type={show ? "text" : "password"}
                            message={validate.password}
                            automcomplete={"on"}
                        />
                        {
                            data.password.length > 0 &&
                            <div className={`absolute top-1/3 mt-1.5 mr-1 w-10 h-10 cursor-pointer`}
                                onClick={() => setShow(!show)}>
                                {
                                    show ?
                                        <AiOutlineEye
                                            size={20}
                                            className={`top-0 bottom-0 ring-0 left-0 m-auto mt-2.5`} /> :
                                        <AiOutlineEyeInvisible
                                            size={20}
                                            className={`top-0 bottom-0 ring-0 left-0 m-auto mt-2.5`} />
                                }
                            </div>
                        }
                    </div>
                    <div className="mb-5 relative flex justify-end">
                        <InputText
                            width="22rem"
                            title="Confirmar contraseña"
                            required={true}
                            name="confirm"
                            placeholder="************"
                            value={confirm}
                            onChange={({target})=>setConfirm(target.value)}
                            type={showConfirm ? "text" : "password"}
                            automcomplete={"on"}
                        />
                        {
                            confirm.length > 0 &&
                            <div className={`absolute top-1/3 mt-1.5 mr-1 w-10 h-10 cursor-pointer`}
                                onClick={() => setShowConfirm(!showConfirm)}>
                                {
                                    showConfirm ?
                                        <AiOutlineEye
                                            size={20}
                                            className={`top-0 bottom-0 ring-0 left-0 m-auto mt-2.5`} /> :
                                        <AiOutlineEyeInvisible
                                            size={20}
                                            className={`top-0 bottom-0 ring-0 left-0 m-auto mt-2.5`} />
                                }
                            </div>
                        }
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`bg-darkgreen tracking-wider block text-lg focus:outline-none w-full mt-7 py-3 mb-2 rounded-lg text-white font-medium bg-opacity-90 transition duration-150 ease-in-out transform hover:scale-105
                                ${isLoading ? "opacity-50 cursor-not-allowed " : " hover:bg-darkgreen hover:opacity-100"}`}>
                        {isLoading ?
                            <>
                                <Loading color={"white"} size={25} />
                                <p className="ml-2">Actualizando ...</p>
                            </> :
                            "Actualizar"
                        }
                    </button>
                </form>
            </div>
        </div>
    );
}
