    alert("JS file loaded!");
    const form = document.getElementById('productForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        name: form.name.value,
        price: Number(form.price.value),
        description: form.description.value
      };

      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      alert('Product added: ' + JSON.stringify(result));
      form.reset();
    });

    
