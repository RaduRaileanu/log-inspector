import writeToReportFile from "../src/writer.js";
import fs from "fs";

jest.mock('fs', () => {
    const originalFs = jest.requireActual('fs'); 
    return {
      ...originalFs, 
      appendFile: jest.fn() 
    };
  });

describe("writer.js - writeToReportFile", () => {
    beforeEach(() => {
        fs.appendFile.mockClear(); 
    });

    test("Should write to report.txt", async () => {
        const testLine = "Test Log Entry\n";
        await writeToReportFile(testLine);

        expect(fs.appendFile).toHaveBeenCalledTimes(1);
        expect(fs.appendFile).toHaveBeenCalledWith(
            "report.txt",
            testLine,
            expect.any(Function) 
        );
    });

    test("Should handle write errors", async () => {
        const testLine = "Test Log Entry\n";
        const testError = new Error("Test Error");
        fs.appendFile.mockImplementation((path, data, callback) => callback(testError));

        console.log = jest.fn(); 

        await writeToReportFile(testLine); 

        expect(console.log).toHaveBeenCalledWith(testError); 
    });
});
