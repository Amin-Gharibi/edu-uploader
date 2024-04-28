import { getUserUploads } from "./funcs/user.js"
import BASE_URL from "./util/BASE_URL.js"

async function handlePanelUploadsContent (info) {
    const [userUploads] = await Promise.all([getUserUploads()])

    const dynamicContentContainer = document.querySelector('.dynamic-content-container')
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

export {
    handlePanelUploadsContent
}