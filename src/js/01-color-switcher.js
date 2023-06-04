function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const start = document.querySelector(`[data-start]`);

const stop = document.querySelector(`[data-stop]`);

const body = document.querySelector(`body`);

start.addEventListener(`click`, () => {
    intervalId = setInterval(() => {
        body.style.backgroundColor = `${getRandomHexColor()}`;
    }, 1000);
});

stop.addEventListener(`click`, () => {
    clearInterval(intervalId);
});