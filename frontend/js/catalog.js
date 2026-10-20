async function updateCatalog(collection, cards) {
  if (cards.length === 0) {
    return;
  }

  try {
    const response = await fetch(
      `${window.API_BASE_URL}/api/${collection}`
    );

    if (!response.ok) {
      throw new Error(`Catalog request failed: ${response.status}`);
    }

    const records = await response.json();

    if (!Array.isArray(records) || records.length !== cards.length) {
      throw new Error(`Unexpected ${collection} catalog response`);
    }

    records.forEach((record, index) => {
      const card = cards[index];
      const image = card.querySelector("img");
      const title = card.querySelector(".card-title");

      if (image) {
        image.src = new URL(record.image, document.baseURI).href;
        image.alt = record.name;
      }

      if (title) {
        title.textContent = record.name;
      }
    });
  } catch (error) {
    console.warn(`Using built-in ${collection} content:`, error);
  }
}

async function updateFaqs() {
  const items = [...document.querySelectorAll(".accordion-item")];

  if (items.length === 0) {
    return;
  }

  try {
    const response = await fetch(`${window.API_BASE_URL}/api/faqs`);

    if (!response.ok) {
      throw new Error(`FAQ request failed: ${response.status}`);
    }

    const records = await response.json();

    if (!Array.isArray(records) || records.length !== items.length) {
      throw new Error("Unexpected FAQ response");
    }

    records.forEach((record, index) => {
      const question = items[index].querySelector(".accordion-button h4");
      const answer = items[index].querySelector(".accordion-body");

      if (question) {
        question.textContent = `${index + 1}. ${record.question}`;
      }

      if (answer) {
        answer.textContent = record.answer;
      }
    });
  } catch (error) {
    console.warn("Using built-in FAQ content:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const treeCards = document.querySelectorAll(
    '[data-api-collection="trees"] .card'
  );
  const seedCards = document.querySelectorAll(
    '[data-api-collection="seeds"] .card'
  );

  updateCatalog("trees", treeCards);
  updateCatalog("seeds", seedCards);
  updateFaqs();
});