const updateBtn = document.querySelector("#updateBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const postId = document.querySelector("#specific-post").value;

const postComment = async (event) => {
    event.preventDefault();

    const comment = document.querySelector("#comment").value.trim();
    const postId = document.querySelector("#post").value.trim();

    if (comment.length > 0) {
        const response = await fetch(`/api/post/${postId}/comment`, {
            method: "POST",
            body: JSON.stringify({ comment }),
            headers: { "Content-Type": "application/json" }
        });
        if (response.ok) {
            document.location.replace(`/post/${postId}`);
        } else {
            alert(response.statusText);
        };
        console.log(comment, postId)
    };
};

const editPost = async (event) => {
    event.preventDefault();
    console.log("button clicked")

    const title = document.querySelector("#post-title").value.trim();
    const content = document.querySelector("#post-content").textContent.trim();

    console.log(title);
    console.log(content);
    console.log(postId);

    if (title.length > 0 && content.length > 0) {
        const response = await fetch(`/api/post/${postId}`, {
            method: "PUT",
            body: JSON.stringify({ title, content, postId }),
            headers: { "Content-Type": "application/json" }
        });
        if (response.ok) {
            document.location.replace(`/post/${postId}`);
        } else {
            alert(response.statusText);
        };
        console.log(title);
        console.log(content);
        console.log(postId);
    }
};

const deletePost = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/post/${postId}`, {
        method: "DELETE",
        body: JSON.stringify({ postId }),
        headers: { "Content-Type": "application/json" }
    })
    if (response.ok) {
        document.location.replace(`/`);
    } else {
        alert(response.statusText);
    };
}

document
    .querySelector(".post-comment")
    .addEventListener("submit", postComment);
updateBtn.addEventListener("click", editPost);
deleteBtn.addEventListener("click", deletePost);