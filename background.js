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
chrome.action.onClicked.addListener(async (tab) => {
  // set the action badge to the next state
  const prevState = await chrome.action.getBadgeText({tabId: tab.id});
  const nextState = prevState === 'ON' ? 'OFF' : 'ON';

  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });

  if (nextState === 'ON') {
    // inject game files
    await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['game/game.js'],
    });
    await chrome.scripting.insertCSS({
      target: {tabId: tab.id},
      files: ['game/game.css'],
    });
  }

  if (nextState === 'OFF') {
    await chrome.scripting.removeCSS({
      target: {tabId: tab.id},
      files: ['game/game.css'],
    });
  }
});