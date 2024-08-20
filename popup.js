document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const decreaseFontSizeBtn = document.getElementById('decreaseFontSizeBtn');
    const increaseFontSizeBtn = document.getElementById('increaseFontSizeBtn');
  
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
      darkModeToggle.checked = true;
    }
  
    let fontSize = parseInt(localStorage.getItem('fontSize')) || 16;
    document.body.style.fontSize = fontSize + 'px';
  
    darkModeToggle.addEventListener('change', function () {
      if (darkModeToggle.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
      }
  
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: updatePopupTheme,
          args: [darkModeToggle.checked]
        });
      });
    });
  
    decreaseFontSizeBtn.addEventListener('click', function () {
      fontSize = Math.max(12, fontSize - 1);
      document.body.style.fontSize = fontSize + 'px';
      localStorage.setItem('fontSize', fontSize);
    });
  
    increaseFontSizeBtn.addEventListener('click', function () {
      fontSize = Math.min(24, fontSize + 1);
      document.body.style.fontSize = fontSize + 'px';
      localStorage.setItem('fontSize', fontSize);
    });
  });
  
  function updatePopupTheme(isDarkMode) {
    const popupIframe = document.getElementById('arctic-popup-container');
    if (popupIframe) {
      const popupDocument = popupIframe.contentDocument || popupIframe.contentWindow.document;
      if (isDarkMode) {
        popupDocument.body.classList.add('dark-mode');
      } else {
        popupDocument.body.classList.remove('dark-mode');
      }
    }
  }
  
