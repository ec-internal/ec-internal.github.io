//Get the button:
let mybutton = document.getElementById("scroll-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() { scrollFunction() };

let displayTimeout;

function scrollFunction() {
    console.log(document.documentElement.scrollTop);
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        clearTimeout(displayTimeout);
        mybutton.style.display = "flex"
        mybutton.style.opacity = 1;
    } else {
        clearTimeout(displayTimeout);
        mybutton.style.opacity = 0;
        displayTimeout = setTimeout(() => { mybutton.style.display = "none" }, 1000);
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}