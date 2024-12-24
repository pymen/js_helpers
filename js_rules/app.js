
const header_selector = "#root > header"
const container_selector = "#root > header > div.flex.items-center";
const domain = Helpers.getMainDomain();
const btn_cls = "rounded-lg border p-1.5 lg:block";
const background_color = {
	'gantest.com': 'green',
	'ganstage.com': 'red',
}[domain]


const mailhog_link_id = 'mailhog_link';
const mailhog_href = `https://mailhog.${domain}/`
const mailhog_link_params = {
	id: mailhog_link_id,
	url: mailhog_href,
	text: 'MAILHOG',
	className: btn_cls
}
const mailhog_link = Helpers.buildLink(mailhog_link_params);
mailhog_link.css({ 'color': 'green', 'font-size': '150%' })

const admin_link_id = 'admin_link';
const admin_href = `https://administration.${domain}/`
const admin_link_params = {
	id: admin_link_id,
	url: admin_href,
	text: 'ADMIN',
	className: btn_cls
}
const admin_link = Helpers.buildLink(admin_link_params);
admin_link.css({ 'color': 'red', 'font-size': '150%' });


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


const CONFIG = [
  	{ action: '$', params: container_selector },
	{ action: 'prepend', params: mailhog_link},

	{ action: '$', params: container_selector },
	{ action: 'prepend', params: admin_link},

	{ action: '$', params: header_selector },
	{ action: 'prepend', params: site_link},
];


function start(){
	process_config(CONFIG)

}

setTimeout(start, 1000);
