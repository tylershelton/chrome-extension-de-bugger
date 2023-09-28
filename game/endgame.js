/* eslint-env browser */
/* eslint-env webextensions */

function endGame (){
  const divs = document.querySelectorAll('div, section, body');
  divs.forEach(div => div.classList.remove('fuchsia'));
}

endGame();