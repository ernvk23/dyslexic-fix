let isEnabled = false;
let isExcluded = false;
let currentLetterSpacing = -50;
let currentWordSpacing = -200;
let currentLineHeight = 140;
let currentFontSize = 100;
let isApplyingStyles = false;

// Inject CSS styles dynamically
function injectStyles() {
    const styleId = 'opendyslexic-dynamic-styles';
    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
    }

    return styleElement;
}

function updateCustomStyles(letterSpacing, wordSpacing, lineHeight, fontSize) {
    if (isApplyingStyles) {
        // Style update already in progress, skipping
        return;
    }

    isApplyingStyles = true;

    try {
        currentLetterSpacing = letterSpacing;
        currentWordSpacing = wordSpacing;
        currentLineHeight = lineHeight;
        currentFontSize = fontSize;

        const formatEm = (value) => {
            const result = value / 1000;
            return result === 0 ? '0em' : result.toFixed(3) + 'em';
        };

        const letterS = formatEm(letterSpacing);
        const wordS = formatEm(wordSpacing);
        const lineH = (lineHeight / 100).toFixed(2);
        // Convert percentage to em units for proper font scaling
        // 100% = 1em, 150% = 1.5em, 50% = 0.5em
        const fontS = (fontSize / 100).toFixed(2) + 'em';

        const styleElement = injectStyles();

        const css = `
            :root {
                --od-letter-spacing: ${letterS};
                --od-word-spacing: ${wordS};
                --od-line-height: ${lineH};
                --od-font-size: ${fontS};
            }
            html.opendyslexic-active p,
            html.opendyslexic-active li,
            html.opendyslexic-active td,
            html.opendyslexic-active th,
            html.opendyslexic-active span,
            html.opendyslexic-active div,
            html.opendyslexic-active article,
            html.opendyslexic-active section,
            html.opendyslexic-active blockquote,
            html.opendyslexic-active a {
                font-family: 'OpenDyslexic', sans-serif !important;
                font-size: var(--od-font-size) !important;
                letter-spacing: var(--od-letter-spacing) !important;
                word-spacing: var(--od-word-spacing) !important;
                line-height: var(--od-line-height) !important;
            }
            html.opendyslexic-active h1,
            html.opendyslexic-active h2,
            html.opendyslexic-active h3,
            html.opendyslexic-active h4,
            html.opendyslexic-active h5,
            html.opendyslexic-active h6 {
                font-family: 'OpenDyslexic', sans-serif !important;
                letter-spacing: var(--od-letter-spacing) !important;
                word-spacing: var(--od-word-spacing) !important;
                line-height: var(--od-line-height) !important;
            }
            html.opendyslexic-active h1 { font-size: calc(var(--od-font-size) * 2.0) !important; }
            html.opendyslexic-active h2 { font-size: calc(var(--od-font-size) * 1.6) !important; }
            html.opendyslexic-active h3 { font-size: calc(var(--od-font-size) * 1.35) !important; }
            html.opendyslexic-active h4 { font-size: calc(var(--od-font-size) * 1.15) !important; }
            html.opendyslexic-active h5 { font-size: calc(var(--od-font-size) * 1.0) !important; }
            html.opendyslexic-active h6 { font-size: calc(var(--od-font-size) * 0.9) !important; }
            html.opendyslexic-active input,
            html.opendyslexic-active textarea,
            html.opendyslexic-active select,
            html.opendyslexic-active button,
            html.opendyslexic-active label {
                font-family: 'OpenDyslexic', sans-serif !important;
            }
            html.opendyslexic-active [class*="fa-"],
            html.opendyslexic-active .fab, html.opendyslexic-active .fad, html.opendyslexic-active .fal, html.opendyslexic-active .far, html.opendyslexic-active .fas, html.opendyslexic-active .fa,
            html.opendyslexic-active [class*="material-icons"], html.opendyslexic-active .material-icons,
            html.opendyslexic-active [class*="bi-"], html.opendyslexic-active .bi,
            html.opendyslexic-active [class*="icon"], html.opendyslexic-active .icon,
            html.opendyslexic-active [class*="ri-"], html.opendyslexic-active [class*="feather"], html.opendyslexic-active [class*="tabler-"], html.opendyslexic-active [class*="la-"], html.opendyslexic-active [class*="ion-"],
            html.opendyslexic-active [data-icon], html.opendyslexic-active [role="img"],
            html.opendyslexic-active .emoji, html.opendyslexic-active [class*="emoji"],
            html.opendyslexic-active i, html.opendyslexic-active svg, html.opendyslexic-active svg *,
            html.opendyslexic-active code, html.opendyslexic-active pre, html.opendyslexic-active kbd, html.opendyslexic-active samp, html.opendyslexic-active var,
            html.opendyslexic-active [class*="fa-"]::before, html.opendyslexic-active [class*="fa-"]::after,
            html.opendyslexic-active [class*="icon"]::before, html.opendyslexic-active [class*="icon"]::after,
            html.opendyslexic-active [data-icon]::before, html.opendyslexic-active [data-icon]::after {
                font-family: 'Font Awesome 7 Pro', 'Font Awesome 7 Free', 'Font Awesome 6 Pro', 'Font Awesome 6 Free', 'Font Awesome 5 Pro', 'Font Awesome 5 Free', 'Font Awesome 5 Brands', 'FontAwesome', 'Material Icons', 'Material Icons Outlined', 'Material Icons Round', 'Material Icons Sharp', 'Material Icons Two Tone', 'bootstrap-icons', 'remixicon', 'feather', 'tabler-icons', 'Line Awesome Free', 'Ionicons', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol' !important;
                font-size: inherit !important;
                letter-spacing: normal !important;
                word-spacing: normal !important;
                line-height: inherit !important;
            }
        `;

        if (styleElement.textContent !== css) {
            styleElement.textContent = css;
        }

        // Force reflow
        if (document.documentElement) {
            void document.documentElement.offsetHeight;
        }

    } catch (error) {
        // Error updating styles
    } finally {
        isApplyingStyles = false;
    }
}

function applyInitialSettings(result) {
    try {
        isEnabled = result.enabled || false;
        currentLetterSpacing = result.letterSpacing ?? -50;
        currentWordSpacing = result.wordSpacing ?? -200;
        currentLineHeight = result.lineHeight ?? 140;
        currentFontSize = result.fontSize ?? 100;

        const excludedDomains = result.excludedDomains || [];
        const currentDomain = window.location.hostname;
        isExcluded = excludedDomains.includes(currentDomain);

        if (isEnabled && !isExcluded) {
            // Apply styles immediately without waiting for fonts to load
            updateCustomStyles(currentLetterSpacing, currentWordSpacing, currentLineHeight, currentFontSize);
            // Optional: Apply font family after fonts are ready to ensure proper rendering
            document.fonts.ready.then(() => {
                if (document.documentElement) {
                    document.documentElement.classList.add('opendyslexic-active');
                    // Force a re-render to ensure fonts are properly applied
                    void document.documentElement.offsetHeight;
                }
            });
        }
    } catch (error) {
        // Error applying initial settings
    }
}

function loadInitialSettings() {
    chrome.storage.local.get(['enabled', 'letterSpacing', 'wordSpacing', 'lineHeight', 'fontSize', 'excludedDomains'], (result) => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => applyInitialSettings(result));
        } else {
            applyInitialSettings(result);
        }
    });
}

loadInitialSettings();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Validate message origin - only accept from this extension
    if (sender.id !== chrome.runtime.id) {
        return false;
    }

    try {
        if (message.action === 'toggle') {
            const newState = message.enabled;

            if (isEnabled === newState) {
                sendResponse({ success: true, alreadyInState: true });
                return true;
            }

            isEnabled = newState;
            handleToggleStateChange();
            sendResponse({ success: true });

        } else if (message.action === 'updateSpacing') {
            if (!isEnabled || isExcluded) {
                sendResponse({ success: true, skipped: true });
                return true;
            }

            updateCustomStyles(
                message.letterSpacing,
                message.wordSpacing,
                message.lineHeight,
                message.fontSize
            );

            if (document.documentElement) {
                document.documentElement.classList.add('opendyslexic-active');
            }

            sendResponse({ success: true });
        } else if (message.action === 'recheckExclusion') {
            chrome.storage.local.get(['enabled', 'excludedDomains'], (result) => {
                const currentDomain = window.location.hostname;
                const excludedDomains = result.excludedDomains || [];
                const newIsExcluded = excludedDomains.includes(currentDomain);

                if (newIsExcluded !== isExcluded || result.enabled !== isEnabled) {
                    isEnabled = result.enabled || false;
                    isExcluded = newIsExcluded;
                    handleToggleStateChange();
                }
                sendResponse({ success: true });
            });
            return true;
        }
    } catch (error) {
        sendResponse({ success: false, error: error.message });
    }

    return true;
});

chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace !== 'local') return;

    if (changes.enabled && changes.enabled.newValue !== isEnabled) {
        isEnabled = changes.enabled.newValue;
        handleToggleStateChange();
    }

    if (changes.excludedDomains) {
        const currentDomain = window.location.hostname;
        const newExcludedDomains = changes.excludedDomains.newValue || [];
        const newIsExcluded = newExcludedDomains.includes(currentDomain);

        if (newIsExcluded !== isExcluded) {
            isExcluded = newIsExcluded;
            handleToggleStateChange();
        }
    }

    let shouldUpdateStyles = false;
    const newSettings = {};

    if (changes.letterSpacing) {
        newSettings.letterSpacing = changes.letterSpacing.newValue;
        shouldUpdateStyles = true;
    }
    if (changes.wordSpacing) {
        newSettings.wordSpacing = changes.wordSpacing.newValue;
        shouldUpdateStyles = true;
    }
    if (changes.lineHeight) {
        newSettings.lineHeight = changes.lineHeight.newValue;
        shouldUpdateStyles = true;
    }
    if (changes.fontSize) {
        newSettings.fontSize = changes.fontSize.newValue;
        shouldUpdateStyles = true;
    }

    if (shouldUpdateStyles && isEnabled && !isExcluded) {
        const finalSettings = {
            letterSpacing: newSettings.letterSpacing ?? currentLetterSpacing,
            wordSpacing: newSettings.wordSpacing ?? currentWordSpacing,
            lineHeight: newSettings.lineHeight ?? currentLineHeight,
            fontSize: newSettings.fontSize ?? currentFontSize,
        };

        updateCustomStyles(
            finalSettings.letterSpacing,
            finalSettings.wordSpacing,
            finalSettings.lineHeight,
            finalSettings.fontSize
        );
    }
});

function handleToggleStateChange() {
    if (isEnabled && !isExcluded) {
        updateCustomStyles(currentLetterSpacing, currentWordSpacing, currentLineHeight, currentFontSize);
        document.fonts.ready.then(() => {
            if (document.documentElement) {
                document.documentElement.classList.add('opendyslexic-active');
                void document.documentElement.offsetHeight;
            }
        });
    } else {
        if (document.documentElement) {
            document.documentElement.classList.remove('opendyslexic-active');
        }
        const styleElement = document.getElementById('opendyslexic-dynamic-styles');
        if (styleElement) {
            styleElement.remove();
        }
    }
}

