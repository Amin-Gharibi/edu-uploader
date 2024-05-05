import getHeaderData from "./shared/header.js";
import BASE_URL from "./util/BASE_URL.js";
import { get15News } from "./funcs/news.js";

let startingIndex = 0
const loadNewData = async () => {
    const targetDocs = await get15News(startingIndex)

    startingIndex += 16
    return [...targetDocs]
}

// this flag is for ending calling this function because even after when we are done getting new data from db it runs this and appends 'all news loaded'
let shouldContinue = true
const handleInfiniteLoop = async () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && shouldContinue) {
        const newData = await loadNewData()
        const newDatasContainer = document.querySelector('.new-data--container div')
        if (newData.length) {
            newData.forEach(data => {
                newDatasContainer.insertAdjacentHTML('beforeend', `
                    <div class="w-full overflow-hidden rounded flex gap-x-3 border border-gray-200">
                        <img src="${BASE_URL}/news/${data.cover}" alt="news cover" class="hidden sm:block w-32 md:w-36 object-cover">
                        <div class="flex-grow flex flex-col gap-y-3 py-4 pr-5 sm:pr-0">
                            <h2 class="font-bold text-lg md:text-xl">
                                ${data.title}
                            </h2>
                            <p class="line-clamp-2 flex-grow pl-4 text-sm md:text-base">${data.body}</p>
                            <button class="self-end flex items-center ml-2 px-2 text-orange-400 gap-x-2">
                                <span class="text-sm sm:text-base">
                                    ادامه مطلب
                                </span>
                                <svg class="w-4 h-4">
                                    <use href="#arrow-left"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                `)
            })
        } else {
            newDatasContainer.innerHTML += `
            <h2 class="text-center mt-8 font-medium text-sm text-gray-400">
                تمام اخبار نمایش داده شده اند...
            </h2>
            `
            shouldContinue = false
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchData()
})

const fetchData = async () => {
    try {
        // 	fetch data from server
        const [headerData, loadedData] = await Promise.all([getHeaderData(), loadNewData()])

        await renderPage(headerData, loadedData)
    } catch (e) {
        console.log('ERROR HANDLER: ', e)
    }
}

const renderPage = async (headerData, loadedData) => {
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
        }).join('')}
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
    		    	${Array.from(headerData?.headerMenus).map(data => {
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
        <main class="container max-w-[1200px] border-t border-t-gray-300 py-10">
            <div class="flex justify-between items-center flex-wrap gap-y-6">
                <h1 class="section--title mr-5">
                    اخبار
                </h1>
                <form class="w-full xs:w-max">
                    <div class="w-full xs:w-52 sm:w-72 relative rounded-lg overflow-hidden border border-gray-300 focus-within:border-blue-500 transition-colors">
                        <input type="text" id="search-news-input" placeholder="جستجو..." class="w-full h-full p-2.5 text-sm text-gray-400 focus:text-gray-900 bg-gray-50 outline-0 placeholder-gray-300 focus:placeholder-blue-500 transition-colors">
                        <button type="submit" class="absolute left-0 bottom-0 top-0 h-full bg-blue-500 p-2">
                            <svg class="w-5 h-5 text-white">
                                <use href="#magnifying-glass"></use>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
            <div class="new-data--container md:max-w-full w-full mt-8">
						${!loadedData.length && `
							<h2 class="text-center mt-8 font-medium">
								خبری یافت نشد...!
							</h2>
						` || `
							<div class="flex flex-col gap-y-5">
								${
									loadedData.map(news => {
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
        </main>
	`

    headerData.initMobileMenuToggling()
    headerData.initMobileMenuItemsTogglingSubMenus()

    if (loadedData.length == 15) {
        window.addEventListener('scroll', async () => await handleInfiniteLoop())
    } else {
        const datasContainer = document.querySelector('.new-data--container div')
        datasContainer?.insertAdjacentHTML('beforeend', `
            <h2 class="text-center mt-8 font-medium text-sm text-gray-400">
                تمام اخبار نمایش داده شده اند...
            </h2>
        `)
    }
}