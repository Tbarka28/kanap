/// On récupère l'id et on affiche le numéro de commande
const params = new URLSearchParams(document.location.search);
const orderId = params.get("orderId");
document.querySelector("#orderId").innerText = `${orderId}`;
/// Supprimer localStorage 
if (orderId != undefined ) {
    localStorage.clear();
}
    

