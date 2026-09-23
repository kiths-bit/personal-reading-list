function EmptyState() {
  return (
    <div className="state-card empty-state">
      <div className="state-icon" aria-hidden="true">
        📚
      </div>

      <h3>Your reading list is empty</h3>

      <p>
        Your reading list is a place to save books you want to read later.
      </p>

      <p>
        Search for a book above and add your first book to get started.
      </p>
    </div>
  );
}

export default EmptyState;