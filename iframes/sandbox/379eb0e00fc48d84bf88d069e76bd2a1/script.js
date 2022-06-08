document.getElementById('dot').addEventListener('click', () => {
    let elId = Math.random() > 0.5 ? 1 : 0;
    setOpacity(1, elId)
    setTimeout(() => { setOpacity(0, elId) }, 1000)
})

function setOpacity(opacity, id) {
    let image = document.getElementsByClassName('image')[id];
    image.style.opacity = opacity;

}