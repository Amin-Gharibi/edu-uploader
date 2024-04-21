const toggleMultipleClasses = (elem, ...args) => {
	args.forEach(c => {
		elem.classList.toggle(c)
	})
}

const saveToLocalStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value))
}

const getFromLocalStorage = (key) => {
	return localStorage.getItem(key)
}

export {
	toggleMultipleClasses,
	saveToLocalStorage,
	getFromLocalStorage
}