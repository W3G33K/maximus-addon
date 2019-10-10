/* @exports */
export default class StringUtil {
	static equals(string1, string2) {
		return (string1 === string2);
	}

	/**
	 * Checks if a string is empty.
	 *
	 * @param {String} string: The input string to check.
	 * @return {Boolean} boolean: true if the string is empty, undefined, null and/or not a type of string.
	 */
	static isEmpty(string) {
		return (typeof string === "string" && string.trim() === "");
	}

	/**
	 * Checks if a string is not empty.
	 *
	 * @param {String} string: The input string to check.
	 * @return {Boolean} boolean: true if the string is a type of string and not empty, undefined or null.
	 */
	static isNotEmpty(string) {
		return !(StringUtil.isEmpty(string));
	}

	/**
	 * Make a string's first character uppercase.
	 *
	 * @param {String} string: The input string.
	 * @return {String} string: a string with the first character of string capitalized, if that character is alphabetic.
	 */
	static ucfirst(string) {
		let startingChar = string.substr(0, 1),
			endOfString = string.substr(1);
		return (startingChar.toUpperCase() + endOfString);
	}
}
