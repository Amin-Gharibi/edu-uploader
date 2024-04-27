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

export {
	getAllUsers,
    deleteUser,
    getUserUploads
}