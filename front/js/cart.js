
// recupérer le local storage
let contenuLocalstorage = JSON.parse(localStorage.getItem("product"))
console.log(contenuLocalstorage);

//Récupération des données de l'API


fetch(`http://localhost:3000/api/products`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(articles => {
    afficherProduitPanier(articles);
    console.log(articles);
  })

  /*.catch(function (err) {
    console.log(err);
  });*/

// Récupération de l'élement "cart__items"
let cartContainer = document.querySelector("#cart__items");
console.log(cartContainer);

// Affichage des produits dans la page panier
function afficherProduitPanier(articles) {
  contenuLocalstorage.forEach(produitPanier => {
    let found = articles.find(
      (element) => element.id == produitPanier.id);
      //si le panier est vide
    if (found != undefined) {
     
       return(articles) ;
        // Si le panier est remplie
      } else {
      let baliseArticle = document.createElement("article");
      baliseArticle.className = ("cart__item");
      baliseArticle.setAttribute("data-id", `{product-ID}`);
      baliseArticle.setAttribute("data-color", `{product-color}`);
      cartContainer.appendChild(baliseArticle);
      // Insertion de l'élément "div" pour l'image produit
      let divImage = document.createElement("div");
      divImage.className = ("cart__item__img");
      baliseArticle.appendChild(divImage);
      let imageElement = document.createElement("img");
      imageElement.src = produitPanier.imageUrl;
      imageElement.alt = produitPanier.altTxt;
      baliseArticle.appendChild(imageElement);
      // création de la div "content"
      let divContent = document.createElement("div");
      divContent.className = ("cart__item__content");
      baliseArticle.appendChild(divContent);
      // création de la div content-description
      let divDescription = document.createElement("div");
      divDescription.className = ("cart__item__content__description");
      divContent.appendChild(divDescription);
      // création de l'élément "h2"
      let h2 = document.createElement("h2");
      h2.textContent = produitPanier.name;
      divDescription.appendChild(h2);
      //  // Insertion de la couleur
      let Color = document.createElement("p");
      Color.textContent = produitPanier.colors;/*ici*/
      divDescription.appendChild(Color);
      // Insertion du prix
      let Price = document.createElement("p");
      Price.textContent = produitPanier.price + "€";
      divDescription.appendChild(Price);

      // Insertion de la "div" settings
      let divSettings = document.createElement("div");
      divContent.appendChild(divSettings);
      divSettings.className = "cart__item__content__settings";

      // Insertion de la "div" settings quantity
      let divSettingsQuantity = document.createElement("div");
      divSettings.appendChild(divSettingsQuantity);
      divSettingsQuantity.className = "cart__item__content__settings__quantity";

      // Insertion de la balise p "Qté 
      let pQte = document.createElement("p");
      pQte.textContent = "Qté : ";
      divSettingsQuantity.appendChild(pQte);

      //Insertion input
      let inputQte = document.createElement("input");
      divSettingsQuantity.appendChild(inputQte);
      inputQte.setAttribute("type", "number");
      inputQte.className = "itemQuantity";
      inputQte.setAttribute("name", "itemQuantity");
      inputQte.setAttribute("min", "1");
      inputQte.setAttribute("max", "100");
      inputQte.setAttribute("value", produitPanier.quantity);/*ici*/

      // Insertion de la "div" settings delete
      let divSettingsDelete = document.createElement("div");
      divSettings.appendChild(divSettingsDelete);
      divSettingsDelete.className = "cart__item__content__settings__delete";
      // Insertion de "p" supprimer
      let pDelete = document.createElement("p");
      divSettingsDelete.appendChild(pDelete);
      pDelete.className = "deleteItem";
      pDelete.innerHTML = "Supprimer";
    }
  })
}


  



