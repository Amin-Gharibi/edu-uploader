import { getMe } from "./funcs/auth.js"
import { editPassword, editUser } from "./funcs/user.js"
import { createToast } from "./util/toastNotification.js"
import { logOut } from "./util/utils.js"

async function handlePanelMeContent () {
    const [me] = await Promise.all([getMe()])

    const dynamicContentContainer = document.querySelector('.dynamic-content-container')
    dynamicContentContainer.innerHTML = `
<form class="edit-user mt-10">
<h2 class="font-bold text-lg">
    تغییر اطلاعات
</h2>
<div class="mt-5 grid grid-cols-2 xl:grid-cols-3 gap-5 ">
    <div class="flex flex-col gap-y-2">
        <span class="text-xs md:text-sm text-gray-600">
            نام کاربری:
            <span class="text-red-600">
                *
            </span>
        </span>
        <input id="username-input" value="${me[0].username}" type="text" placeholder="نام کاربری..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base" required>
    </div>
    <div class="flex flex-col gap-y-2">
        <span class="text-xs md:text-sm text-gray-600">
            نام:
            <span class="text-red-600">
                *
            </span>
        </span>
        <input id="first-name-input" value=${me[0].firstName} type="text" placeholder="نام..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base" required>
    </div>
    <div class="flex flex-col gap-y-2">
        <span class="text-xs md:text-sm text-gray-600">
            نام خانوادگی:
            <span class="text-red-600">
                *
            </span>
        </span>
        <input id="last-name-input" value=${me[0].lastName} type="text" placeholder="نام خانوادگی..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base" required>
    </div>
    <div class="flex flex-col gap-y-2">
        <span class="text-xs md:text-sm text-gray-600">
            نام منطقه:
            <span class="text-red-600">
                *
            </span>
        </span>
        <input id="area-name-input" value=${me[0].areaName} type="text" placeholder="نام منطقه..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base" required>
    </div>
    <div class="flex flex-col gap-y-2">
        <span class="text-xs md:text-sm text-gray-600">
            نام استان:
            <span class="text-red-600">
                *
            </span>
        </span>
        <input id="province-name-input" value=${me[0].provinceName} type="text" placeholder="نام استان..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base" required>
    </div>
</div>
<div class="flex justify-center items-center mt-10">
    <button type="submit" class="w-60 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg text-sm p-2 sm:px-5 sm:py-2.5 focus:outline-none">
        ویرایش
    </button>
</div>
</form>

<form class="change-password mt-16">
<h2 class="font-bold text-lg">
    تغییر رمز عبور
</h2>
    <div class="mt-5 grid grid-cols-2 xl:grid-cols-3 gap-5 ">
        <div class="flex flex-col gap-y-2">
            <span class="text-xs md:text-sm text-gray-600">
                رمز عبور کنونی:
                <span class="text-red-600">
                    *
                </span>
            </span>
            <input id="current-password-input" type="text" placeholder="رمز عبور کنونی..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base" required>
        </div>
        <div class="flex flex-col gap-y-2">
            <span class="text-xs md:text-sm text-gray-600">
                رمز عبور جدید:
                <span class="text-red-600">
                    *
                </span>
            </span>
            <input id="new-password-input" type="text" placeholder="رمز عبور جدید..." class="h-full p-2 border border-gray-300 outline-0 focus-within:border-gray-500 transition-colors focus-within:placeholder-gray-700 rounded text-sm md:text-base" required>
        </div>
    </div>
    <div class="flex justify-center items-center mt-10">
        <button type="submit" class="w-60 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded sm:rounded-lg text-sm p-2 sm:px-5 sm:py-2.5 focus:outline-none">
            ویرایش
        </button>
    </div>
</form>
    `

    const editUserForm = document.querySelector('form.edit-user')
    const editUserSubmitBtn = editUserForm.querySelector('button[type="submit"]')
    editUserForm.addEventListener('submit', async event => {
        event.preventDefault()

        editUserSubmitBtn.innerHTML = `
                <div role="status" class="flex justify-center">
                    <svg aria-hidden="true" class="w-[18px] h-[18px] text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
                `

        const usernameInput = document.querySelector('#username-input')
        const firstNameInput = document.querySelector('#first-name-input')
        const lastNameInput = document.querySelector('#last-name-input')
        const areaNameInput = document.querySelector('#area-name-input')
        const provinceNameInput = document.querySelector('#province-name-input')

        const data = await editUser(usernameInput.value.trim(), firstNameInput.value.trim(), lastNameInput.value.trim(), areaNameInput.value.trim(), provinceNameInput.value.trim())

        if (data.ok) {
            createToast('success', 'اطلاعات شما با موفقیت تغییر کرد')
            editUserSubmitBtn.innerHTML = `
                        <div class="w-full h-full flex justify-center items-center">
                            <svg class="w-5 h-5 text-white">
                                <use href="#check"></use>
                            </svg>
                        </div>
                    `
        } else {
            createToast('error', data.data.message)
            editUserSubmitBtn.innerHTML = `
                ویرایش
            `
        }
    })


    const editPasswordForm = document.querySelector('form.change-password')
    const editPasswordSubmitBtn = editPasswordForm.querySelector('button[type="submit"]')
    editPasswordForm.addEventListener('submit', async event => {
        event.preventDefault()

        editPasswordSubmitBtn.innerHTML = `
                <div role="status" class="flex justify-center">
                    <svg aria-hidden="true" class="w-[18px] h-[18px] text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
                `

        const currentPasswordInput = document.querySelector('#current-password-input')
        const newPasswordInput = document.querySelector('#new-password-input')

        const data = await editPassword(currentPasswordInput.value.trim(), newPasswordInput.value.trim())

        if (data.ok) {
            createToast('success', 'رمز عبور شما با موفقیت تغییر کرد')
            editPasswordSubmitBtn.innerHTML = `
                        <div class="w-full h-full flex justify-center items-center">
                            <svg class="w-5 h-5 text-white">
                                <use href="#check"></use>
                            </svg>
                        </div>
                    `
            logOut()
        } else {
            createToast('error', data.data.message)
            editPasswordSubmitBtn.innerHTML = `
                ویرایش
            `
        }
    })
}

export {
    handlePanelMeContent
}