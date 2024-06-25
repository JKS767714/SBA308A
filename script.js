
//grab the section element. need this push options in the dropdown
// const selectEl = document.getElementById("selectEl")
// this is where the images should load
//const artwork = document.getElementById("artworkImg")

// //fetch the data using the uri endpoint
// const url = "https://api.artic.edu/api/v1/artworks"


// const response = await fetch(url)
// const data = await response.json()

// const option = document.createElement('option');
// artwork.forEach(element => {
//     // need to see response object to set option attributes
//     selectEl.appendChild(option)

    
// });
// ----------------------------------------
document.addEventListener('DOMContentLoaded', async () => {
    const selectEl = document.getElementById("selectEl");
    const artworkInfo = document.getElementById("artworkInfo");
    const url = "https://api.artic.edu/api/v1/artworks";

    try {
        const response = await fetch(url);
        const data = await response.json();
        const artworks = data.data;

        // Populate the select element with options
        artworks.forEach(artwork => {
            const option = document.createElement('option');
            option.value = artwork.id;
            option.textContent = artwork.title;
            selectEl.appendChild(option);
        });

        // Add event listener to handle selection change
        selectEl.addEventListener('change', () => {
            const selectedId = selectEl.value;
            if (!selectedId) {
                artworkInfo.innerHTML = ''; // Clear the info section if no artwork is selected
                return;
            }

            const selectedArtwork = artworks.find(artwork => artwork.id === selectedId);
            artworkInfo.innerHTML = `
                <h2>${selectedArtwork.title}</h2>
                <p>Artist: ${selectedArtwork.artist_display}</p>
                <p>Medium: ${selectedArtwork.medium_display}</p>
                <p>Date: ${selectedArtwork.date_display}</p>
            `;

            if (selectedArtwork.image_id) {
                const imageUrl = `https://www.artic.edu/iiif/2/${selectedArtwork.image_id}/full/843,/0/default.jpg`;
                artworkInfo.innerHTML += `<img src="${imageUrl}" alt="${selectedArtwork.title}" />`;
            }
        });
    } catch (error) {
        console.error('Error fetching artworks:', error);
    }

    // 


    // 
});


