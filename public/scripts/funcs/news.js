import BASE_URL from "../util/BASE_URL.js";

const getLatestNews = async () => {
	const response = await fetch(`${BASE_URL}/api/news/latest`)

	return await response.json()
}

const get15News = async (startingIndex) => {
	const response = await fetch(`${BASE_URL}/api/news/specific/${startingIndex}`)

	return await response.json()
}

export {
	getLatestNews,
	get15News
}