/// On récupère l'id et on affiche le numéro de commande
let orderId = window.location.search.split("?orderId=").join("");
document.querySelector("#orderId").innerText = `${orderId}`;
/// Supprimer localStorage 
if (orderId != undefined ) {
    localStorage.clear();
}
    

