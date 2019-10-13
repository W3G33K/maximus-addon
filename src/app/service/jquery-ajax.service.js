/* @imports */
import StringUtil from "../util/string.util";

import $ from "jquery";

/* @constants */
const HTTP_METHOD_TYPE_POST = "POST";

/* @exports */
export default class JqueryAjaxService {
	__request(options = {}) {
		return new Promise((resolve, reject) =>
			$.ajax(options).done(resolve).fail((jqXHR, textStatus, errorThrown) => {
					let error = new Error(`Status ${textStatus}: Please contact your server administrator. Maximus failed to communicate with server-side resource located at: ${options.url}`);
					reject(error);
				}
			));
	}

	post(protocol, host, port, endpoint, data) {
		let url = `${protocol}://${host}`;
		if (StringUtil.isNotEmpty(port)) {
			url = `${url}:${port}`;
		}

		if (StringUtil.isNotEmpty(endpoint)) {
			let pathname = endpoint;
			if (pathname.startsWith("/")) {
				pathname = pathname.substr(1);
			}

			url = `${url}/${pathname}`;
		}

		return this.__request({
			type: HTTP_METHOD_TYPE_POST,
			accept: "application/json",
			contentType: "application/json",
			datatype: "json",
			data: JSON.stringify(data),
			url: url
		});
	}
}
