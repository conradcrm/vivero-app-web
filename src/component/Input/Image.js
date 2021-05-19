import { BsCardImage } from 'react-icons/bs';
import { useRef } from 'react';

export default function ImageInput({ value, onChange, disabled }) {
  const inputRef = useRef();

  return (
    <div className="h-96 w-full grid justify-center items-center">
      <div className="mb-20">
        <div
          className="w-48 h-32 bg-ligth_gray flex items-center justify-center rounded-xl bg-center bg-no-repeat bg-cover cursor-pointer"
          style={{
            backgroundImage: value && `url(${value})`,
          }}
          onClick={() => inputRef.current.click()}
        >
          {!value && (
            <div className="w-full h-full">
              <div className="bg-white rounded-md w-full h-full flex justify-center items-center">
                <BsCardImage size="3.4em" className=" text-b_ligth_gray m-auto" />
              </div>
              <p className="mt-4 text-white font-semibold text-center">
                Seleccione una imagen
              </p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={onChange}
            className="hidden"
            ref={inputRef}
            disabled={disabled}
          />
        </div>

      </div>
    </div>
  );
}
