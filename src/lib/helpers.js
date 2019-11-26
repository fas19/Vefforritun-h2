/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */
import { isStored } from './storage';

const URL = '/lectures.json';


export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}


export function el(name, ...children) {
  const element = document.createElement(name);

  if (Array.isArray(children)) {
    for (let child of children) { /* eslint-disable-line */
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    }
  }
  return element;
}


export function getData() {
  const response = fetch(URL);
  const json = response.then((resp) => {
    if (!resp.ok) {
      throw Error('Villa við að sækja mynd');
    }
    return resp.json();
  })
    .catch((e) => {
      console.error(e);
      throw Error('villa við að sækja mynd');
    });
  return json;
}


function displayLecture(element, data) {
  let thumbnail;
  if (data.thumbnail == null) {
    thumbnail = 'engin mynd';
  } else {
    thumbnail = data.thumbnail;
  }
  const category = data.category;
  const title = data.title;

  const lecture = document.createElement('div');
  lecture.className = 'lectures';
  const lectureTitle = document.createElement('div');
  lectureTitle.className = 'lectures__title';
  const lectureCategory = document.createElement('div');
  lectureCategory.className = 'lectures__category';
  const lectureImage = document.createElement('div');
  lectureImage.className = 'lectures__image';
  const lectureTitleH2 = document.createElement('h2');
  lectureTitleH2.className = 'lectures__h2';
  lectureTitleH2.classList.add('lectures__h2-text');
  const lectureCategoryH3 = document.createElement('h3');
  lectureCategoryH3.className = 'lectures__h3';

  // Virkni ef fyrirlesturinn er nú þegar kláraður
  if (isStored(data.slug)) {
    lectureTitle.classList.add('lectures__title-active');
    const checked = document.createElement('h2');
    checked.classList.add('lectures__h2', 'lectures__checked', 'lectures__h2-checked');
    checked.appendChild(document.createTextNode('✓'));
    lectureTitleH2.appendChild(document.createTextNode(title));
    lectureTitle.appendChild(checked);
  } else {
    lectureTitleH2.appendChild(document.createTextNode(title));
  }

  lectureCategoryH3.appendChild(document.createTextNode(category));

  //  Virkni sem setur saman fyrir titil og checkmark
  if (thumbnail === 'engin mynd') {
    const lectureImageDiv = document.createElement('div');
    lectureImageDiv.className = 'lectures__noImg';
    lectureImage.appendChild(lectureImageDiv);
  } else {
    const lectureImageImg = document.createElement('img');
    lectureImageImg.className = 'lectures__image-img';
    lectureImageImg.src = thumbnail;
    lectureImage.appendChild(lectureImageImg);
  }

  // Setjum allt saman sem við smíðuðum saman og append við síðu.
  lectureCategory.appendChild(lectureCategoryH3);
  lectureTitle.appendChild(lectureTitleH2);
  lecture.appendChild(lectureTitle);
  lecture.appendChild(lectureCategory);
  lecture.appendChild(lectureImage);
  element.appendChild(lecture);
}


function allEqual(bool) {
  if (bool[0] === bool[1] && bool[1] === bool[2]) {
    return true;
  }
  return false;
}
export function displayLectures(element, lectKeys, lectures, buttonBool) {
  const allLectures = lectures;
  for (const x in allLectures) {
    if (allEqual(buttonBool)) {
      displayLecture(element, allLectures[x]);
    } else if (buttonBool[0] && allLectures[x].category === 'html') {
      displayLecture(element, allLectures[x]);
    } else if (buttonBool[1] && allLectures[x].category === 'css') {
      displayLecture(element, allLectures[x]);
    } else if (buttonBool[2] && allLectures[x].category === 'javascript') {
      displayLecture(element, allLectures[x]);
    }
  }
}
