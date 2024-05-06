import BASE_URL from "../util/BASE_URL.js";
import { getToken } from "../util/utils.js";
import { createHeaderSubMenu, deleteHeaderSubMenu } from "./headerSubMenus.js";

const getAllHeaderMenus = async () => {
	const response = await fetch(`${BASE_URL}/api/headerMenu`)

	return await response.json()
}

const getOneHeaderMenu = async (id) => {
	const response = await fetch(`${BASE_URL}/api/headerMenu/${id}`, {
		headers: {
			'Authorization': `Bearer ${getToken()}`
		}
	})

	const data = await response.json()

	return { data, ok: response.ok }
}

const createHeaderMenu = async (title, href) => {
	const sendingData = {
		title,
		href
	}

	const response = await fetch(`${BASE_URL}/api/headerMenu`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${getToken()}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(sendingData)
	})

	const data = await response.json()

	return { data, ok: response.ok }
}

const deleteHeaderMenu = async (id) => {
	const response = await fetch(`${BASE_URL}/api/headerMenu/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${getToken()}`
		}
	})

	const data = await response.json()

	return { data, ok: response.ok }
}

const editHeaderMenu = async (id, title, href, subMenusToBeDeleted, subMenusToBeAdded) => {
	try {
		await Promise.all(subMenusToBeDeleted.map(async elem => {
			const data = await deleteHeaderSubMenu(elem)
			if (!data.ok) {
				throw data
			}
		}))

		await Promise.all(subMenusToBeAdded.map(async subMenu => {
			const data = await createHeaderSubMenu(subMenu.title, subMenu.href, id)
			if (!data.ok) {
				throw data
			}
		}))

		const sendingData = {
			title: title || undefined,
			href: href || undefined
		}

		const response = await fetch(`${BASE_URL}/api/headerMenu/${id}`, {
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${getToken()}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(sendingData)
		})

		const data = await response.json()

		return { data, ok: response.ok }
	} catch (data) {
		return data
	}
}

export {
	getAllHeaderMenus,
	createHeaderMenu,
	deleteHeaderMenu,
	getOneHeaderMenu,
	editHeaderMenu
}