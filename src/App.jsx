import { useEffect, useState } from "react";
import { searchBooks } from "./services/BookApi";
import EmptyState from "./components/EmptyState";
import BookCard from "./components/BookCard";
import { getReadingList, saveReadingList } from "./utils/storage";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [readingList, setReadingList] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState("");
const [demoState, setDemoState] = useState(null);
  const [isStorageLoaded, setIsStorageLoaded] = useState(false);

useEffect(() => {
  const savedList = getReadingList();

  setReadingList(savedList);
  setIsStorageLoaded(true);
}, []);

useEffect(() => {
  if (isStorageLoaded) {
    saveReadingList(readingList);
  }
}, [readingList, isStorageLoaded]);
  useEffect(() => {
  setReadingList(getReadingList());
}, []);
useEffect(() => {
  saveReadingList(readingList);
}, [readingList]);

  async function handleSearch(event) {
    event.preventDefault();

    if (!searchQuery.trim()) {
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const results = await searchBooks(searchQuery.trim());
      setBooks(results);
    } catch (error) {
      setBooks([]);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function addToReadingList(book) {
    setReadingList((currentList) => {
      const alreadySaved = currentList.some(
        (savedBook) => savedBook.key === book.key,
      );

      if (alreadySaved) {
        return currentList;
      }

      return [...currentList, book];
    });
  }

  function removeFromReadingList(book) {
    setReadingList((currentList) =>
      currentList.filter((savedBook) => savedBook.key !== book.key),
    );
  }
function showLoadingDemo() {
  setError("");
  setDemoState("loading");

  setTimeout(() => {
    setDemoState(null);
  }, 2000);
}

function showErrorDemo() {
  setDemoState("error");
}

function showEmptyDemo() {
  setError("");
  setDemoState("empty");
}

function clearDemoState() {
  setDemoState(null);
}
  return (
    <div className="app">
      <header className="app-header">
        <div>
          <p className="eyebrow">PERSONAL READING LIST</p>

          <h1>My Reading List</h1>

          <p className="subtitle">
            Find books you want to read and keep them in one place.
          </p>
        </div>
      </header>

      <main className="container">
        <section className="demo-section" aria-labelledby="demo-heading">
  <div className="demo-header">
    <div>
      <p className="eyebrow">REVIEWER DEMO</p>
      <h2 id="demo-heading">State demonstration</h2>
    </div>

    <button type="button" onClick={clearDemoState}>
      Reset demo
    </button>
  </div>

  <p className="demo-description">
    Use these controls to demonstrate the loading, error, and empty
    states without changing the code.
  </p>

  <div className="demo-buttons">
    <button type="button" onClick={showLoadingDemo}>
      Show loading state
    </button>

    <button type="button" onClick={showErrorDemo}>
      Show error state
    </button>

    <button type="button" onClick={showEmptyDemo}>
      Show empty state
    </button>
  </div>
</section>

        <section className="search-section">
          <h2>Find a book</h2>

          <form onSubmit={handleSearch} className="search-form">
            <label htmlFor="book-search">Search for a book</label>

            <div className="search-row">
              <input
                id="book-search"
                type="search"
                placeholder="Try a title or author..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />

              <button type="submit">Search</button>
            </div>
          </form>
        </section>

       <section className="results-section" aria-live="polite">
  <h2>Search Results</h2>
  {demoState === "loading" && <LoadingState />}

{demoState === "error" && (
  <ErrorState
    message="We couldn't load the book results."
    onRetry={clearDemoState}
  />
)}

{demoState === "empty" && (
  <EmptyState />

)}

  {isLoading && <LoadingState />}

  {!isLoading && error && (
    <ErrorState
      message={error}
      onRetry={handleSearch}
    />
  )}

  {!isLoading && !error && books.length === 0 && (
    <div className="results-placeholder">
      <p>Search for a book to see results here.</p>
    </div>
  )}

  {!isLoading && !error && books.length > 0 && (
    <div className="book-list">
      {books.map((book) => {
        const isSaved = readingList.some(
          (savedBook) => savedBook.key === book.key,
        );

        return (
          <BookCard
            key={book.key}
            book={book}
            onAdd={addToReadingList}
            onRemove={removeFromReadingList}
            isSaved={isSaved}
          />
        );
      })}
    </div>
  )}
</section>

        <section className="reading-list-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR BOOKS</p>

              <h2>My Reading List</h2>
            </div>

            <span className="book-count">
              {readingList.length}{" "}
              {readingList.length === 1 ? "book" : "books"}
            </span>
          </div>

          {readingList.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="book-list">
              {readingList.map((book) => (
                <BookCard
                  key={book.key}
                  book={book}
                  onAdd={addToReadingList}
                  onRemove={removeFromReadingList}
                  isSaved={true}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
