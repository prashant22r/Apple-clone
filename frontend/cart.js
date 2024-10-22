
function fetchCartItems() {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        const productDiv = document.querySelector(".product");
        productDiv.innerHTML = ""; 
  
        let totalAmount = 0;
  
        if (data.length === 0) {
          productDiv.innerHTML = "<h1>Cart is Empty</h1>";
        } else {
          data.forEach((item) => {
            const itemPrice = parseFloat(item.price.replace(/₹|,/g, "")); 
            if (!isNaN(itemPrice)) {
                totalAmount += itemPrice;
            }
  
            const productElement = document.createElement("div");
            productElement.classList.add("cart-item");
            productElement.innerHTML = `
              <img src="${item.image}" alt="${item.name}" />
              <h2>${item.name}</h2>
              <p>Price: ${item.price}</p>
              <button onclick="removeFromCart('${item.id}')">Remove from Cart</button>
            `;
            productDiv.appendChild(productElement);
          });
  
          const totalElement = document.createElement("div");
          totalElement.classList.add("total-amount");
          totalElement.innerHTML =  `<h2>Total Amount: ₹${totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</h2>`;
          productDiv.appendChild(totalElement);
        }
      })
      .catch((error) => console.error("Error fetching cart items:", error));
  }
  
  function removeFromCart(id) {
    console.log("Attempting to remove item with ID:", id);
  
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchCartItems(); 
        } else {
          console.error("Failed to remove item from cart");
        }
      })
      .catch((error) => console.error("Error removing item from cart:", error));
  }
  
  window.onload = fetchCartItems;
  