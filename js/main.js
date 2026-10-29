document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname;
    const links = document.querySelectorAll(".main-nav a");

    links.forEach((link) => {
        const linkUrl = new URL(link.href, window.location.href);

        if (linkUrl.pathname === currentPage) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
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