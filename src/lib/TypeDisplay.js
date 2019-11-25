import { el } from './helpers';

export function displayVideo(element, data) {
  const video = el('iframe');
  video.className = 'iframe';
  video.src = data;

  const div = el('div', video);
  div.className = 'lec-video';

  element.appendChild(div);
}

export function displayText(element, data) {
  const div = el('div');
  div.className = 'lec-div';

  const arr = data.split('\n');
  arr.forEach((parag) => {
    const p = el('p', parag);
    p.className = 'lec-p';
    div.appendChild(p);
  });

  element.appendChild(div);
}

export function displayQuote(element, data, attribute) {
  const block = el('blockquote', el('p', data));
  block.className = 'lec-div lec-bq';

  if (attribute !== '') {
    const p2 = document.createElement('p');
    p2.className = 'lec-p';
    p2.appendChild(document.createTextNode(attribute));
    block.appendChild(p2);
  }

  element.appendChild(block);
}

export function displayImg(element, data, caption) {
  const img = el('img');
  img.className = 'lec-img';
  img.src = data;
  const div = el('div', img);
  div.className = 'lec-img';

  if (caption !== '') {
    const cite = el('cite', caption);
    div.appendChild(cite);
  }

  element.appendChild(div);
}
export function displayHeading(element, data) {
  const head = el('h2', data);
  head.className = 'h2';

  element.appendChild(head);
}
export function displayList(element, data) {
  const ul = el('ul');
  ul.className = 'lec-ul';

  data.forEach((item) => {
    const li = el('li', item);
    li.className = 'lec-li';
    ul.appendChild(li);
  });

  element.appendChild(ul);
}

export function displayCode(element, data) {
  const div = el('div');
  div.className = 'lec-div';

  const arr = data.split('\n');
  arr.forEach((line) => {
    const code = el('code', line);
    code.className = 'lec-code';
    div.appendChild(code);
  });

  element.appendChild(div);
}