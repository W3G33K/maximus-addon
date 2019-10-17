import NgInject from "nginject-decorator";

@NgInject("$q")
export default class FileService {
	constructor($q) {
		this.$q = $q;
	}

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

	readJson(file) {
		let $q = this.$q;
		return $q(function(resolve, reject) {
			let fileReader = new FileReader();
			fileReader.addEventListener("abort", reject);
			fileReader.addEventListener("error", reject);
			fileReader.addEventListener("load", function(fileEvent) {
				let target = fileEvent.target,
					result = target.result;
				try {
					let jsonData = JSON.parse(result);
					resolve(jsonData);
				} catch(error) {
					reject(error);
				}
			});

			fileReader.readAsText(file);
		});
	}
}
