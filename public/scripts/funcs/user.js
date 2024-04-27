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

export {
	getAllUsers
}