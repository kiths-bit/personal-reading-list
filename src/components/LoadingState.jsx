function LoadingState() {
  return (
    <div className="state-card loading-state" role="status" aria-live="polite">
      <div className="state-icon" aria-hidden="true">
        ⏳
      </div>

      <h3>Loading your books</h3>

      <p>
        We're fetching your book results. Please wait a moment.
      </p>
    </div>
  );
}

export default LoadingState;