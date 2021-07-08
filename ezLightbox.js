// Add styles 

addStyles()

function addStyles() {
    let styles = `

    @keyframes floatIn {
        0% {

            transform: translateY(150px);
            opacity: 0;
        }
        50% {

            opacity: 0;
        }
        100% { 

            opacity: 1;
            transform: translateY(0);
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
    }
    .lightboxContainerHide {

        opacity: 0;
        pointer-events: none;
    }
    .lightboxContainerHide .lightboxImage {

        transform: translateY(-150px);
    }
    .lightboxImage {

        max-height: 80vh;
        max-width: 80vw;
        object-fit: cover;
        cursor: grab;
        user-select: none;
        transition: all 0.3s;
        animation: floatIn 0.4s;
        aspect-ratio: 1/1;
    }
    .closeButton {

        z-index: 1001;
        cursor: pointer;
        position: fixed;
        right: 20px;
        top: 20px;
        border-radius: 100%;
        font-size: 40px;
        color: white;
        width: 35px;
        height: 35px;
        text-align: center;
        transition: all 0.3s;
    }
    .closeButton:hover {

        opacity: 0.5;
    }
    .closeButtonHide {

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

        // Add default values

        if (!element.dataset.backgroundOpacity) {

            element.dataset.backgroundOpacity = 0.85
        }

        if (!element.dataset.sizeMultiplier) {

            element.dataset.sizeMultiplier = 1.5
        }

        if (!element.dataset.aspectRatio) {

            element.dataset.aspectRatio = 1 / 1
        }

        // Container

        let lightboxContainer = document.createElement("div")

        lightboxContainer.style.background = "rgba(0, 0, 0, " + element.dataset.backgroundOpacity + ")"

        lightboxContainer.classList.add("lightboxContainer")

        document.body.appendChild(lightboxContainer)

        // Image

        let lightboxImage = document.createElement("img")

        lightboxImage.src = element.src

        lightboxImage.style.width = element.offsetWidth * element.dataset.sizeMultiplier + "px"

        lightboxImage.style.aspectRatio = element.dataset.aspectRatio

        lightboxImage.classList.add("lightboxImage")

        lightboxContainer.appendChild(lightboxImage)

        // Close button

        let closeButton = document.createElement("img")

        closeButton.src = "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2018/png/iconmonstr-x-mark-thin.png&r=255&g=255&b=255"

        closeButton.classList.add("closeButton")

        document.body.appendChild(closeButton)

    } else if (!element.classList.contains("lightboxImage")) {

        // Hide lightbox when user clicks off

        let lightboxContainers = document.getElementsByClassName("lightboxContainer")

        for (let element of lightboxContainers) {

            element.classList.add("lightboxContainerHide")
        }

        let closeButtons = document.getElementsByClassName("closeButton")

        for (let element of closeButtons) {

            element.classList.add("closeButtonHide")
        }
    }
}

window.onscroll = function() {

    let lightboxContainers = document.getElementsByClassName("lightboxContainer")

    for (let element of lightboxContainers) {

        element.classList.add("lightboxContainerHide")
    }

    let closeButtons = document.getElementsByClassName("closeButton")

    for (let element of closeButtons) {

        element.classList.add("closeButtonHide")
    }
}