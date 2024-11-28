import { products } from './productsData.js'; // Your products array

const appliedFiltersContainer = document.querySelector('.applied-filters');
const filtersAppliedSection = document.querySelector('.filters-applied');
const filterOptions = document.querySelectorAll('.filter-option');
const productsContainer = document.querySelector('.products-container');

let selectedFilters = {  // can be maintained in the session storage so that it stays for the session
    brand: [],
    speedCategory: [],
    colorCapacity: [],
    copierType: []
};

// Function to display filtered products
function renderProducts() {
    // Filter the products array based on selectedFilters
    const filteredProducts = products.filter(product => {
        const matchesBrand = selectedFilters.brand.length
            ? selectedFilters.brand.includes(product.brand)
            : true;
        const matchesSpeedCategory = selectedFilters.speedCategory.length
            ? selectedFilters.speedCategory.includes(product.specifications.speed)
            : true;
        const matchesColorCapacity = selectedFilters.colorCapacity.length
            ? selectedFilters.colorCapacity.includes(product.generalSpecifications.colorCapability)
            : true;
        const matchesCopierType = selectedFilters.copierType.length
            ? selectedFilters.copierType.includes(product.generalSpecifications.copierType)
            : true;

        return matchesBrand && matchesSpeedCategory && matchesColorCapacity && matchesCopierType;
    });

    // Clear existing product cards
    productsContainer.innerHTML = '';

    // Render filtered products
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = '<p>No products match your filters.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="https://via.placeholder.com/200" alt="${product.name}" class="product-image">
            <div class="product-details">
                <div class="compact">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">Brand: ${product.brand}</p>
                    <p class="product-description">Speed: ${product.specifications.speed}</p>                   
                </div>               
                <button class="add-to-cart-btn">Add to Cart</button>
            </div>
        `;
        productsContainer.appendChild(productCard);
        productCard.addEventListener('click', () => {
            const productDetailsUrl = `/product-details.html?product=${encodeURIComponent(JSON.stringify(product))}`;
            window.location.href = productDetailsUrl;
        });
    });

    
}

// Function to add a filter tag
function addFilterTag(filterText, filterType) {
    if (selectedFilters[filterType].includes(filterText)) {
        return; // Don't add the filter again if it is already applied
    }

    const filterTag = document.createElement('div');
    filterTag.classList.add('filter-tag');
    filterTag.innerHTML = `${filterText} <span class="remove-filter" filter-type='${filterType}' data-filter='${filterText}'>X</span>`;

    // Append to the applied filters container
    appliedFiltersContainer.appendChild(filterTag);

    // Add event listener to remove the filter
    const removeButton = filterTag.querySelector('.remove-filter');
    removeButton.addEventListener('click', (event) => {
        const filterTypeRem = event.target.getAttribute('filter-type');
        const filterTextRem = event.target.getAttribute('data-filter');
        const index = selectedFilters[filterTypeRem].indexOf(filterTextRem);
        if (index !== -1) selectedFilters[filterTypeRem].splice(index, 1); // Remove filter from selectedFilters
        filterTag.remove();
        checkIfAnyFilters(); // Check if any filters are applied
        renderProducts(); // Re-render products after filter removal
    });

    selectedFilters[filterType].push(filterText); // Add filter to the selectedFilters object

    // Show the filters-applied section if it was hidden
    filtersAppliedSection.style.display = 'flex';

    renderProducts(); // Re-render products after applying a filter
}

// Check if any filters are applied
function checkIfAnyFilters() {
    if (appliedFiltersContainer.children.length === 0) {
        filtersAppliedSection.style.display = 'none';
        selectedFilters = {
            brand: [],
            speedCategory: [],
            colorCapacity: [],
            copierType: []
        };
        renderProducts(); // Reset to show all products
    }
}

// Event listeners for filter options
filterOptions.forEach(option => {
    option.addEventListener('click', function (event) {
        const filterText = event.target.getAttribute('data-filter'); // data-filter stores the specific value of a filter
        const filterType = event.target.getAttribute('filter-type');
        addFilterTag(filterText, filterType); // Add filter to the applied filters list
    });
});

// JavaScript to toggle dropdown
document.querySelector('.dropdown button').addEventListener('click', function () {
    var dropdownContent = document.querySelector('.dropdown-content-2');
    dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
});

// Initial render of all products
renderProducts();
