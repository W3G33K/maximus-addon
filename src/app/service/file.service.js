export default class FileService {
	download(content, fileName, fileType) {
		console.debug(content, fileName, fileType);
		let fileContent = JSON.stringify(content);
		let fileBlob = new Blob([fileContent], {
			type: fileType
		});

		let fileUrl = URL.createObjectURL(fileBlob);
		return browser.downloads.download({
			url: fileUrl,
			filename: fileName
		});
	}
}
