document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector("[data-knowledge-grid]");
    const search = document.getElementById("knowledgeSearch");
    const category = document.getElementById("knowledgeCategory");
    const sort = document.getElementById("knowledgeSort");
    const count = document.getElementById("knowledgeCount");
    const empty = document.getElementById("knowledgeEmpty");
    const reset = document.getElementById("knowledgeReset");
    const alphabet = document.querySelector("[data-knowledge-alphabet]");
    const directory = document.getElementById("knowledge-directory");

    if (!grid || !search || !category || !sort || !count || !empty || !reset || !alphabet) return;

    const cards = Array.from(grid.querySelectorAll(".knowledge-entry"));
    let activeLetter = "all";
    const normalize = value => (value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

    function sortCards() {
        const direction = sort.value === "za" ? -1 : 1;
        cards.sort((a, b) => direction * (a.dataset.name || "").localeCompare(b.dataset.name || "", undefined, { sensitivity: "base" }));
        cards.forEach(card => grid.appendChild(card));
    }

    function filterCards() {
        const query = normalize(search.value);
        const selectedCategory = category.value;
        let visible = 0;
        cards.forEach(card => {
            const name = normalize(card.dataset.name);
            const description = normalize(card.querySelector(".knowledge-entry-description")?.textContent);
            const extra = normalize(card.dataset.search);
            const entryCategory = card.dataset.category || "";
            const matchesQuery = !query || `${name} ${description} ${extra}`.includes(query);
            const matchesCategory = selectedCategory === "all" || entryCategory === selectedCategory;
            const matchesLetter = activeLetter === "all" || name.startsWith(activeLetter.toLowerCase());
            const show = matchesQuery && matchesCategory && matchesLetter;
            card.hidden = !show;
            if (show) visible++;
        });
        count.textContent = `Showing ${visible} of ${cards.length} entries`;
        empty.hidden = visible !== 0;
    }

    search.addEventListener("input", filterCards);
    category.addEventListener("change", filterCards);
    sort.addEventListener("change", () => { sortCards(); filterCards(); });
    alphabet.addEventListener("click", event => {
        const button = event.target.closest("button[data-letter]");
        if (!button) return;
        activeLetter = button.dataset.letter;
        alphabet.querySelectorAll("button[data-letter]").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
        filterCards();
    });

    document.querySelectorAll("[data-knowledge-shortcut]").forEach(button => {
        button.addEventListener("click", () => {
            category.value = button.dataset.knowledgeShortcut;
            activeLetter = "all";
            alphabet.querySelectorAll("button[data-letter]").forEach(item => item.setAttribute("aria-pressed", String(item.dataset.letter === "all")));
            filterCards();
            directory?.scrollIntoView({ behavior: "smooth", block: "start" });
            search.focus({ preventScroll: true });
        });
    });

    reset.addEventListener("click", () => {
        search.value = "";
        category.value = "all";
        sort.value = "az";
        activeLetter = "all";
        alphabet.querySelectorAll("button[data-letter]").forEach(item => item.setAttribute("aria-pressed", String(item.dataset.letter === "all")));
        sortCards();
        filterCards();
        search.focus();
    });

    sortCards();
    filterCards();
});
