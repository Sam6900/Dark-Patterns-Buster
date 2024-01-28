const getCurrentTab = async () => {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
};


document.querySelector(".scrap-button").addEventListener("click", async () => {
    const tab = await getCurrentTab();
    chrome.tabs.sendMessage(tab.id, { message: "check" }, (response) => {
        if (chrome.runtime.lastError) {
            // An error occurred, which means the message was not sent
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["client/content.js", "client/utils.js"]
            });
        } else {
            // Message was sent successfully
            if (response && response.message === "present") {
                chrome.tabs.sendMessage(tab.id, { message: "restart" });
            } else {
                console.log("ERROR! No response returned by message");
            }
        }
    });     
});
