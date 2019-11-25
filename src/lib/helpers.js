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
  lectureTitleH2.className = 'lecture__h2';
  const lectureCategoryH3 = document.createElement('h3');
  lectureCategoryH3.className = 'lecture__h3';

  // Hér þarf að koma virkni til að virkja ef búið er að klára að lesa fyrirlesturinn..
  if (false) {
    console.log('fyrirlestur kláraður');

  } else {
  lectureTitleH2.appendChild(document.createTextNode(title));
  }

  lectureCategoryH3.appendChild(document.createTextNode(category));

  
  if (thumbnail === 'engin mynd') {
    const lectureImageDiv = document.createElement('div');
    lectureImageDiv.className = 'lecture__noImg';
    lectureImage.appendChild(lectureImageDiv);
  } else {
    const lectureImageImg = document.createElement('img');
    lectureImageImg.className = 'lecture__image-img';
    lectureImageImg.src = thumbnail;
    lectureImage.appendChild(lectureImageImg);
  }
  // setjum saman

  
  lectureCategory.appendChild(lectureCategoryH3);
  lectureTitle.appendChild(lectureTitleH2);
  lecture.appendChild(lectureTitle);
  lecture.appendChild(lectureCategory);
  lecture.appendChild(lectureImage);
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
    if(allEqual(buttonBool)){
      console.log(allLectures[x].category);
      displayLecture(el, allLectures[x]);
    } else if (buttonBool[0] && allLectures[x].category == 'html'){
      console.log('html');
      displayLecture(el, allLectures[x]);
      
    } else if (buttonBool[1] && allLectures[x].category == 'css') {
      console.log('css');
      displayLecture(el, allLectures[x]);      
    } else if (buttonBool[2] && allLectures[x].category == 'javascript'){
      console.log('js');
      displayLecture(el, allLectures[x]);
    }
  }
}
