KAIMERE ENCYCLOPEDIA — REGIONS & EVOLUTION ARTICLE TEMPLATES

Templates:
- regions/landscapes/REGION_ARTICLE_TEMPLATE.html
- evolution/radiations/EVOLUTION_ARTICLE_TEMPLATE.html

These templates use the same shared article layout as the existing Regions and Evolution pages:
- css/style.css
- css/knowledge-directory.css
- js/main.js
- shared site header, navigation, and footer placeholders

HOW TO ADD A REGION ARTICLE
1. Copy REGION_ARTICLE_TEMPLATE.html into the appropriate folder, for example:
   regions/continents/new-continent.html
   regions/seas/new-sea.html
   regions/landscapes/new-landscape.html
   regions/islands/new-island.html
2. Replace every bracketed placeholder, including the title, description, category, and article text.
3. The template assumes the article is two folders below the project root, so the ../../css, ../../js, and ../../pages paths work in the folders listed above.
4. Update the links in the Related articles sidebar. Remove links that do not apply.
5. Add the new article to pages/regions.html so it appears in the directory and can be found through its search and filters.

HOW TO ADD AN EVOLUTION ARTICLE
1. Copy EVOLUTION_ARTICLE_TEMPLATE.html into the appropriate folder, for example:
   evolution/foundations/new-topic.html
   evolution/dynasties/new-dynasty.html
   evolution/radiations/new-radiation.html
   evolution/extinctions/new-extinction.html
   evolution/concepts/new-concept.html
2. Replace every bracketed placeholder, including the title, description, category, and article text.
3. The template assumes the article is two folders below the project root, so the ../../css, ../../js, and ../../pages paths work in the folders listed above.
4. Update the links in the Related articles sidebar. Remove links that do not apply.
5. Add the new article to pages/evolution.html so it appears in the directory and can be found through its search and filters.

IMPORTANT
- Use lowercase, hyphen-separated filenames, such as arvelith-highlands.html.
- Keep the data-page value as "regions" for regional articles and "evolution" for evolution articles.
- Update data-title and data-subtitle if your shared navigation uses them to identify the current page.
- Keep the article hero summary concise; use the Overview section for fuller context.
- Add only canon-supported dates, taxonomy, and historical claims. Link related articles using paths relative to the new article's folder.
- Do not leave bracketed placeholders or example links in a published article.
