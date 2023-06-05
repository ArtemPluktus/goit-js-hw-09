import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    input: document.querySelector(`#datetime-picker`),
    btn: document.querySelector(`[data-start]`)
}

const timeData = {
    daysEl: document.querySelector(`[data-days]`),
    hoursEl: document.querySelector(`[data-hours]`),
    minutesEl: document.querySelector(`[data-minutes]`),
    secondsEl: document.querySelector(`[data-seconds]`)
}

refs.btn.disabled = true;

const date = new Date();
console.log(date);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onChange(selectedDates) {
        console.log(selectedDates[0]);

        if (selectedDates[0] < date) {
            refs.btn.disabled = true;
            Notiflix.Notify.failure("Please choose a date in the future");
        } else {
            refs.btn.disabled = false;
        }
    },
};

const fp = flatpickr(refs.input, options);

refs.btn.addEventListener('click', () => {
    startCountdown();
    startButton.disabled = true;
});

function startCountdown() {
    const selectedDate = flatpickr.parseDate(refs.input.value);
    const difference = selectedDate - date;

    if (difference <= 0) {
        updateTimerValues(0, 0, 0, 0);
        return;
    }

    const countdownInterval = setInterval(() => {
        const remainingTime = selectedDate - new Date();
        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            updateTimerValues(0, 0, 0, 0);
            return;
        }

        const { days, hours, minutes, seconds } = convertMs(remainingTime);
        updateTimerValues(days, hours, minutes, seconds);
    }, 1000);
}

function convertMs(ms) {
    ms = Math.abs(ms);
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function updateTimerValues(days, hours, minutes, seconds) {
    timeData.daysEl.textContent = addLeadingZero(days);
    timeData.hoursEl.textContent = addLeadingZero(hours);
    timeData.minutesEl.textContent = addLeadingZero(minutes);
    timeData.secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}