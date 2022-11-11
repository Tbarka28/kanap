/*//Récupération des données de l'API
 
//ajouter les produits dans la page d'acceuil


//création du lien du produit
console.log("#items", document.getElementById("items"));
console.log(".items", document.getElementsByClassName("items"));



/*function displayProducts(products) {
  let conteneurProduits= document.getElementById("items");
  //conteneurProduits.innerHTML="";*/
/*const products = 8;
for (let i = 0; i < products; i++) {
         
const produitLien = document.createElement("a");
document.getElementById("items").appendChild(produitLien);
produitLien.setAttribute("href", "./product.html?id=42");

//création de la balise parent (article) et les balises enfants
const produitArticle = document.createElement("article");
document.getElementById("items").appendChild(produitArticle);

//creation de la balise enfant (img) image du produit.
const produitImg = document.createElement("img");
produitImg.setAttribute("src", "imageUrl" );
produitImg.setAttribute("alt", "Lorem ipsum dolor sit amet, Kanap name1");
produitArticle.appendChild(produitImg);

//creation de la balise (h3) le nom du produit.
const produitNom = document.createElement("h3");
produitNom.setAttribute("class", "productName");
produitNom.innerHTML = "Kanap name1";
produitArticle.appendChild(produitNom)

//creation de la balise (p) description du produit.

const produitDescription = document.createElement("p");
produitDescription.setAttribute("class", "productDescription");
produitDescription.innerHTML = "Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.";
produitArticle.appendChild(produitDescription)
}*/
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(articles => {
    ajoutArticles(articles);
    console.log(articles);
  })
  .catch(function (err) {
    console.log(err);
  });

// Afficher tout les produits

function ajoutArticles(articles) {
  let fragment = document.createDocumentFragment()
  for (let article of articles) {
    let carte = document.createElement("a")
    carte.setAttribute("href", "./product.html?id=${article._id}")
    //création de la balise parent (article) et les balises enfants
    let baliseArticle = document.createElement("article")
    let image = document.createElement("img")
    image.src = article.imageUrl
    image.alt = article.altTxt
    baliseArticle.appendChild(image)
    let titre = document.createElement("h3")
    titre.classList.add("productName")
    titre.textContent = article.name
    baliseArticle.appendChild(titre)
    let parag = document.createElement("p")
    parag.classList.add("productDescription")
    parag.textContent = article.description
    baliseArticle.appendChild(parag)
    carte.appendChild(baliseArticle)
    fragment.appendChild(carte)
  }
  document.getElementById("items").appendChild(fragment)
}