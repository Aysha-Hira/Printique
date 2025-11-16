document.addEventListener("DOMContentLoaded", async () => {
  const pathParts = window.location.pathname.split("/");
  let userName = "guest";
  if (pathParts.length > 3 && decodeURIComponent(pathParts[2]) !== "guest") {
    userName = decodeURIComponent(pathParts[2]);
  }

  try {
    // Fetch user profile
    const userRes = await fetch(`/user/getprofile/${userName}`);
    const userData = await userRes.json();

    document.getElementById("name").textContent = userData.name;
    document.getElementById("username").textContent = userData.username;
    document.getElementById("email").textContent = userData.email;
    document.getElementById("address").textContent = userData.address || "-";
    document.getElementById("joined").textContent = new Date(userData.createdAt).toLocaleDateString();

    // Fetch designs
    const designsRes = await fetch(`/designs/list/${userData.username}`);
    const designs = await designsRes.json();

    const designList = document.getElementById("design-list");
    designList.innerHTML = "";

    if (designs.length === 0) {
      designList.textContent = "No designs created yet.";
    } else {
      designs.forEach((design) => {
        const div = document.createElement("div");
        div.className = "design-item";
        div.innerHTML = `<strong>${design.title}</strong> — ${design.product_type} — $${design.price}`;
        designList.appendChild(div);
      });
    }
  } catch (err) {
    console.error(err);
    document.getElementById("design-list").textContent = "Error loading data.";
  }
});