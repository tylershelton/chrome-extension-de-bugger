/* eslint-env browser */
/* eslint-env webextensions */

// on first setup, set badge text on the extension icon to "OFF"
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: 'OFF',
  });
});

// listen for enable/disable messages
// from the extension. Start and stop
// the game accordingly
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['game/game.js'],
  });
  chrome.scripting.insertCSS({
    target: {tabId: tab.id},
    files: ['game/game.css'],
  });
});