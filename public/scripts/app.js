import getHeaderData from "./shared/header.js";
import BASE_URL from "./util/BASE_URL.js";

document.addEventListener('DOMContentLoaded', async () => {
	await fetchData()
})

const fetchData = async () => {
	try {
	// 	fetch data from server
		const [headerData] = await Promise.all([getHeaderData()])

		await renderPage(headerData)
	} catch (e) {
		console.log('ERROR HANDLER: ', e)
	}
}

const renderPage = async (headerData) => {
	const container = document.querySelector('#content-container')
	console.log(headerData.headerBanners)
	container.innerHTML = `
		<header class="container max-w-[1200px] w-full py-4 flex justify-between items-center">
    		<div class="flex items-center gap-x-16">
    		    <div>
    		    	${
						Array.from(headerData.headerLogo).map(data => {
							return `
			    		        <a href="${data.href}">
			    		        	<img src="${BASE_URL}/logo/${data.logo}" alt="logo" class="w-16 h-16 rounded">
								</a>				
							`
						})
					}
    		    </div>
    		    <ul class="flex gap-x-10 font-demiBold">
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
    		        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
    		    ورود ناظر
    		</a>
		</header>
		<main class="mt-5">
			<!--slider-->
			<div class="swiper mySwiper">
    			<div class="swiper-wrapper">
    				${
						Array.from(headerData.headerBanners).map(data => {
							return `
								<div class="swiper-slide !max-w-[1540px] mx-auto">
									<a href="${data.href}">
										<img src="${BASE_URL}/headerBanners/${data.cover}" alt="${data.title}" class="w-full !h-[500px]">
									</a>
									<span class="absolute bottom-24 right-40 text-white font-bold text-xl">
										${data.title}
									</span>
								</div>
							`
						})
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
		</main>
	`

	const swiper = new Swiper(".mySwiper", {
		loop: true,
		navigation: {
			nextEl: ".swiper-button-next--custom",
			prevEl: ".swiper-button-prev--custom"
		}
	})
}