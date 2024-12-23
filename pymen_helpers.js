
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


function addButtonToContainer({ $button, new_page = true, prepend = true, container_selector }) {
    // Validate the container selector
    const $container = $(container_selector);
    if ($container.length === 0) {
        console.error(`Container not found for selector: ${container_selector}`);
        return;
    }

    // Add the button to the container
    if (prepend) {
        $container.prepend($button);
    } else {
        $container.append($button);
    }
    return $button
}


const processOperation = (element, config) => {
    if (config.method && typeof element[config.method] === 'function') {
        return element[config.method](config.params);
    } else if (config.func && typeof config.func === 'function') {
        return config.func(element);
    } else {
        console.error(`Unsupported configuration:`, config);
        return null;
    }
};

// The observer callback function
const observerCallback = function (mutationsList, observer, config) {
    mutationsList.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
            config.forEach((configItem) => {
                const elements = $(configItem.selector);
                if (elements.length > 0) {
                    elements.each(function (index, value) {
                        const el = $(value);

                        // Determine the container using the unified utility
                        const container = configItem.find ? processOperation(el, configItem.find) : el;
                        if (!container) return; // Skip if no valid container found

                        // Perform actions on the container using the unified utility
                        if (configItem.do) {
                            // If `do` is an array, iterate over each operation
                            const operations = Array.isArray(configItem.do) ? configItem.do : [configItem.do];
                            operations.forEach((operation) => {
                                processOperation(container, operation);
                            });
                        }
                    });
                }
            });
        }
    });
};


const runObserverImmediately = function(config) {
    observerCallback([], null, config); // Immediately run callback for existing elements
};


const observe = (target, config) => {
    const observerInstance = new MutationObserver((mutationsList, observer) => observerCallback(mutationsList, observer, config))
    observerInstance.observe(target, {childList: true, subtree: true})

    // Immediately run the observer callback for existing elements
    runObserverImmediately(config)
}

const getMainDomain = function (){
    const hostnameParts = window.location.hostname.split('.');
    return hostnameParts.slice(-2).join('.');
}


// Make functions available in the global namespace or under a specific object
window.Helpers = {
    addButtonToContainer,
    buildLink,
    getMainDomain,
    observe
};
