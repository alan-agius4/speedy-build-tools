import { toPrimitive } from "./string";

describe("stringSpec", () => {

	describe("toPrimitive", () => {
		it("must cast string '10' to type number", () => {
			expect(toPrimitive("10")).toBe(10);
		});

		it("must return value when value is a string", () => {
			expect(toPrimitive("hello")).toBe("hello");
		});

		it("must cast string 'true' to type boolean", () => {
			expect(toPrimitive("true")).toBe(true);
		});

		it("must cast string 'false' to type boolean", () => {
			expect(toPrimitive("false")).toBe(false);
		});
	});

});