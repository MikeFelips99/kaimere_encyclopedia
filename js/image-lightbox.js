document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.createElement("div");
    lightbox.className = "image-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Enlarged article image");

    lightbox.innerHTML = `
        <button class="image-lightbox-close"
                type="button"
                aria-label="Close enlarged image">&times;</button>
        <img src="" alt="">
        <div class="image-lightbox-caption"></div>
    `;

    document.body.appendChild(lightbox);

    const enlargedImage = lightbox.querySelector("img");
    const caption = lightbox.querySelector(".image-lightbox-caption");
    const closeButton = lightbox.querySelector(".image-lightbox-close");

    let previousFocus = null;

    function openLightbox(image) {
        previousFocus = document.activeElement;

        enlargedImage.src = image.currentSrc || image.src;
        enlargedImage.alt = image.alt || "";

        const figure = image.closest("figure");
        const figcaption = figure?.querySelector("figcaption");

        caption.textContent =
            figcaption?.textContent || image.alt || "";

        lightbox.classList.add("is-open");
        document.body.classList.add("lightbox-open");
        closeButton.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove("is-open");
        document.body.classList.remove("lightbox-open");
        enlargedImage.src = "";
        caption.textContent = "";

        if (previousFocus) {
            previousFocus.focus();
        }
    }

    document.addEventListener("click", event => {
        const image = event.target.closest(
            ".article-image img, .zoomable-image"
        );

        if (image && !lightbox.contains(image)) {
            openLightbox(image);
        }
    });

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", event => {
        if (
            event.key === "Escape" &&
            lightbox.classList.contains("is-open")
        ) {
            closeLightbox();
        }
    });
});