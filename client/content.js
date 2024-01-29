const endpoint = "http:/127.0.0.1:5000/";
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Inside Message", message.message);
    if (message.message === "restart") {
		console.log("restart message received");
		getDarkPatternNodes();
    } else if (message.message === "check") {
        sendResponse({message: "present"});
    } 
})


function getDarkPatternNodes() {
	const {filteredNodes, filteredTexts} = scrapeText();
	const darkPatternNodes = [];
	fetch (endpoint, {
		method: "POST",
		body: JSON.stringify({tokens: filteredTexts}),
		headers: {"Content-Type": "application/json"}
	}).then(response => response.json())
	.then(data => {
		console.log(data);
		for (let i = 0; i < data.length; i++) {
			if (data[i].label === 'darkpattern' && data[i].score > 0.70) {
				darkPatternNodes.push(filteredNodes[i]);
			}
		}
		highlightNodes(darkPatternNodes);
	}).catch(err => {
		console.log("Got an error", err);
	});
}


function highlightNodes(nodes) {
	for (const node of nodes) {
		console.log(node.parentNode);
		node.parentNode.style.backgroundColor = "red";
	}
}