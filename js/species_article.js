/* =========================================
   SPECIES ARTICLE SIDEBAR
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".species-sidebar");
    if (!sidebar) return;

    /* Expand and collapse sidebar sections */
    sidebar.querySelectorAll(".toc-toggle").forEach(button => {
        button.addEventListener("click", () => {
            const expanded =
                button.getAttribute("aria-expanded") === "true";
            const group = button.closest(".toc-group");
            const submenu = group.querySelector(".toc-children");
            if (!submenu) return;
            button.setAttribute(
                "aria-expanded",
                String(!expanded)
            );
            submenu.hidden = expanded;
        });
    });


    /* Close expanded menus after selecting a destination */
    sidebar.querySelectorAll(".toc-children a").forEach(link => {
        link.addEventListener("click", () => {
            const currentGroup = link.closest(".toc-group");
            currentGroup
                ?.querySelectorAll(".toc-toggle")
                .forEach(button => {
                    button.setAttribute("aria-expanded", "false");
                    const submenu = button
                        .closest(".toc-group")
                        ?.querySelector(".toc-children");
                    if (submenu) {
                        submenu.hidden = true;
                    }
                });
        });
    });


    /* Automatically open the correct menu when following a hash */
    function openActiveSection() {
        const hash = window.location.hash;
        if (!hash) return;
        const target = document.querySelector(hash);
        if (!target) return;
        const parentSection = target.closest(".species-section");
        if (!parentSection) return;
        const sectionId = parentSection.id;
        const correspondingLink = sidebar.querySelector(
            `.toc-main-link[href="#${sectionId}"]`
        );
        const group = correspondingLink?.closest(".toc-group");
        if (!group) return;
        const button = group.querySelector(".toc-toggle");
        const submenu = group.querySelector(".toc-children");
        if (button && submenu) {
            button.setAttribute("aria-expanded", "true");
            submenu.hidden = false;
        }
    }
    openActiveSection();
    window.addEventListener("hashchange", openActiveSection);
});
