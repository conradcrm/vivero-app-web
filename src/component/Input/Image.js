import { BsCardImage } from 'react-icons/bs';
import { useRef } from 'react';

export default function ImageInput({ value, onChange, disabled, cancel, preview, text }) {
  const inputRef = useRef();
  return (
    <div className="h-96 w-full grid justify-center items-center">
      <div className="mb-20">
        {/* <progress value={progress} max="100" className="w-full" /> */}
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
        {
          !preview ? <p className="mt-4 text-white font-semibold text-center">
            {text}
        </p> :
            <button
              onClick={cancel}
              className="w-full text-center bg-white rounded-lg mt-2.5">Cancelar</button>
        }
      </div>
      <style>{`
        /* For Chrome or Safari */
        progress::-webkit-progress-bar {
            background-color: #eeeeee;
            border-radius: 0.25rem
        }
  
        progress::-webkit-progress-value {
            background-color: #039603 !important;
            border-radius: 0.15rem
        }
  
  
        /* For Firefox */
        progress {
            background-color: #eee;
            border-radius: 0.5rem
        }
  
        progress::-moz-progress-bar {
            background-color: #039603 !important;
            border-radius: 0.5rem
        }
  
        /* For IE10 */
        progress {
            background-color: #eee;
            border-radius: 0.5rem
        }
  
        progress {
            background-color: #039603;
            border-radius: 0.5rem
        }
        `}</style>
    </div>
  );
}
