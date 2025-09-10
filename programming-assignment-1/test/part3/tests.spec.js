import { expect, test } from "@playwright/test";

const BASE_URL = "http://localhost:6160/code/part3";

const solutions = {
  0: "00000000000000000000000000000000000000000000000000000000010000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  1: "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  2: "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  3: "00000000000000000000000000000000000000000100000000000000000000000010000000000000000000000001000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000",
  4: "00000000000000000000000000001000000000000000000000000100000000000000000000000010000000000000000000000000000000000000010000000010000000010000000010000000000010000000100000001000000010000000100000000000000000000000000000",
};

const checkSolutionFair = async () => {
  const code = await fetch(`${BASE_URL}/solution.js`).then((res) => res.text());
  // it is of course possible to circumvent this ... please don't!
  if (code.includes("querySelector") || code.includes("querySelectorAll")) {
    throw new Error(
      "Do not use querySelector or querySelectorAll in your solution!"
    );
  }
};

test(
  "Example: author tags, CSS",
  {
    annotation: {
      type: "points",
      description: "0.6",
    },
  },
  async ({ page }) => {
    await checkSolutionFair();
    await page.setViewportSize({ width: 1920, height: 1080 }); // because the page is responsive!
    await page.goto(BASE_URL);

    // Click the CSS button for task 0
    await page.click("#selector-test-0-css");

    const currentHighlighted = await page.evaluate(() => {
      return getCurrentHighlighted();
    });

    expect(currentHighlighted).toBe(solutions[0]);
  }
);

test(
  "Example: author tags, JS",
  {
    annotation: {
      type: "points",
      description: "0.6",
    },
  },
  async ({ page }) => {
    await checkSolutionFair();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);

    // Click the JS button for task 0
    await page.click("#selector-test-0-js");

    const currentHighlightedJs = await page.evaluate(() => {
      return getCurrentHighlighted();
    });

    expect(currentHighlightedJs).toBe(solutions[0]);
  }
);

test(
  "Intro section, CSS",
  {
    annotation: {
      type: "points",
      description: "0.6",
    },
  },
  async ({ page }) => {
    await checkSolutionFair();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);

    // Click the CSS button for task 1
    await page.click("#selector-test-1-css");

    const currentHighlighted = await page.evaluate(() => {
      return getCurrentHighlighted();
    });

    expect(currentHighlighted).toBe(solutions[1]);
  }
);

test(
  "Intro section, JS",
  {
    annotation: {
      type: "points",
      description: "0.6",
    },
  },
  async ({ page }) => {
    await checkSolutionFair();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);

    // Click the JS button for task 1
    await page.click("#selector-test-1-js");

    const currentHighlightedJs = await page.evaluate(() => {
      return getCurrentHighlighted();
    });

    expect(currentHighlightedJs).toBe(solutions[1]);
  }
);

test(
  "Intro header, CSS",
  {
    annotation: {
      type: "points",
      description: "0.6",
    },
  },
  async ({ page }) => {
    await checkSolutionFair();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);

    // Click the CSS button for task 2
    await page.click("#selector-test-2-css");

    const currentHighlighted = await page.evaluate(() => {
      return getCurrentHighlighted();
    });

    expect(currentHighlighted).toBe(solutions[2]);
  }
);

test(
  "Intro header, JS",
  {
    annotation: {
      type: "points",
      description: "0.6",
    },
  },
  async ({ page }) => {
    await checkSolutionFair();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);

    // Click the JS button for task 2
    await page.click("#selector-test-2-js");

    const currentHighlightedJs = await page.evaluate(() => {
      return getCurrentHighlighted();
    });

    expect(currentHighlightedJs).toBe(solutions[2]);
  }
);

test(
  "Active buttons, CSS",
  {
    annotation: {
      type: "points",
      description: "0.6",
    },
  },
  async ({ page }) => {
    await checkSolutionFair();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);

    // Click the CSS button for task 3
    await page.click("#selector-test-3-css");

    const currentHighlighted = await page.evaluate(() => {
      return getCurrentHighlighted();
    });

    expect(currentHighlighted).toBe(solutions[3]);
  }
);

test(
  "Active buttons, JS",
  {
    annotation: {
      type: "points",
      description: "0.6",
    },
  },
  async ({ page }) => {
    await checkSolutionFair();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);

    // Click the JS button for task 3
    await page.click("#selector-test-3-js");

    const currentHighlightedJs = await page.evaluate(() => {
      return getCurrentHighlighted();
    });

    expect(currentHighlightedJs).toBe(solutions[3]);
  }
);

test(
  "Post titles, CSS",
  {
    annotation: {
      type: "points",
      description: "0.6",
    },
  },
  async ({ page }) => {
    await checkSolutionFair();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);

    // Click the CSS button for task 4
    await page.click("#selector-test-4-css");

    const currentHighlighted = await page.evaluate(() => {
      return getCurrentHighlighted();
    });

    expect(currentHighlighted).toBe(solutions[4]);
  }
);

test(
  "Post titles, JS",
  {
    annotation: {
      type: "points",
      description: "0.6",
    },
  },
  async ({ page }) => {
    await checkSolutionFair();
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL);

    // Click the JS button for task 4
    await page.click("#selector-test-4-js");

    const currentHighlightedJs = await page.evaluate(() => {
      return getCurrentHighlighted();
    });

    expect(currentHighlightedJs).toBe(solutions[4]);
  }
);
