import { registerHandler } from "./funcs/auth.js"
import { getAllFocusedSubjects } from "./funcs/focusedSubjects.js"
import { adminEditingUser, deleteUser, getAllUsers, getOneByAdmin } from "./funcs/user.js"
import { createToast } from "./util/toastNotification.js"

async function handlePanelUserContent () {
    const [allUsers, allFocusedSubjects] = await Promise.all([getAllUsers(), getAllFocusedSubjects()])

    const dynamicContentContainer = document.querySelector('.dynamic-content-container')
    dynamicContentContainer.innerHTML = `
                <form class="add-new-user mt-10">
                    <div class="grid grid-cols-2 xl:grid-cols-3 gap-5 ">
                        <div class="flex flex-col gap-y-2">
                            <span class="text-xs md:text-sm text-gray-600">
                                نام کاربری:
                                <span class="required-title text-red-600">
                                    *
                                </span>
                            </span>
                            <input id="username-input" type="text" placeholder="نام کاربری..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base" required>
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <span class="text-xs md:text-sm text-gray-600">
                                رمز عبور:
                                <span class="required-title text-red-600">
                                    *
                                </span>
                            </span>
                            <input id="password-input" type="text" placeholder="رمز عبور..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base" required>
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <span class="text-xs md:text-sm text-gray-600">
                                نام:
                                <span class="required-title text-red-600">
                                    *
                                </span>
                            </span>
                            <input id="first-name-input" type="text" placeholder="نام..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base" required>
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <span class="text-xs md:text-sm text-gray-600">
                                نام خانوادگی:
                                <span class="required-title text-red-600">
                                    *
                                </span>
                            </span>
                            <input id="last-name-input" type="text" placeholder="نام خانوادگی..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base" required>
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <span class="text-xs md:text-sm text-gray-600">
                                نام منطقه:
                                <span class="required-title text-red-600">
                                    *
                                </span>
                            </span>
                            <input id="area-name-input" type="text" placeholder="نام منطقه..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base" required>
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <span class="text-xs md:text-sm text-gray-600">
                                نام استان:
                                <span class="required-title text-red-600">
                                    *
                                </span>
                            </span>
                            <input id="province-name-input" type="text" placeholder="نام استان..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base" required>
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <span class="text-xs md:text-sm text-gray-600">
                                نقش:
                                <span class="required-title text-red-600">
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

                <div class="all-users-section-container max-w-[330px] xs:max-w-[390px] md:max-w-[490px] lg:max-w-[700px] xl:max-w-max mt-12 w-full ruonded p-5 customBoxShadow flex flex-col gap-y-6">
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
                                            <button data-value="${user._id}" class="edit-btns text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg py-1.5 px-5 text-sm focus:outline-none">
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
            await deleteHandler(btn)
        })
    })

    const deleteHandler = async (btn) => {
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
    }

    const editBtns = document.querySelectorAll('.edit-btns')
    editBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            await editHandler(btn)
        })
    })

    const editHandler = async (btn) => {
        dynamicContentContainer.insertAdjacentHTML('beforeend', `
        <div class="load-data-for-edit-loader w-full h-full absolute inset-0 bg-black/50 backdrop-blur-sm">
            <div class='h-max w-max absolute inset-0 m-auto flex space-x-2 justify-center items-center bg-transparent'>
                <span class='sr-only'></span>
                <div class='h-5 w-5 bg-blue-700 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div class='h-5 w-5 bg-blue-700 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div class='h-5 w-5 bg-blue-700 rounded-full animate-bounce'></div>
            </div>
        </div>
        `)

        const data = await getOneByAdmin(btn.dataset.value.trim())

        const loader = document.querySelector('.load-data-for-edit-loader')
        
        if (data.ok) {
            const user = data.data.user

            console.log(user);

            const allUsersSectionContainer = document.querySelector('.all-users-section-container')
            allUsersSectionContainer.classList.add('hidden')

            loader.remove()

            const usernameInput = document.querySelector('#username-input')
            const passwordInput = document.querySelector('#password-input')
            const firstNameInput = document.querySelector('#first-name-input')
            const lastNameInput = document.querySelector('#last-name-input')
            const areaNameInput = document.querySelector('#area-name-input')
            const provinceNameInput = document.querySelector('#province-name-input')
            const roleInput = document.querySelector('#role-input')
            const focusedSubjectInput = document.querySelector('#focused-subject-input')

            const requiredTitle = document.querySelectorAll('.required-title')
            requiredTitle.forEach(title => title.remove())

            usernameInput.value = user.username
            usernameInput.required = false
            passwordInput.placeholder = 'رمز عبور جدید کاربر...'
            passwordInput.required = false
            firstNameInput.value = user.firstName
            firstNameInput.required = false
            lastNameInput.value = user.lastName
            lastNameInput.required = false
            areaNameInput.value = user.areaName
            areaNameInput.required = false
            provinceNameInput.value = user.provinceName
            provinceNameInput.required = false
            roleInput.value = user.role
            roleInput.required = false
            if (user.role === 'ADMIN') {
                focusedSubjectInput.parentElement.remove()
            } else {
                focusedSubjectInput.value = user.focusedSubject._id
                focusedSubjectInput.required = false
            }

            submitBtn.parentElement.insertAdjacentHTML('beforeend', `
                <button type="submit" class="w-60 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg text-sm p-2 sm:px-5 sm:py-2.5 focus:outline-none">
                    ثبت
                </button>
            `)

            submitBtn.remove()

            const editSubmitBtn = document.querySelector('form button[type="submit"]')

            editSubmitBtn.addEventListener('click', async event => {
                event.preventDefault()
                
                submitBtn.innerHTML = `
                <div role="status" class="flex justify-center">
                    <svg aria-hidden="true" class="w-[18px] h-[18px] text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
                `

                const data = await adminEditingUser(btn.dataset.value.trim(), usernameInput.value.trim(), passwordInput.value.trim(), firstNameInput.value.trim(), lastNameInput.value.trim(), areaNameInput.value.trim(), provinceNameInput.value.trim(), roleInput.value.trim(), focusedSubjectInput?.value?.trim())

                if (data.ok) {
                    editSubmitBtn.innerHTML =  `
                    <div class="w-full h-full flex justify-center items-center">
                        <svg class="w-5 h-5 text-white">
                            <use href="#check"></use>
                        </svg>
                    </div>
                `

                    createToast('success', data.data.message)
                    
                } else {
                    createToast('error', data.data.message)
                }
            })

        } else {
            loader.remove()
            createToast('error', data.data.message)
        }
    }

    const submitBtn = document.querySelector('form button[type="submit"]')
    submitBtn.addEventListener('click', async event => {
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
                                <button data-value="${user._id}" class="edit-btns text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg py-1.5 px-5 text-sm focus:outline-none">
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

            const deleteBtns = document.querySelectorAll('.delete-btns')
            deleteBtns.forEach(btn => {
                btn.addEventListener('click', async () => {
                    await deleteHandler(btn)
                })
            })

        } else {
            createToast('error', data.data.message)
            submitBtn.innerHTML = `
                        ایجاد کاربر
                    `
        }
    })
}

export { handlePanelUserContent };