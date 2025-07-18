package com.lucas.spring.components.encryption.service;

import org.springframework.stereotype.Service;

/**
 * An interface service where we store methods
 * related to the Encryption and Decryption.
 */
@Service
public interface EncryptionService {
  /**
   * Construct a new input text while appending to it 512 characters long text,
   * encrypting the new text with 256 characters long key,
   * salted with 256 characters long text,
   * with an iteration count of 65536.
   *
   * @param strToEncrypt .
   * @return Return an encrypted text.
   */
  String encrypt(String strToEncrypt);

  /**
   * Decrypt the provided text.
   *
   * @param strToDecrypt .
   * @return Return the decrypted text.
   */
  String decrypt(String strToDecrypt);

  /**
   * Decrypt and extracts the email address form the hashed text.
   *
   * @param hashedText The hashed text to process.
   * @return Returns the email address from the hashed text.
   */
  String decryptAndExtractEmail(String hashedText);
}
