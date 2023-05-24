
// Add a <style> element to the document with the CSS styles
(function () {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
    /* Example styles for entity labels */
    .person {
      background-color: yellow;
    }

    .org {
      background-color: cyan;
    }

    .gpe {
      background-color: orange;
    }

    .money {
      background-color: green;
    }

    .time {
      background-color: blue;
    }

    .date {
      background-color: purple;
    }

    /* Style for the entity wrapper span */
    .highlight {
      font-weight: bold;
      padding: 2px;
    }
  `;

    document.documentElement.appendChild(styleElement);
})();
// Sends a message to the background script using chrome.runtime.sendMessage
// The message object includes the action, data, and a callback function
function sendMessage(action, data, callback) {
    chrome.runtime.sendMessage({ action: action, ...data }, callback);
}

/// Handles the response received from the background script
// In this case, it highlights the extracted entities on the webpage
function handleResponse(response) {
    const entities = response.entities;

    entities.forEach(entity => {
        const [text, label] = entity;

        // Create a range object
        const range = document.createRange();
        range.selectNode(document.body);

        // Create a tree walker to find all text nodes
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let currentNode;
        while ((currentNode = walker.nextNode())) {
            if (currentNode.textContent.includes(text)) {
                const parentElement = currentNode.parentElement;
                const splitText = currentNode.textContent.split(text);

                // Wrap the entity text in a span with the corresponding CSS class
                const entitySpan = document.createElement("span");
                entitySpan.textContent = text;
                entitySpan.classList.add('highlight', label.toLowerCase());

                // Create a text node for the remaining text
                const remainingText = document.createTextNode(splitText[1]);

                // Replace the current text node with the wrapped entity span and the remaining text node
                parentElement.replaceChild(remainingText, currentNode);
                parentElement.insertBefore(entitySpan, remainingText);
            }
        }
    });
}




// Extracts the text content from the webpage
// In this case, it retrieves the inner text of the entire document body
function extractTextFromWebpage() {
    return document.body.innerText;
}

// Main function to perform Named Entity Recognition (NER)
// Extracts the text from the webpage using extractTextFromWebpage()
function performNER() {
    const text = extractTextFromWebpage();

    // Calls the sendMessage function to send a message to the background script
    // The message includes the action "perform_ner" and the extracted text
    // The handleResponse function is passed as the callback to handle the response
    sendMessage("perform_ner", { text: text }, handleResponse);
}

// Adds an event listener for the "load" event on the window object
// When the page finishes loading, the performNER function is called
window.addEventListener("load", performNER);

