function addButtonToContainer({ url, text, new_page = true, prepend = true, container_selector }) {
    // Validate the container selector
    const $container = $(container_selector);
    if ($container.length === 0) {
        console.error(`Container not found for selector: ${container_selector}`);
        return;
    }

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

    // Add the button to the container
    if (prepend) {
        $container.prepend($button);
    } else {
        $container.append($button);
    }
    return $button
}



// Make functions available in the global namespace or under a specific object
window.Helpers = {
    addButtonToContainer,
    // Add more helper functions here as needed
};
