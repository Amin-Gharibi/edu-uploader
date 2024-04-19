import {getAllHeaderMenus} from "../funcs/headerMenus.js";
import {getHeaderLogo} from "../funcs/headerLogos.js";
import {getHeaderBanners} from "../funcs/headerBanners.js";
import {toggleMultipleClasses} from "../util/utils.js";

const getHeaderData = async () => {
	const [headerMenus, headerLogo, headerBanners] = await Promise.all([getAllHeaderMenus(), getHeaderLogo(), getHeaderBanners()])

	const initMobileMenuToggling = () => {
		const toggleBtns = document.querySelectorAll('.toggle-mobile-menu')
		const mobileMenuContainer = document.querySelector('.mobile-menu--container')
		const mobileMenu = document.querySelector('.mobile-menu')

		const toggleClassesHandler = () => {
			toggleMultipleClasses(mobileMenuContainer, '!visible', '!opacity-100')
			mobileMenu.classList.toggle('!right-0')
		}

		toggleBtns.forEach(toggleBtn => {
			toggleBtn.addEventListener('click', toggleClassesHandler)
		})

		mobileMenuContainer.addEventListener('click', event => {
			if (event.target.classList.contains('mobile-menu--container')) {
				toggleClassesHandler()
			}
		})
	}

	const initMobileMenuItemsTogglingSubMenus = () => {
		const mobileMenuItems = document.querySelectorAll('.mobile-menu--items:has(ul)')

		mobileMenuItems.forEach(item => {
			item.addEventListener('click', () => {
				item.classList.toggle('active')
			})
		})
	}

	return {headerMenus, headerLogo, headerBanners, initMobileMenuToggling, initMobileMenuItemsTogglingSubMenus}
}

export default getHeaderData