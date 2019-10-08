/* @exports */
export default class StringUtil {
	static equals(string1, string2) {
		return (string1 === string2);
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
