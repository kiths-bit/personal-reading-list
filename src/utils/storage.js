const STORAGE_KEY = "personal-reading-list";

export function getReadingList() {
  try {
    const savedList = localStorage.getItem(STORAGE_KEY);

    if (!savedList) {
      return [];
    }

    return JSON.parse(savedList);
  } catch {
    return [];
  }
}

export function saveReadingList(readingList) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(readingList));
}