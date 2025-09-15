// Example: author tags
const task0_cssSelector = "article.post:not(:first-of-type) .author";
const task0_jsCode = () => {
  const selectedElements = [];
  let skippedFirst = false;

  const articles = document.getElementsByTagName("article");
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    if (article.classList.contains("post")) {
      const authorTag = article.getElementsByClassName("author")[0]; // always exists
      if (skippedFirst) {
        selectedElements.push(authorTag);
      } else {
        skippedFirst = true;
      }
    }
  }

  return selectedElements;
};

// Intro section
const task1_cssSelector = "#intro";
const task1_jsCode = () => {
  const selectedElements = [];
  const introSection = document.getElementById("intro");
  if (introSection) {
    selectedElements.push(introSection);
  }
  return selectedElements;
};

// Intro header
const task2_cssSelector = "#intro h2";
const task2_jsCode = () => {
  const selectedElements = [];
  const introSection = document.getElementById("intro");
  if (introSection) {
    // Find the header element inside intro
    const headers = introSection.getElementsByTagName("header");
    if (headers.length > 0) {
      // Find the h2 inside the header
      const h2s = headers[0].getElementsByTagName("h2");
      if (h2s.length > 0) {
        selectedElements.push(h2s[0]);
      }
    }
  }
  return selectedElements;
};

// Active buttons
const task3_cssSelector = "a.button:not(.disabled)";
const task3_jsCode = () => {
  const selectedElements = [];
  const buttons = document.getElementsByClassName("button");
  buttons.forEach(button => {
    selectedElements.push(button);
  });
  return selectedElements;
};

// Post titles
const task4_cssSelector = "";
const task4_jsCode = () => {
  const selectedElements = [];

  return selectedElements;
};
