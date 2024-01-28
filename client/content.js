chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Inside Message", message.message);
    if (message.message === "restart") {
		console.log("restart message received");
		scrapeText();
    } else if (message.message === "check") {
        sendResponse({message: "present"});
    } 
})


function scrapeText() {
	const treeWalker = document.createTreeWalker(
		document.body,
		NodeFilter.SHOW_TEXT,
	);
	
	const filteredNodes = [];
	const filteredTexts = [];

	while (treeWalker.nextNode()) {
		const textNode = treeWalker.currentNode;
		const parentNode = textNode.parentNode;

		if (
			parentNode.tagName &&
			ignoredElements.includes(parentNode.tagName.toLowerCase())
		) {
			continue;
		}

		const trimmedText = textNode.nodeValue.trim();
		if (trimmedText.split(" ").length > 2) {
			filteredNodes.push(textNode);
			filteredTexts.push(trimmedText);
		}
	}
	console.log(filteredTexts);
}





