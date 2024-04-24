import BASE_URL from "../util/BASE_URL.js";

const getOneFocusedSubject = async (enTitle) => {
	const response = await fetch(`${BASE_URL}/api/focusedSubject/${enTitle}`)

	return await response.json()
}

const getAllFocusedSubjects = async () => {
    const response = await fetch(`${BASE_URL}/api/focusedSubject`)

    return await response.json()
}

export {
	getOneFocusedSubject,
    getAllFocusedSubjects
}