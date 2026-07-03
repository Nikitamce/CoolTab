chrome.runtime.onInstalled.addListener((_details) => {
    chrome.runtime.setUninstallURL('https://iso53.github.io/CoolTab/#/uninstall');
});

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.type === 'FETCH_YAHOO') {
        fetch(request.url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => sendResponse({ data }))
            .catch(error => {
                console.error('Fetch error:', error);
                sendResponse({ error: error.message });
            });
        return true; // Keep the message channel open for async response
    }
});
