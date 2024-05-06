import BASE_URL from "../util/BASE_URL.js";
import { getToken } from "../util/utils.js";

const getHeaderBanners = async () => {
	const response = await fetch(`${BASE_URL}/api/headerBanner`)

	return await response.json()
}

const getOneHeaderBanner = async (id) => {
	const response = await fetch(`${BASE_URL}/api/headerBanner/${id}`, {
		headers: {
			'Authorization': `Bearer ${getToken()}`
		}
	})

	const data = await response.json()

	return {data, ok: response.ok}
}

const createHeaderBanner = async (title, href, cover) => {
	const sendingData = new FormData()
	sendingData.append('title', title)
	sendingData.append('href', href)
	sendingData.append('cover', cover || undefined)

	const response = await fetch(`${BASE_URL}/api/headerBanner`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${getToken()}`
		},
		body: sendingData
	})

	const data = await response.json()

	return {data, ok: response.ok}
}

const deleteHeaderBanner = async (id) => {
	const response = await fetch(`${BASE_URL}/api/headerBanner/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${getToken()}`
		}
	})

	const data = await response.json()

	return {data, ok: response.ok}
}

const editHeaderBanner = async (id, title, href, cover) => {
	const sendingData = new FormData()
	sendingData.append('title', title || undefined)
	sendingData.append('href', href || undefined)
	sendingData.append('cover', cover || undefined)

	const response = await fetch(`${BASE_URL}/api/headerBanner/${id}`, {
		method: 'PUT',
		headers: {
			'Authorization': `Bearer ${getToken()}`
		},
		body: sendingData
	})

	const data = await response.json()

	return {data, ok: response.ok}
}

export {
	getHeaderBanners,
	createHeaderBanner,
	deleteHeaderBanner,
	getOneHeaderBanner,
	editHeaderBanner
}