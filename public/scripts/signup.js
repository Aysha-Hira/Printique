const form = document.getElementById("signupForm");
const messageBox = document.getElementById("messageBox");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirm_password = document
    .getElementById("confirm_password")
    .value.trim();

  if (!username || !name || !email || !password || !confirm_password) {
    messageBox.textContent = "Please fill all fields.";
    messageBox.className = "message error";
    return;
  }

  if (username.includes("/")) {
    messageBox.textContent = "Username cannot include '/'";
    messageBox.className = "message error";
    return;
  }

  if (password !== confirm_password) {
    messageBox.textContent = "Passwords do not match.";
    messageBox.className = "message error";
    return;
  }

  if (password.length < 6) {
    messageBox.textContent = "Password must be at least 6 characters.";
    messageBox.className = "message error";
    return;
  }

  fetch("/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      name: name,
      email,
      password,
      confirm_password,
    }),
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      return data;
    })
    .then((data) => {
      messageBox.textContent = data.message;
      messageBox.className = "message success";

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    })
    .catch((err) => {
      messageBox.textContent =
        err.message || "Something went wrong. Try again.";
      messageBox.className = "message error";
    });
});
