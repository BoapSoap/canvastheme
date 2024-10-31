// content.js

// Function to inject CSS into the page
function injectCSS(cssContent) {
    let style = document.getElementById('customCanvasTheme');
    if (style) {
        // If style element already exists, update it
        style.textContent = cssContent;
    } else {
        // Create new style element
        style = document.createElement('style');
        style.id = 'customCanvasTheme';
        style.textContent = cssContent;
        document.head.appendChild(style);
    }
}

// Function to remove injected CSS
function removeCSS() {
    const style = document.getElementById('customCanvasTheme');
    if (style) {
        style.remove();
    }
}

// Default dark mode CSS
const defaultDarkModeCSS = `
/* Dark Mode Styles */

/* General */
body, html {
  background-color: #121212 !important;
  color: #e0e0e0 !important;
}

#content, .ic-Layout-contentMain {
  background-color: #121212 !important;
}

.ic-app-header, .ic-app-nav-toggle-and-crumbs, .ic-NavToggle__menu, .ic-nav-global-menu-list, .ic-NavMenu {
  background-color: #1f1f1f !important;
  color: #e0e0e0 !important;
}

.ic-app-header__menu-list-link, .ic-app-header__menu-list-item, .ic-app-header__menu-list {
  background-color: #1f1f1f !important;
  color: #e0e0e0 !important;
}

a, .ic-app-header__logomark {
  color: #bb86fc !important;
}

a:hover {
  color: #ff79c6 !important;
}

.ic-app-header__menu-list-link:hover, .ic-NavMenu-list-item__link:hover {
  background-color: #333333 !important;
}

/* Course Cards */
.ic-DashboardCard {
  background-color: #1f1f1f !important;
  color: #e0e0e0 !important;
}

.ic-DashboardCard__header_image {
  opacity: 0.2 !important;
}

/* Buttons */
.btn, .Button, .Button--primary, .Button--secondary {
  background-color: #333333 !important;
  color: #e0e0e0 !important;
  border-color: #555555 !important;
}

.btn:hover, .Button:hover {
  background-color: #444444 !important;
}

/* Inputs */
input, select, textarea {
  background-color: #1f1f1f !important;
  color: #e0e0e0 !important;
  border-color: #555555 !important;
}

input::placeholder, textarea::placeholder {
  color: #aaaaaa !important;
}

/* Discussions and Posts */
.discussion_topic, .discussion-reply, .reply, .discussion-content {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
}

/* Modules */
.context_module, .module-item-row, .context_module_item, .header-bar-outer-container {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
}

/* Quizzes */
.quiz_content, .quiz-header, .quiz-title {
  background-color: #121212 !important;
  color: #e0e0e0 !important;
}

/* Announcements */
.announcement {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
}

/* Grades */
.student_assignment, .grades_table, .gradebook-header {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
}

/* Messages */
.ConversationsMessage {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
}

/* Calendar */
#calendar, .fc-event, .fc-agenda-slots, .fc-agenda-axis {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
}

/* Sidebar */
.ic-Layout-rightAside {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
}

/* Tables */
table, th, td {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
  border-color: #333333 !important;
}

/* Tooltips */
.c-popover__body {
  background-color: #333333 !important;
  color: #e0e0e0 !important;
}

/* Modals */
.c-dialog {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
}

/* Alerts */
.ic-flash-warning, .ic-flash-info, .ic-flash-error, .ic-flash-success {
  background-color: #333333 !important;
  color: #e0e0e0 !important;
}

/* Code blocks */
code, pre {
  background-color: #1e1e1e !important;
  color: #e0e0e0 !important;
}

/* Scrollbars */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1e1e1e;
}

::-webkit-scrollbar-thumb {
  background: #333333;
}

::-webkit-scrollbar-thumb:hover {
  background: #444444;
}

/* Additional elements */
/* Add more CSS rules here to cover other elements */
`;

// Apply or remove the dark mode CSS based on the saved setting
function applyTheme() {
    chrome.storage.sync.get('themeEnabled', (data) => {
        if (data.themeEnabled) {
            injectCSS(defaultDarkModeCSS);
        } else {
            removeCSS();
        }
    });
}

// Initial application of the theme
applyTheme();

// Listen for changes to the storage to update the theme
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && 'themeEnabled' in changes) {
        applyTheme();
    }
});

// Handle dynamic content loading
const observer = new MutationObserver(() => {
    applyTheme();
});

observer.observe(document.documentElement, { childList: true, subtree: true });


