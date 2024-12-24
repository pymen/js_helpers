function buildLink({url, text, className = "", id = "", new_page = true}) {
    // Create the button
    const $button = $('<a></a>')
        .attr('href', url)
        .text(text)

    // Set to open in a new page if new_page is true
    if (new_page) {
        $button.attr({
            target: "_blank",
            rel: "noopener noreferrer" // For security
        })
    }

    if (className) {
        $button.addClass(className)
    }
    if (id) {
        $button.attr('id', id) // Add the ID if provided
    }

    return $button
}

const processOperation = ({element, action, params}) => {
    let rv
    console.log(`Element ${element}, action ${action}, params ${params}`)
    const NEW_ACTIONS = ['$', 'closest', 'find']

    if (element && typeof element[action] === 'function') {
        rv = element[action](params)
    } else if (typeof window[action] === 'function') {
        rv = window[action](params)
    } else {
        console.error(`Unsupported configuration:`, action)
        return null
    }

    if (NEW_ACTIONS.includes(action)) {
        return (rv || element)
    } else {
        return element
    }

}


const process_config = function (config) {
    let param_dict, element
    config.forEach((configItem) => {
        param_dict = {
            'action': configItem['action'],
            'params': configItem['params'],
            'element': element
        }
        element = processOperation(param_dict)
    })
}


const getMainDomain = function () {
    const hostnameParts = window.location.hostname.split('.')
    return hostnameParts.slice(-2).join('.')
}


function wait_page_for_load(func_to_run, params, time_to_wait = 1000) {
    let debounceTimer

    // Callback function for MutationObserver
    const observerCallback = function () {
        // Clear the previous debounce timer
        clearTimeout(debounceTimer)

        // Set a new timer to trigger the user function after the quiet period
        debounceTimer = setTimeout(() => {
            observer.disconnect() // Stop observing once the function is triggered
            func_to_run(params) // Execute the user-provided function
        }, time_to_wait)
    }

    // Create and initialize the MutationObserver
    const observer = new MutationObserver(observerCallback)

    // Start observing the document body for changes
    observer.observe(document.body, {childList: true, subtree: true})

    console.log('MutationObserver initialized, waiting for page to load...')
}

function on_page_load(func_to_run, params, time_to_wait = 1000) {
    $(document).ready(function () {
        console.log('Document is ready!')
        wait_page_for_load(func_to_run, params, time_to_wait)
    })
}

function process_config_on_page_load(config, time_to_wait = 1000) {
    on_page_load(process_config, config, time_to_wait)
}


// Make functions available in the global namespace or under a specific object
window.Helpers = {
    buildLink,
    getMainDomain,
    process_config,
    on_page_load,
    process_config_on_page_load
}
