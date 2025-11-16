document.addEventListener("DOMContentLoaded", () => {
  const url = window.location.pathname;
  const pathParts = url.split("/"); 

  let userName = "Guest";

  if (pathParts.length > 2 && decodeURIComponent(pathParts[2]) != 'guest') {
    userName = decodeURIComponent(pathParts[2]);

    document.getElementById("products").href = `/products/${userName}`;
    document.getElementById("about-us").href = `/about-us/${userName}`;
    document.getElementById("saved-designs").href = `/designs/${userName}`;
    
    const login = document.getElementById("login");
    login.textContent = "Profile";
    login.href = `/user/${userName}/profile`;
  }
});
