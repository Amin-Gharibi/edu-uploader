import BASE_URL from "../util/BASE_URL.js";
import { getToken } from "../util/utils.js";

const getHeaderLogo = async () => {
	const response = await fetch(`${BASE_URL}/api/headerLogo`)

	return await response.json()
}

const editHeaderLogo = async (href, logo) => {
	const sendingData = new FormData()
	sendingData.append('href', href || undefined)
	sendingData.append('logo', logo || undefined)

	const response = await fetch(`${BASE_URL}/api/headerLogo`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${getToken()}`
		},
		body: sendingData
	})

	const data = await response.json()

	return {data, ok: response.ok}
}

export {
	getHeaderLogo,
	editHeaderLogo
}