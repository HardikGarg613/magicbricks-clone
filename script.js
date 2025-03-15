document.addEventListener("DOMContentLoaded", function () {
    // Dark Mode
    document.getElementById("darkModeToggle").addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });

    // Fetch Properties from Backend
    function fetchProperties() {
        fetch("http://localhost:3000/properties")
            .then(response => response.json())
            .then(data => displayProperties(data))
            .catch(error => console.error("Error:", error));
    }

    // Display Properties
    function displayProperties(properties) {
        let propertyList = document.getElementById("property-list");
        propertyList.innerHTML = "";
        properties.forEach(property => {
            let card = document.createElement("div");
            card.classList.add("property-card");
            card.innerHTML = `
                <img src="${property.image}" alt="${property.name}">
                <h3>${property.name}</h3>
                <p>${property.location} - ${property.price}</p>
                <button>Explore</button>
            `;
            propertyList.appendChild(card);
        });
    }

    // Search Function
    window.searchProperties = function () {
        let location = document.getElementById("search-location").value.toLowerCase();
        let budget = document.getElementById("search-budget").value;

        fetch(`http://localhost:3000/search?location=${location}&budget=${budget}`)
            .then(response => response.json())
            .then(data => displayProperties(data))
            .catch(error => console.error("Error:", error));
    }

    fetchProperties();
});
