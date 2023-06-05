import Notiflix from 'notiflix';


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delay = Number(document.querySelector('input[name="delay"]').value);
  const step = Number(document.querySelector('input[name="step"]').value);
  const amount = Number(document.querySelector('input[name="amount"]').value);

  for (let i = 1; i <= amount; i++) {
    const position = i;
    const promiseDelay = delay + (i - 1) * step;

    createPromise(position, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
