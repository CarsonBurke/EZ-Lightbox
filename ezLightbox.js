addStyles()

function addStyles() {
    let styles = `
    .lightboxContainer {
        z-index: 1000;
        box-shadow: rgba(0, 0, 0, 0.5) 0 0 0 10000px !important;
        transition: box-shadow 0;
    }
    .lightboxImage {

        
    }
    `

    var styleSheet = document.createElement("style")
    styleSheet.innerHTML = styles
    document.head.appendChild(styleSheet)
}

let lightElements = document.getElementsByClassName("ezLightbox")

window.onload = function() {

    for (let element of lightElements) {

        element.style.cursor = "pointer"
    }
}

window.onclick = function(target) {

    let element = target.target

    console.log(target)

    if (element.classList.contains("ezLightbox")) {

        //element.style.border = "solid 5px black"

        element.classList.add("lightboxActive")

        /*
        let lightbox = document.createElement("div")

        lightbox.classList.add("lightboxActive")

        document.body.appendChild(lightbox)
        */
    } else {

        for (let element of lightElements) {

            element.classList.remove("lightboxActive")
        }
    }
}