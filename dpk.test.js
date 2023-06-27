const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  describe("when no given input", () => {
    it("returns the literal '0'", () => {
      const trivialKey = deterministicPartitionKey();
      expect(trivialKey).toBe("0");
    });
  });

  describe("when given input", () => {
    describe("includes partitionKey", () => {
      describe("and partitionKey is string", () => {
        it("should return the partitionKey", () => {
          const input = {
            partitionKey: "thisIsAPartitionKey",
          };

          const trivialKey = deterministicPartitionKey(input);
          expect(trivialKey).toMatch(input.partitionKey);
        });
      });

      describe("and partitionKey is not string", () => {
        describe("and partitionKey toJson length is less than 256", () => {
          it("should return the partitionKey as an stringify object", () => {
            const input = {
              partitionKey: {
                key1: "value1",
                key2: "value2",
              },
            };
            const expectedValue = JSON.stringify(input.partitionKey);

            const trivialKey = deterministicPartitionKey(input);
            expect(trivialKey).toMatch(expectedValue);
          });
        });

        describe("and partitionKey toJson length is equal or more than 256", () => {
          it("should be equal to hash value", () => {
            const input = {
              partitionKey: {
                key1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consequat semper auctor. Aliquam eleifend ut odio at tincidunt. Sed vel suscipit lorem.",
                key2: "Quisque libero massa, lobortis blandit ullamcorper in, vulputate nec enim. Nunc convallis nisl nec metus cursus aliquam sed eget ex. Nunc ornare ipsum nec ullamcorper tincidunt. Fusce ultricies urna ac sollicitudin placerat. Fusce in dui neque",
              },
            };
            const expectedValue =
              "a47c403f06cd1078e915f6697210934dbabd3c6718eb411ce4e406f96d9a67321e5c9e2cb3deb78acfa37dac27c20f73194611368eb09880bf4bbbb679424613";

            const trivialKey = deterministicPartitionKey(input);
            expect(trivialKey).toMatch(expectedValue);
          });
        });
      });
    });

    describe("does not includes partitionKey", () => {
        it("should be equal to hash value", () => {
          const input = {
            key1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consequat semper auctor. Aliquam eleifend ut odio at tincidunt. Sed vel suscipit lorem.",
            key2: "Quisque libero massa, lobortis blandit ullamcorper in, vulputate nec enim. Nunc convallis nisl nec metus cursus aliquam sed eget ex. Nunc ornare ipsum nec ullamcorper tincidunt. Fusce ultricies urna ac sollicitudin placerat. Fusce in dui neque",
          };
          const expectedValue =
            "a47c403f06cd1078e915f6697210934dbabd3c6718eb411ce4e406f96d9a67321e5c9e2cb3deb78acfa37dac27c20f73194611368eb09880bf4bbbb679424613";

          const trivialKey = deterministicPartitionKey(input);
          expect(trivialKey).toMatch(expectedValue);
        });
    });
  });
});
