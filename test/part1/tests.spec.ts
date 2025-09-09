import { test, expect, Page, Locator } from "@playwright/test";

const BASE_URL = "http://localhost:6160/code/part1";

/**
 * Helper that enforces:
 *   – exactly one match for `selector`
 *   – textContent === expected (after trim)
 */
async function assertSingleElementText(
  page: Page,
  selector: string,
  expected: string
) {
  const el: Locator = page.locator(selector);
  const count = await el.count();
  if (count !== 1) {
    throw new Error(`Expected exactly one “${selector}”, but found ${count}.`);
  }
  await expect(el).toHaveText(expected);
}

/**
 * Verifies that a list (ul/ol/dl) has the expected number of items
 * and that each item’s trimmed text matches `expectedItems` (in order).
 */
async function assertListItems(
  page: Page,
  selector: string,
  expectedItems: string[]
) {
  const items: Locator = page.locator(selector);
  await expect(
    items,
    `Expected ${expectedItems.length} items for “${selector}”.`
  ).toHaveCount(expectedItems.length);

  for (let i = 0; i < expectedItems.length; i++) {
    await expect(items.nth(i)).toHaveText(expectedItems[i]);
  }
}

test(
  "Task 1: headings and paragraphs are present with correct text & order",
  {
    annotation: {
      type: "points",
      description: "1.5",
    },
  },
  async ({ page }) => {
    await page.goto(`${BASE_URL}/task1.html`);

    await assertSingleElementText(page, "h1", "Basic HTML Animals");

    await assertSingleElementText(
      page,
      "p:nth-of-type(1)",
      "This is the first paragraph in our page. It introduces our animals."
    );

    await assertSingleElementText(page, "h2:nth-of-type(1)", "The Llama");

    await assertSingleElementText(
      page,
      "p:nth-of-type(2)",
      "Our Llama is a big fan of list items. When she spies a patch of them on a web page, she will eat them like sweets, licking her lips as she goes."
    );

    await assertSingleElementText(page, "h2:nth-of-type(2)", "The Anaconda");

    await assertSingleElementText(
      page,
      "p:nth-of-type(3)",
      "The crafty anaconda likes to slither around the page, travelling rapidly by way of anchors to sneak up on his prey."
    );
  }
);

test(
  "Task 2: unordered & ordered lists render correctly",
  {
    annotation: {
      type: "points",
      description: "1.5",
    },
  },
  async ({ page }) => {
    await page.goto(`${BASE_URL}/task2.html`);

    await assertSingleElementText(page, "h1", "Looking at lists");

    await assertSingleElementText(
      page,
      "p:nth-of-type(1)",
      "Turn the following list of my favorite vegetables into an unordered list."
    );

    await assertListItems(page, "ul > li", [
      "Cucumber",
      "Broccoli",
      "Asparagus",
      "Pepper",
    ]);

    await assertSingleElementText(
      page,
      "p:nth-of-type(2)",
      "Turn the following directions into an ordered list."
    );

    await assertListItems(page, "ol > li", [
      "First knock on the door",
      "When prompted, say the magic word",
      "Wait for at least 5 seconds",
      "Turn the handle and push",
    ]);
  }
);

test(
  "Task 3: definition list renders correctly",
  {
    annotation: {
      type: "points",
      description: "1.5",
    },
  },
  async ({ page }) => {
    await page.goto(`${BASE_URL}/task3.html`);

    await assertSingleElementText(page, "h1", "Advanced HTML Animals");

    await assertListItems(page, "dl > dt", [
      "Llama",
      "Anaconda",
      "Hippopotamus",
    ]);

    await assertListItems(page, "dl > dd", [
      "Tall, woolly quadruped, pointy ears. Sometimes rideable, but grumpy and spits a lot. Big fan of list items.",
      "A very large constrictor snake; travels rapidly by way of anchors to sneak up on his prey.",
      "His description is bottomless.",
    ]);
  }
);

test(
  "Task 4: strong & emphasis appears as expected",
  {
    annotation: {
      type: "points",
      description: "1.5",
    },
  },
  async ({ page }) => {
    await page.goto(`${BASE_URL}/task4.html`);

    await assertSingleElementText(page, "h1", "Emphasis and importance");

    // Whole paragraph content
    await assertSingleElementText(
      page,
      "p",
      "There are two things I care about — music and friends. Someday I might be able to get my friends interested in each other, and my music!"
    );

    // <strong> elements
    await assertListItems(page, "p > strong", ["two", "music", "friends"]);

    // <em> elements
    await assertListItems(page, "p > em", ["might", "and"]);
  }
);
