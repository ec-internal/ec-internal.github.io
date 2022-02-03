//Get the button:
let mybutton = document.getElementById("scroll-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        mybutton.style.visibility = "visible";
        setTimeout(() => { mybutton.style.display = "flex" }, 2000);
    } else {
        mybutton.style.visibility = "hidden";
        setTimeout(() => { mybutton.style.display = "none" }, 2000);
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}