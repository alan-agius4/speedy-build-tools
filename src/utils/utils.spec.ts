import * as glob from "glob";
import { toArray, globArray } from "./utils";

describe("utilsSpec", () => {

    describe("toArray", () => {
        it("must convert value to array", () => {
            const value = "hello world";
            expect(toArray(value)).toEqual([value]);
        });
    });

    describe("globArray", () => {
        const filesExludingSpec = ["test.ts"];
        const specFiles = ["test.spec.ts"];
        const allFiles = [...filesExludingSpec, ...specFiles];

        beforeEach(() => {
            spyOn(glob, "sync").and.returnValues(allFiles, specFiles);
        });

        it("must return all paths matching pattern", () => {
            expect(globArray(["*.ts"])).toEqual(allFiles);
        });

        it("must return paths excluding negative patterns", () => {
            expect(globArray(["*.ts", "!*.spec.ts"])).toEqual(filesExludingSpec);
        });
    });
});