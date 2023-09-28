/* eslint-env browser */
/* eslint-env webextensions */

// undestroy exploded images
function cleanupImages () {
  const imgs = document.querySelectorAll('img');
  imgs.forEach(img => {
    if (img.hasAttribute('data-originalsrcset')) {
      img.srcset = img.dataset.originalsrcset;
      delete img.dataset.originalsrcset;
    }
    img.src = img.dataset.originalsrc;
    delete img.dataset.originalsrc;
    img.classList.remove('destroyedImg');
  });
}

function endGame (){
  const bugLayer = document.querySelector('#bugLayer');
  bugLayer.remove();
  cleanupImages();
}

endGame();