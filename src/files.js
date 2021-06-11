import storage from "./firebase";

//export default function Test() {

// function handleChange(e) {
//     setFile(e.target.files[0]);
// }

export function handleUpload(file) {
    let ref = storage.ref(`/images/${file.name}`);
    ref.put(file);
}

export function HandleDonwload(name,setPreviewImage) {
    let ref = storage.ref(`/images/${name}`);
    ref.getDownloadURL().then((url) => {
        setPreviewImage(url);
    })
}

    // return (
    //     <div>
    //         <form onSubmit={handleUpload}>
    //             <input type="file" onChange={handleChange} />
    //             <button disabled={!file}>upload to firebase</button>
    //         </form>
    //         <button onClick={handleDonwload}>Ver</button>
    //         <img src={url} alt="" />
    //     </div>
    // );
//}


