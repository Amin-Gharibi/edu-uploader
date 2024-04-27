import { getPanelInfo } from "./funcs/auth.js"
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
    console.log(info);

	const container = document.querySelector('#content-container')

	container.innerHTML = `
        <div class="relative flex w-full min-h-full h-max">
            <div class="sticky top-0 h-screen overflow-hidden w-80 bg-gray-800 p-4">
                <div class="flex justify-between sm:justify-center items-center w-full">
                    <div class="w-14 h-14">
                        <a href=${info.headerLogo[0].href}>
                            <img src="${BASE_URL}/logo/${info.headerLogo[0].logo}">
                        </a>
                    </div>
                    <button class="sm:hidden p-1">
                            <svg class="w-5 h-5 text-gray-400">
                                <use href="#x-mark"></use>
                            </svg>
                    </button>
                </div>
                
                <ul class="overflow-y-auto h-[calc(100%-100px)] space-y-2 mt-5 border-t border-gray-600 pt-8 text-gray-500 cursor-default hideScrollbar">
                    <li class="w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors active">
                        صفحه اصلی
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    <li class="w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        صفحه اصلی
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    <li class="w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        صفحه اصلی
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    <li class="w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        صفحه اصلی
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    <li class="w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        صفحه اصلی
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    <li class="w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        صفحه اصلی
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    <li class="w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        صفحه اصلی
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    <li class="w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        صفحه اصلی
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                    <li class="w-full relative p-2 hover:text-gray-300 border border-transparent hover:border-gray-300 rounded [&.active]:border-gray-300 [&.active]:text-gray-300 group cursor-pointer transition-colors">
                        صفحه اصلی
                        <span class="hidden group-[.active]:block absolute top-0 bottom-0 left-5 my-auto w-2 h-2 rounded bg-gray-400"></span>
                    </li>
                </ul>
            </div>
            <div class="flex-grow p-10">
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

                <div class="w-full grid grid-cols-3 gap-5 mt-12">
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
                <div class="mt-12 w-full ruonded p-5 customBoxShadow flex flex-col gap-y-6">
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
                <div class="mt-12 w-full ruonded p-5 customBoxShadow flex flex-col gap-y-6">
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
    `
}