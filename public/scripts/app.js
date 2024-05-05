import getHeaderData from "./shared/header.js";
import BASE_URL from "./util/BASE_URL.js";
import {getLatestNews} from "./funcs/news.js";
import {getAllSidebarMenus} from "./funcs/sidebarMenu.js";

document.addEventListener('DOMContentLoaded', async () => {
	await fetchData()
})

const fetchData = async () => {
	try {
	// 	fetch data from server
		const [headerData, latestNews, sidebarMenus] = await Promise.all([getHeaderData(), getLatestNews(), getAllSidebarMenus()])

		await renderPage(headerData, latestNews, sidebarMenus)
	} catch (e) {
		console.log('ERROR HANDLER: ', e)
	}
}

const renderPage = async (headerData, latestNews, sidebarMenus) => {
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
							<img src="${BASE_URL}/logo/${headerData?.headerLogo[0]?.logo}" alt="logo" class="w-12 h-12 rounded">
							<button class="toggle-mobile-menu w-max h-max p-2 flex justify-center items-center">
								<svg class="w-5 h-5">
									<use href="#x-mark"></use>
								</svg>
							</button>
						</div>
						<div class="mt-6">
							<ul>
								${Array.from(headerData?.headerMenus).map(data => {
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
			    	<a href="${headerData?.headerLogo[0]?.href}">
			    		<img src="${BASE_URL}/logo/${headerData?.headerLogo[0]?.logo}" alt="logo" class="w-16 h-16 rounded">
					</a>				
    		    </div>
    		    <ul class="hidden sm:flex gap-x-10 font-demiBold">
    		    	${
						Array.from(headerData?.headerMenus).map(data => {
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
    		<a href="${BASE_URL}/login" type="button"
    		        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg text-sm p-2 sm:px-5 sm:py-2.5 focus:outline-none">
    		    <span class="hidden sm:inline">
    		    	ورود ناظر
				</span>
    		    <svg class="w-6 h-6 sm:hidden">
    		    	<use href="#user"></use>
    		    </svg>
    		</a>
		</header>
		<main class="mt-5">
			<!--slider-->
			<div class="swiper mySwiper">
    			<div class="swiper-wrapper">
    				${
						Array.from(headerData?.headerBanners).map(data => {
							return `
								<div class="swiper-slide !max-w-[1540px] mx-auto">
									<a href="${data.href}">
										<img src="${BASE_URL}/headerBanners/${data.cover}" alt="${data.title}" class="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
										<span class="absolute bottom-6 right-6 sm:bottom-14 sm:right-14 md:bottom-20 md:right-20 xl:bottom-24 xl:right-40 left-1 text-white font-bold text-lg sm:text-xl">
											${data.title}
										</span>
									</a>
								</div>
							`
						}).join('')
					}
    			</div>
    			<div class="swiper--navigators swiper-button-next--custom">
    				<svg class="w-6 h-6 text-blue-500">
    					<use href="#arrow-left"></use>
    				</svg>
				</div>
    			<div class="swiper--navigators swiper-button-prev--custom">
    				<svg class="w-6 h-6 text-blue-500">
    					<use href="#arrow-right"></use>
    				</svg>
				</div>
  			</div>
			<!--latest news and sidebar menu-->
			<div class="container max-w-[1200px] flex items-start flex-wrap md:flex-nowrap gap-5 mt-20 mb-10">
				<!--latest news section-->
				<div class="flex-grow w-full pr-5 xl:p-0">
					<h1 class="section--title">
						آخرین آخبار
					</h1>
					<div class="md:max-w-full w-full mt-8">
						${!latestNews?.length && `
							<h2 class="text-center mt-8 font-medium">
								خبری یافت نشد...!
							</h2>
						` || `
							<div class="flex flex-col gap-y-5">
								${
									latestNews?.map(news => {
										return `
											<div class="w-full overflow-hidden rounded flex gap-x-3 border border-gray-200">
												<img src="${BASE_URL}/news/${news.cover}" alt="news cover" class="hidden sm:block w-32 md:w-36 object-cover">
												<div class="flex-grow flex flex-col gap-y-3 py-4 pr-5 sm:pr-0">
													<h2 class="font-bold text-lg md:text-xl">
														${news.title}
													</h2>
													<p class="line-clamp-2 flex-grow pl-4 text-sm md:text-base">${news.body}</p>
													<a href="${BASE_URL}/news/${news._id}" class="self-end flex items-center ml-2 px-2 text-orange-400 gap-x-2">
														<span class="text-sm sm:text-base">
															ادامه مطلب
														</span>
														<svg class="w-4 h-4">
															<use href="#arrow-left"></use>
														</svg>
													</a>
												</div>
											</div>
										`
									}).join('')
								}
							</div>
						`}
					</div>
				</div>
				<aside class="w-full md:w-72 lg:w-96 shrink-0 sticky top-5">
					<h1 class="section--title mr-5 before:bg-orange-500">
						دسترسی سریع
					</h1>
					<ul class="mr-5 mt-8 border border-gray-200 rounded py-3 px-5 space-y-4">
						${sidebarMenus?.length && sidebarMenus?.map(menu => {
							return `
								<li class="w-full flex gap-x-2 items-center">
									<span class="w-2 h-2 rounded-full bg-orange-500"></span>
									<a href="${menu.href}" class="w-full">${menu.title}</a>
								</li>
							`	
						}).join('') || '<h3 class="text-sm font-medium text-center">هیچ لینکی یافت نشد...</h3>'}
					</ul>
				</aside>
			</div>
		</main>
	`

	const swiper = new Swiper(".mySwiper", {
		loop: true,
		navigation: {
			nextEl: ".swiper-button-next--custom",
			prevEl: ".swiper-button-prev--custom"
		},
		autoplay: {
			delay: 3000
		}
	})

	headerData.initMobileMenuToggling()
	headerData.initMobileMenuItemsTogglingSubMenus()
}