import BASE_URL from "../util/BASE_URL.js";
import { getToken } from "../util/utils.js";

const getHeaderBanners = async () => {
	const response = await fetch(`${BASE_URL}/api/headerBanner`)

	return await response.json()
}

const createHeaderBanner = async (title, href, cover) => {
	const sendingData = new FormData()
	sendingData.append('title', title)
	sendingData.append('href', href)
	sendingData.append('cover', cover)

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

export {
	getHeaderBanners,
	createHeaderBanner,
	deleteHeaderBanner
}