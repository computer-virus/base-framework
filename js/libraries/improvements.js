// A JavaScript file thats make JavaScript work more like C#, one line at a time.

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

// #region String Properties and Methods
Object.defineProperty(String, "isNullOrWhiteSpace", {
	/**
	 * Indicates whether a specified string is null, empty, or consists only of white-space characters.
	 * @param {string} string
	 * @returns {boolean}
	 */
	value: function(string) {
		if (string == undefined) {
			throw new ArgumentNullException(`Function expected a string argument, got no arguments instead.`);
		}

		if (string != null && typeof (string) != "string") {
			throw new ArgumentInvalidTypeException(`Function expected a string argument, got ${typeof (string)} instead.`);
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
		if (typeof (searchString) != "string") {
			throw new ArgumentInvalidTypeException(`Function expected a string argument, got ${typeof (searchString)} instead.`);
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

// A JavaScript file that makes commonly used actions quicker to type.

// #region HTMLElement Management
/**
 * Returns the first or all elements that are descentdant of document that match the selectors.
 * @param {string} selectors
 * @param {boolean | undefined} all
 * @returns {HTMLElement | NodeListOf<HTMLElement>}
 */
const get = (selectors, all) => {
	if (typeof (selectors) != "string") {
		throw new ArgumentInvalidTypeException("Parameter selectors must be a string.");
	}

	if (String.isNullOrWhiteSpace(selectors)) {
		throw new ArgumentNullException("Parameter selectors cannot be undefined, null, an empty string, or a whitespace string.");
	}

	if (typeof (all) != "boolean") {
		all = false;
	}

	let results;
	if (all) {
		results = document.querySelectorAll(selectors);

		if (results.length == 0) {
			throw new HTMLElementsNotFoundException(`Could not find any elements with selector(s): "${selectors}"`);
		}
	} else {
		results = document.querySelector(selectors);

		if (results == null) {
			throw new HTMLElementNotFoundException(`Coud not find any elements with selector(s): "${selectors}"`);
		}
	}

	return results;
};

/**
 * Creates an instance of the element for the specified tag.
 * @param {string} tagName
 * @returns {HTMLElement}
 */
const create = (tagName) => {
	if (typeof (tagName) != "string") {
		throw new ArgumentInvalidTypeException("Parameter selectors must be a string.");
	}

	if (String.isNullOrWhiteSpace(tagName)) {
		throw new ArgumentNullException("Parameter selectors cannot be undefined, null, an empty string, or a whitespace string.");
	}

	return document.createElement(tagName);
};

/**
 * Replaces the reference node with the given node in the DOM.
 * @param {Node} ref
 * @param {Node} node
 */
const replace = (ref, node) => {
	ref.parentNode.replaceChild(ref, node);
};
// #endregion

// #region Array sorting comparison functions
/**
 * A comparison function to be used to order elements in an array in ascending order.
 * @param {any} a
 * @param {any} b
 * @returns {number}
 */
const asc = (a, b) => {
	return a < b ? -1 : 1;
};

/**
 * A comparison function to be used to order elements in an array in descending order.
 * @param {any} a
 * @param {any} b
 * @returns {number}
 */
const desc = (a, b) => {
	return a > b ? -1 : 1;
};
// #endregion