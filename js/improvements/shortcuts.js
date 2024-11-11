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
// #endregion