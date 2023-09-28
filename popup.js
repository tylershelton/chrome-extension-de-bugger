/* eslint-env browser */
// logic for extension pop-up menu


function handleEnableSwitch (e) {
  e.preventDefault();
  console.log(e);
  
  const label = document.querySelector('label');
  // toggle label on the button (and the label next next to the button)
  // when clicked
  if (e.submitter.value === 'Off') {
    e.submitter.value = 'On';
    label.innerText = 'Disable De-Bugger';
  }
  else {
    e.submitter.value = 'Off';
    label.innerText = 'Enable De-Bugger';
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', handleEnableSwitch);
});