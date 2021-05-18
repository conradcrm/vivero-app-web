import { BsCardImage } from 'react-icons/bs';
import { useRef } from 'react';

export default function ImageInput({ value, onChange, disabled }) {
  const inputRef = useRef();

  return (
    <div className="h-96 w-full flex pt-20 justify-center">
      <div
        className="w-48 h-36 bg-ligth_gray flex items-center justify-center rounded-xl bg-center bg-no-repeat bg-cover cursor-pointer"
        style={{
          backgroundImage: value && `url(${value})`,
        }}
        onClick={() => inputRef.current.click()}
      >
        {!value && (
          <div>
            <div>
              <BsCardImage size="3.5em" className=" text-b_ligth_gray m-auto" />
            </div>
            <p className="mt-4 text-sm ">
              Elija una imagen
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
  );
}
