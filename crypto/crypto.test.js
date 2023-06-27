const { getCandidate, createHash } = require("./crypto");

describe("createHash", () => {
  describe("when no given input", () => {
    it("returns an empty string", () => {
      const hash = createHash();
      expect(hash).toMatch("");
    });
  });

  describe("when given input", () => {
    it("returns a hash of the input", () => {
      const input = "This is an input";
      const expectedValue =
        "5e2b16c57cb103ae3b5fbc5440ca2f2582a8f197fc8806ba65cbd574512225b2c18b22bcd1c3165338b9374ec063834a7e0cce4cdbc9f01176290f97080b1838";

      const hash = createHash(input);
      expect(hash).toBe(expectedValue);
    });
  });
});

describe("getCandidate", () => {
  describe("when no given input", () => {
    it("returns a hash of an empty object", () => {
      const expectedValue =
        "c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862";

      const candidate = getCandidate();
      expect(candidate).toMatch(expectedValue);
    });
  });

  describe("when given input", () => {
    describe("includes partitionKey", () => {
      describe("and partitionKey is string", () => {
        it("should return the partitionKey", () => {
          const input = {
            partitionKey: "thisIsAPartitionKey",
          };

          const candidate = getCandidate(input);
          expect(candidate).toMatch(input.partitionKey);
        });
      });

      describe("and partitionKey is not a string", () => {
        it("should return the partitionKey as an stringify object", () => {
          const input = {
            partitionKey: {
              key1: "value1",
              key2: "value2",
            },
          };
          const expectedValue = JSON.stringify(input.partitionKey);

          const candidate = getCandidate(input);
          expect(candidate).toMatch(expectedValue);
        });
      });
    });

    describe("does not includes partitionKey", () => {
      it("returns a hash of the input", () => {
        const input = {
          key1: "Lorem ipsum dolor sit amet.",
          key2: "Consectetur adipiscing elit.",
        };
        const expectedValue =
          "5f1f7dc73a5f109ea5bba1bcd263f253272b4b1ff704b26c35dda3f37f08914e95651441a098a53296ebd05a9f60672561c9c594f43c6af189eb012955270f65";

        const candidate = getCandidate(input);
        expect(candidate).toBe(expectedValue);
      });
    });
  });
});
