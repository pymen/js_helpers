const css_yellow_background = { 'background-color': '#FFFFD8' };
const css_green_background = { 'background-color': '#d2f8d2' };
const approved = { 'border-color': 'red', 'margin-left': '45px' };

const CONFIG = [
	{ action: '$', params: "a.js-no-trigger.author-link[href='/pymen']" },
	{ action: 'closest', params: 'li.issue' },
	{ action: 'css', params: css_yellow_background },

	{
		action: '$',
		params: "a.user-avatar-link.author-link:not(.js-no-trigger)[href='/pymen']",
	},
	{ action: 'closest', params: 'li.issue' },
	{ action: 'css', params: css_green_background },

	{ action: '$', params: 'span.gl-badge-content:contains("Approved")' },
	{ action: 'closest', params: 'li.issue' },
	{ action: 'css', params: approved },
];


process_config_on_page_load(CONFIG, 500)
