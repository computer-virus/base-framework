// A JavaScript file thats make JavaScript work a little more like C#.

// #region String Properties
Object.defineProperty(String, "isNullOrWhiteSpace", {
	/**
	 * Indicates whether a specified string is null, empty, or consists only of white-space characters.
	 * @param {string} string
	 * @returns {boolean}
	 */
	value: function(string) {
		const e = new Error();
		
		if (typeof (string) != "string") {
			e.name = "ArgumentInvalidTypeException";
			e.message = `Function expected a string argument, got ${typeof (string)} instead.`;
			throw e;
		}

		return !string || !string.trim();
	},
	writable: false
});

Object.defineProperty(String.prototype, "contains", {
	/**
	 * Returns a value indicating whether a specified string occurs within this string, using the specified comparison rules.
	 * @param {string} searchString
	 * @param {boolean | undefined} ignoreCase
	 * @returns {boolean}
	 */
	value: function(searchString, ignoreCase) {
		const e = new Error();
		
		if (typeof (searchString) != "string") {
			e.name = "ArgumentInvalidTypeException";
			e.message = `Function expected a string argument, got ${typeof (searchString)} instead.`;
			throw e;
		}

		if (typeof ignoreCase != "boolean") {
			ignoreCase = false;
		}

		if (ignoreCase) {
			return this.toLowerCase().includes(searchString.toLowerCase());
		} else {
			return this.includes(searchString);
		}
	},
	writable: false
});
// #endregion