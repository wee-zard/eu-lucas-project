const UNIQUE_SEQUENCE_LENGTH = 32;

const generateRandomHex = (): string => {
  const character = Math.round(Math.random() * 16);
  return character.toString(16);
};

/**
 * Generate a unique sequence.
 */
const getUniqueSequence = (): string => {
  let uniqueSequence: string = "";

  for (let i = 0; i < UNIQUE_SEQUENCE_LENGTH; i++) {
    uniqueSequence += generateRandomHex();
  }

  return uniqueSequence;
};

/**
 * Get random identification.
 * @returns Returns a random identification.
 */
const getRandomIdentification = (): string => {
  return `${getUniqueSequence()}-${Date.now()}`;
};

export default getRandomIdentification;
