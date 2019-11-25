import { empty, el } from './helpers';
import {
  displayVideo,
  displayText,
  displayQuote,
  displayImg,
  displayHeading,
  displayList,
  displayCode,
} from './TypeDisplay';
import { isStored, saveLecture, removeLecture } from './storage';


export default class Lecture {
  constructor() {
    this.container = document.querySelector('.lecture');
    this.URL = 'lectures.json';
    this.slug = '';
    this.title = '';
    this.category = '';
    this.image = '';
    this.thumbnail = '';
    this.slug = '';
  }

  displayHeader() {
    const header = document.createElement('header');
    header.className = 'header';
    
    const headerContent = document.createElement('div');
    headerContent.className = 'header__content';
    
    const headerCategory = document.createElement('h3');
    headerCategory.className = 'h3';
    headerCategory.appendChild(document.createTextNode(this.category));

    const headerTitle = document.createElement('h1');
    headerTitle.className = 'h1';
    headerTitle.appendChild(document.createTextNode(this.title));

    if (this.img !== 'none') {
      header.style.backgroundImage = this.img;
    } else {
      header.style.backgroundColor = '#aaa';
    }

    headerContent.appendChild(headerCategory);
    headerContent.appendChild(headerTitle);
    header.appendChild(headerContent);

    this.container.appendChild(header);
  }

  displayContent(content) {
    content.forEach((item) => {
      const lecType = item.type;
      const lecData = item.data;
      let imgCap;
      let attrib;
      switch (lecType) {
        case 'youtube':
          displayVideo(this.container, lecData);
          break;
        case 'text':
          displayText(this.container, lecData);
          break;
        case 'quote':
          attrib = item.attribute !== undefined ? item.attribute : '';
          displayQuote(this.container, lecData, attrib);
          break;
        case 'image':
          imgCap = item.caption !== undefined ? item.caption : '';
          displayImg(this.container, lecData, imgCap);
          break;
        case 'heading':
          displayHeading(this.container, lecData);
          break;
        case 'list':
          displayList(this.container, lecData);
          break;
        case 'code':
          displayCode(this.container, lecData);
          break;
        default:
          break;
      }
    });
  }

  lecFinito() {
    const elem = document.querySelector('.footer__finish');
    const notFinished = 'Klára fyrirlestur';
    const Finished = '✔ Kláraður fyrirlestur';

    const isFinished = elem.classList.contains('footer__finish--finished');

    if (isFinished) {
      elem.textContent = notFinished;
      removeLecture(this.slug);
    } else {
      elem.textContent = Finished;
      saveLecture(this.slug);
    }

    elem.classList.toggle('footer__finish--finished');
  }

  goBack() {
    window.location.href = 'http://localhost:3000';
  }

  displayFooter() {
    const notFinished = 'Klára fyrirlestur';
    const Finished = '✔ Kláraður fyrirlestur';

    const finishButton = el('button', isStored(this.slug) ? Finished : notFinished); //= el('button');
    finishButton.classList.add('footer__finish');
    if (isStored(this.slug)) {
      finishButton.classList.add('footer__finish--finished');
    }

    finishButton.addEventListener('click', this.lecFinito.bind(this));

    const backButton = el('a', 'Til baka');
    backButton.classList.add('footer__back');
    backButton.setAttribute('href', '/');

    const footerContent = el('div', finishButton, backButton);
    footerContent.className = 'footer__content';

    const footer = el('footer', footerContent);
    footer.className = 'footer';

    this.container.appendChild(footer);
  }

  loadLecture() {
    const lectureData = JSON.parse(sessionStorage.getItem('data'));

    // this.slug = lectureData.slug;
    this.title = lectureData.title;
    this.category = lectureData.category;
    this.image = lectureData.img;
    // this.thumbnail = lectureData.thumbnail;
    // lectureData.thumbnail ? this.thumbnail = lectureData.thumbnail : this.thumbnail = 'none';
    this.thumbnail = lectureData.thumbnail !== undefined ? lectureData.thumbnail : 'none';
    // const content = lectureData.content;

    this.displayHeader();
    this.displayContent(lectureData.content);
    this.displayFooter();
  }

  load() {
    empty(this.container);

    const qs = new URLSearchParams(window.location.search);
    this.slug = qs.get('slug');

    // saveLecture(this.slug);

    this.loadLecture();
  }
}
