# ARCTIC - The Smallest Text Summarizer

## Project Overview

ARCTIC is a lightweight Chrome extension designed to provide quick and efficient text summarization directly within your browser. Unlike other tools that require tab-switching, ARCTIC operates entirely in-browser, delivering instant summaries with no text limits. Its minimalistic design ensures it is both fast and unobtrusive, making it an ideal tool for users who need concise summaries without breaking their workflow.

## Features

- Summarizes text directly within the current tab using a pop-up interface, accessible via a simple keyboard shortcut (`Ctrl + Q`).
- Capable of summarizing large blocks of text without the restrictions of word limits.
- A clean, intuitive pop-up window that appears over your current page, with support for dark mode.
- No reliance on external servers or cloud processing, ensuring privacy and speed.

## How It Works

ARCTIC utilizes the LexRank algorithm for summarization, which identifies the most important sentences in a text based on sentence similarity and importance.

### Key Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** LexRank algorithm for Natural Language Processing (NLP)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Arctic-Text-Summarizer.git
2. Load the extension in Chrome:
- Open chrome://extensions/ in your browser.
- Enable "Developer mode" in the top right corner.
- Click "Load unpacked" and select the cloned directory.
- Then run the `app.py`.
3. Start using ARCTIC with Ctrl + Q to open the summarization pop-up.

## What's Next
- Future updates will integrate **BERT combined with Adversarial Learning** to improve the coherence and context of summaries.
- Expanding ARCTIC to support multiple languages to accommodate a broader user base.
- Allowing users to tailor the length and focus of summaries based on their preferences.
- Introducing features like keyword extraction and sentiment analysis for deeper content understanding.

## Contributing
Contributions are welcome! Please fork this repository and submit a pull request if you have any improvements or bug fixes.
