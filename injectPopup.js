function createPopupInIframe() {
  const existingPopup = document.getElementById('arctic-popup-container');
  if (existingPopup) {
    const existingBackdrop = document.getElementById('arctic-backdrop');
    if (existingBackdrop) {
      existingBackdrop.style.transition = 'opacity 0.5s';
      existingBackdrop.style.opacity = '0';
      setTimeout(() => {
        existingBackdrop.remove();
        existingPopup.remove();
      }, 500);
    }
    return;
  }

  const backdrop = document.createElement('div');
  backdrop.id = 'arctic-backdrop';
  backdrop.style.position = 'fixed';
  backdrop.style.top = '0';
  backdrop.style.left = '0';
  backdrop.style.width = '100%';
  backdrop.style.height = '100%';
  backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  backdrop.style.backdropFilter = 'blur(0px)';
  backdrop.style.zIndex = '999';
  backdrop.style.transition = 'backdrop-filter 0.5s, opacity 0.5s';
  backdrop.style.opacity = '0';

  const iframe = document.createElement('iframe');
  iframe.id = 'arctic-popup-container';
  iframe.style.position = 'fixed';
  iframe.style.top = '50%';
  iframe.style.left = '50%';
  iframe.style.transform = 'translate(-50%, -50%)';
  iframe.style.width = '600px';
  iframe.style.height = '600px';
  iframe.style.zIndex = '1000';
  iframe.style.backgroundColor = '#ffffff';
  iframe.style.color = '#333333';
  iframe.style.borderRadius = '8px';
  iframe.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  iframe.style.overflow = 'hidden';

  iframe.srcdoc = `
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
          :root {
            --primary-color: #0056b3;
            --primary-color-light: #007acc;
            --secondary-color: #f9f9f9;
            --button-bg-light: #ffffff;
            --button-bg-dark: #333333;
            --button-text-light: #333333;
            --button-text-dark: #ffffff;
            --textarea-bg: #ffffff;
            --textarea-text: #333333;
            --scrollbar-track: #f9f9f9;
            --scrollbar-thumb: #0056b3;
          }
          body {
            font-family: Arial, sans-serif;
            background-color: var(--secondary-color);
            color: #333;
            margin: 0;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100vh;
            box-sizing: border-box;
          }
          header {
            font-family: 'Merriweather', serif;
            font-size: 1.5em;
            font-weight: bold;
            margin-bottom: 10px;
            color: var(--primary-color);
            text-align: left;
          }
          textarea {
            width: 100%;
            flex: 1;
            background-color: var(--textarea-bg);
            color: var(--textarea-text);
            border: 1px solid #ccc;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
            resize: none;
            box-sizing: border-box;
            scrollbar-width: thin;
            scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
          }
          textarea::-webkit-scrollbar {
            width: 8px;
          }
          textarea::-webkit-scrollbar-track {
            background-color: var(--scrollbar-track);
          }
          textarea::-webkit-scrollbar-thumb {
            background-color: var(--scrollbar-thumb);
            border-radius: 5px;
          }
          .button-container {
            display: flex;
            justify-content: flex-end;
          }
          button {
            color: var(--button-text-light);
            border: none;
            padding: 10px 20px;
            margin: 5px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s, color 0.3s;
            user-select: none;
          }
          button.cancel {
            background-color: #dddddd;
          }
          button.summarize {
            background-color: var(--primary-color);
            color: var(--button-text-dark);
          }
          button:hover {
            opacity: 0.9;
          }
          button.cancel:hover {
            background-color: #cccccc;
          }
          body.dark-mode {
            background-color: #333333;
            color: #f9f9f9;
          }
          body.dark-mode header {
            color: var(--primary-color-light);
          }
          body.dark-mode textarea {
            background-color: #444444;
            color: #f9f9f9;
          }
          body.dark-mode button.cancel {
            background-color: #555555;
            color: var(--button-text-dark);
          }
          body.dark-mode button.summarize {
            background-color: var(--primary-color-light);
          }
          body.dark-mode button.cancel:hover {
            background-color: #666666;
          }
        </style>
      </head>
      <body>
        <header>Arctic</header>
        <textarea id="text-area" placeholder="Paste your text here..."></textarea>
        <div class="button-container">
          <button class="cancel">Cancel</button>
          <button class="summarize">Summarize</button>
        </div>
        <div id="theme-toggle" style="position: absolute; top: 20px; right: 20px; cursor: pointer; font-size: 1.5em; z-index: 1000;">
          <i class="fas fa-moon"></i>
        </div>

        <script>
          function toggleTheme() {
            const body = document.body;
            const themeToggle = document.getElementById('theme-toggle');
          
            if (body.classList.contains('dark-mode')) {
              body.classList.remove('dark-mode');
              themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
              body.classList.add('dark-mode');
              themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
          }
          
          document.addEventListener('DOMContentLoaded', function () {
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
              themeToggle.addEventListener('click', toggleTheme);
            }

            const cancelButton = document.querySelector('.cancel');
            if (cancelButton) {
              cancelButton.addEventListener('click', function () {
                window.parent.postMessage({ type: 'closePopup' }, '*');
              });
            }

            const summarizeButton = document.querySelector('.summarize');
            if (summarizeButton) {
              summarizeButton.addEventListener('click', async function () {
                const textarea = document.getElementById('text-area');
                const input = textarea.value;

                if (!input) return;

                try {
                  console.log('Sending request to Flask server...');
                  const response = await fetch('http://localhost:5000/summarize', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: input }),
                  });

                  if (response.ok) {
                    const jsonResponse = await response.json();
                    console.log('Response received:', jsonResponse);

                    const summarizedText = jsonResponse.summary;
                    console.log('Summarized Text:', summarizedText);

                    // Send the summarized text to the parent window
                    window.parent.postMessage({ type: 'updateText', text: summarizedText }, '*');
                  } else {
                    console.error('Request failed with status:', response.status);
                  }
                } catch (error) {
                  console.error('Request failed:', error);
                }
              });
            }
          });
        </script>
      </body>
    </html>
  `;

  document.body.appendChild(backdrop);
  document.body.appendChild(iframe);

  setTimeout(() => {
    backdrop.style.backdropFilter = 'blur(8px)';
    backdrop.style.opacity = '1';
  }, 10);

  window.addEventListener('message', function (event) {
    if (event.data && event.data.type === 'closePopup') {
      backdrop.style.transition = 'opacity 0.5s';
      backdrop.style.opacity = '0';
      setTimeout(() => {
        backdrop.remove();
        iframe.remove();
      }, 500);
    } else if (event.data && event.data.type === 'updateText') {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      const textarea = iframeDocument.getElementById('text-area');
      if (textarea) {
        textarea.value = event.data.text;
      }
    }
  });
}

document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === 'q') {
    createPopupInIframe();
  }
});
