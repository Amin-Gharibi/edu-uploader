

document.addEventListener('DOMContentLoaded', async () => {
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
					<input type="text" placeholder="...." class="w-full xs:w-80 md:w-96 rounded border border-gray-300 text-gray-400 px-3 py-2 group-focus-within:text-gray-600 group-focus-within:border-gray-600 group-focus-within:placeholder-gray-600 outline-0 transition-colors" autofocus>
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
						<input type="text" placeholder="...." class="w-full xs:w-80 md:w-96 rounded border border-gray-300 text-gray-400 px-3 py-2 group-focus-within:text-gray-600 group-focus-within:border-gray-600 group-focus-within:placeholder-gray-600 outline-0 transition-colors">
						<button type="button" class="absolute top-0 bottom-0 my-auto left-5"">
							<svg class="w-4 h-4 text-gray-400 group-focus-within:text-gray-600 group">
								<use href="#eye-slash" class="group-[.active]:hidden"></use>
								<use href="#eye" class="hidden group-[.active]:block"></use>
							</svg>
						</button>
					</div>
				</div>
				<button type="submit" class="mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg text-sm p-2 sm:px-5 sm:py-2.5 focus:outline-none">
    		    	<span class="inline">
    		    		ورود
					</span>
    			</button>
			</form>
		</div>
	`
}