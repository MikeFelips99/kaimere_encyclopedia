document.addEventListener("DOMContentLoaded", () => {
    const headerSlot = document.querySelector("[data-site-header]");
    const navSlot = document.querySelector("[data-site-nav]");
    const footerSlot = document.querySelector("[data-site-footer]");

    // Each page specifies its own path back to the project root.
    const root =
        headerSlot?.dataset.root ??
        navSlot?.dataset.root ??
        footerSlot?.dataset.root ??
        "";

    const page =
        document.body.dataset.page || "home";

    const title =
        document.body.dataset.title || "The Kaimere Encyclopedia";

    const subtitle =
        document.body.dataset.subtitle ||
        "A natural history of a world apart";

    const kicker =
        document.body.dataset.kicker ||
        "The Tales of Kaimere";

    const navigation = [
        { id: "home", label: "Home", url: "index.html" },
        { id: "species", label: "Species", url: "pages/species.html" },
        { id: "regions", label: "Regions", url: "pages/regions.html" },
        { id: "evolution", label: "Evolution", url: "pages/evolution.html" },
        { id: "taxonomy", label: "Taxonomy", url: "pages/taxonomy.html" },
        {
            id: "people-culture",
            label: "People & Culture",
            url: "pages/people-culture.html"
        },
        {
            id: "about-kaimere",
            label: "About Kaimere",
            url: "pages/about-kaimere.html"
        }
    ];

    // Build the shared masthead.
    if (headerSlot) {
        headerSlot.innerHTML = `
            <header class="site-header">
                <a class="brand-link" href="${root}index.html">
                    <span class="site-kicker">${kicker}</span>
                    <span class="site-title">${title}</span>
                </a>
                <p class="site-subtitle">${subtitle}</p>
            </header>
        `;
    }

    // Build the shared navigation.
    if (navSlot) {
        navSlot.innerHTML = `
            <nav class="main-nav" aria-label="Main navigation">
                <div class="nav-inner">
                    ${navigation.map(item => `
                        <a
                            href="${root}${item.url}"
                            ${item.id === page
                                ? 'aria-current="page"'
                                : ""}
                        >${item.label}</a>
                    `).join("")}
                </div>
            </nav>
        `;
    }

    // Build the shared footer.
    if (footerSlot) {
        footerSlot.innerHTML = `
            <footer class="site-footer">
                <p class="footer-title">The Kaimere Encyclopedia</p>
                <p>A natural history of the Tales of Kaimere.</p>
                <p>© Kaimere Worldbuilding Project</p>
            </footer>
        `;
    }
});

/* =========================================
           IMAGE CLICK-TO-ZOOM
        ========================================= */

        document.addEventListener("DOMContentLoaded", function () {
            const lightbox = document.getElementById("imageLightbox");
            const lightboxImage = document.getElementById("lightboxImage");
            const lightboxCaption = document.getElementById("lightboxCaption");
            const closeButton = document.getElementById("lightboxClose");

            if (!lightbox || !lightboxImage || !closeButton) return;

            let previousFocus = null;

            function openLightbox(button) {
                const image = button.querySelector("img");
                if (!image || !image.complete || image.naturalWidth === 0) return;

                previousFocus = button;

                lightboxImage.src = image.currentSrc || image.src;
                lightboxImage.alt = image.alt || "";
                lightboxCaption.textContent =
                    button.closest(".species-entry-media")
                        ?.querySelector(".species-image-caption")
                        ?.textContent.trim() || image.alt || "";

                lightbox.classList.add("is-open");
                lightbox.setAttribute("aria-hidden", "false");
                document.body.style.overflow = "hidden";
                closeButton.focus();
            }

            function closeLightbox() {
                lightbox.classList.remove("is-open");
                lightbox.setAttribute("aria-hidden", "true");
                lightboxImage.src = "";
                lightboxImage.alt = "";
                lightboxCaption.textContent = "";
                document.body.style.overflow = "";

                if (previousFocus) previousFocus.focus();
            }

            document.querySelectorAll("[data-lightbox]").forEach(function (button) {
                button.addEventListener("click", function () {
                    openLightbox(button);
                });
            });

            closeButton.addEventListener("click", closeLightbox);

            lightbox.addEventListener("click", function (event) {
                if (event.target === lightbox) {
                    closeLightbox();
                }
            });

            document.addEventListener("keydown", function (event) {
                if (
                    event.key === "Escape" &&
                    lightbox.classList.contains("is-open")
                ) {
                    closeLightbox();
                }
            });
        });


const footer = document.getElementById("site-footer");

if (footer) {
    footer.innerHTML = `
        <footer class="site-footer">
            <h3><strong>Kaimere Encyclopedia</strong></h3>
            <p>A guide to the natural and cultural history of Kaimere.</p>
            <p>© Kaimere Worldbuilding Project</p>
        </footer>
    `;
}