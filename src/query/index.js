import { notify } from '../component/notification';

export const mutation = (method, messageError, messageSuccess, setLoading, query, data) => {
    async function mutation(event) {
        setLoading(true)
        const response = await fetch(query, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        })
        
        if(response.status > 300){
            notify("error", messageError)
        }
        if(response.status < 300){
            notify("success", messageSuccess)
        }
        console.log(response.status)
        setLoading(false)
    }
    mutation();
}