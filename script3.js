document.addEventListener('DOMContentLoaded', () => {
    let url = "https://api.artic.edu/api/v1/artworks/27992?fields=id,title,image_id"
    fetch(url).then((res) => {
        return res.json()
    })
}).then((data) => {
    console.log(data)
}).catch((error) => {
    console.log(error)
})