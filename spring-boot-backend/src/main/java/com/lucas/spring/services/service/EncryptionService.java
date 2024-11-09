package com.lucas.spring.services.service;

import org.springframework.stereotype.Service;

@Service
public interface EncryptionService {
    /**
     * Construct a new input text while appending to it 512 characters long text,
     * encrypting the new text with 256 characters long key,
     * salted with 256 characters long text,
     * with an iteration count of 65536.
     * @param strToEncrypt .
     * @return Return a maximum length of 1153 characters long encrypted text.
     */
    String encrypt(String strToEncrypt);

    /**
     * ...
     * @param strToDecrypt .
     * @return Return the decrypted text.
     */
    String decrypt(String strToDecrypt);
}
