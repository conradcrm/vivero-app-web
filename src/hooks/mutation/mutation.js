const globalQuery = "http://localhost:8000/api/";
const headers = {
    "content-type": "application/json",
    Accept: "application/json",
}

export const updateStatusItem = async ({id,endpoint}) => {
    const url = `${globalQuery}${endpoint}/${id}`;
    const response = await fetch(url, {
        method: "PATCH",
        headers:headers,
    });
    const resp = await response.json();
    return resp;
};