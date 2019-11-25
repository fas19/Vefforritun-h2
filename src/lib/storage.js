
export function saveLecture(slug) {
  localStorage.setItem(slug, 'active');
}

export function removeLecture(slug) {
  localStorage.removeItem(slug);
}

export function isStored(slug) {
  return localStorage.getItem(slug) === 'active';
}