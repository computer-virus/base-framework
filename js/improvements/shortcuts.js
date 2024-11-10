// A JavaScript file that makes commonly used actions quicker to type.

// #region HTMLElement Management
/**
 * Returns the first or all elements that are descentdant of document that match the selectors.
 * @param {string} selectors
 * @param {boolean | undefined} all
 * @returns {HTMLElement | NodeListOf<HTMLElement>}
 */
const get = (selectors, all) => {
	const e = new Error();

	if (typeof(selectors) != "string" || String.isNullOrWhiteSpace(selectors)) {
		e.name = "ArgumentNullException";
		e.message = "Parameter selectors cannot be undefined, null, an empty string, or a whitespace string.";
		throw e;
	}

	if (typeof (all) != "boolean") {
		all = false;
	}

	let results;
	if (all) {
		results = document.querySelectorAll(selectors);

		if (results.length == 0) {
			e.name = "ElementsNotFoundException";
			e.message = `Could not find any elements with selector(s): "${selectors}"`;
			throw e;
		}
	} else {
		results = document.querySelector(selectors);

		if (results == null) {
			e.name = "ElementNotFoundException";
			e.message = `Coud not find any elements with selector(s): "${selectors}"`;
			throw e;
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
	const e = new Error();
	if (typeof(tagName) != "string" || String.isNullOrWhiteSpace(tagName)) {
		e.name = "ArgumentNullException";
		e.message = "Parameter selectors cannot be undefined, null, an empty string, or a whitespace string.";
		throw e;
	}

	return document.createElement(tagName);
};
// #endregion