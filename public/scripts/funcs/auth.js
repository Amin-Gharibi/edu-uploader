import BASE_URL from "../util/BASE_URL.js";
import { getFromLocalStorage } from "../util/utils.js";

const loginHandler = async (username, password) => {
    const sendingBody = {
        username,
        password
    }

	const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendingBody)
    })

    const data = await response.json()


    const returningValue = {
        accessToken: data.accessToken,
        status: response.status,
        message: data.message
    }

	return returningValue
}

const getPanelInfo = async () => {
    const user = getFromLocalStorage('user')

    const response = await fetch(`${BASE_URL}/api/auth/panel`, {
        headers: {
            'Authorization': `Bearer ${user.accessToken}`
        }
    })

    return await response.json()
}

export {
	loginHandler,
    getPanelInfo
}