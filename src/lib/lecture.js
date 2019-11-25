import { empty, el, getData } from './helpers';
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
    this.URL = '/lectures.json';
    this.title = '';
    this.category = '';
    this.image = '';
    this.thumbnail = '';
    this.slug = '';
  }

  displayHeader() {
    const headerCategory = el('h3', this.category);
    headerCategory.className = 'h3';

    const headerTitle = el('h1', this.title);
    headerTitle.className = 'h1';

    const headerContent = el('div', headerCategory, headerTitle);
    headerContent.className = 'lecture__content';

    if (this.img !== 'none') {
      headerContent.style.backgroundImage = `url(${this.image})`;
    } else {
      headerContent.style.backgroundColor = '#aaa';
    }

    const header = el('header', headerContent);
    header.className = 'lecture__header';

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

  loadLectures() {
    const index = parseInt(localStorage.getItem('index'), 10);

    const lectureData = getData();
    lectureData.then((data) => {
      this.title = data.lectures[index].title;
      this.category = data.lectures[index].category;
      this.image = data.lectures[index].image;
      this.thumbnail = data.lectures[index].thumbnail !== undefined ? data.lectures[index].thumbnail : 'none';
      this.displayHeader();
      this.displayContent(data.lectures[index].content);
      this.displayFooter();
    });
  }

  load() {
    empty(this.container);

    const qs = new URLSearchParams(window.location.search);
    this.slug = qs.get('slug');

    this.loadLectures();
  }
}
