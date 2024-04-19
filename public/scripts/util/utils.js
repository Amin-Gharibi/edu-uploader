const toggleMultipleClasses = (elem, ...args) => {
	args.forEach(c => {
		elem.classList.toggle(c)
	})
}

export {
	toggleMultipleClasses
}