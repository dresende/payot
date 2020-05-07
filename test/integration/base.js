const payot  = require("../..");
const should = require("should");

describe("an interval", () => {
	it("can have a basic 'HH:MM - HH:MM' format", () => {
		should.deepEqual(payot("10:00-12:00"), [{ from: 10 * 3600, to: 12 * 3600 }]);
	});

	it("shouldn't consider whitespace", () => {
		should.deepEqual(payot("10:00 -12:00"), [{ from: 10 * 3600, to: 12 * 3600 }]);
		should.deepEqual(payot("10:00 -  12:00"), [{ from: 10 * 3600, to: 12 * 3600 }]);
		should.deepEqual(payot("10:00 -  12: 00"), [{ from: 10 * 3600, to: 12 * 3600 }]);
		should.deepEqual(payot("   10  :00 -  12: 00"), [{ from: 10 * 3600, to: 12 * 3600 }]);
	});

	it("can have omissions", () => {
		should.deepEqual(payot("10:00:00-12:00:00"), [{ from: 10 * 3600, to: 12 * 3600 }]);
		should.deepEqual(payot("10:00:-12:00:"), [{ from: 10 * 3600, to: 12 * 3600 }]);
		should.deepEqual(payot("10::-12::"), [{ from: 10 * 3600, to: 12 * 3600 }]);
	});

	it("can have 'HH:MM' format only (defaulting to default period of 1H)", () => {
		should.deepEqual(payot("10:00"), [{ from: 10 * 3600, to: 11 * 3600 }]);
	});
});

describe("an interval list", () => {
	it("is separated by , or ;", () => {
		should.deepEqual(payot("10-12,16-18"), [{ from: 10 * 3600, to: 12 * 3600 }, { from: 16 * 3600, to: 18 * 3600 }]);
	});

	it("doesn't care for whitespace", () => {
		should.deepEqual(payot("10-12  ,   16-18    "), [{ from: 10 * 3600, to: 12 * 3600 }, { from: 16 * 3600, to: 18 * 3600 }]);
	});

	it("ignores empty items", () => {
		should.deepEqual(payot(";;10-12,;,,16-18,,"), [{ from: 10 * 3600, to: 12 * 3600 }, { from: 16 * 3600, to: 18 * 3600 }]);
	});
});
