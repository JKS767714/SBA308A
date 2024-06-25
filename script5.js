document.addEventListener('click', () => {
    const fetchArtworkBtn = document.getElementById("fetchArtworkBtn");
    const artworkInfo = document.getElementById("artworkInfo");

    fetchArtworkBtn.addEventListener('click', async () => {
        const artworkId = 27992; // ID for "La Grande Jatte"
        const apiUrl = `https://api.artic.edu/api/v1/artworks/${artworkId}?fields=id,title,image_id`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Log the data to the console to view the JSON response
            console.log(data);

            // Get the necessary fields from the response
            const artwork = data.data;
            const iiifBaseUrl = data.config.iiif_url;
            const imageId = artwork.image_id;

            // Construct the IIIF Image URL
            const imageUrl = `${iiifBaseUrl}/${imageId}/full/843,/0/default.jpg`;

            // Display the artwork information and image
            artworkInfo.innerHTML = `
                <h2>${artwork.title}</h2>
                <img src="${imageUrl}" alt="${artwork.title}" />
            `;
        } catch (error) {
            console.error('Error fetching artwork data:', error);
            artworkInfo.innerHTML = `<p>Failed to fetch artwork data. Please try again later.</p>`;
        }
    });
});