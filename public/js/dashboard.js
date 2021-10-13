const newPostBtn = document.querySelector("#new-post-btn");
const newPostDiv = document.querySelector("#new-post-div");
const abortBtn = document.querySelector("#abort-btn");
const deleteBtn = document.querySelector("#delete-btn");

newPostBtn.addEventListener("click", (event) => {
  event.preventDefault();
  newPostDiv.setAttribute("class", "row mt-4 d-dlex flex-column justify-content-center align-items-center");
});
abortBtn.addEventListener("click", (event) => {
  event.preventDefault();
  newPostDiv.setAttribute("class", "hidden");
});

const newPostHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector("#title").value.trim();
    const body = document.querySelector("#body").value.trim();
  
    if (title && body) {
      const response = await fetch(`/api/posts`, {
        method: "POST",
        body: JSON.stringify({ title, body }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to create post");
      };
    }
  };
  
  document
  .querySelector(".new-post-form")
  .addEventListener("submit", newPostHandler);