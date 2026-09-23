const OPEN_LIBRARY_API = "https://openlibrary.org/search.json";

export async function searchBooks(query) {
  const response = await fetch(
    `${OPEN_LIBRARY_API}?q=${encodeURIComponent(query)}&limit=10`,
  );

  if (!response.ok) {
    throw new Error("Unable to search for books.");
  }

  const data = await response.json();

  return data.docs;
}