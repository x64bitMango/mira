// ==UserScript==
// @name         V-IRC Discord DMs
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  Color usernames dynamically in DMs and group DMs with vibrant IRC-like colors, with a function to refresh the colors
// @author       x64BitMango
// @namespace    https://github.com/x64bitMango/mira/tree/main/userscripts/IRC-DM-Colors
// @icon         https://raw.githubusercontent.com/x64bitMango/mira/refs/heads/main/userscripts/IRC-DM-Colors/icon.png
// @match        https://discord.com/*
// @include      https://*.discord.com/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const userColorMap = new Map();

    // generate a HSL color; optional randomize for refresh
    function generateColor(username, randomize = false) {
        let hash = 0;
        for (let i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + ((hash << 5) - hash);
        }
        const baseHue = Math.abs(hash) % 360;
        const hue = randomize ? (baseHue + Math.floor(Math.random() * 60)) % 360 : baseHue;
        return `hsl(${hue}, 70%, 60%)`;
    }

    function colorizeUsernames(randomize = false) {
        document.querySelectorAll('span.username_c19a55.clickable_c19a55:not(.usernameColorOnName_c19a55)').forEach(el => {
            const name = el.textContent;
            // generate new color if randomize or not in map
            if (!userColorMap.has(name) || randomize) {
                userColorMap.set(name, generateColor(name, randomize));
            }
            el.style.color = userColorMap.get(name);
        });
    }

    // refreshing username colors
    window.RefreshUsernameColors = function() {
        colorizeUsernames(true); // pass true to randomize colors
    };

    // observing DOM changes dynamically
    const observer = new MutationObserver(() => colorizeUsernames(false));
    observer.observe(document.body, { childList: true, subtree: true });

    // initial run
    colorizeUsernames(false);
})();
