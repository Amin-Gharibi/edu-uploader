import BASE_URL from "../util/BASE_URL.js";
import { getFromLocalStorage } from "../util/utils.js";

const getAllUsers = async () => {
	const response = await fetch(`${BASE_URL}/api/user`, {
        headers: {
            'Authorization': `Bearer ${getFromLocalStorage('user').accessToken}`
        }
    })

	return await response.json()
}

const deleteUser = async id => {
    const response = await fetch(`${BASE_URL}/api/user/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getFromLocalStorage('user').accessToken}`
        }
    })

    const data = await response.json()

    return {data, ok: response.ok}
}

export {
	getAllUsers,
    deleteUser
}