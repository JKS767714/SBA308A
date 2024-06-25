
// document.addEventListener('DOMContentLoaded', async () => {
//     //capturing select element
//     const selectEl = document.getElementById("selectEl");
//     const artworkImg = document.getElementById("artworkImg");
//     const url = "https://api.artic.edu/api/v1/artworks";

//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         const artworkImg = data.data;

//         // Populate the select element with options
//         artworkImg.forEach(artwork => {
//             const option = document.createElement('option');
//             option.value = artwork.id;
//             option.textContent = artwork.title;
//             selectEl.appendChild(option);
//         });
//

        document.addEventListener('DOMContentLoaded', async () => {
            console.log("checking")
             //my select element
            const selectEl = document.getElementById("selectElement");
            //my div to hold my images
            const artworkImg = document.getElementById('artworkImg')
            const url = "https://api.artic.edu/api/v1/artworks";
       //try
            const response = await fetch(url)
            //VVV i reviewed the API output
            const data = await response.json() 
            const Img = data.data;
            console.log(Img)
            Img.forEach(element => {
                const option = document.createElement('option')
                option.value = element.id;
                option.innerHTML = element.artist_title;
                selectEl.appendChild(option)
                
            });

            selectEl.addEventListener('change', ()=> {
                selectElId = selectEl.id;
                if(!selectElId){
                    artworkImg.innerHTML = ""
                    return
                }

                //
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
                //
            })
        })
    