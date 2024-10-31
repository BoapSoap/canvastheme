document.addEventListener('DOMContentLoaded', () => {
    const enableThemeCheckbox = document.getElementById('enableTheme');

    // Initialize checkbox state based on saved settings
    chrome.storage.sync.get('themeEnabled', (data) => {
        enableThemeCheckbox.checked = data.themeEnabled || false;
    });

    // Listen for changes to the checkbox
    enableThemeCheckbox.addEventListener('change', () => {
        const themeEnabled = enableThemeCheckbox.checked;
        chrome.storage.sync.set({ themeEnabled });
    });
});


