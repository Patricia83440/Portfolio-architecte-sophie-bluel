// Appel API qui récupère les projets
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((response) => {
    let gallery = document.getElementsByClassName("gallery");
    let modaleGallery = document.getElementsByClassName("modale-gallery");

    response.forEach((_work) => {
      // console.log(_work);
      // Création des blocs HTML
      let figure = document.createElement("figure");
      let image = document.createElement("img");
      let figcaption = document.createElement("figcaption");

      // Remplissage des blocs HTML avec les données
      image.setAttribute("src", _work.imageUrl);
      image.setAttribute("alt", _work.title);
      figcaption.innerHTML = _work.title;

      // Attribution des enfants aux parents
      figure.appendChild(image);
      figure.appendChild(figcaption);

      figure.setAttribute("categorieId", _work.categoryId);
      figure.classList.add("project");

      // Ajout du bloc projet à la gallerie
      gallery[0].appendChild(figure);

      // Ajout des projets dans la modale
      let article = document.createElement("article");
      let imageModale = document.createElement("img");
      let icon = document.createElement("i");

      // Remplissage des blocs HTML avec les données
      imageModale.setAttribute("src", _work.imageUrl);
      imageModale.setAttribute("alt", _work.title);
      icon.classList.add("fa-solid");
      icon.classList.add("fa-trash-can");
      icon.setAttribute("deleteIcon", "true");
      icon.setAttribute("projectId", _work.id);

      article.appendChild(imageModale);
      article.appendChild(icon);

      // Ajout du bloc projet à la gallerie
      modaleGallery[0].appendChild(article);
    });

    //Supression du projet
    document.querySelectorAll("article i").forEach((_button, i) => {
      _button.addEventListener("click", (event) => {
        let project = event.target;
        let projectId = project.getAttribute("projectId");

        const requestOptions = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        };

        fetch(`http://localhost:5678/api/works/${projectId}`, requestOptions)
          .then((response) => response.json())
          .then((response) => {
            // this is were the magic happend
          });
      });
    });
  })
  .catch((error) => console.log(error));

// Appel API qui récupère les catégories
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((response) => {
    let categories = document.querySelector(".categories");
    response.forEach((_categorie) => {
      // console.log(_categorie);
      // Création des blocs HTML
      let paragraphe = document.createElement("button");

      // Remplissage des blocs HTML avec les données
      paragraphe.innerHTML = _categorie.name;

      paragraphe.setAttribute("categorieId", _categorie.id);
      paragraphe.classList.add("categorie-button");

      // Ajout du bloc catégories
      categories.appendChild(paragraphe);
    });

    // Tri par catégories
    document.querySelectorAll(".categorie-button").forEach((_button, i) => {
      _button.addEventListener("click", (event) => {
        let category = event.target;
        let categorySelected = category.getAttribute("categorieId");

        sortByCategory(categorySelected);
      });
    });
  });

const sortByCategory = (categorySelected) => {
  document.querySelectorAll(".project").forEach((_project, i) => {
    _project.style.display = "none";
  });

  document.querySelectorAll(".project").forEach((_project, i) => {
    if (
      _project.getAttribute("categorieid") === categorySelected ||
      categorySelected === "0"
    ) {
      _project.style.display = "block";
    }
  });
};

if (sessionStorage.getItem("token")) {
  // Afficher le bandeau et le bouton modifier, changer "login" en "logout", et masquer les catégories

  // modifier la marge du header
  document.querySelector("header").classList.add("logged-header");

  // afficher le bandeau du haut
  document.querySelector(".banner").classList.add("logged-banner");

  // changer le text du lien/button
  document.querySelector("#login-logout a").innerHTML = "logout";

  // afficher les boutton modifier
  document.querySelector(".logged-button").classList.add("logged");

  // masquer les catégories
  document.querySelector(".categories").classList.add("hidden");

  // si rester sur page d'accueil apres logout
  document
    .querySelector("#login-logout a")
    .setAttribute("href", "./index.html");

  // capte le click sur le lien pour vider le session storage et changer logout par login
  document.querySelector("#login-logout a").addEventListener("click", () => {
    sessionStorage.clear();
    document.getElementById("login-logout").innerHTML = "login";

    // si rester sur page d'accueil apres logout
    document.querySelector(".banner").classList.remove("logged");
    document.querySelector(".logged-button").classList.remove("logged");
    document.querySelector(".categories").classList.remove("hidden");
  });
} else {
  console.log("tu n'est pas connecté !!!");
}
