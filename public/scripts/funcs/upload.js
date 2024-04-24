import BASE_URL from "../util/BASE_URL.js";

const createUpload = async (data, uploadProgress) => {
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