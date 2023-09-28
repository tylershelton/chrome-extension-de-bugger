/* eslint-env browser */
/* eslint-env webextensions */

function startGame () {
  const divs = document.querySelectorAll('div, section, body');
  // divs.forEach(div => div.classList.add('fuchsia'));
  const bugLayer = document.createElement('div');
  bugLayer.setAttribute('id','bugLayer');
  document.body.appendChild(bugLayer);
  createBugElement(bugLayer);
  createBombElement(bugLayer);
}

startGame();


//BOMB CREATION FUNC
function createBombElement(bugLayer, bombNum = 1) {
  const bomb = document.createElement('img');
  bomb.className = 'bombs';
  bomb.setAttribute('id', `bomb ${bombNum}`);
  bomb.setAttribute('src', chrome.runtime.getURL('images/bomb_48x48.gif'));

  // Place bug randomly on the screen
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const randomX = Math.random() * (screenWidth - 48);
  const randomY = Math.random() * (screenHeight - 48);

  bomb.style.position = 'absolute';
  bomb.style.left = `${randomX}px`;
  bomb.style.top = `${randomY}px`;
  
  bugLayer.appendChild(bomb);
  bombNum++;

  bomb.addEventListener('click', startDetonation);

  return bomb;
}

//BUG CREATION FUNCTIONS

// Function to create and style bug element
function createBugElement(bugLayer, bugNum = 1) {
  const bug = document.createElement('img');
  bug.className = 'bugs';
  bug.setAttribute('id', `bug ${bugNum}`);
  bug.setAttribute('src', chrome.runtime.getURL('images/de-bugger_48X48_animated-export.gif'));

  // Place bug randomly on the screen
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const randomX = Math.random() * (screenWidth - 48);
  const randomY = Math.random() * (screenHeight - 48);

  bug.style.position = 'absolute';
  bug.style.left = `${randomX}px`;
  bug.style.top = `${randomY}px`;
  
  bugLayer.appendChild(bug);
  bugNum++;

  bug.addEventListener('click', destroyBug);

  return bug;
}


function destroyBug (e) {
  console.log('Bug clicked');
  e.target.remove();
}

function destroyBomb (e) {
  console.log('Bomb clicked');
  e.target.remove();
}

// )))))))) bomb functionality ((((((((
function startDetonation () {
  document.querySelectorAll('img').forEach(img => {
    // stash original url(s) off to the side so we can restore later
    if (img.srcset) {
      img.dataset.originalsrcset = img.srcset;
      img.srcset = '';
    }
    img.dataset.originalsrc = img.src;
    // change image
    img.src = chrome.runtime.getURL('./images/run.gif');
    setTimeout(completeDetonation, 3000, img);
  });
}

function completeDetonation (img) {
  img.src = chrome.runtime.getURL('./images/explosion.gif');
  setTimeout(postDetonation, 1000, img);
}

function postDetonation (img) {
  img.classList.add('destroyedImg');
}