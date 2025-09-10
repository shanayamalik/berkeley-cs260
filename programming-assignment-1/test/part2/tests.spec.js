import { expect, test } from "@playwright/test";

const levelComplete = async (page, level) => {
  try {
    const saveData = await fetch(
      "http://localhost:6160/code/part2/save-data.json"
    ).then((res) => res.json());
    if (saveData.guessHistory[level].correct === true) {
      // double check
      const rule = saveData.guessHistory[level].enteredSelector;
      await page.goto("http://localhost:6160/css-diner/test.html");
      const isComplete = await page.evaluate(
        ([rule, level]) => {
          return window.checkSelector(rule, level);
        },
        [rule, level]
      );
      return isComplete;
    }

    return false;
  } catch (_e) {
    return false;
  }
};

test(
  "Level 1: A",
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 0);
    expect(isComplete, "Level 1 should be complete").toBeTruthy();
  }
);

test(
  "Level 2: A",
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 1);
    expect(isComplete, "Level 2 should be complete").toBeTruthy();
  }
);

test(
  "Level 3: #id",
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 2);
    expect(isComplete, "Level 3 should be complete").toBeTruthy();
  }
);

test(
  "Level 4: A  B",
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 3);
    expect(isComplete, "Level 4 should be complete").toBeTruthy();
  }
);

test(
  "Level 5: #id  A",
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 4);
    expect(isComplete, "Level 5 should be complete").toBeTruthy();
  }
);

test(
  "Level 6: .classname",
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 5);
    expect(isComplete, "Level 6 should be complete").toBeTruthy();
  }
);

test(
  "Level 7: A.className",
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 6);
    expect(isComplete, "Level 7 should be complete").toBeTruthy();
  }
);

test(
  "Level 8: Put your back into it!",
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 7);
    expect(isComplete, "Level 8 should be complete").toBeTruthy();
  }
);

test(
  "Level 9: A, B",
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 8);
    expect(isComplete, "Level 9 should be complete").toBeTruthy();
  }
);

test(
  "Level 10: *",
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 9);
    expect(isComplete, "Level 10 should be complete").toBeTruthy();
  }
);

test(
  "Level 11: A  *",
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 10);
    expect(isComplete, "Level 11 should be complete").toBeTruthy();
  }
);

test(
  "Level 12: A + B",
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 11);
    expect(isComplete, "Level 12 should be complete").toBeTruthy();
  }
);

test(
  "Level 13: A > B ",
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 12);
    expect(isComplete, "Level 13 should be complete").toBeTruthy();
  }
);

test(
  "Level 14: :first-child",
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 13);
    expect(isComplete, "Level 14 should be complete").toBeTruthy();
  }
);

test(
  "Level 15: :last-child",
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 14);
    expect(isComplete, "Level 15 should be complete").toBeTruthy();
  }
);

test(
  "Level 16: :nth-child(A)",
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 15);
    expect(isComplete, "Level 16 should be complete").toBeTruthy();
  }
);

test(
  "Level 17: :first-of-type",
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 16);
    expect(isComplete, "Level 17 should be complete").toBeTruthy();
  }
);

test(
  "Level 18: :empty",
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 17);
    expect(isComplete, "Level 18 should be complete").toBeTruthy();
  }
);

test(
  "Level 19: :not(X)",
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 18);
    expect(isComplete, "Level 19 should be complete").toBeTruthy();
  }
);

test(
  "Level 20: [attribute]",
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 19);
    expect(isComplete, "Level 20 should be complete").toBeTruthy();
  }
);

test(
  "Level 21: A[attribute]",
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 20);
    expect(isComplete, "Level 21 should be complete").toBeTruthy();
  }
);

test(
  'Level 22: [attribute="value"]',
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 21);
    expect(isComplete, "Level 22 should be complete").toBeTruthy();
  }
);

test(
  'Level 23: [attribute^="value"]',
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 22);
    expect(isComplete, "Level 23 should be complete").toBeTruthy();
  }
);

test(
  'Level 24: [attribute$="value"]',
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 23);
    expect(isComplete, "Level 24 should be complete").toBeTruthy();
  }
);

test(
  'Level 25: [attribute*="value"]',
  {
    annotation: {
      type: "points",
      description: "0.32",
    },
  },
  async ({ page }) => {
    const isComplete = await levelComplete(page, 24);
    expect(isComplete, "Level 25 should be complete").toBeTruthy();
  }
);
