const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      // Save token and user info here — after successful login
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userEmail", data.email);

      alert("Login successful! Token saved.");
      // Optionally redirect:
      // window.location.href = "dashboard.html";
    } else {
      alert(data.message || "Login failed!");
    }
  } catch (err) {
    alert("Server error!");
    console.error(err);
  }
});

if (res.ok) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("userName", data.name);
  localStorage.setItem("userEmail", data.email);
  
  alert("Login successful! Redirecting to dashboard...");
  window.location.href = "dashboard.html"; // redirect after login
}
