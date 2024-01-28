chrome.runtime.onMessage.addListener((message) =>{
    if(message.action === "scrapText")
    {
      scrapeTextUsingTreeWalker(); 
    }
    else 
    {
      console.log("ERROR! No or unexpected response returned by message");
    }
  });
  
  const ignoredElements = ["script", "style", "noscript", "br", "hr"];
  
  function isInteger(value) {
    return /^-?\d+$/.test(value);
  }
  
  function containsRupeeSymbol(value) {
    return value.includes("₹");
  }
  
  function scrapeTextUsingTreeWalker() {
    const treeWalker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
  
    const uniqueTextSet = new Set();
  
    while (treeWalker.nextNode()) {
      const textNode = treeWalker.currentNode;
      const parentNode = textNode.parentNode;
  
      if (
        parentNode &&
        ignoredElements.includes(parentNode.tagName.toLowerCase())
      ) {
        continue;
      }
  
      const trimmedText = textNode.nodeValue.trim();
  
      if (
        trimmedText.length > 0 &&
        !uniqueTextSet.has(trimmedText) &&
        !isInteger(trimmedText) &&
        !containsRupeeSymbol(trimmedText)
      )
      {
        uniqueTextSet.add(trimmedText);
        console.log(trimmedText);
      }
    }
  }
  
  
  
  
  
  