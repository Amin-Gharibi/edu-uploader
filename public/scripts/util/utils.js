import BASE_URL from "./BASE_URL.js"

const toggleMultipleClasses = (elem, ...args) => {
	args.forEach(c => {
		elem.classList.toggle(c)
	})
}

const saveToLocalStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value))
}

const getFromLocalStorage = (key) => {
	return JSON.parse(localStorage.getItem(key))
}

const removeFromLocalStorage = (key) => {
	localStorage.removeItem(key)
}

const getToken = () => {
	return getFromLocalStorage('user').accessToken
}

const logOut = () => {
	removeFromLocalStorage('user')
	location.href = BASE_URL
}

export {
	toggleMultipleClasses,
	saveToLocalStorage,
	getFromLocalStorage,
	removeFromLocalStorage,
	getToken,
	logOut
}