const getCurrentTab = async () => {
    const queryOptions = { active: true, lastFocusedWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
};


document.querySelector("#power-btn").addEventListener("click", async () => {
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

//on off button
const powerBtn = document.getElementById('power-btn');
const powerBtnText = document.getElementById('powerBtnText');
const pw = document.getElementById('pw');

powerBtn.addEventListener('click', () => {
    if (powerBtnText.innerText === 'OFF') {
        powerBtnText.innerText = 'ON';
        pw.src = 'images/button-power-on.png'; 
    } else {
        powerBtnText.innerText = 'OFF';
        pw.src = 'images/button-power-off.png';
    }
});

//increment and decrement
var decrementButton = document.getElementById('decrement');
    var incrementButton = document.getElementById('increment');
    var dynamicElement = document.getElementById('dynamic');

    // Set initial value
    var currentValue = 0;

    // Function to increment the value
    function incrementValue() {
        currentValue++;
        dynamicElement.textContent = currentValue;
    }

    // Function to decrement the value
    function decrementValue() {
        if (currentValue > 0) {
            currentValue--;
            dynamicElement.textContent = currentValue;
        }
    }

    // Add click event listeners to the buttons
decrementButton.addEventListener('click', decrementValue);
incrementButton.addEventListener('click', incrementValue);
