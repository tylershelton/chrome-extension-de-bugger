/* eslint-env browser */
/* eslint-env webextensions */

// logic for extension pop-up menu
function handleEnableSwitch (e) {
  e.preventDefault();
  
  getCurrentTab().then(tab => {
    const label = document.querySelector('label');
    const button = e.submitter;
  
    // toggle label on the button (and the label next next to the button)
    // when clicked
  
    if (button.value === 'Disable') {
      button.value = 'Enable';
      label.innerText = 'Enable De-Bugger';
    }
    else {
      button.value = 'Disable';
      label.innerText = 'Disable De-Bugger';
    }
  });
}


async function getCurrentTab() {
  const queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', handleEnableSwitch);

});
