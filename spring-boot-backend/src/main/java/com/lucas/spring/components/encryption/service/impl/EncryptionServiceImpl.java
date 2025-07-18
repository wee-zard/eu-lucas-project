package com.lucas.spring.components.encryption.service.impl;

import com.lucas.spring.components.encryption.enums.EncryptionFailedEnums;
import com.lucas.spring.components.encryption.exception.EncryptionFailedException;
import com.lucas.spring.components.encryption.service.EncryptionService;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.security.spec.KeySpec;
import java.util.Base64;
import java.util.Random;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * Defines methods to encrypt and decrypt the provided input texts
 * with a private key and salt.
 */
@Service
public class EncryptionServiceImpl implements EncryptionService {

  @Value("${secretEncryptionKey}")
  private String secretEncryptionKey;
  @Value("${secretEncryptionSalt}")
  private String secretEncryptionSalt;
  private static final int KEY_LENGTH = 256;
  private static final int ITERATION_COUNT = 65536;
  private static final int PRE_SALT_LENGTH = 512;

  /**
   * Adds salt to the input text.
   *
   * @param input The input text.
   * @return Returns the input text in a salted version.
   */
  private String getPreSaltedInput(final String input) {
    final Random random = new SecureRandom();
    StringBuilder stringBuilder = new StringBuilder();

    for (int i = 0; i < PRE_SALT_LENGTH; i++) {
      stringBuilder.append((char) (random.nextInt(91) + 34));
    }

    return String.format("%s %s", input, stringBuilder);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public String encrypt(final String strToEncrypt) {
    try {
      SecureRandom secureRandom = new SecureRandom();
      byte[] iv = new byte[16];
      secureRandom.nextBytes(iv);

      SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
      KeySpec spec = new PBEKeySpec(
              secretEncryptionKey.toCharArray(),
              secretEncryptionSalt.getBytes(),
              ITERATION_COUNT, KEY_LENGTH);
      SecretKey tmp = factory.generateSecret(spec);

      Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
      cipher.init(
              Cipher.ENCRYPT_MODE,
              new SecretKeySpec(tmp.getEncoded(), "AES"),
              new IvParameterSpec(iv)
      );

      byte[] cipherText = cipher.doFinal(
              getPreSaltedInput(strToEncrypt).getBytes(StandardCharsets.UTF_8)
      );
      byte[] encryptedData = new byte[iv.length + cipherText.length];
      System.arraycopy(iv, 0, encryptedData, 0, iv.length);
      System.arraycopy(cipherText, 0, encryptedData, iv.length, cipherText.length);

      return Base64.getEncoder().encodeToString(encryptedData);
    } catch (Exception e) {
      throw new EncryptionFailedException(EncryptionFailedEnums.ENCRYPTION_FAILED);
    }
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public String decrypt(final String strToDecrypt) {
    try {
      byte[] encryptedData = Base64.getDecoder().decode(strToDecrypt);
      byte[] iv = new byte[16];
      System.arraycopy(encryptedData, 0, iv, 0, iv.length);

      SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
      KeySpec spec = new PBEKeySpec(
              secretEncryptionKey.toCharArray(),
              secretEncryptionSalt.getBytes(),
              ITERATION_COUNT, KEY_LENGTH);
      SecretKey tmp = factory.generateSecret(spec);

      Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
      cipher.init(
              Cipher.DECRYPT_MODE,
              new SecretKeySpec(tmp.getEncoded(), "AES"),
              new IvParameterSpec(iv)
      );

      byte[] cipherText = new byte[encryptedData.length - 16];
      System.arraycopy(encryptedData, 16, cipherText, 0, cipherText.length);

      byte[] decryptedText = cipher.doFinal(cipherText);
      return new String(decryptedText, StandardCharsets.UTF_8);
    } catch (Exception e) {
      throw new EncryptionFailedException(EncryptionFailedEnums.DECRYPTION_FAILED);
    }
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public String decryptAndExtractEmail(final String hashedText) {
    return this.decrypt(hashedText).split(" ")[0];
  }
}
