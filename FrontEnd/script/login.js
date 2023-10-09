//Récupération du formulaire
const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = document.getElementById("form");
  const submitter = document.querySelector("button[type=submit]");
  const formData = new FormData(form, submitter);
  const finalData = {};

  for (const [key, value] of formData) {
    finalData[key] = value;
  }

  // Appel API qui récupère les catégories
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(finalData),
  };

  fetch("http://localhost:5678/api/users/login", requestOptions)
    .then((response) => response.json())
    .then((response) => {
      sessionStorage.setItem("token", response.token);
      window.location.href = "index.html";
    });
});

