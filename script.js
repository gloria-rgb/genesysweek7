// navbar toggle 
var mainList = document.getElementById("nav_list"), hamburger = document.getElementById("hamburger");

hamburger.onclick = function () {
    "use strict";

    mainList.classList.toggle("show_list");
    hamburger.classList.toggle("active");
}

// ARRAY OF FOOD ITEMS 



const food = [
  {
    name: "Egusi Soup",
    description: "Egusi soup with vegetables. One serving can get you filled with free proteins.",
    price: 35.00,
    image: "images/egusi.jpeg",
    alt: "plate of egusi soup"
  },
  {
    name: "Fish",
    description: "Freshly prepared fish with a side of spices.",
    price: 25.00,
    image: "images/fish.jpeg",
    alt: "plate of fish"
  },
  {
    name: "Jollof Rice",
    description: "Smokey Jollof rice with a tasty sauce and vegetables.",
    price: 20.00,
    image: "images/jollof.jpeg",
    alt: "plate of jollof rice"
  },
  {
    name: "Pork Sauce",
    description: "Savouring the meat blend of our signature sauce.",
    price: 30.00,
    image: "images/pork - Copy.jpg",
    alt: "plate of meat sauce"
  },
  {
    name: "Fried Rice",
    description: "Fried rice with carrots and vegetables.",
    price: 22.00,
    image: "images/fried rice.jpg",
    alt: "plate of fried rice"
  },
  {
    name: "Spaghetti Bolognese",
    description: "Our delicious spaghetti with free proteins.",
    price: 28.00,
    image: "images/spag.jpg",
    alt: "plate of spaghetti bolognese"
  },
  {
    name: "Plantain and Beans",
    description: "Plantain porridge and beans with a side of sauce.",
    price: 18.00,
    image: "images/plantainand beans - Copy.jpeg",
    alt: "plate of plantain and beans"
  },
  {
    name: "Rice and Stew",
    description: "Our sweet rice and beans with free proteins.",
    price: 18.00,
    image: "images/stew.jpg",
    alt: "plate of rice and stew"
  }
];

// RETRIEVING MAINDIV
const menuList = document.getElementById('menu_list');

// Check if menuList exists
if (!menuList) {
  console.error('Element with id="menu_list" not found. Ensure you have a <div id="menu_list"> in your HTML.');
} else {
  // CREATING CHILD DIVS
  const foodList = document.createElement('div');
  foodList.className = 'food_list';

  const cartList = document.createElement('div');
  cartList.className = 'cart_list';


  // LOOPING THROUGH ARRAY OF OBJECTS FOR FOOD
  food.forEach(item => {
    // Validate item
    if (!item.name || !item.price || !item.image || !item.alt) {
      console.warn('Invalid food item:', item);
      return;
    }

    const foodDiv = document.createElement('div');
    foodDiv.className = 'food';

    const foodImgDiv = document.createElement('div');
    foodImgDiv.className = 'food_img';
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.alt;
    foodImgDiv.appendChild(img);

    const foodDetailsDiv = document.createElement('div');
    foodDetailsDiv.className = 'food_details';
    const nameHeading = document.createElement('h2');
    nameHeading.textContent = item.name;
    const descPara = document.createElement('p');
    descPara.textContent = item.description;
    foodDetailsDiv.appendChild(nameHeading);
    foodDetailsDiv.appendChild(descPara);

    const foodPriceDiv = document.createElement('div');
    foodPriceDiv.className = 'food_price';
    const priceSpan = document.createElement('span');
    priceSpan.className = 'price';
    priceSpan.textContent = `$${item.price.toFixed(2)}`;
    foodPriceDiv.appendChild(priceSpan);

    const addButton = document.createElement('button');
    addButton.className = 'add_to_cart';
    addButton.textContent = 'Add to Order';
    addButton.setAttribute('aria-label', `Add ${item.name} to cart`);
    addButton.onclick = () => addToCart(item);
    foodPriceDiv.appendChild(addButton);

    foodDiv.appendChild(foodImgDiv);
    foodDiv.appendChild(foodDetailsDiv);
    foodDiv.appendChild(foodPriceDiv);
    foodList.appendChild(foodDiv);
  });

  menuList.appendChild(foodList);
  menuList.appendChild(cartList);

  // Initialize cart as empty or load from localStorage
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Function to save cart to localStorage
  function saveCart() {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      console.log('Cart saved to localStorage:', cartItems);
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }

  // Function to calculate total price
  function calculateTotal() {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    console.log('Calculated total:', total);
    return total;
  }

  // Function to add item to cart
  function addToCart(item) {
    if (!item.name || !item.price || !item.image || !item.alt) {
      console.warn('Invalid item:', item);
      return;
    }
    const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...item, quantity: 1, remove: 'images/delete-bin-line.svg' });
    }
    console.log('Item added to cart:', item.name, cartItems);
    saveCart();
    updateCart();
  }

  // Function to remove item from cart
  function removeFromCart(index) {
    if (index >= 0 && index < cartItems.length) {
      console.log('Removing item at index:', index, cartItems[index]);
      cartItems.splice(index, 1);
      saveCart();
      updateCart();
    }
  }

  // Function to increment quantity
  function incrementQuantity(index) {
    if (index >= 0 && index < cartItems.length) {
      cartItems[index].quantity += 1;
      console.log('Incremented quantity for:', cartItems[index].name, 'New quantity:', cartItems[index].quantity);
      saveCart();
      updateCart();
    }
  }

  // Function to decrement quantity
  function decrementQuantity(index) {
    if (index >= 0 && index < cartItems.length) {
      if (cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
        console.log('Decremented quantity for:', cartItems[index].name, 'New quantity:', cartItems[index].quantity);
      } else {
        console.log('Removing item due to quantity 0:', cartItems[index].name);
        cartItems.splice(index, 1);
      }
      saveCart();
      updateCart();
    }
  }

  // Function to submit order
  function submitOrder() {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Add items before submitting.');
      console.log('Order submission attempted with empty cart');
      return;
    }
    const order = {
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.price * item.quantity
      })),
      total: calculateTotal(),
      timestamp: new Date().toISOString()
    };
    console.log('Order submitted:', order);
    alert('Order submitted successfully! Check the console for details.');
    cartItems = [];
    saveCart();
    updateCart();
  }

  // Function to render cart
  function updateCart() {
    // Clear cart content
    cartList.innerHTML = '';
    // Toggle cart visibility based on cartItems length
    cartList.style.display = cartItems.length > 0 ? 'block' : 'none';
    console.log('Updating cart, items:', cartItems.length, 'Display:', cartList.style.display);

    const cartTitle = document.createElement('h1');
    cartTitle.textContent = 'Your Order';
    cartList.appendChild(cartTitle);

    if (cartItems.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = 'Your cart is empty.';
      cartList.appendChild(emptyMessage);
    } else {
      cartItems.forEach((item, index) => {
        // Validate item
        if (!item.name || !item.price || !item.image || !item.alt || !item.quantity) {
          console.warn(`Invalid item in cart at index ${index}:`, item);
          return;
        }

        const cartContent = document.createElement('div');
        cartContent.className = 'cart_content';
        cartList.appendChild(cartContent);

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.alt;
        img.className = 'cart_img';
        cartContent.appendChild(img);

        const cartDetailDiv = document.createElement('div');
        cartDetailDiv.className = 'cart_detail';
        cartContent.appendChild(cartDetailDiv);

        const cartNameHeading = document.createElement('h2');
        cartNameHeading.textContent = item.name;
        cartNameHeading.className = 'cart_name';
        cartDetailDiv.appendChild(cartNameHeading);

        const cartPrice = document.createElement('span');
        cartPrice.className = 'cartprice';
        cartPrice.textContent = `$${item.price.toFixed(2)}`;
        cartDetailDiv.appendChild(cartPrice);

        const quantityDiv = document.createElement('div');
        quantityDiv.className = 'cart_quantity';
        cartDetailDiv.appendChild(quantityDiv);

        const incrementButton = document.createElement('button');
        incrementButton.className = 'increment';
        incrementButton.textContent = '+';
        incrementButton.setAttribute('aria-label', `Increase quantity of ${item.name}`);
        incrementButton.onclick = () => incrementQuantity(index);
        quantityDiv.appendChild(incrementButton);

        const quantitySpan = document.createElement('span');
        quantitySpan.className = 'number';
        quantitySpan.textContent = item.quantity;
        quantityDiv.appendChild(quantitySpan);

        const decrementButton = document.createElement('button');
        decrementButton.className = 'decrement';
        decrementButton.textContent = '-';
        decrementButton.setAttribute('aria-label', `Decrease quantity of ${item.name}`);
        decrementButton.onclick = () => decrementQuantity(index);
        quantityDiv.appendChild(decrementButton);

        const removeDiv = document.createElement('div');
        removeDiv.className = 'cart_remove';
        removeDiv.setAttribute('aria-label', `Remove ${item.name} from cart`);
        removeDiv.setAttribute('role', 'button');
        removeDiv.tabIndex = 0;
        const removeImg = document.createElement('img');
        removeImg.src = item.remove || 'images/delete-bin-line.svg';
        removeImg.alt = `remove ${item.name}`;
        removeDiv.appendChild(removeImg);
        removeDiv.onclick = () => removeFromCart(index);
        removeDiv.onkeydown = (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            removeFromCart(index);
          }
        };
        cartContent.appendChild(removeDiv);
      });

      // Add total price
      const totalDiv = document.createElement('div');
      totalDiv.className = 'total';
      const totalPrice = document.createElement('span');
      totalPrice.className = 'total_price';
      totalPrice.textContent = `$${calculateTotal().toFixed(2)}`;
      totalDiv.appendChild(totalPrice);
      cartList.appendChild(totalDiv);

      // Add submit button
      const submitBtn = document.createElement('button');
      submitBtn.className = 'Order';
      submitBtn.textContent = 'Submit Order';
      submitBtn.setAttribute('aria-label', 'Submit your order');
      submitBtn.onclick = submitOrder;
      cartList.appendChild(submitBtn);
    }
  }


  // Initial cart render
  updateCart();
}