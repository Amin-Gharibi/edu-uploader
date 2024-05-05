import { loginHandler } from "./funcs/auth.js"
import BASE_URL from "./util/BASE_URL.js"
import { createToast } from "./util/toastNotification.js"
import { getFromLocalStorage, saveToLocalStorage } from "./util/utils.js"


document.addEventListener('DOMContentLoaded', async () => {

	if (getFromLocalStorage('user')) {
		location.href = `${BASE_URL}/panel`
	}

	await fetchData()
})

const fetchData = async () => {
	try {
		// 	fetch data from server
		const [] = await Promise.all([])

		await renderPage()
	} catch (e) {
		console.log('ERROR HANDLER: ', e)
	}
}

const renderPage = async () => {
	const container = document.querySelector('#content-container')

	container.innerHTML = `
		<div class="container h-screen flex flex-col justify-center items-center">
			<h1 class="font-bold text-3xl lg:text-4xl">ورود</h1>
			<p class="mt-3 text-sm text-gray-500">
				ورود ناظران به پنل مخصوص
			</p>
			<form class="w-full xs:w-max flex flex-col gap-y-5 p-5 border border-gray-200 rounded-lg mt-10">
				<div class="flex flex-col gap-y-2 group">
					<div class="flex items-center gap-x-2 text-gray-400 group-focus-within:text-gray-600 transition-colors text-sm lg:text-base">
						<svg class="w-5 h-5 text-inherit">
							<use href="#user-circle"></use>
						</svg>
						<span>
							نام کاربری
						</span>
					</div>
					<input id="username-input" type="text" placeholder="...." class="w-full xs:w-80 md:w-96 rounded border border-gray-300 text-gray-400 px-3 py-2 group-focus-within:text-gray-600 group-focus-within:border-gray-600 group-focus-within:placeholder-gray-600 outline-0 transition-colors" autofocus required>
				</div>
				<div class="flex flex-col gap-y-2 group">
					<div class="flex items-center gap-x-2 text-gray-400 group-focus-within:text-gray-600 transition-colors text-sm lg:text-base">
						<svg class="w-5 h-5 text-inherit">
							<use href="#lock-closed"></use>
						</svg>
						<span>
							رمز عبور
						</span>
					</div>
					<div class="relative">
						<input id="password-input" type="password" placeholder="...." class="w-full xs:w-80 md:w-96 rounded border border-gray-300 text-gray-400 px-3 py-2 group-focus-within:text-gray-600 group-focus-within:border-gray-600 group-focus-within:placeholder-gray-600 outline-0 transition-colors" required>
						<button type="button" class="change-password-state absolute top-0 bottom-0 my-auto left-5 group">
							<svg class="w-4 h-4 text-gray-400 group-focus-within:text-gray-600">
								<use href="#eye-slash" class="group-[.active]:hidden"></use>
								<use href="#eye" class="hidden group-[.active]:block"></use>
							</svg>
						</button>
					</div>
				</div>
				<button type="submit" class="h-10 mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg text-sm p-2 sm:px-5 sm:py-2.5 focus:outline-none">
    		    	<span class="inline">
    		    		ورود
					</span>
    			</button>
			</form>
		</div>
	`

	const usernameInput = document.querySelector('#username-input')
	const passwordInput = document.querySelector('#password-input')
	const form = document.querySelector('form')
	const submitBtn = document.querySelector('button[type="submit"]')

	const changePasswordStateBtn = document.querySelector('.change-password-state')
	changePasswordStateBtn.addEventListener('click', () => {
		passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password'
		changePasswordStateBtn.classList.toggle('active')
	})

	form.addEventListener('submit', async event => {
		event.preventDefault()

		submitBtn.innerHTML = `
			<div class="w-full h-full pt-2 sm:pt-1 justify-center flex space-x-2">
				<span class='sr-only'></span>
        		<div class='w-3 h-3 sm:h-3.5 sm:w-3.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        		<div class='w-3 h-3 sm:h-3.5 sm:w-3.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        		<div class='w-3 h-3 sm:h-3.5 sm:w-3.5 bg-white rounded-full animate-bounce'></div>
			</div>
		`

		const [username, password] = [usernameInput.value.trim(), passwordInput.value.trim()]

		const response = await loginHandler(username, password)

		if (response.status === 200 && response.accessToken) {
			submitBtn.innerHTML = `
				<div class="w-full h-full flex justify-center items-center">
					<svg class="w-8 h-8 text-white">
						<use href="#check"></use>
					</svg>
				</div>
			`
			submitBtn.disabled = true

			createToast('success', 'با موفقیت وارد شدید')
			
			saveToLocalStorage('user', {accessToken: response.accessToken})

			location.href = `${BASE_URL}/panel`
		} else if (response.status === 401 || response.status === 404) {
			submitBtn.innerHTML = `
				<span class="inline">
					ورود
				</span>
			`

			createToast('error', response.message)
		} else {
			submitBtn.innerHTML = `
				<span class="inline">
					ورود
				</span>
			`

			createToast('warning', 'خطای سیستمی رخ داد لطفا با پشتیبانی تماس بگیرید')
		}
	})
}