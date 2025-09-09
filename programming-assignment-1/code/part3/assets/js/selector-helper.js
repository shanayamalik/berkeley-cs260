const clearHighlights = () => {
  document.querySelectorAll(".cs160-highlighted").forEach((el) => {
    el.classList.remove("cs160-highlighted");
  });
};

const highlightElements = (elements) => {
  elements.forEach((el) => {
    el.classList.add("cs160-highlighted");
  });
};

for (let i = 0; i <= 4; i++) {
  document.getElementById(`selector-test-${i}-css`).onclick = () => {
    const cssSelector = eval(`task${i}_cssSelector`);

    clearHighlights();
    const elements = document.querySelectorAll(cssSelector);
    highlightElements(elements);

    alert(
      `Found ${elements.length} element(s) matching selector "${cssSelector}"`
    );
  };

  document.getElementById(`selector-test-${i}-js`).onclick = () => {
    clearHighlights();
    let elements = [];
    try {
      const fn = eval(`task${i}_jsCode`);
      elements = fn();
    } catch (e) {
      // ignore errors
    }
    highlightElements(elements);

    alert(`Found ${elements.length} element(s) using JavaScript code`);
  };
}

document.getElementById("selector-hide").onclick = () => {
  document.getElementsByClassName("selector-helper")[0].style.display = "none";
  // clearHighlights();
};

const getCurrentHighlighted = () =>
  [...document.querySelectorAll("#wrapper *")]
    .map((el) => (el.classList.contains("cs160-highlighted") ? "1" : "0"))
    .join("");
