const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const description = document.querySelector('#post-desc').value.trim();

  if (event.target.hasAttribute('post-id')) {
    const id = event.target.getAttribute('post-id');

    if (title && description) {
      const response = await fetch(`/api/posts/edit/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
      if (response.ok) {
        console.log("response")
        document.location.replace(`/dashboard`);
      } else {
        alert('Failed to edit post');
      }
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.update-post-form')
  .addEventListener('click', newFormHandler);

document
  .querySelector('.deleteButton')
  .addEventListener('click', delButtonHandler);