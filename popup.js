// popup.js

document.addEventListener('DOMContentLoaded', () => {
    const enableThemeCheckbox = document.getElementById('enableTheme');
    const customizeButton = document.getElementById('customizeTheme');

    // Initialize checkbox state based on saved settings
    chrome.storage.sync.get('themeEnabled', (data) => {
        enableThemeCheckbox.checked = data.themeEnabled || false;
    });

    // Listen for changes to the checkbox
    enableThemeCheckbox.addEventListener('change', () => {
        const themeEnabled = enableThemeCheckbox.checked;
        chrome.storage.sync.set({ themeEnabled });

        // Reload Canvas tabs to apply changes
        chrome.tabs.query({ url: '*://*.instructure.com/*' }, (tabs) => {
            tabs.forEach((tab) => {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['content.js']
                });
            });
        });
    });

    // Open options page when "Customize Theme" button is clicked
    customizeButton.addEventListener('click', () => {
        chrome.runtime.openOptionsPage();
    });
});

