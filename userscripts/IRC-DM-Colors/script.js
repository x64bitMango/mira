// ==UserScript==
// @name         Vibrant IRC-Like Usernames
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  Color usernames dynamically in DMs and group DMs with traditional IRC-like colors, with a function to refresh the colors
// @author       x64BitMango
// @match        https://discord.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const userColorMap = new Map();

    // generate HSL color from username so it sticks
    function generateColor(username) {
        let hash = 0;
        for (let i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + ((hash << 5) - hash);
        }
        const h = Math.abs(hash) % 360;
        // softer saturation
        return `hsl(${h}, 70%, 60%)`;
    }

    function colorizeUsernames() {
        // make sure to target only groups and dms
        document.querySelectorAll('span.username_c19a55.clickable_c19a55:not(.usernameColorOnName_c19a55)').forEach(el => {
            const name = el.textContent;
            if (!userColorMap.has(name)) {
                userColorMap.set(name, generateColor(name));
            }
            el.style.color = userColorMap.get(name);
        });
    }

    // refreshing username colors
    window.RefreshUsernameColors = function() {
        userColorMap.clear();
        colorizeUsernames();
    };

    // observing DOM changes dynamically
    const observer = new MutationObserver(colorizeUsernames);
    observer.observe(document.body, { childList: true, subtree: true });

    // initial run
    colorizeUsernames();
})();
