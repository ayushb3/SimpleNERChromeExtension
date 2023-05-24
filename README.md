# NER Chrome Extension

The NER Chrome Extension is a browser extension that performs Named Entity Recognition (NER) on the text content of web pages. It uses a backend Flask server to process the text and extract entities such as person names, organizations, locations, dates, etc.

## Features
* Performs NER on the text content of web pages
* Highlights and labels the identified entities
* Supports common entity types such as person, organization, location, date, etc.
## Installation
- Clone the repository or download the source code.
- Install the necessary Python dependencies by running `pip install -r requirements.txt`.
- Load the extension in Chrome:
- Open Chrome and go to chrome://extensions.
- Enable "Developer mode" using the toggle switch.
- Click on "Load unpacked" and select the directory containing the extension source code.
- Start the Flask backend server by running `python app.py`.
## Usage
- Click on the extension icon in the Chrome toolbar to activate the extension.
- Navigate to a web page and click the "Perform NER" button in the extension popup.
- The extension will extract entities from the text content of the web page and highlight them with corresponding labels.
