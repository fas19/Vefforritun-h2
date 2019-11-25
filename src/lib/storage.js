
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


export function getData() {
  /* fetch(LEC_URL)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error('Villa við að sækja gögn');
      }
      return resp.json();
    })
    .then((data) => {
      lectureData = data;
    })
    .catch((error) => {
      throw new Error(error);
    }); */

  const response = fetch(URL);
  const json = response.then((resp) => {
    if (!resp.ok) {
      throw Error('Villa við að sækja mynd');
    }
    return resp.json();
  })
    .catch((e) => {
      console.error('Error');
      throw Error('villa við að sækja mynd');
    });
  return json;
}