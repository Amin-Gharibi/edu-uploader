import BASE_URL from "../util/BASE_URL.js";
import { getToken } from "../util/utils.js";

const getAllUsers = async () => {
	const response = await fetch(`${BASE_URL}/api/user`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })

	return await response.json()
}

const deleteUser = async id => {
    const response = await fetch(`${BASE_URL}/api/user/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })

    const data = await response.json()

    return {data, ok: response.ok}
}

const getUserUploads = async () => {
    const response = await fetch(`${BASE_URL}/api/user/uploads`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })

    return await response.json()
}

const editUser = async (username, firstName, lastName, areaName, provinceName) => {
    const sendingData = {
        username,
        firstName,
        lastName,
        areaName,
        provinceName
    }

    const response = await fetch(`${BASE_URL}/api/user`, {
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

const editPassword = async (currentPassword, newPassword) => {
    const sendingData = {
        currentPassword,
        newPassword
    }

    const response = await fetch(`${BASE_URL}/api/user/password`, {
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
	getAllUsers,
    deleteUser,
    getUserUploads,
    editUser,
    editPassword
}