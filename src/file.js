import storage from "./firebase";

export async function handleDonwload(user) {
    let ref = storage.ref(`/profile/${user.email}`);
    try {
        await ref.getDownloadURL().then((url) => {
            return url
        })
    } catch (error) {
    }
}
