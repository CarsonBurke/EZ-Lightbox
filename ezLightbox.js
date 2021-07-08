// Add styles 

addStyles()

function addStyles() {
    let styles = `

    @keyframes moveUp {
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
    @keyframes moveDown {
        0% {

            transform: translateY(-150px);
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

        transform: scale(0.75);
    }
    .lightboxImage {

        max-height: 80vh;
        max-width: 80vw;
        object-fit: cover;
        cursor: grab;
        user-select: none;
        transition: all 0.3s;
        animation: moveUp 0.4s;
        overflow: hidden;
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
        animation: moveDown 0.4s;
        user-selct: none;
    }
    .closeButton:hover {

        opacity: 0.5;
    }
    .closeButtonHide {

        transform: scale(0.75);
        opacity: 0;
        pointer-events: none;
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

window.ontouchstart = function(click) {

    userInteract(click)
}
window.onclick = function(click) {

    userInteract(click)
}

function userInteract(click) {

    let element = click.target

    if (element.classList.contains("ezLightbox")) {

        // Add defaults if none are provided

        if (!element.dataset.src) {

            element.dataset.src = element.src
        }
        if (!element.dataset.src) {

            return console.error("no src provided")
        }

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

        lightboxImage.src = element.dataset.src

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

        closeLightbox()
    }
}

window.onkeydown = function(interaction) {

    if (interaction.key == "Escape" || interaction.key == " ") {

        closeLightbox()
    }
}

// Hide lightbox when user scrolls

window.onscroll = function() {

    closeLightbox()
}
window.onwheel = function() {

    closeLightbox()
}

function closeLightbox() {

    let lightboxContainers = document.getElementsByClassName("lightboxContainer")

    for (let element of lightboxContainers) {

        element.classList.add("lightboxContainerHide")
    }

    let closeButtons = document.getElementsByClassName("closeButton")

    for (let element of closeButtons) {

        element.classList.add("closeButtonHide")
    }
}

window.onmousedown = function() {

    let className = "lightboxImage"
    let ratio = 0.3
    let ignoreX = false
    let ignoreY = false

    if (!className) {

        return console.error('You must provide a valid selector or DOM object as first argument')
    }
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

        return console.log("Mobile user panning disabled")
    }

    let elements = document.getElementsByClassName(className)

    if (elements.length == 0) {

        return console.log("No elements to pan")
    }

    for (let element of elements) {

        console.log(element)

        let trackX = (!ignoreX) ? true : false,
            trackY = (!ignoreY) ? true : false,

            curDown = false,
            curYPos = 0,
            curXPos = 0,

            startScrollY = 0,
            startScrollX = 0,
            scrollDif = 0,
            animation = null;


        element.addEventListener('mousedown', (e) => {
            e.preventDefault();
            curDown = true;

            startScrollY = parseInt(element.scrollTop, 10);
            startScrollX = parseInt(element.scrollLeft, 10);
            curYPos = e.clientY;
            curXPos = e.clientX;
        });


        element.addEventListener('mouseup', (e) => {

            // Smooth action effect 
            let currScrollY = element.scrollTop,
                scrollDiffY = (startScrollY - currScrollY) * -1,
                newScrollY = currScrollY + (scrollDiffY * ratio),

                currScrollX = element.scrollLeft,
                scrollDiffX = (startScrollX - currScrollX) * -1,
                newScrollX = currScrollX + (scrollDiffX * ratio);

            let scroll_obj = {
                behavior: 'smooth'
            };
            if (trackY) {
                scroll_obj.top = newScrollY;
            }
            if (trackX) {
                scroll_obj.left = newScrollX;
            }

            animation = element.scroll(scroll_obj);
        });



        document.body.addEventListener('mouseup', (e) => {
            curDown = false;
        });



        element.addEventListener('mousemove', (e) => {
            if (curDown === true) {
                if (animation) {
                    animation.pause();
                }

                let scroll_obj = {
                    behavior: 'auto'
                };
                if (trackY) {
                    scroll_obj.top = startScrollY + (curYPos - e.clientY);
                }
                if (trackX) {
                    scroll_obj.left = startScrollX + (curXPos - e.clientX);
                }

                element.scroll(scroll_obj);
            }
        })
    }
}