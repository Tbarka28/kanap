
// recupérer le local storage
let contenuLocalstorage = JSON.parse(localStorage.getItem("product"));
console.log(contenuLocalstorage);

//Récupération des données de l'API


fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(articles => {
    afficherProduitPanier(articles);
    console.log(articles);
  })


  .catch(function (err) {
    console.log(err);
  });

// Récupération de l'élement "cart__items"
let cartContainer = document.querySelector("#cart__items");
console.log(cartContainer);

// Affichage des produits dans la page panier
function afficherProduitPanier(articles) {
  contenuLocalstorage.forEach(produitPanier => {
    let found = articles.find(
      (element) => element._id == produitPanier.id);
    console.log(found)
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
      //  // Insertion de la couleur

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
      pDelete.addEventListener("click", (event) => {
        alert("Ce produit a bien été supprimé du panier")
        let nouveauPanier = contenuLocalstorage.filter((item) => (item.color !== produitPanier.color) && (event.currentTarget.dataset.id !== item.id));
        localStorage.setItem("product", JSON.stringify(nouveauPanier));

        location.reload()
      });
      divSettingsDelete.appendChild(pDelete);
      divSettings.appendChild(divSettingsDelete);
      divContent.appendChild(divSettings);
      baliseArticle.appendChild(divContent);
      cartContainer.appendChild(baliseArticle);

    }

  })
  getTotals(articles)
  priceTotals(articles)
  changeQty();

}

function getTotals(articles) {
  let quantityTotal = 0;
  // Récupération du total des quantités
  contenuLocalstorage.forEach(produitPanier => {
    let found = articles.find(
      (element) => element._id == produitPanier.id);

    if (found != undefined) {

      quantityTotal += parseInt(produitPanier.quantity);
    }
  })
  let productTotalQuantity = document.querySelector("#totalQuantity");
  productTotalQuantity.innerHTML = quantityTotal;
  console.log(quantityTotal);
}

// Récupération du prix total
function priceTotals(articles) {
  let priceTotal = 0;
  // Récupération du total des quantités
  contenuLocalstorage.forEach(produitPanier => {
    let found = articles.find(
      (element) => element._id == produitPanier.id);

    if (found != undefined) {
      priceTotal += parseInt(produitPanier.quantity) * (found.price);

    }
  })
  let productTotalPrice = document.getElementById("totalPrice");
  productTotalPrice.innerHTML = priceTotal;
  console.log(priceTotal);
}

// Fonction permettant de changer de quantité dans le panier
function changeQty() {
  const itemQte = document.querySelectorAll('.itemQuantity')
  for (let i = 0; i < itemQte.length; i++) {
    itemQte[i].addEventListener('input', function () {
      let changeQty = itemQte[i].value;
      contenuLocalstorage[i].quantity = changeQty;
      localStorage.setItem("product", JSON.stringify(contenuLocalstorage));
      // Recharge la page afin de voir les changements.
      location.reload();
    });
  };
};


// Déclaration des variables utilisées pour le formulaire et REGEX //

let form = document.querySelector(".cart__order__form");
let confirm = document.getElementById("order");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let address = document.getElementById("address");
let city = document.getElementById("city");
let email = document.getElementById("email");

let addressRegex = /^[#.0-9a-zA-Z\s,-]+$/;
let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
let genericRegex = /^[a-zA-Z\u00C0-\u00FF ,.'-]+$/;

// Valider le formulaire //

function validateForm() {
  confirm.addEventListener("click", (e) => {
    if (
      genericRegex.test(firstName.value) == true &&
      genericRegex.test(lastName.value) == true &&
      genericRegex.test(city.value) == true &&
      emailRegex.test(email.value) == true &&
      addressRegex.test(address.value) == true
    ) {
      e.preventDefault();
      order();
    } else {
      alert("Veuillez vérifiez vos informations de contact");
      e.preventDefault();
    }
  });
}
validateForm();

////Validation avec Bouton Commander//

function order() {
  for (let i in contenuLocalstorage) {
    const objectCommand = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },
      products: [contenuLocalstorage[i].id],
    };
    // envoyer la requete post avec les infos contacts à L'API
    let fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(objectCommand),
    };
    fetch("http://localhost:3000/api/products/order", fetchOption)
      .then((response) => response.json())
      .then((json) => {
        let orderId = json.orderId;
        // confirmation order //
        window.location.assign(`confirmation.html?orderId=${orderId}`);
        // Supprimer localStorage //
        localStorage.clear();
      });
  }
}































































