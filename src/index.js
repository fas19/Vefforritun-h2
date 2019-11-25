import List from './lib/list';
import Lecture from './lib/lecture';

document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('body');
  const isLecturePage = page.classList.contains('lecture-page');

  /* const lecture = new Lecture();
  lecture.load(page); */
  
  if (isLecturePage) {
    const lecture = new Lecture();
    lecture.load(page);
  } else {
    const list = new List();
    list.load();
  }
});
