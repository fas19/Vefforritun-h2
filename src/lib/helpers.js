export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function el(name, ...children) {
  const element = document.createElement(name);

  if (Array.isArray(children)) {
    for (let child of children) { /* eslint-disable-line */
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    }
  }

  return element;
}

function displayLecture(el, data) {
  let thumbnail;
  if (data.thumbnail == null) {
    thumbnail = 'engin mynd';
  } else  {
    thumbnail = data.thumbnail;
  }
  const category = data.category;
  const title = data.title;

  const lecture = document.createElement('div');
  lecture.className ='lecture';
  const lectureTitle = document.createElement('div');
  lectureTitle.className = 'lecture__title';
  const lectureCategory = document.createElement('div');
  lectureCategory.className = 'lecture__category';
  const lectureImage = document.createElement('div');
  lectureImage.className = 'lecture__image';
  const lectureTitleH2 = document.createElement('h2');
  lectureTitleH2.className = 'headline2';
  const lectureCategoryH3 = document.createElement('h3');
  lectureCategoryH3.className = 'headline3';

  // Hér þarf að koma virkni til að virkja ef búið er að klára að lesa fyrirlesturinn..
  lectureTitleH2.appendChild(document.createTextNode(title));

  lectureCategoryH3.appendChild(document.createTextNode(category));

  const lectureImageImg = document.createElement('img');
  lectureImageImg.className = 'img';
  if (thumbnail === 'engin mynd') {
    lectureImageImg.alt = 'engin mynd';
  } else  {
    lectureImageImg.src = thumbnail;
  }
  // setjum saman

  lectureImage.appendChild(lectureImageImg);
  lectureCategory.appendChild(lectureCategoryH3);
  lectureTitle.appendChild(lectureTitleH2);
  lecture.appendChild(lectureImage);
  lecture.appendChild(lectureTitle);
  lecture.appendChild(lectureCategory);
  const grid = document.querySelector('.grid');
  el.appendChild(lecture);
}

function allEqual(bool) {
  if (bool[0] === bool[1] && bool[1] === bool[2]) {
    return true;
  }
  return false;
}
export function displayLectures(el, lectKeys, lectures, buttonBool){
  const element = el;
  const lectureKeys = lectKeys;
  const allLectures = lectures;
  for (var x in allLectures){
    console.log((allLectures[x]));
    //vil setja inn æi fallið displayLecture allt data ef bool er okey.
    if(allEqual(buttonBool) || buttonBool[1] && allLectures[x].category == 'html'){
      //console.log(allLectures[x]);
      displayLecture(el, allLectures[x]);
    }


  }
}
