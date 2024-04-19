import BASE_URL from "../util/BASE_URL.js";

const getHeaderLogo = async () => {
	const response = await fetch(`${BASE_URL}/api/headerLogo`)

	return await response.json()
}

export {
	getHeaderLogo
}