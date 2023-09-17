const loginForm = document.getElementById("login-form");

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const loginFormData = new FormData(loginForm);
  const loginPayload = Object.fromEntries(loginFormData);

  console.log(loginPayload);

  try {
    const response = await fetch("/api/sessions/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginPayload),
    });
    console.log(response);
    // window.location.href = "/profile";
  } catch (error) {
    console.log(error);
    // window.location.href = "/";
  }
});
