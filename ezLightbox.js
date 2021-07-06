addStyles()

function addStyles() {
    let styles = `

    @keyframes floatIn {
        0% {

            top: 150px;
            opacity: 0;
        }
        50% {

            opacity: 0;
        }
        100% { 

            opacity: 1;
            top: 0;
        }
    }

    .lightboxContainer {
        z-index: 1000;
        transition: all 0.3s;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.55);
        cursor: pointer;
    }
    .lightboxImage {
        max-height: 80vh;
        max-width: 80vw;
        object-fit: cover;
        cursor: grab;
        user-select: none;
        position: relative;
        transition: all 0.3s;
        animation: floatIn 0.4s;
        aspect-ratio: 1/1;
    }
    .lightboxContainerHide {

        opacity: 0;
        pointer-events: none;
    }
    `

    var styleSheet = document.createElement("style")
    styleSheet.innerHTML = styles
    document.head.appendChild(styleSheet)
}

let lightElements = document.getElementsByClassName("ezLightbox")

// Add styles to improve UX with lightbox

window.onload = function() {

    for (let element of lightElements) {

        element.style.cursor = "pointer"
    }
}

window.onclick = function(click) {

    let element = click.target

    if (element.classList.contains("ezLightbox")) {

        if (!element.dataset.sizeMultiplier) {

            element.dataset.sizeMultiplier = 1
        }

        // Container

        let lightboxContainer = document.createElement("div")

        lightboxContainer.classList.add("lightboxContainer")

        document.body.appendChild(lightboxContainer)

        // Image

        let lightboxImage = document.createElement("img")

        lightboxImage.src = element.src

        lightboxImage.style.width = element.offsetWidth * element.dataset.sizeMultiplier + "px"

        lightboxImage.style.height = element.offsetHeight * element.dataset.sizeMultiplier + "px"

        lightboxImage.classList.add("lightboxImage")

        lightboxContainer.appendChild(lightboxImage)

        document.body.style.overflow = "hidden"

    } else if (!element.classList.contains("lightboxImage")) {

        // Hide lightbox when user clicks off

        let lightboxContainers = document.getElementsByClassName("lightboxContainer")

        for (let element of lightboxContainers) {

            element.classList.add("lightboxContainerHide")
        }

        document.body.style.overflow = "initial"
    }
}