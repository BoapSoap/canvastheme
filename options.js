// options.js

document.addEventListener('DOMContentLoaded', () => {
    const customCSSTextarea = document.getElementById('customCSS');
    const saveButton = document.getElementById('saveButton');

    // Load saved custom CSS
    chrome.storage.sync.get('customCSS', (data) => {
        customCSSTextarea.value = data.customCSS || '';
    });

    // Save custom CSS when the save button is clicked
    saveButton.addEventListener('click', () => {
        const customCSS = customCSSTextarea.value;
        chrome.storage.sync.set({ customCSS }, () => {
            alert('Custom CSS saved!');

            // Apply the new CSS to open Canvas tabs
            chrome.tabs.query({ url: '*://*.instructure.com/*' }, (tabs) => {
                tabs.forEach((tab) => {
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        files: ['content.js']
                    });
                });
            });
        });
    });
});
