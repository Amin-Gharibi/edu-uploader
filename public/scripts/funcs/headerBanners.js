import BASE_URL from "../util/BASE_URL.js";

const getHeaderBanners = async () => {
	const response = await fetch(`${BASE_URL}/api/headerBanner`)

	return await response.json()
}

export {
	getHeaderBanners
}