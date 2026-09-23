function ErrorState({ message, onRetry }) {
  return (
    <div
      className="state-card error-state"
      role="alert"
      aria-live="assertive"
    >
      <div className="state-icon" aria-hidden="true">
        ⚠️
      </div>

      <h3>We couldn't load the books</h3>

      <p>
        {message || "Something went wrong while fetching the book data."}
      </p>

      <p>
        Check your internet connection and try the search again.
      </p>

      {onRetry && (
        <button type="button" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorState;