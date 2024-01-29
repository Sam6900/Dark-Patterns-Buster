const ignoredElements = ["script", "style", "noscript", "br", "hr", "code", "nav"];


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
		if (trimmedText.split(" ").length > 3) {
			filteredNodes.push(textNode);
			filteredTexts.push(trimmedText);
		}
	}
    console.log(filteredTexts);
	return {filteredNodes, filteredTexts};
}
