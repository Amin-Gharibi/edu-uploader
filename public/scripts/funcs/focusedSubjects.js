import BASE_URL from "../util/BASE_URL.js";
import { getToken } from "../util/utils.js";

const getOneFocusedSubject = async (enTitle) => {
	const response = await fetch(`${BASE_URL}/api/focusedSubject/${enTitle}`)

	return await response.json()
}

const getAllFocusedSubjects = async () => {
    const response = await fetch(`${BASE_URL}/api/focusedSubject`)

    return await response.json()
}

const createFocusedSubject = async (title, enTitle) => {
    const sendingData = {
        title,
        enTitle
    }

    const response = await fetch(`${BASE_URL}/api/focusedSubject`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(sendingData)
    })

    const data = await response.json()

    return {data, ok: response.ok}
}

const deleteFocusedSubject = async (id) => {
    const response = await fetch(`${BASE_URL}/api/focusedSubject/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })

    const data = await response.json()

    return {data, ok: response.ok}
}

export {
	getOneFocusedSubject,
    getAllFocusedSubjects,
    createFocusedSubject,
    deleteFocusedSubject
}