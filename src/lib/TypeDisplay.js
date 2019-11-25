import { el } from './helpers';

export function displayVideo(element, data) {
  /* const div = document.createElement('div');
  div.className = 'lec-video';

  const video = document.createElement('iframe');
  video.className = 'iframe';
  video.src = data;

  div.appendChild(video); */
  const video = el('iframe');
  video.className = 'iframe';
  video.src = data;

  const div = el('div', video);
  div.className = 'lec-video';

  element.appendChild(div);
}

export function displayText(element, data) {
  const div = el('div'); // document.createElement('div');
  div.className = 'lec-div';

  const arr = data.split('\n');
  arr.forEach((parag) => {
    /* const p = document.createElement('p');
    p.className = 'lec-p';
    p.appendChild(document.createTextNode(parag)); */
    const p = div('p', parag);
    p.className = 'lec-p';
    div.appendChild(p);
  });

  element.appendChild(div);
}

export function displayQuote(element, data, attribute) {
  /* const block = document.createElement('blockquote');
  block.className = 'lec-div lec-bq';

  const p = document.createElement('p');
  p.appendChild(document.createTextNode(data));
  block.appendChild(p); */
  const block = el('blockquote', el('p', data));
  block.className = 'lec-div lec-bq';

  if (attribute !== '') {
    const p2 = document.createElement('p');
    p2.className('lec-p');
    p2.appendChild(document.createTextNode(attribute));
    block.appendChild(p2);
  }

  element.appendChild(block);
}

export function displayImg(element, data, caption) {
  /* const div = el('div'); // document.createElement('div');
  div.className = 'lec-div-img';
  const img = el('img'); // document.createElement('img');
  img.className = 'lec-img';
  img.src = data;
  div.appendChild(img); */
  const img = el('img');
  img.className = 'lec-img';
  img.src = data;
  const div = el('div', img);
  div.className = 'lec-img';

  if (caption !== '') {
    /* const cite = document.createElement('cite');
    cite.appendChild(document.createTextNode(caption)); */
    const cite = el('cite', caption);
    div.appendChild(cite);
  }

  element.appendChild(div);
}
export function displayHeading(element, data) {
  /* const h2 = document.createElement('h2');
  h2.className = 'h2';
  h2.appendChild(document.createTextNode(data)); */
  const h2 = el('h2', data);
  h2.className = 'h2';

  element.appendChild(h2);
}
export function displayList(element, data) {
  /* const ul = document.createElement('ul'); */
  const ul = el('ul');
  ul.className = 'lec-ul';

  data.forEach((item) => {
    /* const li = document.createElement('li');
    li.className = 'lec-li';
    li.appendChild(document.createTextNode(item)); */
    const li = el('li', item);
    li.className = 'lec-li';
    ul.appendChild(li);
  });

  element.appendChild(ul);
}

export function displayCode(element, data) {
  // const div = document.createElement('div');
  const div = el('div');
  div.className = 'lec-div';

  const arr = data.split('\n');
  arr.forEach((line) => {
    /* const code = document.createElement('code');
    code.className = 'lec-code';
    code.appendChild(document.createTextNode(line)); */
    const code = el('code', line);
    code.className = 'lec-code';
    div.appendChild(code);
  });

  element.appendChild(div);
}