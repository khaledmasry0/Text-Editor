const optionsButtons = document.querySelectorAll(".option-button");
const advancedOptionButton = document.querySelectorAll(".adv-option-button");

const fontName = document.getElementById("fontName");
const fontSizeRef = document.getElementById("fontSize");

const writingArea = document.getElementById("text-input");
const outputArea = document.querySelector(".output");
const linkButton = document.getElementById("createLink");
const alignButtons = document.querySelectorAll(".align");
const spacingButtons = document.querySelectorAll(".spacing");
const formatButtons = document.querySelectorAll(".format");
const scriptButtons = document.querySelectorAll(".script");

outputArea.style.display = "none";
//List of fontlist
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];

//Initial Settings
const initializer = () => {
  //function calls for highlighting buttons
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  //create options for font names
  fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  // fontSize allows only till 7
  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;

    switch (i) {
      case 1:
        option.innerHTML = "10px";
        break;
      case 2:
        option.innerHTML = "13px";
        break;
      case 3:
        option.innerHTML = "16px";
        break;
      case 4:
        option.innerHTML = "18px";
        break;
      case 5:
        option.innerHTML = "24px";
        break;
      case 6:
        option.innerHTML = "32px";
        break;
      case 7:
        option.innerHTML = "48px";
        break;

      default:
        option.innerHTML = "16px";
        break;
    }
    fontSizeRef.appendChild(option);
  }
  fontSizeRef.value = 3;
};

//main logic
const modifyText = (command, defaultUi, value) => {
  //execCommand executes command on selected text
  document.execCommand(command, defaultUi, value);
};

//For basic operations which don't need value parameter
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
    writingArea.focus();
  });
});

//options that require value parameter (e.g colors, fonts)
advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

//link
// linkButton.addEventListener("click", () => {
//   let userLink = prompt("Enter a URL");
//   //if link has http then pass directly else add https
//   if (/http/i.test(userLink)) {
//     modifyText(linkButton.id, false, userLink);
//   } else {
//     userLink = "http://" + userLink;
//     modifyText(linkButton.id, false, userLink);
//   }
// });

linkButton.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  let userLink = prompt("Enter a URL");
  //if link has http then pass directly else add https
  if (/http/i.test(userLink)) {
    const linkUrl = userLink;
    const linkText = prompt("Enter link text");
    const link = document.createElement("a");
    link.href = linkUrl;
    link.textContent = linkText;
    modifyText("insertHTML", false, link.outerHTML);
  } else {
    userLink = "http://" + userLink;
    const linkUrl = userLink;
    const linkText = prompt("Enter link text");
    const link = document.createElement("a");
    link.href = linkUrl;
    link.textContent = linkText;
    modifyText("insertHTML", false, link.outerHTML);
  }
});

//Highlight clicked button
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      //needsRemoval = true means only one button should be highlight and other would be normal
      if (needsRemoval) {
        let alreadyActive = false;

        //If currently clicked button is already active
        if (button.classList.contains("active")) {
          alreadyActive = true;
        }

        //Remove highlight from other buttons
        highlighterRemover(className);
        if (!alreadyActive) {
          //highlight clicked button
          button.classList.add("active");
        }
      } else {
        //if other buttons can be highlighted
        button.classList.toggle("active");
      }
    });
  });
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

writingArea.addEventListener("input", () => {
  if (writingArea.innerHTML !== "") {
    outputArea.value = `<p>${writingArea.innerHTML}</p>`;
  } else {
    outputArea.value = "";
  }
});

window.onload = initializer();
