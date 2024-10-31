// content.js

// Function to inject CSS into the page
function injectCSS(cssContent) {
    const style = document.createElement('style');
    style.textContent = cssContent;
    document.head.appendChild(style);
}

// Fetch user settings and apply the theme
chrome.storage.sync.get(['themeEnabled', 'customCSS'], (data) => {
    if (data.themeEnabled) {
        injectCSS(data.customCSS || '');
    }
});

