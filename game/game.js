/* eslint-env browser */
/* eslint-env webextensions */

function startGame () {
  const divs = document.querySelectorAll('div, section, body');
  divs.forEach(div => div.classList.add('fuchsia'));
}

startGame();
