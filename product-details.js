// Retrieve the product object from the URL
const urlParams = new URLSearchParams(window.location.search);
const productParam = urlParams.get('product');

if (productParam) {
    const product = JSON.parse(decodeURIComponent(productParam));

    // Populate the product details dynamically
    document.getElementById('productImage').src = 'https://via.placeholder.com/500x500';
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productBrand').textContent = `Brand: ${product.brand}`;
    document.getElementById('productCategory').textContent = `Category: ${product.category.join(', ')}`;

    const specsList = document.getElementById('productSpecifications');
    for (const [key, value] of Object.entries(product.specifications)) {
        if (typeof value === 'object') {
            specsList.innerHTML += `<li><b>${key}:</b> ${Object.entries(value).map(([k, v]) => `${k}: ${v}`).join(', ')}</li>`;
        } else {
            specsList.innerHTML += `<li><b>${key}:</b> ${value}</li>`;
        }
    }

    const generalSpecsList = document.getElementById('generalSpecifications');
    for (const [key, value] of Object.entries(product.generalSpecifications)) {
        generalSpecsList.innerHTML += `<li><b>${key}:</b> ${value}</li>`;
    }

    document.getElementById('productPower').textContent = `Power: ${product.specifications.power.voltage} at ${product.specifications.power.current}`;

    if (!product.freeQuoteButton) {
        document.getElementById('getQuote').style.display = 'none';
    }
} else {
    console.error('No product data found in URL');
}
