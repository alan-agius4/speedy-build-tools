import { toArray } from "./utils";

describe("utilsSpec", () => {
    describe("toArray", () => {
        it("must convert value to array", () => {
            const value = "hello world";
            expect(toArray(value)).toEqual([value]);
        });
    });
});