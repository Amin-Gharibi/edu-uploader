import BASE_URL from "../util/BASE_URL.js";
import { getToken } from "../util/utils.js";

const getAllSidebarMenus = async () => {
	const response = await fetch(`${BASE_URL}/api/sidebarMenu`)

	return await response.json()
}

const getOneSidebarMenu = async (id) => {
	const response = await fetch(`${BASE_URL}/api/sidebarMenu/${id}`, {
		headers: {
			'Authorization': `Bearer ${getToken()}`
		}
	})

	const data = await response.json()

	return {data, ok: response.ok}
}

const createSideBarMenu = async (title, href) => {
	const sendingData = {
		title,
		href
	}

	const response = await fetch(`${BASE_URL}/api/sidebarMenu`, {
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

const deleteSideBarMenu = async (id) => {
	const response = await fetch(`${BASE_URL}/api/sidebarMenu/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${getToken()}`
		}
	})

	const data = await response.json()

	return {data, ok: response.ok}
}

const editSideBarMenu = async (id, title, href) => {
	const sendingData = {
		title: title || undefined,
		href: href || undefined
	}

	const response = await fetch(`${BASE_URL}/api/sidebarMenu/${id}`, {
		method: 'PUT',
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
	getAllSidebarMenus,
	getOneSidebarMenu,
	createSideBarMenu,
	deleteSideBarMenu,
	editSideBarMenu
}