//Récupération des données de l'API
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

//  Insérer les produits dans la page d’accueil 

function ajoutArticles(articles) {
  //let fragment = document.createDocumentFragment()
  let produitconteneur=document.getElementById("items")
  for (let article of articles) {

    //création du lien (a) du produit
    let lienElement = document.createElement("a")
    lienElement.setAttribute("href", `./product.html?id=${article._id}`)

    //création de la balise parent (article) et les balises enfants
    let baliseArticle = document.createElement("article")

    //creation de la balise enfant (img) image du produit.
    let imageElement = document.createElement("img")
    imageElement.src = article.imageUrl;
    imageElement.alt = article.altTxt;
    baliseArticle.appendChild(imageElement)

    //creation de la balise (h3) le nom du produit.
    let titreElement = document.createElement("h3")
    titreElement.classList.add("productName")
    titreElement.textContent = article.name
    baliseArticle.appendChild(titreElement)

    //creation de la balise (p) description du produit.
    let paragElement = document.createElement("p")
    paragElement.classList.add("productDescription")
    paragElement.textContent = article.description
    baliseArticle.appendChild(paragElement)

    lienElement.appendChild(baliseArticle)
    //fragment.appendChild(carte)
    produitconteneur.appendChild(lienElement)
  }
 // document.getElementById("items").appendChild(fragment)
}