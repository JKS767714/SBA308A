
document.addEventListener('DOMContentLoaded', async () => {
    console.log("DOM fully loaded and parsed");

    const selectEl = document.getElementById("selectElement");
    const artworkInfo = document.getElementById('artworkInfo');
    const url = "https://api.artic.edu/api/v1/artworks";

    try {
        const response = await fetch(url);
        const data = await response.json();
        const artworks = data.data;
        console.log(artworks);

        artworks.forEach(artwork => {
            const option = document.createElement('option');
            option.value = artwork.id;
            option.innerHTML = artwork.title; // Assuming artist_title is not available, using title instead
            selectEl.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching artworks:', error);
    }

    document.getElementById("fetchArtworkBtn").addEventListener('click', async () => {
        
        const selectedArtworkId = selectEl.value;
        if (!selectedArtworkId) {
            artworkInfo.innerHTML = "<p>Please select an artist first.</p>";
            return;
        }

        const apiUrl = `https://api.artic.edu/api/v1/artworks/${selectedArtworkId}?fields=id,title,image_id`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            console.log(data);

            const artwork = data.data;
            const iiifBaseUrl = data.config.iiif_url;
            const imageId = artwork.image_id;

            const imageUrl = `${iiifBaseUrl}/${imageId}/full/843,/0/default.jpg`;

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