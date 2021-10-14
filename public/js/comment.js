const newFormHandler = async (event) => {
  const post_id = document.querySelector('#post-id').value;
  const title = document.querySelector('#comment-title').value.trim();
  const body = document.querySelector('#comment-body').value.trim();


  if (title && body && post_id) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ title, body, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      alert('Comment failed, please try again.');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newFormHandler);