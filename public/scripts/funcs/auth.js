import BASE_URL from "../util/BASE_URL.js";
import { getToken } from "../util/utils.js";

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

const registerHandler = async (username, password, firstName, lastName, areaName, provinceName, focusedSubject, role) => {
    const body = {
        username,
        password,
        firstName,
        lastName,
        areaName,
        provinceName,
        focusedSubject,
        role
    }

    const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    const data = await response.json()

    return {data, ok: response.ok}
}

const getPanelInfo = async () => {
    const response = await fetch(`${BASE_URL}/api/auth/panel`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })

    return await response.json()
}

const getMe = async () => {
    const response = await fetch(`${BASE_URL}/api/auth/me`, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })

    return await response.json()
}

export {
	loginHandler,
    registerHandler,
    getPanelInfo,
    getMe
}