const karte = document.querySelectorAll('.karta');

let okrenuta = false;
let zakljucaj = false;
let prva, druga;

function okreni() {
  if (zakljucaj) return;
  if (this === prva) return;

  this.classList.add('flip');

  if (!okrenuta) {
    
    okrenuta = true;
    prva = this;

    return;
  }

  
  druga = this;

  uporedi();
}

function uporedi() {
  let poklapanje = prva.dataset.framework === druga.dataset.framework;

  poklapanje ? zadrzi() : vrati();
}

function zadrzi() {
  prva.removeEventListener('click', okreni);
  druga.removeEventListener('click', okreni);

  resetuj();
}

function vrati() {
  zakljucaj = true;

  setTimeout(() => {
    prva.classList.remove('flip');
    druga.classList.remove('flip');

    resetuj();
  }, 1500);
}

function resetuj() {
  [okrenuta, zakljucaj] = [false, false];
  [prva, druga] = [null, null];
}

(function izmesaj() {
  karte.forEach(card => {
    let promesaj = Math.floor(Math.random() * 12);
    card.style.order = promesaj;
  });
})();

karte.forEach(card => card.addEventListener('click', okreni));

function startTimer(duration, display) {
  let timer = duration, minutes, seconds;
  setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
          timer = duration;
      }
  }, 1000);
}

window.onload = function () {
  let minut = 60 * 1,
      display = document.querySelector('#vreme');
  startTimer(minut, display);
};