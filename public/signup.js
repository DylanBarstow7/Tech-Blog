async function signupFormHandler(event) {
    event.preventDefault();

    // USERNAME AND PASSWORD VARIABLES
    const username = document.querySelector("#username-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    // IF BOTH ARE PRESENT RUN THIS
    if (username && password) {
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({
                username,
                password,
            }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            console.log("success");
            document.location.replace("/dashboard");
        } else {
            alert(response.statusText);
        }
    }
}

document
    .querySelector("#signup-form")
    .addEventListener("submit", signupFormHandler);