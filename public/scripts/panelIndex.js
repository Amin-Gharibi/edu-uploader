import { getPanelInfo, registerHandler } from "./funcs/auth.js"
import { getAllFocusedSubjects } from "./funcs/focusedSubjects.js"
import { getAllUsers } from "./funcs/user.js"
import BASE_URL from "./util/BASE_URL.js"

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
        } else if (value === 'users') {
            const [allUsers, allFocusedSubjects] = await Promise.all([getAllUsers(), getAllFocusedSubjects()])
            
            dynamicContentContainer.innerHTML = `
                <form class="add-new-user mt-10">
                    <div class="grid grid-cols-3 gap-5 ">
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
            `

            const addNewUserForm = document.querySelector('form.add-new-user')
            addNewUserForm.addEventListener('submit', async event => {
                event.preventDefault()
                
                const usernameInput = document.querySelector('#username-input')
                const passwordInput = document.querySelector('#password-input')
                const firstNameInput = document.querySelector('#first-name-input')
                const lastNameInput = document.querySelector('#last-name-input')
                const areaNameInput = document.querySelector('#area-name-input')
                const provinceNameInput = document.querySelector('#province-name-input')
                const roleInput = document.querySelector('#role-input')
                const focusedSubjectInput = document.querySelector('#focused-subject-input')

                
                

                const data = await registerHandler(usernameInput.value.trim(), passwordInput.value.trim(), firstNameInput.value.trim(), lastNameInput.value.trim(), areaNameInput.value.trim(), provinceNameInput.value.trim(), focusedSubjectInput.value.trim(), roleInput.value.trim())

                console.log(data);
            })
        }
    }

}