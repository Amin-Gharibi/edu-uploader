import BASE_URL from "../util/BASE_URL.js";
import { getToken } from "../util/utils.js";

const getLatestNews = async () => {
	const response = await fetch(`${BASE_URL}/api/news/latest`)

	return await response.json()
}

const get15News = async (startingIndex) => {
	const response = await fetch(`${BASE_URL}/api/news/specific/${startingIndex}`)

	return await response.json()
}

const getOne = async (id) => {
	const response = await fetch(`${BASE_URL}/api/news/${id}`)

	return await response.json()
}

const getAllNews = async () => {
	const response = await fetch(`${BASE_URL}/api/news`)

	return await response.json()
}

const createNews = async (title, body, cover) => {
	const sendingData = new FormData()
	sendingData.append('title', title)
	sendingData.append('body', body)
	sendingData.append('cover', cover)

	const response = await fetch(`${BASE_URL}/api/news`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${getToken()}`
		},
		body: sendingData
	})

	const data = await response.json()

	return { data, ok: response.ok }
}

const deleteNews = async (id) => {
	const response = await fetch(`${BASE_URL}/api/news/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${getToken()}`
		}
	})

	const data = await response.json()

	return { data, ok: response.ok }
}

const editNews = async (id, title, body, cover) => {
	const sendingData = new FormData()
	sendingData.append('title', title || undefined)
	sendingData.append('body', body || undefined)
	sendingData.append('cover', cover || undefined)

	const response = await fetch(`${BASE_URL}/api/news/${id}`, {
		method: 'PUT',
		headers: {
			'Authorization': `Bearer ${getToken()}`
		},
		body: sendingData
	})

	const data = await response.json()

	return { data, ok: response.ok }
}

export {
	getLatestNews,
	get15News,
	getOne,
	getAllNews,
	createNews,
	deleteNews,
	editNews
}