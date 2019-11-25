import { empty } from './helpers';
import {
  displayVideo,
  displayText,
  displayQuote,
  displayImg,
  displayHeading,
  displayList,
  displayCode,
} from './TypeDisplay';

export default class Lecture {
  constructor() {
    this.container = document.querySelector('.lecture');
    this.URL = 'lectures.json';
    this.slug = '';
    this.title = '';
    this.category = '';
    this.image = '';
    this.thumbnail = '';
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
          displayHeading(this.containter, lecData);
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

  displayFooter(page, lecSlug) {
    const notFinished = 'Klára fyrirlestur';
    const Finished = '✔ Kláraður fyrirlestur';
    let inner
  }

  loadLecture(page) {
    const lectureData = JSON.parse(sessionStorage.getItem('data'));

    this.slug = lectureData.slug;
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

  load(page) {
    empty(this.container);
    this.loadLecture(page);
  }
}
