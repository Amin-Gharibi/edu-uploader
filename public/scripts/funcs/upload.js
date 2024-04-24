import BASE_URL from "../util/BASE_URL.js";

const createUpload = async (data, uploadProgress) => {
    for(let [key, value] of data.entries()) {
        console.log({key, value});
    }

    const result = await axios
        .post(`${BASE_URL}/api/upload`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                uploadProgress.value = percentCompleted;
                uploadProgress.dataset.before = `${percentCompleted}%`;
        }
        })

	return await result
}

export {
	createUpload
}