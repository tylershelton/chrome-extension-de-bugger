/* eslint-env browser */
/* eslint-env webextensions */

// on first setup, set badge text on the extension icon to "OFF"
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

// listen for enable/disable messages
// from the extension. Start and stop
// the game accordingly
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(request);
    if (request.cmd === 'setOnOffState') {
      const isExtensionOn = request.data.value;
      if (isExtensionOn) startGame();
      else endGame();
    }
  }
);