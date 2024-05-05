import { getPanelInfo } from "./funcs/auth.js"
import BASE_URL from "./util/BASE_URL.js"
import { handlePanelUserContent } from "./panelUsers.js"
import { handlePanelUploadsContent } from "./panelUploads.js"
import { handlePanelNewsContent } from "./panelNews.js"
import { handlePanelHeaderMenuContent } from "./panelHeaderMenu.js"
import { handlePanelHeaderBannerContent } from "./panelHeaderBanner.js"
import { handlePanelQuickAccessContent } from "./panelQuickAccess.js"
import { handlePanelWebsiteInfoContent } from "./panelWebsiteInfo.js"
import { handlePanelFocusedSubjectContent } from "./panelFocusedSubject.js"
import { handlePanelMeContent } from "./panelMe.js"
import { getFromLocalStorage, logOut, removeFromLocalStorage } from "./util/utils.js"

document.addEventListener('DOMContentLoaded', async () => {
    // if (!getFromLocalStorage('user')) {
    //     location.href = `${BASE_URL}/login`
    //     return 
    // }

	await fetchData()
})

const fetchData = async () => {
	try {
	// 	fetch data from server
		const [info] = await Promise.all([getPanelInfo()])

		await renderPage(info)
	} catch (e) {
        // removeFromLocalStorage('user')
        // location.href = `${BASE_URL}/login`
		console.log('ERROR HANDLER: ', e)
	}
}

const renderPage = async (info) => {
	const container = document.querySelector('#content-container')

    container.innerHTML = `
        <div class="relative flex w-full min-h-full h-max">
            <div class="menu absolute z-[100] sm:sticky top-0 bottom-0 -right-full sm:right-0 h-screen overflow-hidden w-56 sm:min-w-44 md:min-w-52 md:w-64 xl:w-80 bg-gray-800 p-4 transition-all">
                <div class="flex justify-between sm:justify-center items-center w-full">
                    <div class="w-14 h-14">
                        <a href=${info?.headerLogo[0]?.href}>
                            <img src="${BASE_URL}/logo/${info?.headerLogo[0]?.logo}">
                        </a>
                    </div>
                    <button class="toggle-mobile-menu sm:hidden p-1">
                            <svg class="w-5 h-5 text-gray-400">
                                <use href="#x-mark"></use>
                            </svg>
                    </button>
                </div>
                
                <ul class="overflow-y-auto h-[calc(100%-100px)] space-y-2 mt-5 border-t border-gray-600 pt-8 text-gray-500 cursor-default hideScrollbar">
                    <li data-value="me" class="nav-menu--links w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        من
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    <li data-value="main" class="nav-menu--links w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors active">
                        صفحه اصلی
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    <li data-value="uploads" class="nav-menu--links w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        آپلود ها
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    ${info.user.role === 'ADMIN' && `
                    <li data-value="users" class="nav-menu--links w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        کاربران
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    <li data-value="news" class="nav-menu--links w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        اخبار
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    <li data-value="focusedsubject" class="nav-menu--links w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        محورهای پژوهش
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    <li data-value="header-menu" class="nav-menu--links w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        هدر منوها
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    <li data-value="header-banner" class="nav-menu--links w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        هدر بنرها
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    <li data-value="quick-access" class="nav-menu--links w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        لینک های دسترسی سریع
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    <li data-value="website-info" class="nav-menu--links w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        اطلاعات وبسایت
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    ` || ''}
                    <li data-value="log-out" class="nav-menu--links w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        خروج
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                </ul>
            </div>
            <div class="flex-grow flex flex-col p-10">
                <div class="flex items-center gap-x-6">
                    <button class="toggle-mobile-menu sm:hidden">
                        <svg class="w-6 h-6">
                            <use href="#hamburger-menu"></use>
                        </svg>
                    </button>
                    <div>
                        <h1 class="font-bold">
                            خوش آمدید،
                            <span  class="text-lg text-blue-700">
                                ${info.user.firstName} ${info.user.lastName}
                            </span>
                        </h1>
                        <span class="text-sm block">
                            نقش شما:
                            <span class="font-bold">
                                ${info.user.role === 'ADMIN' ? 'ادمین' : info.user.role === 'SUPERVISOR' ? 'ناظر' : 'نامشخض'}
                            </span>
                        </span>
                        ${info.user.role === 'SUPERVISOR' && `
                        <span class="text-sm block">
                            حوزه فعالیت:
                            <span class="font-bold">
                                ${info.user.focusedSubject.title}
                            </span>
                        </span>
                        ` || ''}
                    </div>
                </div>

                <div class="dynamic-content-container flex-grow">
                    <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
                        <div class="rounded p-3 customBoxShadow flex flex-col gap-y-6">
                            <h2 class="font-extraBold text-xl flex justify-start items-center gap-x-2">
                                <span class="w-4 h-1 bg-blue-500 shadow-sm shadow-blue-500 rounded"></span>
                                آپلود ها
                                <span class="w-4 h-1 bg-blue-500 shadow-sm shadow-blue-500 rounded"></span>
                            </h2>
                            <div class="flex justify-between items-center px-4">
                                <span class="text-lg font-bold">
                                    ${info.user.role === 'SUPERVISOR' && `
                                        ${info.subjectUploadsCount.toLocaleString('fa-IR')}
                                    ` || info.user.role === 'ADMIN' && `
                                        ${info.allUploadsCount.toLocaleString('fa-IR')}
                                    ` || ''}
                                </span>
                                <svg class="w-8 h-8 text-blue-500">
                                    <use href="#arrow-up-tray"></use>
                                </svg>
                            </div>
                            <span class="text-gray-400 text-sm mr-4">
                                تعداد پروژه های اپلود شده
                                ${info.user.role === 'SUPERVISOR' && `
                                در حوزه فعالیت شما
                                ` || ''}
                            </span>
                        </div>
                        ${info.user.role === 'ADMIN' && `
                        <div class="rounded p-3 customBoxShadow flex flex-col gap-y-6">
                            <h2 class="font-extraBold text-xl flex justify-start items-center gap-x-2">
                                <span class="w-4 h-1 bg-blue-500 shadow-sm shadow-blue-500 rounded"></span>
                                کاربران
                                <span class="w-4 h-1 bg-blue-500 shadow-sm shadow-blue-500 rounded"></span>
                            </h2>
                            <div class="flex justify-between items-center px-4">
                                <span class="text-lg font-bold">
                                    ${info.allUsersCount.toLocaleString('fa-IR')}
                                </span>
                                <svg class="w-8 h-8 text-blue-500">
                                    <use href="#user"></use>
                                </svg>
                            </div>
                            <span class="text-gray-400 text-sm mr-4">
                                تعداد همه اعضای وبسایت
                            </span>
                        </div>
                        ` || ''}
                    </div>
                    <div class="max-w-[330px] xs:max-w-[390px] md:max-w-[490px] lg:max-w-[700px] xl:max-w-max overflow-hidden mt-12 ruonded p-5 customBoxShadow flex flex-col gap-y-6">
                        <h2 class="font-extraBold text-lg flex justify-start items-center gap-x-2">
                            <span class="w-4 h-1 bg-blue-500 shadow-sm shadow-blue-500 rounded"></span>
                            آخرین پروژه های آپلود شده
                            ${info.user.role === 'SUPERVISOR' && `
                                در حوزه فعالیت شما
                            ` || ''}
                            <span class="w-4 h-1 bg-blue-500 shadow-sm shadow-blue-500 rounded"></span>
                        </h2>
                        <table>
                            <thead class="bg-blue-200/20 text-gray-500">
                                <tr>
                                    <th>شناسه</th>
                                    <th>آموزشگاه</th>
                                    <th>محور پروژه</th>
                                    <th>افراد حاضر در پروژه</th>
                                    <th>نمونه برگ ها</th>
                                    <th>فایل</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y">
                                ${info.latestUploads?.map(upload => {
                                    return `
                                        <tr>
                                            <td>${upload._id}</td>
                                            <td>${upload.schoolName}</td>
                                            <td>${upload.focusedSubject.title}</td>
                                            <td>
                                                <select>
                                                    ${upload.participants.map(participant => {
                                                        return `
                                                            <option value="">${participant.firstName} ${participant.lastName}</option>
                                                        `
                                                    })}
                                                </select>
                                            </td>
                                            <td>
                                                <div class="group relative cursor-default">
                                                    <span>
                                                        انتخاب...
                                                        <svg class="w-4 h-4 inline">
                                                            <use href="#chevron-down"></use>
                                                        </svg>
                                                    </span>
                                                    <div class="hidden group-hover:flex flex-col absolute top-full left-0 right-0 w-full p-2 bg-white z-10 border border-gray-400 rounded cursor-pointer shadow-2xl">
                                                        ${upload.examplePages.length && upload.examplePages.map((examplePage, index) => {
                                                            return `
                                                                <a class="text-sm" href="${BASE_URL}/uploadedFiles/${examplePage}">نمونه برگ ${(index + 1).toLocaleString('fa-IR')}</a>
                                                            `
                                                        }) || 'ندارد...'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <a href="${BASE_URL}/uploadedFiles/${upload.file}" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg py-1.5 px-5 text-sm focus:outline-none">
                                                    دانلود
                                                </a>
                                            </td>
                                        </tr>
                                    `
                                }).join('') || ''}
                            </tbody>
                        </table>
                    </div>
                    ${info.user.role === 'ADMIN' && `
                    <div class="max-w-[330px] xs:max-w-[390px] md:max-w-[490px] lg:max-w-[700px] xl:max-w-max mt-12 w-full ruonded p-5 customBoxShadow flex flex-col gap-y-6">
                        <h2 class="font-extraBold text-lg flex justify-start items-center gap-x-2">
                            <span class="w-4 h-1 bg-blue-500 shadow-sm shadow-blue-500 rounded"></span>
                                آخرین افراد ثبت شده در وبسایت
                            <span class="w-4 h-1 bg-blue-500 shadow-sm shadow-blue-500 rounded"></span>
                        </h2>
                        <table>
                            <thead class="bg-blue-200/20 text-gray-500">
                                <tr>
                                    <th>نام کاربری</th>
                                    <th>نام و نام خانوادگی</th>
                                    <th>حوزه فعالیت</th>
                                    <th>منطقه، استان</th>
                                    <th>نقش</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y">
                                ${info.latestSignedUsers?.map(user => {
                                    return `
                                        <tr>
                                            <td>${user.username}</td>
                                            <td>${user.firstName} ${user.lastName}</td>
                                            <td>${user.focusedSubject?.title || '-'}</td>
                                            <td>${user.areaName}، ${user.provinceName}</td>
                                            <td>${user.role}</td>
                                        </tr>
                                    `
                                }).join('') || ''}
                            </tbody>
                        </table>
                    </div>
                    ` || ''}
                </div>
            </div>
        </div>
    `

    const navLinks = document.querySelectorAll('.nav-menu--links')
    const dynamicContentContainer = document.querySelector('.dynamic-content-container')
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'))
            link.classList.add('active')
            dynamicContentContainer.innerHTML = `
                <div class="h-full flex space-x-2 justify-center items-center">
                    <span class='sr-only'></span>
                    <div class='h-5 w-5 bg-blue-700 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                    <div class='h-5 w-5 bg-blue-700 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                    <div class='h-5 w-5 bg-blue-700 rounded-full animate-bounce'></div>
                </div>
            `

            renderDynamicContent(link.dataset.value)
        })
    })

    const toggleMobileMenuBtns = document.querySelectorAll('.toggle-mobile-menu')
    const menu = document.querySelector('.menu')
    document.addEventListener('click', event => {
        let isToggleBtn = false
        toggleMobileMenuBtns.forEach(btn => {
            if (btn.contains(event.target)) {
                isToggleBtn = true
            }
        })
        if (!menu.contains(event.target) && menu.classList.contains('active') && !isToggleBtn) {
            menu.classList.remove('active')
        }
    })
    toggleMobileMenuBtns.forEach(toggleMobileMenuBtn => {
        toggleMobileMenuBtn.addEventListener('click', () => {
            menu.classList.toggle('active')
        })
    })

    const renderDynamicContent = async value => {
        if (value === 'main') {
            await renderPage(info)
        } else if (value === 'users') {

            await handlePanelUserContent()
            
        } else if (value === 'uploads') {
            
            await handlePanelUploadsContent(info)

        } else if (value === 'news') {
            
            await handlePanelNewsContent()

        } else if (value === 'focusedsubject') {
            
            await handlePanelFocusedSubjectContent()

        } else if (value === 'header-menu') {
            
            await handlePanelHeaderMenuContent()

        } else if (value === 'header-banner') {
            
            await handlePanelHeaderBannerContent()

        } else if (value === 'quick-access') {
            
            await handlePanelQuickAccessContent()

        } else if (value === 'website-info') {

            await handlePanelWebsiteInfoContent()
        } else if (value === 'me') {
            
            await handlePanelMeContent()
        } else if (value === 'log-out') {

            logOut()

        }
    }

}