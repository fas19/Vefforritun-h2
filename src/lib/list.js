import { empty, displayLectures } from './helpers';


const buttonBoolean = new Array(3).fill(false);
const lecKeys = ['title', 'catagory', 'thumbnamil'];
const DATA_URL = '/lectures.json';
let jsonData;

function onClickHTML(e){
  console.log('yo');
 }
 function onClickCss(e){
   console.log('yo'); 
 }
 function onClickJs(e){
 console.log('yo');
 }
 function loadLecture(e){
   //debugger;
   console.log(e.target);
   const parent = e.target.parentNode.parentNode;
   const blah = parent.querySelector('.headline2').textContent;
   //var hehe = blah.textContent;
   for(var x of jsonData.lectures){
     if (x.title == blah){
       //console.log('scooore');
       var slug = x.slug;
       console.log('viljum fara á ' + slug);
       sessionStorage.setItem('data', JSON.stringify(x));
       window.location.href = (`http://localhost:3000/fyrirlestur.html?slug=${slug}`);
       //window.location.href = (`http://localhost:3000/fyrirlestur.html`);
     }
   }
 }
 function addEventHandlers(){
   const lectures = document.getElementsByClassName('lecture');
   for(var lecture of lectures){
     lecture.addEventListener('click', loadLecture);
     console.log('added listener');
   }
   
 }

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.htmlButt = document.querySelector('.html-butt');
    this.cssButt = document.querySelector('.css-butt');
    this.jsButt = document.querySelector('.js-butt');
  }


  load() {
    empty(this.container);
    this.htmlButt.addEventListener('click', onClickHTML);
    this.cssButt.addEventListener('click', onClickCss);
    this.jsButt.addEventListener('click', onClickJs);
    
    fetch(DATA_URL)
    .then((response) => {
      if(response.ok){
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
