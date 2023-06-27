const crypto = require("crypto");

function createHash(data) {
  if (!data) {
    return "";
  }

  return crypto.createHash("sha3-512").update(data).digest("hex");
}

function getCandidate(event = {}) {
  const { partitionKey } = event;

  if (!partitionKey) {
    const data = JSON.stringify(event);
    return createHash(data);
  }

  if (typeof partitionKey !== "string") {
    return JSON.stringify(partitionKey);
  }

  return partitionKey;
}

module.exports = {
  createHash,
  getCandidate,
};
