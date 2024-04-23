import { getOne } from "./funcs/news.js";
import getHeaderData from "./shared/header.js";
import BASE_URL from "./util/BASE_URL.js";

document.addEventListener('DOMContentLoaded', async () => {
	await fetchData()
})

const fetchData = async () => {
	try {
		let newsId = location.href.split('/')
		newsId = newsId[newsId.length - 1]
		// for now we simulate the id
		
		// fetch data from server
		const [headerData, news] = await Promise.all([getHeaderData(), getOne('6627f555fa1c774b2d646410')])

		await renderPage(headerData, news)
	} catch (e) {
		console.log('ERROR HANDLER: ', e)
	}
}

const renderPage = async (headerData, news) => {
	console.log(news);
	const container = document.querySelector('#content-container')

	const date = (new Date(news.updatedAt)).toLocaleString('fa-IR').split(', ')

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
			<div class="w-full flex justify-between items-center">
			     <div class="flex flex-col gap-y-2">
					<h2 class="font-bold text-sm sm:text-base">
						نویسنده: ${news.writer.firstName} ${news.writer.lastName}
					</h2>
					<p class="flex items-center text-xs sm:text-sm text-gray-400 gap-x-1">
						<svg class="w-4 h-4 sm:w-5 sm:h-5">
							<use href="#map-pin"></use>
						</svg>
						${news.writer.areaName} 
						·
						${news.writer.provinceName}
					</p>
				 </div>
				 <div class="flex items-center gap-x-1 text-xs sm:text-sm text-gray-600">
					<svg class="w-4 h-4 sm:w-5 sm:h-5">
						<use href="#calendar-days"></use>
					</svg>
					${date[0]} ,${date[1]}
				 </div>
			</div>
			<img src="${BASE_URL}/news/${news.cover}" class="mt-10 w-full h-[600px] object-cover">
			<div class="mt-10">
				<h1 class="font-bold text-lg sm:text-2xl mb-3">
					${news.title}
				</h1>
				${news.body}
			</div>
		</main>
	`

	headerData.initMobileMenuToggling()
	headerData.initMobileMenuItemsTogglingSubMenus()
}