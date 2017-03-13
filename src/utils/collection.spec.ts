import { toArray } from "./collection";

describe("filesystemSpec", () => {
	describe("toArray", () => {
		it("must convert value to array", () => {
			const value = "hello world";
			expect(toArray(value)).toEqual([value]);
		});
	});
});