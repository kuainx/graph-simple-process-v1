export const Blob2DataUrl = async blob => {
	return new Promise(function (resolve) {
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onload = function () {
			resolve(reader.result);
		};
	});

};
