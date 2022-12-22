//récupérer les paramètres d’URL
let str = window.location.href;
let url = new URL(str);
let idProduit = url.searchParams.get("id");
console.log(idProduit);
//Appel API avec l'id du produit
fetch(`http://localhost:3000/api/products/${idProduit}`)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(product => {
    afficherProduit(product);
    console.log(product);
  })

  .catch(function (err) {
    console.log(err);
  });
//Affichage du produit
function afficherProduit(product) {
  let divImage = document.querySelector(".item__img");

  // insertion image du canapé
  let imageElement = document.createElement("img")
  imageElement.src = product.imageUrl;
  imageElement.alt = product.altTxt;
  divImage.appendChild(imageElement)

  // insertion du nom du canapé
  let nomElement = document.querySelector("#title")
  nomElement.innerHTML = product.name

  // insertion du prix du canapé
  let prixElement = document.querySelector("#price")
  prixElement.innerHTML = product.price

  // insertion description du canapé
  let descriptionElement = document.querySelector("#description")
  descriptionElement.innerHTML = product.description

  // configurer le choix des couleurs

  product.colors.forEach(color => {
    let couleurElement = document.querySelector("#colors");
    console.log(color);
    let optionCouleur = document.createElement("option");
    couleurElement.appendChild(optionCouleur)
    optionCouleur.setAttribute("value", color);
    optionCouleur.innerHTML = color;
  });
}

//Activation du bouton "Ajouter au panier"
// récupérer l'élément sur lequel on veut détecter le clic
let btnpanier = document.querySelector("#addToCart");
console.log(btnpanier);
// stocker la récupération des valeurs dans le local storage
let contenuLocalstorage = JSON.parse(localStorage.getItem("product")) || [];
console.log(contenuLocalstorage);
//écouter l'événement click
btnpanier.addEventListener("click", function () {
  const quantityProduit = document.getElementById("quantity").value;
  console.log(quantityProduit);
  const couleurChoisie = document.getElementById("colors").value;
  console.log(couleurChoisie);
  if (quantityProduit <= 0 || quantityProduit > 100 || couleurChoisie == "") {
    alert("Veuillez choisir une quantité entre 1 et 100 et/ou une couleur de canapé");

  } else {
    //création nouveau produit avec les 3 références
    let newProduct = {
      id: idProduit,
      quantity: quantityProduit,
      color: couleurChoisie,
    };
    console.log(newProduct);
    // rechercher un produit si  déja existant ds le LS
    //const contenuLocalstorage = [idProduit, quantityProduit, couleurChoisie];//ici
    const found = contenuLocalstorage.find(
      (element) => element.id == idProduit && element.color == couleurChoisie);

    if (found != undefined) {
      //valeur LocaleStorage + value actuelle
      let totalQuantity = parseInt(found.quantity) + parseInt(newProduct.quantity);
      found.quantity = totalQuantity;


    } else {
      //=> on enregistre les éléments ds le LS si il n'existe pas
      contenuLocalstorage.push(newProduct);

    }
    //  on enregistre le nv element et on additionne ds le LS
    localStorage.setItem("product", JSON.stringify(contenuLocalstorage));

    popup(newProduct)

  }
});
// message de notification lors de l’ajout d’un produit au panier 
const popup = (product) => {

  if (window.confirm(`Votre produit ${product.quantity} ${product.color} est ajoutée au panier
      Pour consulter votre panier, cliquez sur OK`)) {
    ////renvoie sur la page panier du client
    window.location.href = "cart.html";
  }
  else {
    //renvoie sur la page d'acceuil 
    window.location.href = "index.html";
  }
}














