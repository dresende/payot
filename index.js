class Parser {
	#options = {
		default_period : 3600, // 1 hour
		aliases        : [],
	}

	constructor(options = {}) {
		for (let k in options) {
			this.#options[k] = options[k];
		}
	}

	alias(text) {
		if (!this.#options.aliases.includes(text)) {
			this.#options.aliases.push(text);
		}
	}

	parse(text) {
		return text.split(/\s*[,;]+\s*/)
		           .map((interval) => (interval.trim()))
		           .filter((interval) => (interval.length > 0))
		           .map((interval) => (this.parseInterval(interval)));
	}

	parseInterval(text) {
		let interval = {};

		text.split("-", 2).map((part, i) => {
			interval[i === 0 ? "from" : "to"] = this.parseTime(part);
		});

		if (typeof interval.to == "undefined") {
			interval.to = interval.from + this.#options.default_period;
		}

		return interval;
	}

	parseTime(text) {
		if (this.#options.aliases.includes(text)) {
			return text;
		}

		let parts = text.split(":").map((part) => (+(part.trim())));

		return ((parts[0] || 0) * 3600) + ((parts[1] || 0) * 60) + (parts[2] || 0);
	}
}

const default_parser = new Parser();
const exported       = function (text) {
	return default_parser.parse(text);
}

exported.parser = default_parser;

module.exports = exported;
