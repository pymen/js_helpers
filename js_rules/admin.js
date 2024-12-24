
const domain = Helpers.getMainDomain();
const btn_cls = "rounded-lg border p-1.5 lg:block";
const background_color = {
	'gantest.com': 'green',
	'ganstage.com': 'red',
}[domain]


const site_id = 'site_link';
const site_link_params = {
	id: site_id,
	url: document.location.origin,
	text: domain.toUpperCase(),
	className: btn_cls,
	new_page: false
}


const site_link = Helpers.buildLink(site_link_params);
const site_link_css = {
	'color': 'yellow',
	'font-size': '150%',
	'background-color': background_color
}
site_link.css(site_link_css);

const image_selector = 'img[alt="GAN admin"]'
const container_selector = ".navbar-brand";

const image2_selector = 'div.logo a'
const container2_selector = ".site-header.clearfix div.logo";


const CONFIG = [
	{ action: '$', params: image_selector },
	{ action: 'remove'},

	{ action: '$', params: container_selector },
	{ action: 'append', params: site_link},

	{ action: '$', params: image2_selector },
	{ action: 'remove'},

	{ action: '$', params: container2_selector },
	{ action: 'prepend', params: site_link},

];


process_config_on_page_load(CONFIG, 500);
