import checkLogEntry from "../src/log-entry-processor.js";

describe("Log Processor - checkLogEntry", () => {
  let entries;

  beforeEach(() => {
    entries = {};
  });

  test("Should add a new job to entries when it starts", async () => {
    const entry = ["12:00:00", "Job A", "START", "12345"];
    
    await checkLogEntry(entry, entries);

    expect(entries).toHaveProperty("12345");
    expect(entries["12345"]).toEqual({
      time: "12:00:00",
      description: "Job A",
      startAt: "12:00:00",
    });
  });

  test("Should calculate duration when job ends", async () => {
    entries["12345"] = { time: "12:00:00", description: "Job A", startAt: "12:00:00" };
    
    const entry = ["12:10:00", "Job A", "END", "12345"];
    await checkLogEntry(entry, entries);

    expect(entries).not.toHaveProperty("12345"); // Job should be removed
  });
});