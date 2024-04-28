import { createHeaderMenu, deleteHeaderMenu, getAllHeaderMenus } from "./funcs/headerMenus.js"
import { createHeaderSubMenu } from "./funcs/headerSubMenus.js"
import { createToast } from "./util/toastNotification.js"

async function handlePanelHeaderMenuContent () {
    const [allMenus] = await Promise.all([getAllHeaderMenus()])

    const sendingSubmenus = []

    const dynamicContentContainer = document.querySelector('.dynamic-content-container')
    dynamicContentContainer.innerHTML = `
            <form class="add-header-menu mt-10">
                <div class="grid grid-cols-2 xl:grid-cols-3 gap-5 ">
                    <div class="flex flex-col gap-y-2">
                        <span class="text-xs md:text-sm text-gray-600">
                            نام:
                            <span class="text-red-600">
                                *
                            </span>
                        </span>
                        <input id="title-input" type="text" placeholder="نام فارسی..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base" required>
                    </div>
                    <div class="flex flex-col gap-y-2">
                        <span class="text-xs md:text-sm text-gray-600">
                            لینک:
                        </span>
                        <input id="href-input" type="text" placeholder="لینک..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base">
                    </div>
                    <div class="row-start-2 col-span-2 xl:col-span-3 grid grid-cols-3 gap-5">
                        <h2>
                        زیر منو ها
                        </h2>
                        <div class="row-start-2 flex flex-col gap-y-2 h-max">
                            <span class="text-xs md:text-sm text-gray-600">
                                نام:
                            </span>
                            <input id="submenu-title-input" type="text" placeholder="نام فارسی..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base">
                        </div>
                        <div class="row-start-2 flex flex-col gap-y-2 h-max">
                            <span class="text-xs md:text-sm text-gray-600">
                                لینک:
                            </span>
                            <input id="submenu-href-input" type="text" placeholder="لینک..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base">
                        </div>
                        <button type="button" class="add-sub-menu row-start-2 col-start-3 h-max w-60 self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg text-sm p-2 sm:px-5 sm:py-2.5 focus:outline-none">
                            اضافه کردن زیر منو
                        </button>
                        <div class="row-start-3 flex flex-col p-3 border border-gray-400 rounded">
                            <h2 class="text-gray-600">
                                زیر منوهای اضافه شده:
                            </h2>
                            <ul class="submenus-container list-disc px-5 group">
                                <span class="block group-[.active]:hidden mt-10 text-gray-500 text-sm text-center">
                                    چیزی اضافه نشده...
                                </span>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center items-center mt-10">
                    <button type="submit" class="w-60 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg text-sm p-2 sm:px-5 sm:py-2.5 focus:outline-none">
                        ایجاد هدر منو
                    </button>
                </div>
            </form>

            <div class="max-w-[330px] xs:max-w-[390px] md:max-w-[490px] lg:max-w-[700px] xl:max-w-max mt-12 w-full ruonded p-5 customBoxShadow flex flex-col gap-y-6">
                <h2 class="font-extraBold text-lg flex justify-start items-center gap-x-2">
                    <span class="w-4 h-1 bg-blue-500 shadow-sm shadow-blue-500 rounded"></span>
                        هدر منو ها
                    <span class="w-4 h-1 bg-blue-500 shadow-sm shadow-blue-500 rounded"></span>
                </h2>
                <table>
                    <thead class="bg-blue-200/20 text-gray-500">
                        <tr>
                            <th>نام</th>
                            <th>لینک</th>
                            <th>زیر منو ها</th>
                            <th>ویرایش</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody class="header-menus-container divide-y">
                        ${allMenus.map(menu => {
        return `
                                <tr>
                                    <td>${menu.title}</td>
                                    <td class="max-w-[200px] overflow-hidden line-clamp-1">
                                        <a class="${menu.href}">
                                        ${menu.href}
                                        </a>
                                    </td>
                                    <td>
                                        <select>
                                            ${menu.subMenus.map(subMenu => {
            return `
                                                    <option value="">
                                                        ${subMenu.title}
                                                    </option>
                                                `
        })}
                                        </select>
                                    </td>
                                    <td>
                                        <button data-value="${menu._id}" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg py-1.5 px-5 text-sm focus:outline-none">
                                            ویرایش
                                        </button>
                                    </td>
                                    <td>
                                        <button data-value="${menu._id}" class="delete-btns text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded sm:rounded-lg py-1.5 px-5 text-sm focus:outline-none">
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


    const addSubMenuBtn = document.querySelector('.add-sub-menu')
    const subMenusContainer = document.querySelector('.submenus-container')
    addSubMenuBtn.addEventListener('click', () => {
        const subMenuTitle = document.querySelector('#submenu-title-input')
        const subMenuLink = document.querySelector('#submenu-href-input')

        sendingSubmenus.push({
            title: subMenuTitle.value.trim(),
            href: subMenuLink.value.trim()
        })

        subMenusContainer.classList.add('active')
        subMenusContainer.insertAdjacentHTML('beforeend', `
                <li>
                    <div class="mt-6 flex justify-between items-center">
                        <span>
                            ${subMenuTitle.value.trim()}
                        </span>
                        <span class="line-clamp-1">
                            ${subMenuLink.value.trim()}
                        </span>
                    </div>
                </li>
                `)

        subMenuTitle.value = ''
        subMenuLink.value = ''
    })

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

        const data = await deleteHeaderMenu(btn.dataset.value.trim())
        if (data.ok) {
            createToast("success", "هدر منو با موفقیت حذف شد")
            btn.parentElement.parentElement.remove()
        } else {
            createToast("error", data.data.message)
            btn.innerHTML = `
                        حذف
                    `
        }
    }

    const addNewMenuForm = document.querySelector('form.add-header-menu')
    const submitBtn = addNewMenuForm.querySelector('button[type="submit"]')
    addNewMenuForm.addEventListener('submit', async event => {
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

        const data = await createHeaderMenu(titleInput.value.trim(), hrefInput.value.trim());

        if (data.ok) {
            let addSubMenusStatus = true
            sendingSubmenus.forEach(async subMenu => {
                if (addSubMenusStatus) {
                    const subMenuData = await createHeaderSubMenu(subMenu.title, subMenu.href, data.data.headerMenu._id)
                    if (!subMenuData.ok) {
                        addSubMenusStatus = false
                    }
                }
            })

            if (addSubMenusStatus) {
                createToast("success", "منو هدر با موفقیت ایجاد شد")
                submitBtn.innerHTML = `
                            <div class="w-full h-full flex justify-center items-center">
                                <svg class="w-5 h-5 text-white">
                                    <use href="#check"></use>
                                </svg>
                            </div>
                        `

                const headerMenu = data.data.headerMenu
                const headerMenusContainer = document.querySelector('.header-menus-container')

                headerMenusContainer.insertAdjacentHTML('afterbegin', `
                        <tr>
                            <td>${headerMenu.title}</td>
                            <td class="max-w-[200px] overflow-hidden line-clamp-1">
                                <a href="${headerMenu.href}">
                                ${headerMenu.href}
                                </a>
                            </td>
                            <td>
                                <select>
                                    ${sendingSubmenus.map(subMenu => {
                    return `
                                            <option value="">${subMenu.title}</option>
                                        `
                })}
                                </select>
                            </td>
                            <td>
                                <button data-value="${headerMenu._id}" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg py-1.5 px-5 text-sm focus:outline-none">
                                    ویرایش
                                </button>
                            </td>
                            <td>
                                <button data-value="${headerMenu._id}" class="delete-btns text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded sm:rounded-lg py-1.5 px-5 text-sm focus:outline-none">
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
            }

        } else {
            createToast("error", data.data.message)
            submitBtn.innerHTML = `
                        ایجاد هدر منو
                    `
        }
    })
}

export {
    handlePanelHeaderMenuContent
}