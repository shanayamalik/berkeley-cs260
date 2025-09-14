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
const task1_cssSelector = "";
const task1_jsCode = () => {
  const selectedElements = [];

  return selectedElements;
};

// Intro header
const task2_cssSelector = "";
const task2_jsCode = () => {
  const selectedElements = [];

  return selectedElements;
};

// Active buttons
const task3_cssSelector = "";
const task3_jsCode = () => {
  const selectedElements = [];

  return selectedElements;
};

// Post titles
const task4_cssSelector = "";
const task4_jsCode = () => {
  const selectedElements = [];

  return selectedElements;
};
