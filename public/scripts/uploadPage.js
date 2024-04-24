import { getOneFocusedSubject } from "./funcs/focusedSubjects.js";
import { createUpload } from "./funcs/upload.js";
import getHeaderData from "./shared/header.js";
import BASE_URL from "./util/BASE_URL.js";

const getTargetFocusedSubjectsName = async () => {
	const path = location.pathname.split('/')
	// real One => path[path.length - 1]
	// for test we use "test"
	const targetFocusedSubject = await getOneFocusedSubject("test")

	return targetFocusedSubject.title
}

document.addEventListener('DOMContentLoaded', async () => {
	await fetchData()
})

const fetchData = async () => {
	try {
	// 	fetch data from server
		const [headerData, focusedSubjectName] = await Promise.all([getHeaderData(), getTargetFocusedSubjectsName()])

		await renderPage(headerData, focusedSubjectName)
	} catch (e) {
		console.log('ERROR HANDLER: ', e)
	}
}

const renderPage = async (headerData, focusedSubjectName) => {
	const container = document.querySelector('#content-container')

	container.innerHTML = `
		<header class="container max-w-[1200px] w-full py-4 flex justify-between items-center">
			<!--mobile menu-->
			<div class="sm:hidden">
				<button class="toggle-mobile-menu flex justify-center items-center">
					<svg class="w-8 h-8 text-gray-900">
						<use href="#bars-3"></use>
					</svg>
				</button>
				<div class="mobile-menu--container fixed inset-0 z-[999] w-full h-full flex justify-start items-center bg-black bg-opacity-20 invisible opacity-0 transition-all">
					<div class="mobile-menu absolute top-0 bottom-0 -right-full z-50 w-64 px-7 pb-16 pt-5 bg-white transition-all">
						<div class="w-full flex justify-between items-center pb-4 border-b border-gray-100">
							<img src="${BASE_URL}/logo/${headerData.headerLogo[0].logo}" alt="logo" class="w-12 h-12 rounded">
							<button class="toggle-mobile-menu w-max h-max p-2 flex justify-center items-center">
								<svg class="w-5 h-5">
									<use href="#x-mark"></use>
								</svg>
							</button>
						</div>
						<div class="mt-6">
							<ul>
								${Array.from(headerData.headerMenus).map(data => {
									return `
										<li class="mobile-menu--items w-full text-sm font-demiBold text-gray-600">
											<div class="w-full flex justify-between items-center py-2">
												<a href="${data.href}">${data.title}</a>
												${data.subMenus.length && `
													<svg class="w-4 h-4 text-inherit transition-all">
														<use href="#arrow-down"></use>
													</svg>
												` || ''}
											</div>
											${data.subMenus.length && `
												<ul class="max-h-0 invisible opacity-0 w-52 flex flex-col gap-y-2 pt-1 pr-4 transition-all">
													${data.subMenus.map(item => {
														return `			
																<li class="text-gray-500">
																	<a href="${item.href}" class="block overflow-hidden text-ellipsis whitespace-nowrap">${item.title}</a>
																</li>
															`
													}).join('')	}
												</ul>
											` || ''}
										</li>
									`	
								}).join('') || ''}
							</ul>
						</div>
					</div>
				</div>
			</div>
			<!--desktop header-->
    		<div class="flex items-center gap-x-6 lg:gap-x-10 xl:gap-x-16">
    		    <div>
			    	<a href="${headerData.headerLogo[0].href}">
			    		<img src="${BASE_URL}/logo/${headerData.headerLogo[0].logo}" alt="logo" class="w-16 h-16 rounded">
					</a>				
    		    </div>
    		    <ul class="hidden sm:flex gap-x-10 font-demiBold">
    		    	${
						Array.from(headerData.headerMenus).map(data => {
							return `
								<li class="group relative flex items-center gap-x-2">
									<a href="${data.href}">${data.title}</a>
									${data.subMenus.length && `
									<svg class="w-4 h-4 text-inherit">
										<use href="#arrow-down"></use>
									</svg>
									<div class="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute top-full right-0 z-20 pt-1">
										<ul class="w-52 flex flex-col gap-y-2 p-3 bg-white drop-shadow-2xl rounded">
											${data.subMenus.map(item => {
												return `
													<li>
														<a href="${item.href}" class="block overflow-hidden text-ellipsis whitespace-nowrap">${item.title}</a>
													</li>
												`
											})}
										</ul>
									</div>
									` || ''}
								</li>
							`
						}).join('')
					}
    		    </ul>
    		</div>
    		<a href="#" type="button"
    		        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg text-sm p-2 sm:px-5 sm:py-2.5 focus:outline-none">
    		    <span class="hidden sm:inline">
    		    	ورود ناظر
				</span>
    		    <svg class="w-6 h-6 sm:hidden">
    		    	<use href="#user"></use>
    		    </svg>
    		</a>
		</header>
		<main class="container max-w-[1200px] border-t border-t-gray-300 py-10">
			<h1 class="font-medium text-center pb-2">
				آپلود پروژه با محوریت: 
				<span class="text-xl font-bold">
					${focusedSubjectName}
				</span>
			</h1>
			<form class="mt-5">
				<div>
					<h2 class="font-demiBold text-lg">
						آموزشگاه:
					</h2>
					<div class="mt-3 grid grid-cols-3 gap-4">
						<div class="flex flex-col gap-y-2">
							<span class="text-sm text-gray-600">
								نام:
								<span class="text-red-600">
									*
								</span>
							</span>
							<input id="school-name" type="text" placeholder="نام آموزشگاه..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded" required>
						</div>
						<div class="flex flex-col gap-y-2">
							<span class="text-sm text-gray-600">
								نوع:
								<span class="text-red-600">
									*
								</span>
							</span>
							<select id="school-type" class="p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded">
								<option value="">
									انتخاب کنید...
								</option>
								<option value="PUBLIC">
									عادی
								</option>
								<option value="SPECIAL">
									خاص
								</option>
							</select>
						</div>
						<div class="flex flex-col gap-y-2">
							<span class="text-sm text-gray-600">
								جنسیت:
								<span class="text-red-600">
									*
								</span>
							</span>
							<select id="school-gender" class="p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded">
								<option value="">
									انتخاب کنید...
								</option>
								<option value="MALE">
									پسر
								</option>
								<option value="FEMALE">
									دختر
								</option>
							</select>
						</div>
					</div>
				</div>

				<div class="border-t border-gray-100 mt-5 pt-5">
					<h2 class="font-demiBold text-lg">
						افراد حاضر در پروژه:
					</h2>
					<div class="participant-info-container mt-3 grid grid-cols-3 gap-4">
						<div class="flex flex-col gap-y-2">
							<span class="text-sm text-gray-600">
								نام:
								<span class="text-red-600">
									*
								</span>
							</span>
							<input type="text" name="firstName" placeholder="نام شرکت کننده..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded" required>
						</div>
						<div class="flex flex-col gap-y-2">
							<span class="text-sm text-gray-600">
								نام خانوادگی:
								<span class="text-red-600">
									*
								</span>
							</span>
							<input type="text" name="lastName" placeholder="نام خانوادگی شرکت کننده..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded" required>
						</div>
					</div>
					<button type="button" id="add-new-participant" class="mt-5 text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-50 disabled:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg text-sm p-2 sm:px-5 sm:py-2.5 focus:outline-none">
						افزودن شرکت کننده
					</button>
				</div>

				<div class="border-t border-gray-100 mt-5 pt-5">
					<h2 class="font-demiBold text-lg">
						نمونه برگ ها:
					</h2>
					<div class="example-page-container mt-3 grid grid-cols-3 gap-4">
						<div class="flex flex-col gap-y-2">
							<span class="text-sm text-gray-600">
								فایل نمونه برگ:
								<span class="text-red-600">
									*
								</span>
							</span>
							<input type="file" class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded" required>
						</div>
					</div>
					<button type="button" id="add-new-example-page-input" class="mt-5 text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-50 disabled:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg text-sm p-2 sm:px-5 sm:py-2.5 focus:outline-none">
						افزودن نمونه برگ
					</button>
				</div>

				<div class="border-t border-gray-100 mt-5 pt-5">
					<h2 class="font-demiBold text-lg">
						فایل ها:
					</h2>
					<div class="mt-3 grid grid-cols-3 gap-4">
						<div class="flex flex-col gap-y-2">
							<span class="text-sm text-gray-600">
								فایل با هر فرمتی:
								<span class="text-red-600">
									*
								</span>
							</span>
							<input id="file-input" type="file" class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded" required>
						</div>
					</div>
				</div>

				<div class="submit-btn--container w-full flex flex-col items-center justify-center gap-y-6 mt-10">
					<button type="submit" class="w-64 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg text-sm p-2 sm:px-5 sm:py-2.5 focus:outline-none">
						ارسال نهایی
					</button>
				</div>
			</form>
		</main>
	`

	headerData.initMobileMenuToggling()
	headerData.initMobileMenuItemsTogglingSubMenus()

	const addNewParticipantsBtn = document.querySelector('#add-new-participant')
	addNewParticipantsBtn.addEventListener('click', () => {
		addNewParticipantsBtn.disabled = true
		addNewParticipantsBtn.insertAdjacentHTML('beforebegin', `
		<div class="participant-info-container mt-3 grid grid-cols-3 gap-4">
			<div class="flex flex-col gap-y-2">
				<span class="text-sm text-gray-600">
					نام:
					<span class="text-red-600">
						*
					</span>
				</span>
				<input type="text" name="firstName" placeholder="نام شرکت کننده..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded" required>
			</div>
			<div class="flex flex-col gap-y-2">
				<span class="text-sm text-gray-600">
					نام خانوادگی:
					<span class="text-red-600">
						*
					</span>
				</span>
				<input type="text" name="lastName" placeholder="نام خانوادگی شرکت کننده..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded" required>
			</div>
		</div>
		`)
	})

	const addNewExamplePageBtn = document.querySelector('#add-new-example-page-input')
	addNewExamplePageBtn.addEventListener('click', () => {
		addNewExamplePageBtn.insertAdjacentHTML('beforebegin', `
		<div class="example-page-container mt-3 grid grid-cols-3 gap-4">
			<div class="flex flex-col gap-y-2">
				<span class="text-sm text-gray-600">
					فایل نمونه برگ:
					<span class="text-red-600">
						*
					</span>
				</span>
				<input type="file" class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded" required>
			</div>
		</div>
		`)
		const examplePages = document.querySelectorAll('.example-page-container')
		if (examplePages.length == 5) {
			addNewExamplePageBtn.disabled = true
		}
	})

	const form = document.querySelector('form')
	form.addEventListener('submit', async event => {
		event.preventDefault()

		const submitBtnContainer = document.querySelector('.submit-btn--container')
		submitBtnContainer.insertAdjacentHTML('afterbegin', `
			<progress value="0" data-before="0%" max="100" class="upload-progress-bar"></progress>
		`)
		
		const progressBar = submitBtnContainer.querySelector('progress')

		const schoolNameInput = document.querySelector('#school-name')
		const schoolTypeInput = document.querySelector('#school-type')
		const schoolGenderInput = document.querySelector('#school-gender')
		const participantsContainers = document.querySelectorAll('.participant-info-container')
		const examplePagesContainers = document.querySelectorAll('.example-page-container')
		const fileInput = document.querySelector('#file-input')

		const sendingData = new FormData()

		sendingData.append("focusedSubject", "6628e267771c29097700a4c5"),
		sendingData.append("schoolName", schoolNameInput.value.trim()),
		sendingData.append("schoolType", schoolTypeInput.value.trim()),
		sendingData.append("schoolGender", schoolGenderInput.value.trim()),
		sendingData.append("file", fileInput.files[0])

		let firstNameInput;
		let lastNameInput;
		participantsContainers.forEach((container, index) => {
			firstNameInput = container.querySelector('input[name="firstName"]')
			lastNameInput = container.querySelector('input[name="lastName"]')
			
			sendingData.append(`participants[${index}][firstName]`, firstNameInput.value.trim())
			sendingData.append(`participants[${index}][lastName]`, lastNameInput.value.trim())
		})

		let examplePage;
		examplePagesContainers.forEach((container) => {
			examplePage = container.querySelector('input')

			sendingData.append(`examplePages`, examplePage.files[0])
		})

		const result = await createUpload(sendingData, progressBar)

		console.log(result);
	})
}