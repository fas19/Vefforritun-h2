
// const LOCALSTORAGE_KEY = 'finished_lectures';

/* export function loadFinished() {
  const finished = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  //const finito = JSON.parse(finished) || [];
  debugger;
  return finished;
} */

export function saveLecture(slug) {
  localStorage.setItem(slug, 'active');
}

export function removeLecture(slug) {
  localStorage.removeItem(slug);
}

export function isStored(slug) {
  return localStorage.getItem(slug) === 'active';
}
