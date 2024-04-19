import BASE_URL from "../util/BASE_URL.js";

const getAllHeaderMenus = async () => {
	const response = await fetch(`${BASE_URL}/api/headerMenu`)

	return await response.json()
}

export {
	getAllHeaderMenus
}