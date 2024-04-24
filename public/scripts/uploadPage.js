import { getOneFocusedSubject } from "./funcs/focusedSubjects.js";
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

const renderPage = async (headerData, focusedSubjectName, allFocusedSubjects) => {
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
							<input type="text" placeholder="نام آموزشگاه..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded" required>
						</div>
						<div class="flex flex-col gap-y-2">
							<span class="text-sm text-gray-600">
								نوع:
								<span class="text-red-600">
									*
								</span>
							</span>
							<select class="p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded">
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
							<select class="p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded">
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
					<div class="mt-3 grid grid-cols-3 gap-4">
						<div class="flex flex-col gap-y-2">
							<span class="text-sm text-gray-600">
								نام:
								<span class="text-red-600">
									*
								</span>
							</span>
							<input type="text" placeholder="نام شرکت کننده..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded" required>
						</div>
						<div class="flex flex-col gap-y-2">
							<span class="text-sm text-gray-600">
								نام خانوادگی:
								<span class="text-red-600">
									*
								</span>
							</span>
							<input type="text" placeholder="نام خانوادگی شرکت کننده..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded" required>
						</div>
					</div>
					<button type="button" id="add-new-participant" class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg text-sm p-2 sm:px-5 sm:py-2.5 focus:outline-none">
						افزودن شرکت کننده
					</button>
				</div>

				<div class="border-t border-gray-100 mt-5 pt-5">
					<h2 class="font-demiBold text-lg">
						نمونه برگ ها:
					</h2>
					<div class="mt-3 grid grid-cols-3 gap-4">
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
					<button type="button" id="add-new-example-page-input" class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg text-sm p-2 sm:px-5 sm:py-2.5 focus:outline-none">
						افزودن نمونه برگ
					</button>
				</div>

				<div class="w-full flex justify-center mt-10">
					<button type="submit" class="w-64 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg text-sm p-2 sm:px-5 sm:py-2.5 focus:outline-none">
						ارسال نهایی
					</button>
				</div>
			</form>
		</main>
	`

	headerData.initMobileMenuToggling()
	headerData.initMobileMenuItemsTogglingSubMenus()
}