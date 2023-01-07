// recupérer le local storage
function getLocalestorage() {
  let panier = JSON.parse(localStorage.getItem("product"));
  return panier || [];
}
//Récupération des données de l'API
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then((articles) => {
    afficherProduitPanier(articles);
    console.log(articles);
  })
  .catch(function (err) {
    console.log(err);
  });

// Récupération de l'élement "cart__items"
let cartContainer = document.querySelector("#cart__items");
// Affichage des produits dans la page panier
function afficherProduitPanier(articles) {
  getLocalestorage().forEach((produitPanier) => {
    let found = articles.find((element) => element._id == produitPanier.id);
    if (found != undefined) {
      let baliseArticle = document.createElement("article");
      baliseArticle.className = "cart__item";
      baliseArticle.setAttribute("data-id", produitPanier.id);
      baliseArticle.setAttribute("data-color", produitPanier.color);
      // Insertion de l'élément "div" pour l'image produit
      let divImage = document.createElement("div");
      divImage.className = "cart__item__img";
      let imageElement = document.createElement("img");
      imageElement.src = found.imageUrl;
      imageElement.alt = found.altTxt;
      divImage.appendChild(imageElement);
      baliseArticle.appendChild(divImage);
      // création de la div "content"
      let divContent = document.createElement("div");
      divContent.className = "cart__item__content";
      // création de la div content-description
      let divDescription = document.createElement("div");
      divDescription.className = "cart__item__content__description";
      // création de l'élément "h2"
      let h2 = document.createElement("h2");
      h2.textContent = found.name;
      divDescription.appendChild(h2);
      // Insertion de la couleur
      let color = document.createElement("p");
      color.textContent = produitPanier.color;
      divDescription.appendChild(color);
      // Insertion du prix
      let price = document.createElement("p");
      price.textContent = found.price + "€";
      divDescription.appendChild(price);
      divContent.appendChild(divDescription);
      // Insertion de la "div" settings
      let divSettings = document.createElement("div");
      divSettings.className = "cart__item__content__settings";
      // Insertion de la "div" settings quantity
      let divSettingsQuantity = document.createElement("div");
      divSettingsQuantity.className = "cart__item__content__settings__quantity";
      // Insertion de la balise p "Qté
      let pQte = document.createElement("p");
      pQte.textContent = "Qté : ";
      divSettingsQuantity.appendChild(pQte);
      //Insertion input
      let inputQte = document.createElement("input");
      inputQte.setAttribute("type", "number");
      inputQte.className = "itemQuantity";
      inputQte.setAttribute("name", "itemQuantity");
      inputQte.setAttribute("min", "1");
      inputQte.setAttribute("max", "100");
      inputQte.setAttribute("value", produitPanier.quantity);
      inputQte.addEventListener("change", (event) => {
        let nouvelleValeur = event.target.value;
        ///aller localestoreg chercher l'article avec id et la couleur similaire et en change la quantity
        let panier = getLocalestorage();
        let found = panier.find(
          (element) =>
            element.id == produitPanier.id &&
            element.color == produitPanier.color
        );
        if (found != undefined) {
          found.quantity = nouvelleValeur;
          localStorage.setItem("product", JSON.stringify(panier));
          calculerTotalQuantity();
          priceTotals(articles);
        }
      });
      divSettingsQuantity.appendChild(inputQte);
      divSettings.appendChild(divSettingsQuantity);
      // Insertion de la "div" settings delete
      let divSettingsDelete = document.createElement("div");
      divSettingsDelete.className = "cart__item__content__settings__delete";
      // Insertion de "p" supprimer
      let pDelete = document.createElement("p");
      pDelete.className = "deleteItem";
      pDelete.innerHTML = "Supprimer";
      // Suppression d'un produit
      // Lors du clic sur le btn suppr on récup l'id de l'article en question
      pDelete.addEventListener("click", (event) => {
        if (window.confirm(`êtes-vous sûr de vouloir supprimer cet article?`)) {
          let removeItem = pDelete.closest(".cart__item"); 
          let nouveauPanier = getLocalestorage().filter(
            (item) =>
              item.color !== produitPanier.color &&
              event.currentTarget.dataset.id !== item.id
          );
          localStorage.setItem("product", JSON.stringify(nouveauPanier));
          // suppr l'article concerné du DOM
          removeItem.remove();
          calculerTotalQuantity();
          priceTotals(articles);
        }
      });
      divSettingsDelete.appendChild(pDelete);
      divSettings.appendChild(divSettingsDelete);
      divContent.appendChild(divSettings);
      baliseArticle.appendChild(divContent);
      cartContainer.appendChild(baliseArticle);
    }
  });
  calculerTotalQuantity();
  priceTotals(articles);
}
function calculerTotalQuantity() {
  let quantityTotal = 0;
  // Récupération du total des quantités
  getLocalestorage().forEach((produitPanier) => {
    quantityTotal += parseInt(produitPanier.quantity);
  });
  let productTotalQuantity = document.querySelector("#totalQuantity");
  productTotalQuantity.innerHTML = quantityTotal;
}
// Récupération du prix total
function priceTotals(articles) {
  let priceTotal = 0;
  // Récupération du total des quantités
  getLocalestorage().forEach((produitPanier) => {
    let found = articles.find((element) => element._id == produitPanier.id);
    if (found != undefined) {
      priceTotal += parseInt(produitPanier.quantity) * found.price;
    }
  });
  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.innerHTML = priceTotal;
}
// Déclaration des variables utilisées pour le formulaire et REGEX //
let form = document.querySelector(".cart__order__form");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");
// Valider le formulaire //
// types regex sur les inputs
let addressRegex = /^[#.0-9a-zA-Z\s,-]+$/;
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let genericRegex = /^[a-zA-Z\u00C0-\u00FF ,.'-]+$/;
let confirm = document.getElementById("order");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    genericRegex.test(firstName.value) == true &&
    genericRegex.test(lastName.value) == true &&
    genericRegex.test(city.value) == true &&
    emailRegex.test(`${email.value}`) == true &&
    addressRegex.test(address.value) == true
  ) {
    order();
  } else {
    alert("Veuillez vérifiez vos informations de contact");
  }
});
////Validation avec Bouton Commander//
function order() {
  let produitsIds = [];
  getLocalestorage().forEach((produitPanier) => {
    produitsIds.push(produitPanier.id);
  });
  const objectCommand = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    },
    products: produitsIds,
  };
  // envoyer la requete post avec les infos contacts à L'API
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(objectCommand),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      let orderId = json.orderId;
      // confirmation order //
      window.location.assign(`confirmation.html?orderId=${orderId}`);
    });
}
