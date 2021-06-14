// import storage from "./firebase";

// export function handleUploadFile(file, setState, fetch) {
//     const uploadTask = storage.ref(`/images/${file.name}`).put(file);

//     uploadTask.on("state_changed", snapshot => {
//         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//         setState({ progress });
//     }, error => { console.log(error); return error;},
//         () => {
//             storage.ref("images").child(file.name).getDownloadURL()
//                 .then(url => {
//                     return url;
//                     //setState({ url });
//                 });
//         }
//     );
// };



// // function handleChange(e) {
// //     setFile(e.target.files[0]);
// // }

// export function handleUpload(file) {
//     let ref = storage.ref(`/images/${file.name}`);
//     ref.put(file);
// }

// export function HandleDonwload(name, setPreviewImage) {
//     let ref = storage.ref(`/images/${name}`);
//     ref.getDownloadURL().then((url) => {
//         setPreviewImage(url);
//     })
// }

// export function uploadImage(file) {

//     // Create a reference to the file we want to download
//     let starsRef = storage.ref(`/images/${file.name}`);
//     //Upload file
//     starsRef.put(file);
//     // Get the download URL
//     starsRef.getDownloadURL().then(function (url) {
//         return url;
//         // Insert url into an <img> tag to "download"
//     }).catch(function (error) {

//         // A full list of error codes is available at
//         // https://firebase.google.com/docs/storage/web/handle-errors
//         switch (error.code) {
//             case 'storage/object-not-found':
//                 // File doesn't exist
//                 break;

//             case 'storage/unauthorized':
//                 // User doesn't have permission to access the object
//                 break;

//             case 'storage/canceled':
//                 // User canceled the upload
//                 break;

//             case 'storage/unknown':
//                 // Unknown error occurred, inspect the server response
//                 break;
//         }
//     });
// }

// export const handleFireBaseUpload = (file) => {
// if (file === '') {
//         console.error(`not an image, the image file is a ${typeof (file)}`)
//     }
//     const uploadTask = storage.ref(`/images/${file.name}`).put(file)
//     //initiates the firebase side uploading 
//     uploadTask.on('state_changed',
//         (snapShot) => {
//             //takes a snap shot of the process as it is happening
//             console.log(snapShot)
//         }, (err) => {
//             //catches the errors
//             console.log(err)
//         }, () => {
//             // gets the functions from storage refences the image storage in firebase by the children
//             // gets the download url then sets the image from firebase as the value for the imgUrl key:
//             // storage.ref('images').child(file.name).getDownloadURL()
//             //  .then(fireBaseUrl => {
//             //    setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
//             //  })
//             uploadTask.getDownloadURL().then((url) => {
//                 //setPreviewImage(url);
//                 return url;
//             })
//         })
// }