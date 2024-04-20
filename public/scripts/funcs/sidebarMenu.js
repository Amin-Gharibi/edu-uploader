import BASE_URL from "../util/BASE_URL.js";

const getAllSidebarMenus = async () => {
	const response = await fetch(`${BASE_URL}/api/sidebarMenu`)

	return await response.json()
}

export {
	getAllSidebarMenus
}