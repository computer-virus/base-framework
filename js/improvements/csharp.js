// A JavaScript file thats make JavaScript work more like C#, one line at a time.

// #region String Properties and Methods
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

Object.defineProperty(String, "empty", {
	value: "",
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

// #region Exception Classes
/**
 * @public
 */
class Exception extends Error {
	/**
	 * @public
	 * @param {string | undefined} message
	 */
	constructor(message) {
		super();

		this.name = "Exception";

		if (typeof (message) != "string") {
			this.message = String.empty;
		} else {
			this.message = message;
		}
	}
}

/**
 * @public
 */
class ArgumentNullException extends Exception {
	/**
	 * @public
	 * @param {string | undefined} message
	 */
	constructor(message) {
		super(message);

		this.name = "ArgumentNullException";
	}
}

/**
 * @public
 */
class ArgumentInvalidTypeException extends Exception {
	/**
	 * @public
	 * @param {string | undefined} message
	 */
	constructor(message) {
		super(message);

		this.name = "ArgumentInvalidTypeException";
	}
}

/**
 * @public
 */
class HTMLElementNotFoundException extends Exception {
	/**
	 * @public
	 * @param {string | undefined} message
	 */
	constructor(message) {
		super(message);

		this.name = "HTMLElementNotFoundException";
	}
}

/**
 * @public
 */
class HTMLElementsNotFoundException extends Exception {
	/**
	 * @public
	 * @param {string | undefined} message
	 */
	constructor(message) {
		super(message);

		this.name = "HTMLElementsNotFoundException";
	}
}
// #endregion