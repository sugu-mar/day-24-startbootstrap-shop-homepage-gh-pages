document.addEventListener("DOMContentLoaded", function() {

  var addToCartButtons = document.querySelectorAll('a.btn.btn-outline-dark[href="#"]');

 
  addToCartButtons.forEach(function(link) {
    link.addEventListener("click", addToCartButtonClick);
  });


  var cartButton = document.getElementById("cartButton");


  cartButton.addEventListener("click", displayCart);


  var closeButton = document.querySelector(".modal-content .close");


  closeButton.addEventListener("click", closeCart);

  var totalAmount = 0; 

  function addToCartButtonClick(event) {
    event.preventDefault(); // Prevent the default click behavior

    var link = event.target;

   
    if (link.getAttribute("disabled") === "disabled") {
      // Enable the button
      link.removeAttribute("disabled");
      link.innerText = "Add to cart";

      // Update the cart badge count
      var cartBadge = document.querySelector(".badge.bg-dark.text-white");
      var cartItemCount = parseInt(cartBadge.textContent);
      cartItemCount -= 1; // Decrement the cart count
      cartBadge.textContent = cartItemCount;

      // Remove the item from the cart modal
      var itemName = link.dataset.itemName;
      var cartItem = document.getElementById("cartItem-" + itemName);
      cartItem.remove();

    
      totalAmount -= parseFloat(link.dataset.price);

      // Update the total amount display
      updateTotalAmount();
    } else {
      // Disable the button
      link.setAttribute("disabled", "disabled");
      link.innerText = "Remove from cart";

   
      var cartBadge = document.querySelector(".badge.bg-dark.text-white");
      var cartItemCount = parseInt(cartBadge.textContent);
      cartItemCount += 1; // Increment the cart count
      cartBadge.textContent = cartItemCount;

      // Add the item to the cart modal
      var itemName = link.dataset.itemName;
      var cartItem = document.createElement("div");
      var cartItemHeader = document.createElement("div");
      var cartItemBody = document.createElement("div");
      var productNames = document.createElement("p");
      productNames.textContent = link.dataset.productName;
      cartItem.style.border = "2px solid blue";
      cartItem.style.justifyItems = "space-evenly";
      var cartImg = document.createElement("img");
      cartImg.src = link.dataset.img;


      // Set width and height for the image
      cartImg.setAttribute("width", "60px");
      cartImg.setAttribute("height", "80px");
      cartItem.id = "cartItem-" + itemName;
      cartItemHeader.textContent = itemName;
      cartItemBody.append(cartImg, productNames);
      cartItem.style.alignItems = "center";
      cartItem.style.display = "flex";
      cartItem.style.flexDirection = "column";
      cartItem.style.width = "150px";
      cartItem.style.height = "content-fit";
      cartItem.append(cartItemHeader, cartItemBody);

      // Add the item price to the total amount
      totalAmount += parseFloat(link.dataset.price);
      const cartModal1 = document.getElementById("cartModalItems");
      cartModal1.append(cartItem);

      // Update the total amount display
      updateTotalAmount();
    }
  }

  function displayCart() {
  
    var cartModal = document.getElementById("cartModal");

    // Show the cart modal
    cartModal.style.display = "block";
  }

  function closeCart() {
  
    var cartModal = document.getElementById("cartModal");

    // Hide the cart modal
    cartModal.style.display = "none";
  }

  function updateTotalAmount() {
    var totalAmountElement = document.getElementById("totalAmount");

    // Check if the totalAmountElement already exists
    if (!totalAmountElement) {
    
      totalAmountContainer = document.createElement('div')
      totalAmountElement = document.createElement("p");
      totalAmountElement.id = "totalAmount";
      totalAmountElement.textContent = "Total Amount = $" + +totalAmount.toFixed(2);
totalAmountElement.style.alignItems="center"; 
    
      var cartModal = document.getElementById("model-content-id");
      totalAmountContainer.appendChild(totalAmountElement)
      cartModal.appendChild(totalAmountContainer);
    } else {
     
      totalAmountElement.textContent = "Total Amount = $" + totalAmount.toFixed(2);
    }
  }
});
