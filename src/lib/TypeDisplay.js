import { el } from './helpers';

export function displayVideo(element, data) {
  const video = el('iframe');
  video.className = 'type__iframe';
  video.src = data;
  video.setAttribute('frameborder', 0);
  video.setAttribute('allowfullscreen', 0);

  const div = el('div', video);
  div.className = 'type__div';

  element.appendChild(div);
}

export function displayText(element, data) {
  const div = el('div');
  div.className = 'type__div';

  const arr = data.split('\n');
  arr.forEach((parag) => {
    const p = el('p', parag);
    p.className = 'type__text';
    div.appendChild(p);
  });

  element.appendChild(div);
}

export function displayQuote(element, data, attribute) {
  const block = el('blockquote', el('p', data));
  block.className = 'type__bq';

  if (attribute !== '') {
    const p = el('p', attribute);
    p.className = 'type__attribute';
    block.appendChild(p);
  }
  const div = el('div', block);
  div.className = 'type__div';
  element.appendChild(div);
}

export function displayImg(element, data, caption) {
  const img = el('img');
  img.className = 'type__img';
  img.src = data;
  const div = el('div', img);
  div.className = 'type__div';

  if (caption !== '') {
    const cite = el('cite', caption);
    cite.className = 'type__cite';
    div.appendChild(cite);
  }

  element.appendChild(div);
}
export function displayHeading(element, data) {
  const head = el('h2', data);
  head.className = 'type__h2';

  const div = el('div', head);
  div.className = 'type__div';
  element.appendChild(div);
}
export function displayList(element, data) {
  const ul = el('ul');
  ul.className = 'type__ul';

  data.forEach((item) => {
    const li = el('li', item);
    li.className = 'type__li';
    ul.appendChild(li);
  });
  const div = el('div', ul);
  div.className = 'type__div';
  element.appendChild(div);
}

export function displayCode(element, data) {
  const div = el('div');
  div.className = 'type__div';

  const pre = el('pre', data);

  div.appendChild(pre);

  element.appendChild(div);
}
