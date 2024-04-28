import BASE_URL from "../util/BASE_URL.js";
import { getToken } from "../util/utils.js";

const getAllHeaderSubMenus = async () => {
	const response = await fetch(`${BASE_URL}/api/headerSubMenu`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })

	return await response.json()
}

const createHeaderSubMenu = async (title, href, parent) => {
    const sendingData = {
        title,
        href,
        parent
    }

    const response = await fetch(`${BASE_URL}/api/headerSubMenu`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendingData)
    })

    const data = await response.json()

    return {data, ok: response.ok}
}

export {
	getAllHeaderSubMenus,
    createHeaderSubMenu
}