import React, { useState } from "react";
import { useAuth } from '../context/Auth';
import { inputsValidate } from "../component/validations/auth";
import InputText from "../component/Input/InputText";
import logo from "../logo.svg";
import { notify } from "../component/notification";
import Loading from "../component/loading";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login({ history }) {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [validate, setValidate] = useState({
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
    if (data.email === '' || data.password === '') {
      notify('info', 'Los campos están vacíos, por favor ingrese sus credenciales de acceso.');
    }
    else {
      if (validate.result) {
        try {
          setIsLoading(true)
          await login(data);
          history.push('/');
        } catch (error) {
          notify('error', `Se ha producido un error, inténtelo más tarde ${error}`);
        }
      }
      else {
        notify('error', 'Acceso denegado, los valores introducidos no son válidos.');
      }
    }
    setIsLoading(false)
  }

  return (
    <div className="h-screen flex justify-center items-center bg-ligth_gray">
      <div className="-mt-10">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="vivero" className="" />
        </div>
        <p>{validate.message}</p>
        <div className="bg-white rounded-xl shadow-md py-8 px-10">
          <h3 className="text-center text-mediumgreen font-semibold text-2xl mb-6">Iniciar sesión</h3>
          <form className="" onSubmit={handleSubmit}>
            <div className="mb-8">
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
            </div>
            <div className="mb-8 relative flex justify-end">
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
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-darkgreen tracking-wider block text-lg focus:outline-none w-full mt-11 py-3 mb-2 rounded-lg text-white font-medium bg-opacity-90 transition duration-150 ease-in-out transform hover:scale-105
              ${isLoading ? "opacity-50 cursor-not-allowed " : " hover:bg-darkgreen hover:opacity-100"}`}
            >
              {isLoading ?
                <>
                  <Loading color={"white"} size={25} />
                  <p className="ml-2">Verificando ...</p>
                </> :
                "Ingresar"
              }
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}
