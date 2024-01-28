const getCurrentTab = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  };
  
  document.querySelector(".scrap-button").addEventListener("click", async () => {
      let tab = await getCurrentTab();
      chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content.js"],
      });
  });
  
    
    
  // console.log("popup.js loaded");
  