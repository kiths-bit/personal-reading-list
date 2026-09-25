function BookCard({ book, onAdd, onRemove, isSaved = false }) {
  const authors = book.author_name
    ? book.author_name.slice(0, 2).join(", ")
    : "Unknown author";

  return (
    <article className="book-card">
      <div className="book-cover">
        {book.cover_i ? (
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
            alt=""
          />
        ) : (
          <span aria-hidden="true">📖</span>
        )}
      </div>

      <div className="book-info">
        <h3>{book.title}</h3>

        <p className="book-author">{authors}</p>

        {book.first_publish_year && (
          <p className="book-year">
            First published: {book.first_publish_year}
          </p>
        )}

        {isSaved ? (
         <button
  type="button"
  className="remove-button"
  onClick={() => onRemove(book)}
  aria-label={`Remove ${book.title} from reading list`}
>
            Remove from reading list
          </button>
        ) : (
         <button
  type="button"
  className="add-button"
  onClick={() => onAdd(book)}
  aria-label={`Add ${book.title} to reading list`}
>
            Add to reading list
          </button>
        )}
      </div>
    </article>
  );
}

export default BookCard;
