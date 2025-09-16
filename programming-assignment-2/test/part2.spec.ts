import { expect, test } from "@playwright/test";

const getNumberInLocator = async (page, locator) => {
  const text = await page.locator(locator).textContent();
  const firstMatch = text.match(/(\d|\.)+/);
  return parseFloat(firstMatch[0]);
};

const expectTolerance = (
  actual: number,
  expected: number,
  tolerance: number
) => {
  expect(actual).toBeGreaterThan(expected * (1 - tolerance));
  expect(actual).toBeLessThan(expected * (1 + tolerance));
};

const expectNotTolerance = (
  actual: number,
  expected: number,
  tolerance: number
) => {
  if (actual < expected) {
    expect(actual, "Currencies need to differ from each other").toBeLessThan(
      expected * (1 - tolerance)
    );
  } else {
    expect(actual, "Currencies need to differ from each other").toBeGreaterThan(
      expected * (1 + tolerance)
    );
  }
};

const THRESHOLD = 0.01;
const THRESHOLD_SAME_CURRENCY = 0.005;

const EUR_PER_USD = 0.85;

const click = async (page, selector) => {
  try {
    await page.click(selector, { timeout: 500 });
  } catch (e) {

    await page.locator(selector).evaluate((el) => el.click());
  }
};

test.beforeEach(async ({ page }) => {
  await page.goto("/code/part2/index.html");
});

test(
  "Convert USD values to EUR",
  {
    annotation: {
      type: "points",
      description: "1",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part2/index.html");

    const amount = 100;
    // type into #amount-textbox
    await page.fill("#amount-textbox", amount.toString());

    // Convert from USD
    await click(page, "#usd-clickable");

    // Click the button with id "calculate-clickable"
    await click(page, "#calculate-clickable");

    // check #usd-calculated. should be within 3% of amount
    const usdCalculated = await getNumberInLocator(page, "#usd-calculated");
    expectTolerance(usdCalculated, amount, THRESHOLD);

    // check #eur-calculated. should be within 3% of amount * EUR_PER_USD
    const eurCalculated = await getNumberInLocator(page, "#eur-calculated");
    expectTolerance(eurCalculated, amount * EUR_PER_USD, THRESHOLD);
  }
);

test(
  'Convert USD values to EUR, clicking "from" before typing',
  {
    annotation: {
      type: "points",
      description: "1",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part2/index.html");

    // Convert from USD
    await click(page, "#usd-clickable");

    const usdAmount = 63.4;
    // type into #amount-textbox
    await page.fill("#amount-textbox", usdAmount.toString());

    // Click the button with id "calculate-clickable"
    await click(page, "#calculate-clickable");

    // check #usd-calculated. should be within 3% of amount
    const usdCalculated = await getNumberInLocator(page, "#usd-calculated");
    expectTolerance(usdCalculated, usdAmount, THRESHOLD);

    // check #eur-calculated. should be within 3% of amount * EUR_PER_USD
    const eurCalculated = await getNumberInLocator(page, "#eur-calculated");
    expectTolerance(eurCalculated, usdAmount * EUR_PER_USD, THRESHOLD);
  }
);

test(
  "Convert USD values to EUR, trying multiple calculations in a row",
  {
    annotation: {
      type: "points",
      description: "1",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part2/index.html");

    // Convert from USD
    await click(page, "#usd-clickable");

    const firstUsdAmount = 11;

    // type into #amount-textbox
    await page.fill("#amount-textbox", firstUsdAmount.toString());

    // Click the button with id "calculate-clickable"
    await click(page, "#calculate-clickable");

    // check #usd-calculated. should be within 3% of firstUsdAmount
    const usdCalculated = await getNumberInLocator(page, "#usd-calculated");
    expectTolerance(usdCalculated, firstUsdAmount, THRESHOLD);

    // check #eur-calculated. should be within 3% of firstUsdAmount * EUR_PER_USD
    const eurCalculated = await getNumberInLocator(page, "#eur-calculated");
    expectTolerance(eurCalculated, firstUsdAmount * EUR_PER_USD, THRESHOLD);

    const secondUsdAmount = 28.1;
    // type into #amount-textbox
    await page.fill("#amount-textbox", secondUsdAmount.toString());

    // Click the button with id "calculate-clickable"
    await click(page, "#calculate-clickable");

    // check #usd-calculated. should be within 3% of secondUsdAmount
    const usdCalculated2 = await getNumberInLocator(page, "#usd-calculated");
    expectTolerance(usdCalculated2, secondUsdAmount, THRESHOLD);

    // check #eur-calculated. should be within 3% of secondUsdAmount * EUR_PER_USD
    const eurCalculated2 = await getNumberInLocator(page, "#eur-calculated");
    expectTolerance(eurCalculated2, secondUsdAmount * EUR_PER_USD, THRESHOLD);
  }
);

test(
  "Convert EUR values to USD",
  {
    annotation: {
      type: "points",
      description: "1",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part2/index.html");

    const amount = 100;
    // type into #amount-textbox
    await page.fill("#amount-textbox", amount.toString());

    // Convert from EUR
    await click(page, "#eur-clickable");

    // Click the button with id "calculate-clickable"
    await click(page, "#calculate-clickable");

    // check #eur-calculated. should be within 3% of amount
    const eurCalculated = await getNumberInLocator(page, "#eur-calculated");
    expectTolerance(eurCalculated, amount, THRESHOLD);

    // check #usd-calculated. should be within 3% of amount / EUR_PER_USD
    const usdCalculated = await getNumberInLocator(page, "#usd-calculated");
    expectTolerance(usdCalculated, amount / EUR_PER_USD, THRESHOLD);
  }
);

test(
  'Convert EUR values to USD, clicking "from" before typing',
  {
    annotation: {
      type: "points",
      description: "1",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part2/index.html");

    // Convert from EUR
    await click(page, "#eur-clickable");

    const eurAmount = 63.4;
    // type into #amount-textbox
    await page.fill("#amount-textbox", eurAmount.toString());

    // Click the button with id "calculate-clickable"
    await click(page, "#calculate-clickable");

    // check #eur-calculated. should be within 3% of amount
    const eurCalculated = await getNumberInLocator(page, "#eur-calculated");
    expectTolerance(eurCalculated, eurAmount, THRESHOLD);

    // check #usd-calculated. should be within 3% of amount / EUR_PER_USD
    const usdCalculated = await getNumberInLocator(page, "#usd-calculated");
    expectTolerance(usdCalculated, eurAmount / EUR_PER_USD, THRESHOLD);
  }
);

test(
  "Convert from USD to other currencies",
  {
    annotation: {
      type: "points",
      description: "1",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part2/index.html");

    const amount = 100;
    // type into #amount-textbox
    await page.fill("#amount-textbox", amount.toString());

    // Convert from USD
    await click(page, "#usd-clickable");

    // Click the button with id "calculate-clickable"
    await click(page, "#calculate-clickable");

    // Get custom-currency-1-calculated. should not be the same as amount
    const customCurrency1Calculated = await getNumberInLocator(
      page,
      "#custom-currency-1-calculated"
    );
    expectNotTolerance(
      customCurrency1Calculated,
      amount,
      THRESHOLD_SAME_CURRENCY
    );

    // Get custom-currency-2-calculated. should not be the same as amount
    const customCurrency2Calculated = await getNumberInLocator(
      page,
      "#custom-currency-2-calculated"
    );
    expectNotTolerance(
      customCurrency2Calculated,
      amount,
      THRESHOLD_SAME_CURRENCY
    );

    const ESTIMATED_USD_PER_CUSTOM_CURRENCY_1 =
      amount / customCurrency1Calculated;
    const ESTIMATED_USD_PER_CUSTOM_CURRENCY_2 =
      amount / customCurrency2Calculated;

    const amount2 = 183.4;
    // type into #amount-textbox
    await page.fill("#amount-textbox", amount2.toString());

    // Click the button with id "calculate-clickable"
    await click(page, "#calculate-clickable");

    const customCurrency1Calculated2 = await getNumberInLocator(
      page,
      "#custom-currency-1-calculated"
    );
    const expectedCustomCurrency1Calculated2 =
      amount2 / ESTIMATED_USD_PER_CUSTOM_CURRENCY_1;
    expectTolerance(
      customCurrency1Calculated2,
      expectedCustomCurrency1Calculated2,
      THRESHOLD
    );

    const customCurrency2Calculated2 = await getNumberInLocator(
      page,
      "#custom-currency-2-calculated"
    );
    const expectedCustomCurrency2Calculated2 =
      amount2 / ESTIMATED_USD_PER_CUSTOM_CURRENCY_2;
    expectTolerance(
      customCurrency2Calculated2,
      expectedCustomCurrency2Calculated2,
      THRESHOLD
    );
  }
);

test(
  "Convert from other currencies",
  {
    annotation: {
      type: "points",
      description: "1",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part2/index.html");

    const amount = 384;
    // type into #amount-textbox
    await page.fill("#amount-textbox", amount.toString());

    // Convert from custom-currency-1
    await click(page, "#custom-currency-1-clickable");

    // Click the button with id "calculate-clickable"
    await click(page, "#calculate-clickable");

    const usdCalculatedC1 = await getNumberInLocator(page, "#usd-calculated");
    const eurCalculatedC1 = await getNumberInLocator(page, "#eur-calculated");

    // make sure USD/EUR make sense relative to each other
    const eurAssumed = usdCalculatedC1 * EUR_PER_USD;
    expectTolerance(eurCalculatedC1, eurAssumed, THRESHOLD);

    // Convert from custom-currency-2
    await click(page, "#custom-currency-2-clickable");

    // Click the button with id "calculate-clickable"
    await click(page, "#calculate-clickable");

    const usdCalculatedC2 = await getNumberInLocator(page, "#usd-calculated");
    const eurCalculatedC2 = await getNumberInLocator(page, "#eur-calculated");

    // make sure USD/EUR make sense relative to each other
    const eurAssumed2 = usdCalculatedC2 * EUR_PER_USD;
    expectTolerance(eurCalculatedC2, eurAssumed2, THRESHOLD);

    // make sure the two custom currencies are different
    expectNotTolerance(
      usdCalculatedC1,
      usdCalculatedC2,
      THRESHOLD_SAME_CURRENCY
    );

    const ESTIMATED_CUSTOM_CURRENCY_1_PER_USD = amount / usdCalculatedC1;
    const ESTIMATED_CUSTOM_CURRENCY_2_PER_USD = amount / usdCalculatedC2;

    const amount2 = 779.21;
    // type into #amount-textbox
    await page.fill("#amount-textbox", amount2.toString());

    await click(page, "#custom-currency-1-clickable");

    // Click the button with id "calculate-clickable"
    await click(page, "#calculate-clickable");

    const usdCalculatedC1_2 = await getNumberInLocator(page, "#usd-calculated");

    const usdExpectedC1_2 = amount2 / ESTIMATED_CUSTOM_CURRENCY_1_PER_USD;
    expectTolerance(usdCalculatedC1_2, usdExpectedC1_2, THRESHOLD);

    await click(page, "#custom-currency-2-clickable");

    // Click the button with id "calculate-clickable"
    await click(page, "#calculate-clickable");

    const usdCalculatedC2_2 = await getNumberInLocator(page, "#usd-calculated");

    const usdExpectedC2_2 = amount2 / ESTIMATED_CUSTOM_CURRENCY_2_PER_USD;

    expectTolerance(usdCalculatedC2_2, usdExpectedC2_2, THRESHOLD);
  }
);

const expectHasError = async (page) => {
  expect(await page.locator("#error-message").textContent()).not.toEqual("");
  expect(page.locator("#error-message")).toBeVisible();
};

const expectHasNoError = async (page) => {
  if (await page.locator("#error-message").isVisible()) {
    expect(await page.locator("#error-message").textContent()).toEqual("");
  } else {
    return;
  }
};

test(
  "Do not allow negative currency values",
  {
    annotation: {
      type: "points",
      description: "0.5",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part2/index.html");

    // type into #amount-textbox
    await page.fill("#amount-textbox", "-1");

    // Click the button with id "calculate-clickable"
    await click(page, "#calculate-clickable");

    // #error-message should have some text in it
    await expectHasError(page);
  }
);

test(
  "Clear the error message if the currency value is nonnegative",
  // and it should be clear at the beginning, too!
  {
    annotation: {
      type: "points",
      description: "0.5",
    },
  },
  async ({ page }) => {
    await page.goto("/code/part2/index.html");

    // #error-message should not have any text in it
    await expectHasNoError(page);

    // type into #amount-textbox
    await page.fill("#amount-textbox", "-1");
    await click(page, "#custom-currency-1-clickable");

    // Click the button with id "calculate-clickable"
    await click(page, "#calculate-clickable");

    // #error-message should have some text in it
    await expectHasError(page);

    // type into #amount-textbox
    await page.fill("#amount-textbox", "1");
    await click(page, "#custom-currency-1-clickable");

    // Click the button with id "calculate-clickable"
    await click(page, "#calculate-clickable");

    // #error-message should not have any text in it
    await expectHasNoError(page);
  }
);
