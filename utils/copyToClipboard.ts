import notify from "./notify";

const copyToClipboard = (value: string) => {
	navigator.clipboard.writeText(value).then(
		function () {
			return notify("success", "Successfully copied!", "top-center", 1500);
		},
		function () {
			return notify("error", "Could not copy to clipboard", "top-center", 1500);
		}
	);

	// try {
	// 	// Safari treats user activation differently:
	// 	// https://bugs.webkit.org/show_bug.cgi?id=222262.
	// 	navigator.clipboard.write([
	// 		new ClipboardItem({
	// 			"text/plain": new Promise(async (resolve) => {
	// 				resolve(value);
	// 			}),
	// 		}),
	// 	]);
	// } catch {
	// 	// Chromium
	// 	const blob = new Blob([value], { type: "text/plain" });
	// 	navigator.clipboard.write([
	// 		new ClipboardItem({
	// 			[blob.type]: blob,
	// 		}),
	// 	]);
	// }
};

export default copyToClipboard;
