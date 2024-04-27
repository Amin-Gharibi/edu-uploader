import { getPanelInfo, registerHandler } from "./funcs/auth.js"
import { getAllFocusedSubjects } from "./funcs/focusedSubjects.js"
import { deleteUser, getAllUsers, getUserUploads } from "./funcs/user.js"
import BASE_URL from "./util/BASE_URL.js"
import { createToast } from "./util/toastNotification.js"

document.addEventListener('DOMContentLoaded', async () => {
	await fetchData()
})

const fetchData = async () => {
	try {
	// 	fetch data from server
		const [info] = await Promise.all([getPanelInfo()])

		await renderPage(info)
	} catch (e) {
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
                        <a href=${info.headerLogo[0].href}>
                            <img src="${BASE_URL}/logo/${info.headerLogo[0].logo}">
                        </a>
                    </div>
                    <button class="toggle-mobile-menu sm:hidden p-1">
                            <svg class="w-5 h-5 text-gray-400">
                                <use href="#x-mark"></use>
                            </svg>
                    </button>
                </div>
                
                <ul class="overflow-y-auto h-[calc(100%-100px)] space-y-2 mt-5 border-t border-gray-600 pt-8 text-gray-500 cursor-default hideScrollbar">
                    <li data-value="main" class="nav-menu--links w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors active">
                        صفحه اصلی
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    ${info.user.role === 'ADMIN' && `
                    <li data-value="users" class="nav-menu--links w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        کاربران
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    ` || ''}
                    <li data-value="uploads" class="nav-menu--links w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        آپلود ها
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    <li class="nav-menu--links w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        صفحه اصلی
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    <li class="nav-menu--links w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        صفحه اصلی
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    <li class="nav-menu--links w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        صفحه اصلی
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    <li class="nav-menu--links w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        صفحه اصلی
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    <li class="nav-menu--links w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        صفحه اصلی
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    <li class="nav-menu--links w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        صفحه اصلی
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
                                                        ${upload.examplePages.map((examplePage, index) => {
                                                            return `
                                                                <a class="text-sm" href="${BASE_URL}/uploadedFiles/${examplePage}">نمونه برگ ${(index + 1).toLocaleString('fa-IR')}</a>
                                                            `
                                                        })}
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
            location.reload()
        } else if (value === 'users' && info.user.role === 'ADMIN') {
            const [allUsers, allFocusedSubjects] = await Promise.all([getAllUsers(), getAllFocusedSubjects()])
            dynamicContentContainer.innerHTML = `
                <form class="add-new-user mt-10">
                    <div class="grid grid-cols-2 xl:grid-cols-3 gap-5 ">
                        <div class="flex flex-col gap-y-2">
                            <span class="text-xs md:text-sm text-gray-600">
                                نام کاربری:
                                <span class="text-red-600">
                                    *
                                </span>
                            </span>
                            <input id="username-input" type="text" placeholder="نام کاربری..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base" required>
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <span class="text-xs md:text-sm text-gray-600">
                                رمز عبور:
                                <span class="text-red-600">
                                    *
                                </span>
                            </span>
                            <input id="password-input" type="text" placeholder="رمز عبور..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base" required>
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <span class="text-xs md:text-sm text-gray-600">
                                نام:
                                <span class="text-red-600">
                                    *
                                </span>
                            </span>
                            <input id="first-name-input" type="text" placeholder="نام..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base" required>
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <span class="text-xs md:text-sm text-gray-600">
                                نام خانوادگی:
                                <span class="text-red-600">
                                    *
                                </span>
                            </span>
                            <input id="last-name-input" type="text" placeholder="نام خانوادگی..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base" required>
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <span class="text-xs md:text-sm text-gray-600">
                                نام منطقه:
                                <span class="text-red-600">
                                    *
                                </span>
                            </span>
                            <input id="area-name-input" type="text" placeholder="نام منطقه..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base" required>
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <span class="text-xs md:text-sm text-gray-600">
                                نام استان:
                                <span class="text-red-600">
                                    *
                                </span>
                            </span>
                            <input id="province-name-input" type="text" placeholder="نام استان..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base" required>
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <span class="text-xs md:text-sm text-gray-600">
                                نقش:
                                <span class="text-red-600">
                                    *
                                </span>
                            </span>
                            <select id="role-input" class="p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base">
                                    <option value="">
                                        انتخاب کنید...
                                    </option>
                                    <option value="ADMIN">
                                        ادمین
                                    </option>
                                    <option value="SUPERVISOR">
                                        ناظر
                                    </option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <span class="text-xs md:text-sm text-gray-600">
                                حوزه فعالیت:
                                <span class="text-gray-500 text-xs">
                                    (اگر کاربر جدید ادمین است، نیاز نیست انتخاب شود)
                                </span>
                            </span>
                            <select id="focused-subject-input" class="p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base">
                                    <option value="">
                                        انتخاب کنید...
                                    </option>
                                    ${allFocusedSubjects.map(focusedSubject => {
                                        return `
                                        <option value="${focusedSubject._id}">
                                            ${focusedSubject.title}
                                        </option>
                                        `
                                    })}
                            </select>
                        </div>
                    </div>
                    <div class="flex justify-center items-center mt-10">
                        <button type="submit" class="w-60 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg text-sm p-2 sm:px-5 sm:py-2.5 focus:outline-none">
                            ایجاد کاربر
                        </button>
                    </div>
                </form>

                <div class="max-w-[330px] xs:max-w-[390px] md:max-w-[490px] lg:max-w-[700px] xl:max-w-max mt-12 w-full ruonded p-5 customBoxShadow flex flex-col gap-y-6">
                    <h2 class="font-extraBold text-lg flex justify-start items-center gap-x-2">
                        <span class="w-4 h-1 bg-blue-500 shadow-sm shadow-blue-500 rounded"></span>
                            کاربران
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
                                <th>ویرایش</th>
                                <th>حذف</th>
                            </tr>
                        </thead>
                        <tbody class="users-container divide-y">
                            ${allUsers.map(user => {
                                return `
                                    <tr>
                                        <td>${user.username}</td>
                                        <td>${user.firstName} ${user.lastName}</td>
                                        <td>${user.focusedSubject?.title || '-'}</td>
                                        <td>${user.areaName}، ${user.provinceName}</td>
                                        <td>${user.role}</td>
                                        <td>
                                            <button data-value="${user._id}" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg py-1.5 px-5 text-sm focus:outline-none">
                                                ویرایش
                                            </button>
                                        </td>
                                        <td>
                                            <button data-value="${user._id}" class="delete-btns text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded sm:rounded-lg py-1.5 px-5 text-sm focus:outline-none">
                                                حذف
                                            </button>
                                        </td>
                                    </tr>
                                `
                            }).join('') || ''}
                        </tbody>
                    </table>
                </div>
            `

            const deleteBtns = document.querySelectorAll('.delete-btns')
            deleteBtns.forEach(btn => {
                btn.addEventListener('click', async () => {
                    btn.innerHTML = `
                    <div role="status">
                        <svg aria-hidden="true" class="w-[18px] h-[18px] text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    </div>  
                    `
                    const data = await deleteUser(btn.dataset.value.trim())
                    if (data.ok) {
                        createToast('success', data.data.message)
                        btn.parentElement.parentElement.remove()
                    } else {
                        createToast('error', data.data.message)
                        btn.innerHTML = `
                            حذف
                        `
                    }
                    
                })
            })

            const addNewUserForm = document.querySelector('form.add-new-user')
            const submitBtn = document.querySelector('form button[type="submit"]')
            addNewUserForm.addEventListener('submit', async event => {
                event.preventDefault()
                
                submitBtn.innerHTML = `
                <div role="status" class="flex justify-center">
                    <svg aria-hidden="true" class="w-[18px] h-[18px] text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
                `

                const usernameInput = document.querySelector('#username-input')
                const passwordInput = document.querySelector('#password-input')
                const firstNameInput = document.querySelector('#first-name-input')
                const lastNameInput = document.querySelector('#last-name-input')
                const areaNameInput = document.querySelector('#area-name-input')
                const provinceNameInput = document.querySelector('#province-name-input')
                const roleInput = document.querySelector('#role-input')
                const focusedSubjectInput = document.querySelector('#focused-subject-input')

                
                const data = await registerHandler(usernameInput.value.trim(), passwordInput.value.trim(), firstNameInput.value.trim(), lastNameInput.value.trim(), areaNameInput.value.trim(), provinceNameInput.value.trim(), focusedSubjectInput.value.trim(), roleInput.value.trim())
                
                if (data.ok) {
                    createToast('success', 'کاربر با موفقیت ایجاد شد')
                    submitBtn.innerHTML = `
                        <div class="w-full h-full flex justify-center items-center">
                            <svg class="w-5 h-5 text-white">
                                <use href="#check"></use>
                            </svg>
                        </div>
                    `
                    const user = data.data.user
                    const usersContainer = document.querySelector('.users-container')
                    usersContainer.insertAdjacentHTML('beforeend', `
                        <tr>
                            <td>${user.username}</td>
                            <td>${user.firstName} ${user.lastName}</td>
                            <td>${user.focusedSubject?.title || '-'}</td>
                            <td>${user.areaName}، ${user.provinceName}</td>
                            <td>${user.role}</td>
                            <td>
                                <button data-value="${user._id}" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg py-1.5 px-5 text-sm focus:outline-none">
                                    ویرایش
                                </button>
                            </td>
                            <td>
                                <button data-value="${user._id}" class="delete-btns text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded sm:rounded-lg py-1.5 px-5 text-sm focus:outline-none">
                                    حذف
                                </button>
                            </td>
                        </tr>  
                    `)
                } else {
                    createToast('error', data.data.message)
                    submitBtn.innerHTML = `
                        ایجاد کاربر
                    `
                }
            })
        } else if (value === 'uploads') {
            const [userUploads] = await Promise.all([getUserUploads()])

            console.log(userUploads);

            dynamicContentContainer.innerHTML = `
            <div class="max-w-[330px] xs:max-w-[390px] md:max-w-[490px] lg:max-w-[700px] xl:max-w-max overflow-hidden mt-12 ruonded p-5 customBoxShadow flex flex-col gap-y-6">
                <h2 class="font-extraBold text-lg flex justify-start items-center gap-x-2">
                    <span class="w-4 h-1 bg-blue-500 shadow-sm shadow-blue-500 rounded"></span>
                    پروژه های آپلود شده
                    ${info.user.role === 'SUPERVISOR' && `
                        در حوزه فعالیت شما
                    ` || ''}
                    <span class="w-4 h-1 bg-blue-500 shadow-sm shadow-blue-500 rounded"></span>
                </h2>
                <table>
                    <thead class="bg-blue-200/20 text-gray-500">
                        <tr>
                            <th>آموزشگاه</th>
                            <th>جنسیت</th>
                            <th>نوع مدرسه</th>
                            <th>محور پروژه</th>
                            <th>افراد حاضر در پروژه</th>
                            <th>نمونه برگ ها</th>
                            <th>فایل</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y">
                        ${userUploads.map(upload => {
                            return `
                                <tr>
                                    <td>${upload.schoolName}</td>
                                    <td>${upload.schoolGender === 'MALE' ? 'پسرانه' : 'دخترانه'}</td>
                                    <td>${upload.schoolType === 'PUBLIC' ? 'عادی' : 'خاص'}</td>
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
                                                ${upload.examplePages.map((examplePage, index) => {
                                                    return `
                                                        <a class="text-sm" href="${BASE_URL}/uploadedFiles/${examplePage}">نمونه برگ ${(index + 1).toLocaleString('fa-IR')}</a>
                                                    `
                                                })}
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
            `
        }
    }

}