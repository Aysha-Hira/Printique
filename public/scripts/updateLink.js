const url = window.location.pathname;
const pathParts = url.split("/");

var userName = "Guest";
if (pathParts.length > 2) {
  userName = pathParts[2];
  document.getElementById("products").href += `/${userName}`;
  document.getElementById("about-us").href += `/${userName}`;
  document.getElementById("login").innerHTML = "Profile";
  document.getElementById("login").setAttribute("href", `/user/profile/${userName}`);
}
