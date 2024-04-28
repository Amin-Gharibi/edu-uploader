import BASE_URL from "../util/BASE_URL.js";
import { getToken } from "../util/utils.js";

const getAllHeaderMenus = async () => {
	const response = await fetch(`${BASE_URL}/api/headerMenu`)

	return await response.json()
}

const createHeaderMenu = async (title, href) => {
	const sendingData = {
		title,
		href
	}

	const response = await fetch(`${BASE_URL}/api/headerMenu`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${getToken()}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(sendingData)
	})

	const data = await response.json()

	return {data, ok: response.ok}
}

const deleteHeaderMenu = async (id) => {
	const response = await fetch(`${BASE_URL}/api/headerMenu/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${getToken()}`
		}
	})

	const data = await response.json()

	return {data, ok: response.ok}
}

export {
	getAllHeaderMenus,
	createHeaderMenu,
	deleteHeaderMenu
}