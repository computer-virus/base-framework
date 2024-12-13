// Code thats make JavaScript work more like C#, one line at a time.

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

		if (typeof (message) == "string") {
			this.message = message;
		} else {
			this.message = "An error has occured.";
		}
	}
}

class NotImplementedException extends Exception {
	/**
	 * @public
	 * @param {string | undefined} message
	 */
	constructor(message) {
		if (typeof (message) != "string") {
			message = "This is not implemented.";
		}

		super(message);

		this.name = "NotImplementedException";
	}
}

// #region Argument Exceptions
/**
 * @public
 */
class ArgumentException extends Exception {
	/**
	 * @public
	 * @param {string | undefined} message
	 */
	constructor(message) {
		if (typeof (message) != "string") {
			message = "This argument value caused an error.";
		}

		super(message);

		this.name = "ArgumentException";
	}
}

/**
 * @public
 */
class ArgumentNullException extends ArgumentException {
	/**
	 * @public
	 * @param {string | undefined} message
	 */
	constructor(message) {
		if (typeof (message) != "string") {
			message = "This argument value is null.";
		}

		super(message);

		this.name = "ArgumentNullException";
	}
}

/**
 * @public
 */
class ArgumentOutOfRangeException extends ArgumentException {
	/**
	 * @public
	 * @param {string | undefined} message
	 */
	constructor(message) {
		if (typeof (message) != "string") {
			message = "This argument value is out of range.";
		}

		super(message);

		this.name = "ArgumentOutOfRangeException";
	}
}

/**
 * @public
 */
class ArgumentInvalidTypeException extends ArgumentException {
	/**
	 * @public
	 * @param {string | undefined} message
	 */
	constructor(message) {
		if (typeof (message) != "string") {
			message = "This argument was not in the expected type.";
		}

		super(message);

		this.name = "ArgumentInvalidTypeException";
	}
}
// #endregion Argument Exceptions

// #region Format Exceptions
class FormatException extends Exception {
	/**
	 * @public
	 * @param {string | undefined} message
	 */
	constructor(message) {
		if (typeof (message) != "string") {
			message = "This value was not in the expected format.";
		}

		super(message);

		this.name = "FormatException";
	}
}
// #endregion

// #region Not Found Exceptions
/**
 * @public
 */
class NotFoundException extends Exception {
	/**
	 * @public
	 * @param {string | undefined} message
	 */
	constructor(message) {
		if (typeof (message) != "string") {
			message = "Requested item could not be found.";
		}

		super(message);

		this.name = "NotFoundException";
	}
}

/**
 * @public
 */
class FileNotFoundException extends NotFoundException {
	/**
	 * @public
	 * @param {string | undefined} message
	 */
	constructor(message) {
		if (typeof (message) != "string") {
			message = "Requested file could not be found.";
		}

		super(message);

		this.name = "NotFoundException";
	}
}

/**
 * @public
 */
class HTMLElementNotFoundException extends NotFoundException {
	/**
	 * @public
	 * @param {string | undefined} message
	 */
	constructor(message) {
		if (typeof (message) != "string") {
			message = "Requested HTML element could not be found.";
		}

		super(message);

		this.name = "HTMLElementNotFoundException";
	}
}

/**
 * @public
 */
class HTMLElementsNotFoundException extends NotFoundException {
	/**
	 * @public
	 * @param {string | undefined} message
	 */
	constructor(message) {
		if (typeof (message) != "string") {
			message = "Requested HTML elements could not be found.";
		}

		super(message);

		this.name = "HTMLElementsNotFoundException";
	}
}
// #endregion
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

// Code that makes commonly used actions quicker to type.

// #region HTMLElement Management
/**
 * Returns the first or all node(s) that are descentdants of document and match the specified selectors.
 * @param {string} selectors
 * @param {boolean | undefined} allNodes
 * @returns {Node | Node[]}
 */
const get = (selectors, allNodes) => {
	if (typeof (selectors) != "string") {
		throw new ArgumentInvalidTypeException("Parameter selectors must be a string.");
	}

	if (String.isNullOrWhiteSpace(selectors)) {
		throw new ArgumentNullException("Parameter selectors cannot be null, an empty string, or a whitespace string.");
	}

	if (typeof (allNodes) != "boolean") {
		allNodes = false;
	}

	let results;
	if (allNodes) {
		results = Array.from(document.querySelectorAll(selectors));

		if (results == null || results.length < 1) {
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
 * Creates an instance of the node of the specified name.
 * @param {string} name
 * @returns {Node}
 */
const create = (name) => {
	if (typeof (name) != "string") {
		throw new ArgumentInvalidTypeException("Parameter selectors must be a string.");
	}

	if (String.isNullOrWhiteSpace(name)) {
		throw new ArgumentNullException("Parameter selectors cannot be null, an empty string, or a whitespace string.");
	}

	return document.createElement(name);
};

/**
 * Replaces the specified reference node with the given node.
 * @param {Node} referenceNode
 * @param {Node} node
 */
const replace = (referenceNode, node) => {
	if (referenceNode == null || referenceNode == undefined) {
		throw new ArgumentNullException("Parameter referenceNode cannot be null.");
	}

	if (node == null || node == undefined) {
		throw new ArgumentNullException("Parameter node cannot be null.");
	}

	referenceNode.parentNode.replaceChild(node, referenceNode);
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