import { expect, test } from "@playwright/test";

const assertNoForbiddenRules = async (page) => {
  const forbiddenRules = ["float", "width", "height"];
  const rules = await page.evaluate(() => {
    return Array.from(document.styleSheets)
      .map((sheet) => {
        try {
          return (
            Array.from(sheet.cssRules)
              // @ts-ignore
              .filter((rule) => rule.style)
              .filter(
                (rule) =>
                  // @ts-ignore
                  rule.selectorText !== "main" &&
                  // @ts-ignore
                  rule.selectorText !== ".circle"
              )
              // @ts-ignore
              .map((rule) => [...rule.style])
          );
        } catch (e) {
          // security exception. I suppose you can cheat by adding `float: right` in an external
          // sheet but fine you earned it
          return [];
        }
      })
      .flat(2);
  });

  const forbiddenRulesFound = [
    ...new Set(rules.filter((rule: string) => forbiddenRules.includes(rule))),
  ];

  expect(
    forbiddenRulesFound,
    `Forbidden CSS rules found: ${forbiddenRulesFound.join(", ")}`
  ).toHaveLength(0);
};

test(
  "Flexbox task A: Layout works horizontally",
  {
    annotation: {
      type: "points",
      description: "1",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part1/a.html");

    await assertNoForbiddenRules(page);

    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page).toHaveScreenshot();
  }
);
test(
  "Flexbox task A: Layout works vertically",
  {
    annotation: {
      type: "points",
      description: "0.5",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part1/a.html");

    await assertNoForbiddenRules(page);

    await page.setViewportSize({ width: 720, height: 1280 });
    await expect(page).toHaveScreenshot();
  }
);
test(
  "Flexbox task A: Layout works in a square",
  {
    annotation: {
      type: "points",
      description: "0.5",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part1/a.html");

    await assertNoForbiddenRules(page);

    await page.setViewportSize({ width: 720, height: 720 });
    await expect(page).toHaveScreenshot();
  }
);

test(
  "Flexbox task B: Layout works horizontally",
  {
    annotation: {
      type: "points",
      description: "1",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part1/b.html");

    await assertNoForbiddenRules(page);

    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page).toHaveScreenshot();
  }
);
test(
  "Flexbox task B: Layout works vertically",
  {
    annotation: {
      type: "points",
      description: "0.5",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part1/b.html");

    await assertNoForbiddenRules(page);

    await page.setViewportSize({ width: 720, height: 1280 });
    await expect(page).toHaveScreenshot();
  }
);
test(
  "Flexbox task B: Layout works in a square",
  {
    annotation: {
      type: "points",
      description: "0.5",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part1/b.html");

    await assertNoForbiddenRules(page);

    await page.setViewportSize({ width: 720, height: 720 });
    await expect(page).toHaveScreenshot();
  }
);

test(
  "Flexbox task C: Layout works horizontally",
  {
    annotation: {
      type: "points",
      description: "1",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part1/c.html");

    await assertNoForbiddenRules(page);

    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page).toHaveScreenshot();
  }
);
test(
  "Flexbox task C: Layout works vertically",
  {
    annotation: {
      type: "points",
      description: "0.5",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part1/c.html");

    await assertNoForbiddenRules(page);

    await page.setViewportSize({ width: 720, height: 1280 });
    await expect(page).toHaveScreenshot();
  }
);
test(
  "Flexbox task C: Layout works in a square",
  {
    annotation: {
      type: "points",
      description: "0.5",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part1/c.html");

    await assertNoForbiddenRules(page);

    await page.setViewportSize({ width: 720, height: 720 });
    await expect(page).toHaveScreenshot();
  }
);

test(
  "Flexbox task D: Layout works horizontally",
  {
    annotation: {
      type: "points",
      description: "1",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part1/d.html");

    await assertNoForbiddenRules(page);

    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page).toHaveScreenshot();
  }
);
test(
  "Flexbox task D: Layout works vertically",
  {
    annotation: {
      type: "points",
      description: "0.5",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part1/d.html");

    await assertNoForbiddenRules(page);

    await page.setViewportSize({ width: 720, height: 1280 });
    await expect(page).toHaveScreenshot();
  }
);
test(
  "Flexbox task D: Layout works in a square",
  {
    annotation: {
      type: "points",
      description: "0.5",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part1/d.html");

    await assertNoForbiddenRules(page);

    await page.setViewportSize({ width: 720, height: 720 });
    await expect(page).toHaveScreenshot();
  }
);

test(
  "Flexbox task E: Layout works horizontally",
  {
    annotation: {
      type: "points",
      description: "1",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part1/e.html");

    await assertNoForbiddenRules(page);

    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page).toHaveScreenshot();
  }
);
test(
  "Flexbox task E: Layout works vertically",
  {
    annotation: {
      type: "points",
      description: "1",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part1/e.html");

    await assertNoForbiddenRules(page);

    await page.setViewportSize({ width: 720, height: 1280 });
    await expect(page).toHaveScreenshot();
  }
);
