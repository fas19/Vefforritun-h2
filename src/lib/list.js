/* eslint-disable linebreak-style */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import { empty, displayLectures } from './helpers';

const buttonBoolean = new Array(3).fill(false);
const lecKeys = ['title', 'catagory', 'thumbnamil'];
const DATA_URL = '/lectures.json';
let jsonData;
const container = document.querySelector('.list');


function loadLecture(e) {
  const x = 'lectures';
  let parent = e.target;

  while (parent.className !== x) {
    parent = parent.parentNode;
  }
  const currentTitle = parent.querySelector('.lectures__h2-text').textContent;
  for (const x of jsonData.lectures) {
    if (x.title === currentTitle) {
      const slug = x.slug;
      // console.log('viljum fara á ' + slug);
      const index = jsonData.lectures.indexOf(x);
      localStorage.setItem('slug', x.slug);
      localStorage.setItem('index', index);
      // localStorage.setItem('content', x);
      // localStorage.setItem('category', x);
      window.location.href = (`http://localhost:3000/fyrirlestur.html?slug=${slug}`);
    }
  }
}


function addEventHandlers() {
  const lectures = document.getElementsByClassName('lectures');
  for (const lecture of lectures) {
    lecture.addEventListener('click', loadLecture);
  }
}


function onClickHTML() {
  const takki = document.querySelector('.index-buttons__html-butt');
  takki.classList.toggle('html-active');
  empty(container);
  if (buttonBoolean[0]) {
    buttonBoolean[0] = false;
  } else {
    buttonBoolean[0] = true;
  }
  displayLectures(container, lecKeys, jsonData.lectures, buttonBoolean);
  addEventHandlers();
}


function onClickCss() {
  const takki = document.querySelector('.index-buttons__css-butt');
  takki.classList.toggle('css-active');
  empty(container);
  if (buttonBoolean[1]) {
    buttonBoolean[1] = false;
  } else {
    buttonBoolean[1] = true;
  }
  displayLectures(container, lecKeys, jsonData.lectures, buttonBoolean);
  addEventHandlers();
}


function onClickJs() {
  const takki = document.querySelector('.index-buttons__js-butt');
  takki.classList.toggle('js-active');
  empty(container);
  console.log('yo html');
  if (buttonBoolean[2]) {
    buttonBoolean[2] = false;
  } else {
    buttonBoolean[2] = true;
  }
  displayLectures(container, lecKeys, jsonData.lectures, buttonBoolean);
  addEventHandlers();
}


export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.htmlButt = document.querySelector('.index-buttons__html-butt');
    this.cssButt = document.querySelector('.index-buttons__css-butt');
    this.jsButt = document.querySelector('.index-buttons__js-butt');
  }


  load() {
    empty(this.container);
    this.htmlButt.addEventListener('click', onClickHTML);
    this.cssButt.addEventListener('click', onClickCss);
    this.jsButt.addEventListener('click', onClickJs);

    fetch(DATA_URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Villa við að sækja gögn');
      })
      .then((data) => {
        jsonData = data;
        displayLectures(this.container, lecKeys, data.lectures, buttonBoolean);
        addEventHandlers();
      })
      .catch((error) => {
      console.log(error);  //  eslint-disable-line
      });
  }
}
