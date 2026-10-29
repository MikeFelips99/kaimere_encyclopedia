document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("speciesGrid");
    const searchInput = document.getElementById("speciesSearch");
    const categorySelect = document.getElementById("speciesCategory");
    const sortSelect = document.getElementById("speciesSort");
    const count = document.getElementById("speciesCount");
    const emptyMessage = document.getElementById("speciesEmpty");
    const resetButton = document.getElementById("speciesReset");
    const alphabet = document.querySelector(".species-alphabet");
    const directory = document.getElementById("animal-directory");

    if (
        !grid || !searchInput || !categorySelect ||
        !sortSelect || !count || !emptyMessage ||
        !resetButton || !alphabet
    ) {
        return;
    }

    const cards = Array.from(
        grid.querySelectorAll(".species-entry")
    );

    let activeLetter = "all";

    const normalize = (value) =>
        value
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();

    function sortCards() {
        const direction = sortSelect.value === "za" ? -1 : 1;

        cards.sort((a, b) => {
            const nameA = a.dataset.name || "";
            const nameB = b.dataset.name || "";

            return direction * nameA.localeCompare(
                nameB,
                undefined,
                { sensitivity: "base" }
            );
        });

        cards.forEach(card => grid.appendChild(card));
    }

    function filterCards() {
        const query = normalize(searchInput.value);
        const category = categorySelect.value;

        let visibleCount = 0;

        cards.forEach(card => {
            const name = normalize(card.dataset.name || "");
            const scientific = normalize(
                card.dataset.scientific || ""
            );
            const description = normalize(
                card.querySelector(
                    ".species-entry-description"
                )?.textContent || ""
            );
            const extraSearch = normalize(
                card.dataset.search || ""
            );
            const entryCategory = card.dataset.category || "";
            const firstLetter = name.charAt(0);

            const searchableText = [
                name,
                scientific,
                description,
                extraSearch
            ].join(" ");

            const matchesQuery =
                !query || searchableText.includes(query);

            const matchesCategory =
                category === "all" ||
                entryCategory === category;

            const matchesLetter =
                activeLetter === "all" ||
                firstLetter === activeLetter;

            const isVisible =
                matchesQuery &&
                matchesCategory &&
                matchesLetter;

            card.hidden = !isVisible;

            if (isVisible) {
                visibleCount++;
            }
        });

        count.textContent =
            `Showing ${visibleCount} of ${cards.length} entries`;

        emptyMessage.hidden = visibleCount !== 0;
    }

    // Live search.
    searchInput.addEventListener("input", filterCards);

    // Filter by animal group.
    categorySelect.addEventListener("change", filterCards);

    // Sort alphabetically.
    sortSelect.addEventListener("change", () => {
        sortCards();
        filterCards();
    });

    // Filter by first letter.
    alphabet.addEventListener("click", event => {
        const button = event.target.closest("button[data-letter]");

        if (!button) return;

        activeLetter = button.dataset.letter;

        alphabet.querySelectorAll("button[data-letter]")
            .forEach(letterButton => {
                letterButton.setAttribute(
                    "aria-pressed",
                    String(letterButton === button)
                );
            });

        filterCards();
    });

    // Category shortcuts also update the main filter.
    document.querySelectorAll("[data-category-shortcut]")
        .forEach(button => {
            button.addEventListener("click", () => {
                categorySelect.value =
                    button.dataset.categoryShortcut;

                activeLetter = "all";

                alphabet.querySelectorAll("button[data-letter]")
                    .forEach(letterButton => {
                        letterButton.setAttribute(
                            "aria-pressed",
                            String(
                                letterButton.dataset.letter === "all"
                            )
                        );
                    });

                filterCards();

                directory.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                searchInput.focus({ preventScroll: true });
            });
        });

    // Reset all filters.
    resetButton.addEventListener("click", () => {
        searchInput.value = "";
        categorySelect.value = "all";
        sortSelect.value = "az";
        activeLetter = "all";

        alphabet.querySelectorAll("button[data-letter]")
            .forEach(button => {
                button.setAttribute(
                    "aria-pressed",
                    String(button.dataset.letter === "all")
                );
            });

        sortCards();
        filterCards();
        searchInput.focus();
    });

    // Initial alphabetical ordering and count.
    sortCards();
    filterCards();
});
