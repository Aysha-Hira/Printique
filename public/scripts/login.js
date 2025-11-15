const loginForm = document.getElementById("loginForm");
const messageDiv = document.getElementById("message");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) 
      throw new Error(data.message || "Login failed");

    loginForm.reset();
    messageDiv.style.color = "green";
    messageDiv.textContent = data.message;

    setTimeout(() => {
      // const token = data.token;
      window.location.href = `/`;
    }, 1000);
    
  } catch (err) {
    messageDiv.style.color = "red";
    messageDiv.textContent =
      err.message || "An error occurred. Please try again.";
    console.error("Login error:", err);
  }
});