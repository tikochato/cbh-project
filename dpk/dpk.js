const { getCandidate, createHash } = require("../crypto/crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  const candidate = getCandidate(event);

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return createHash(candidate);
  }

  return candidate;
};
