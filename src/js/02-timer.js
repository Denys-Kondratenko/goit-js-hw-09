import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const startOfCountdown = selectedDates[0].getTime();

    startBtnDisabled(true);

    if (startOfCountdown < currentTime()) {
      Notiflix.Report.failure(
        'Alert',
        'Please choose a date in the future',
        'Okay'
      ); // window.alert('Please choose a date in the future');
    } else {
      startBtnDisabled(false);
    }

    refs.startBtn.addEventListener('click', () => {
      refs.dateInput.disabled = true;

      const timerId = setInterval(() => {
        const timeDifference = startOfCountdown - currentTime();
        const deltaTime = convertMs(timeDifference);

        refs.daysValue.textContent = addLeadingZero(deltaTime.days);
        refs.hoursValue.textContent = addLeadingZero(deltaTime.hours);
        refs.minutesValue.textContent = addLeadingZero(deltaTime.minutes);
        refs.secondsValue.textContent = addLeadingZero(deltaTime.seconds);

        setTimeout(() => {
          clearInterval(timerId);
        }, timeDifference);
      }, 1000);

      startBtnDisabled(true);
    });
  },
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function startBtnDisabled(status) {
  refs.startBtn.disabled = status;
}

function currentTime() {
  return Date.now();
}

function convertMs(ms) {
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

flatpickr(refs.dateInput, options);
startBtnDisabled(true);
