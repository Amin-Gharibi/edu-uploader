import { createHeaderBanner, deleteHeaderBanner, getHeaderBanners } from "./funcs/headerBanners.js"
import BASE_URL from "./util/BASE_URL.js"
import { createToast } from "./util/toastNotification.js"

async function handlePanelHeaderBannerContent () {
    const [allHeaderBanners] = await Promise.all([getHeaderBanners()])

    const dynamicContentContainer = document.querySelector('.dynamic-content-container')
    dynamicContentContainer.innerHTML = `
                <form class="add-focused-subject mt-10">
                    <div class="grid grid-cols-2 xl:grid-cols-3 gap-5 ">
                        <div class="flex flex-col gap-y-2">
                            <span class="text-xs md:text-sm text-gray-600">
                                متن روی کاور:
                                <span class="text-red-600">
                                    *
                                </span>
                            </span>
                            <input id="title-input" type="text" placeholder="متن روی کاور..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base" required>
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <span class="text-xs md:text-sm text-gray-600">
                                لینک:
                            </span>
                            <input id="href-input" type="text" placeholder="لینک..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base">
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <span class="text-xs md:text-sm text-gray-600">
                                عکس کاور:
                                <span class="text-red-600">
                                    *
                                </span>
                            </span>
                            <input id="cover-input" accept="image/png, image/jpeg" type="file" class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base" required>
                        </div>
                    </div>
                    <div class="flex justify-center items-center mt-10">
                        <button type="submit" class="w-60 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg text-sm p-2 sm:px-5 sm:py-2.5 focus:outline-none">
                            ایجاد بنر
                        </button>
                    </div>
                </form>

                <div class="max-w-[330px] xs:max-w-[390px] md:max-w-[490px] lg:max-w-[700px] xl:max-w-max mt-12 w-full ruonded p-5 customBoxShadow flex flex-col gap-y-6">
                    <h2 class="font-extraBold text-lg flex justify-start items-center gap-x-2">
                        <span class="w-4 h-1 bg-blue-500 shadow-sm shadow-blue-500 rounded"></span>
                            بنر ها
                        <span class="w-4 h-1 bg-blue-500 shadow-sm shadow-blue-500 rounded"></span>
                    </h2>
                    <table>
                        <thead class="bg-blue-200/20 text-gray-500">
                            <tr>
                                <th>تیتر</th>
                                <th>لینک</th>
                                <th>عکس</th>
                                <th>ویرایش</th>
                                <th>حذف</th>
                            </tr>
                        </thead>
                        <tbody class="header-banners-container divide-y">
                            ${allHeaderBanners.length && allHeaderBanners.map(headerBanner => {
        return `
                                    <tr>
                                        <td class="max-w-[200px] overflow-hidden line-clamp-1">${headerBanner.title}</td>
                                        <td>${headerBanner.href}</td>
                                        <td>
                                            <a target="_blank" href="${BASE_URL}/headerBanners/${headerBanner.cover}" class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded sm:rounded-lg py-1.5 px-5 text-sm focus:outline-none">
                                                مشاهده
                                            </a>
                                        </td>
                                        <td>
                                            <button data-value="${headerBanner._id}" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg py-1.5 px-5 text-sm focus:outline-none">
                                                ویرایش
                                            </button>
                                        </td>
                                        <td>
                                            <button data-value="${headerBanner._id}" class="delete-btns text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded sm:rounded-lg py-1.5 px-5 text-sm focus:outline-none">
                                                حذف
                                            </button>
                                        </td>
                                    </tr>
                                `
    }).join('') || `
                            `}
                        </tbody>
                    </table>
                </div>
            `

    const deleteBtns = document.querySelectorAll('.delete-btns')
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            await deleteHandler(btn)
        })
    })

    const deleteHandler = async (btn) => {
        btn.innerHTML = `
                    <div role="status" class="flex justify-center">
                        <svg aria-hidden="true" class="w-[18px] h-[18px] text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    </div>
                    `

        const data = await deleteHeaderBanner(btn.dataset.value.trim())
        if (data.ok) {
            createToast("success", "بنر با موفقیت حذف شد")
            btn.parentElement.parentElement.remove()
        } else {
            createToast("error", data.data.message)
            btn.innerHTML = `
                        حذف
                    `
        }
    }

    const addFocusedSubjectForm = document.querySelector('form.add-focused-subject')
    const submitBtn = addFocusedSubjectForm.querySelector('button[type="submit"]')
    addFocusedSubjectForm.addEventListener('submit', async event => {
        event.preventDefault()

        submitBtn.innerHTML = `
                <div role="status" class="flex justify-center">
                    <svg aria-hidden="true" class="w-[18px] h-[18px] text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
                `

        const titleInput = document.querySelector('#title-input')
        const hrefInput = document.querySelector('#href-input')
        const coverInput = document.querySelector('#cover-input')

        const data = await createHeaderBanner(titleInput.value.trim(), hrefInput.value.trim(), coverInput.files[0]);

        if (data.ok) {
            createToast("success", "بنر با موفقیت ایجاد شد")
            submitBtn.innerHTML = `
                        <div class="w-full h-full flex justify-center items-center">
                            <svg class="w-5 h-5 text-white">
                                <use href="#check"></use>
                            </svg>
                        </div>
                    `

            const headerBanner = data.data.headerBanner
            const headerBannersContainer = document.querySelector('.header-banners-container')

            headerBannersContainer.insertAdjacentHTML('beforeend', `
                        <tr>
                            <td class="max-w-[200px] overflow-hidden line-clamp-1">${headerBanner.title}</td>
                            <td>${headerBanner.href}</td>
                            <td>
                                <a target="_blank" href="${BASE_URL}/headerBanners/${headerBanner.cover}" class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded sm:rounded-lg py-1.5 px-5 text-sm focus:outline-none">
                                    مشاهده
                                </a>
                            </td>
                            <td>
                                <button data-value="${headerBanner._id}" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg py-1.5 px-5 text-sm focus:outline-none">
                                    ویرایش
                                </button>
                            </td>
                            <td>
                                <button data-value="${headerBanner._id}" class="delete-btns text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded sm:rounded-lg py-1.5 px-5 text-sm focus:outline-none">
                                    حذف
                                </button>
                            </td>
                        </tr> 
                    `)

            const deleteBtns = document.querySelectorAll('.delete-btns')
            deleteBtns.forEach(btn => {
                btn.addEventListener('click', async () => {
                    await deleteHandler(btn)
                })
            })

        } else {
            createToast("error", data.data.message)
            submitBtn.innerHTML = `
                        ایجاد بنر
                    `
        }
    })
}

export {
    handlePanelHeaderBannerContent
}