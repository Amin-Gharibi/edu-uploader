import BASE_URL from "../util/BASE_URL.js";

const getLatestNews = async () => {
	const response = await fetch(`${BASE_URL}/api/news/latest`)

	return await response.json()
}

export {
	getLatestNews
}