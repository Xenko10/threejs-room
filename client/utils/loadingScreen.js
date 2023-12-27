let itemsLoaded = 0;
let totalItemsToLoad;

const progressBar = document.getElementById("progress-bar");
const progressBarContainer = document.querySelector(".progress-bar-container");

export function setTotalItemsToLoad(value) {
  totalItemsToLoad = value;
}

export function updateProgressBar() {
  itemsLoaded++;
  progressBar.value = (itemsLoaded / totalItemsToLoad) * 100;
  if (itemsLoaded === totalItemsToLoad) {
    progressBarContainer.remove();
  }
}
