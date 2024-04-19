import {getAllHeaderMenus} from "../funcs/headerMenus.js";
import {getHeaderLogo} from "../funcs/headerLogos.js";
import {getHeaderBanners} from "../funcs/headerBanners.js";

const getHeaderData = async () => {
	const [headerMenus, headerLogo, headerBanners] = await Promise.all([getAllHeaderMenus(), getHeaderLogo(), getHeaderBanners()])

	return {headerMenus, headerLogo, headerBanners}
}

export default getHeaderData