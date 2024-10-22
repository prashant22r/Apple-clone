function addToCart(product) {
        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Product added to cart successfully!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to add product to cart.');
        });
    }
    function getProductDetails() {
        const product = {
            name: document.querySelector('h1').innerText, 
            price: document.querySelector('#price').innerText, 
            image: document.getElementById("imgs").src 
        };
        return product;
    }
    document.getElementById('addToCart').addEventListener('click', function() {
        const product = getProductDetails();
        addToCart(product);
    });

    document.getElementById('buyNow').addEventListener('click', function() {
        const product = getProductDetails();
        addToCart(product);
    });