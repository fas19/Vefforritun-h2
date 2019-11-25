/* eslint-disable no-console */
import { empty, displayLectures } from './helpers';

const buttonBoolean = new Array(3).fill(false);
const lecKeys = ['title', 'catagory', 'thumbnamil'];
const DATA_URL = '/lectures.json';
let jsonData;
const container = document.querySelector('.list');

function addEventHandlers() {
  const lectures = document.getElementsByClassName('lectures');
  for (var lecture of lectures) {
  lecture.addEventListener('click', loadLecture);
  console.log('added listener');
}
}
function onClickHTML() {
  const takki = document.querySelector('.index-buttons__html-butt');
  takki.classList.toggle('html-active')
  empty(container);
  console.log('yo html');
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
  takki.classList.toggle('css-active')
  empty(container);
  console.log('yo css');
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

function loadLecture(e) {
  //  debugger;
  console.log(e.target);
  const parent = e.target.parentNode.parentNode;
  const currentSlug = parent.querySelector('.lectures__h2').textContent;

  // var hehe = blah.textContent;
  for  (var x of jsonData.lectures){
    debugger;
     if (x.title == currentSlug){
       //  console.log('scooore');
       var slug = x.slug;
       console.log('viljum fara á ' + slug);
       //debugger;
       const index = jsonData.lectures.indexOf(x);
       localStorage.setItem('slug', x.slug);
       localStorage.setItem('index', index);
      // localStorage.setItem('content', x);
      // localStorage.setItem('category', x);
       window.location.href = (`http://localhost:3000/fyrirlestur.html?slug=${slug}`);
      }
    }
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
