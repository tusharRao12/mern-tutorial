const WelcomeMessage = ( {onGetPostsClick} ) => {
  return (
    <center>
      <h1 className="mt-4 mb-4">No Posts</h1>
      <button onClick={onGetPostsClick} className="btn btn-primary btn-sm">
        Get Post from server
      </button>
    </center>
  );
}

export default WelcomeMessage;