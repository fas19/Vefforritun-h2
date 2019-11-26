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
    headerCategory.className = 'header__h3';

    const headerTitle = el('h1', this.title);
    headerTitle.className = 'header__h1';

    const headerContent = el('div', headerCategory, headerTitle);
    headerContent.className = 'header__content';

    if (this.image === 'none') {
      headerContent.style.backgroundColor = '#aaa';
    }

    const header = el('header', headerContent);
    header.className = 'lecture__header';
    header.style.backgroundImage = `url(${this.image})`;

    this.container.appendChild(header);
  }

  displayContent(content) {
    const types = el('div');
    types.className = 'type';

    content.forEach((item) => {
      const lecType = item.type;
      const lecData = item.data;
      let imgCap;
      let attrib;
      switch (lecType) {
        case 'youtube':
          displayVideo(types, lecData);
          break;
        case 'text':
          displayText(types, lecData);
          break;
        case 'quote':
          attrib = item.attribute !== undefined ? item.attribute : '';
          displayQuote(types, lecData, attrib);
          break;
        case 'image':
          imgCap = item.caption !== undefined ? item.caption : '';
          displayImg(types, lecData, imgCap);
          break;
        case 'heading':
          displayHeading(types, lecData);
          break;
        case 'list':
          displayList(types, lecData);
          break;
        case 'code':
          displayCode(types, lecData);
          break;
        default:
          break;
      }
    });

    this.container.append(types);
  }

  lecFinito() {
    const elem = document.querySelector('.lecture__finish');
    const notFinished = 'Klára fyrirlestur';
    const Finished = '✔ Kláraður fyrirlestur';

    const isFinished = elem.classList.contains('lecture__finish--finished');

    if (isFinished) {
      elem.textContent = notFinished;
      removeLecture(this.slug);
    } else {
      elem.textContent = Finished;
      saveLecture(this.slug);
    }

    elem.classList.toggle('lecture__finish--finished');
  }

  goBack() {
    window.location.href = 'http://localhost:3000';
  }

  displayFooter() {
    const notFinished = 'Klára fyrirlestur';
    const Finished = '✔ Kláraður fyrirlestur';

    const finishButton = el('button', isStored(this.slug) ? Finished : notFinished); //= el('button');
    finishButton.classList.add('lecture__finish');
    if (isStored(this.slug)) {
      finishButton.classList.add('lecture__finish--finished');
    }

    finishButton.addEventListener('click', this.lecFinito.bind(this));

    const backButton = el('a', 'Til baka');
    backButton.classList.add('lecture__back');
    backButton.setAttribute('href', '/');

    const footer = el('footer', finishButton, backButton);
    footer.className = 'lecture__footer';

    this.container.appendChild(footer);
  }

  loadLectures() {
    const index = parseInt(localStorage.getItem('index'), 10);

    const lectureData = getData();
    lectureData.then((data) => {
      this.title = data.lectures[index].title;
      this.category = data.lectures[index].category;
      this.image = data.lectures[index].image !== undefined ? data.lectures[index].image : 'none';
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
