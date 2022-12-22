let orderId = window.location.search.split("?orderId=").join("");
document.querySelector("#orderId").innerText = `${orderId}`;