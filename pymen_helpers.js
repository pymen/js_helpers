
function buildLink({ url, text, className = "", id = "", new_page = true}){
    // Create the button
    const $button = $('<a></a>')
        .attr('href', url)
        .text(text);

    // Set to open in a new page if new_page is true
    if (new_page) {
        $button.attr({
            target: "_blank",
            rel: "noopener noreferrer" // For security
        });
    }

    if (className) {
        $button.addClass(className);
    }
    if (id) {
        $button.attr('id', id); // Add the ID if provided
    }

    return $button
}

const processOperation = ({ element, action, params }) => {
    let rv;
    console.log(`Element ${element}, action ${action}, params ${params}`);
    const NEW_ACTIONS = ['$', 'closest', 'find']

    if (element && typeof element[action] === 'function') {
        rv = element[action](params);
    } else if (typeof window[action] === 'function') {
        rv = window[action](params)
    } else {
        console.error(`Unsupported configuration:`, action)
        return null
    }

    if (NEW_ACTIONS.includes(action)) {
    	return (rv || element);
    } else {
        return element;
    }

};


const process_config = function(config){
	let param_dict, element;
    config.forEach((configItem) => {
		param_dict = {
	    	'action': configItem['action'],
	    	'params': configItem['params'],
	    	'element': element
	    }
    	element = processOperation(param_dict);
	});
}



const observerCallback = function (mutationsList, observer, config) {
	observer.disconnect();

    mutationsList.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            observer.disconnect(); // Stop observing after the first iteration
            process_config(config)
        }
    });
};


const observe = (target, config) => {
    const observerInstance = new MutationObserver((mutationsList, observer) => observerCallback(mutationsList, observer, config))
    observerInstance.observe(target, {childList: true, subtree: true})

    // Immediately run the observer callback for existing elements
    observerCallback([], null, config);
}

const getMainDomain = function (){
    const hostnameParts = window.location.hostname.split('.');
    return hostnameParts.slice(-2).join('.');
}


// Make functions available in the global namespace or under a specific object
window.Helpers = {
    buildLink,
    getMainDomain,
    observe,
    process_config
};
