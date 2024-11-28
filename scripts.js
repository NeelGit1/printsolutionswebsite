document.querySelector('.sort-button').addEventListener('click', function () {
    const sortContainer = document.querySelector('.sort-container');
    sortContainer.classList.toggle('active'); // Toggle the dropdown visibility
    var dropdownContent = document.querySelector('.dropdown-content-1');
    dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';

    // Optionally: You can trigger sorting based on selection here
});

// Add event listeners to sort options
document.querySelectorAll('.dropdown-content-1 a').forEach(option => {
    option.addEventListener('click', function (event) {
        event.preventDefault();
        const sortType = event.target.getAttribute('data-sort');
        console.log('Sort selected: ', sortType);
        // You can trigger your sorting functionality based on sortType here
        // Example: filterProducts(sortType);
    });
});

