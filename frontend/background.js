chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "perform_ner") {
        // Send the text to the Flask backend
        fetch("http://localhost:5000/perform-ner", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: request.text }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Pass the response back to content.js
                sendResponse({ entities: data.entities });
            })
            .catch((error) => {
                console.error("Error performing NER:", error);
                sendResponse({ entities: [] });
            });
        // Keep the message channel open for sending the response asynchronously
        return true;
    }
});
