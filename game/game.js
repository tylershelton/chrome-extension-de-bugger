/* eslint-env browser */
/* eslint-env webextensions */

if (typeof config !== 'object') {
  var config = {
    spawnerId: undefined,
    idCounter: 0
  };
}

function startGame () {
  let speed = 2000;
  const bugInterval = 250;
  const speedLimit = 300;
  // set up "game board"
  const bugLayer = document.createElement('div');
  bugLayer.setAttribute('id','bugLayer');
  document.body.appendChild(bugLayer);

  // createBugElement(bugLayer);
  // spawn one bomb, after a few bugs have spawned
  setTimeout(createBombElement, 5000, bugLayer);

  function spawnBugs(){
    createBugElement(bugLayer);

    // clamp speed to be no faster than `speedLimit`
    if (speed - bugInterval >= speedLimit)
      speed -= bugInterval;

    config.spawnerId = setTimeout(spawnBugs, speed);
  }
  spawnBugs();
}

startGame();


//BOMB CREATION FUNC
function createBombElement (bugLayer) {
  const bomb = document.createElement('img');
  bomb.className = 'bombs';
  bomb.setAttribute('id', `bomb ${config.idCounter}`);
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
  config.idCounter++;

  bomb.addEventListener('click', startDetonation);

  return bomb;
}

//BUG CREATION FUNCTIONS
// Function to create and style bug element
function createBugElement (bugLayer) {
  const bug = document.createElement('img');
  bug.className = 'bugs';
  bug.setAttribute('id', `bug ${config.idCounter}`);
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
  config.idCounter++;

  bug.addEventListener('click', destroyBug);

  return bug;
}

function destroyBug (e) {
  e.target.remove();
}


// )))))))) bomb functionality ((((((((
function startDetonation (e) {
  // stop spawning new bugs
  clearTimeout(config.spawnerId);

  // delete the bomb
  e.target.remove();

  // get all images on page
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