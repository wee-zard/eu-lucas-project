package com.lucas.spring.components.compression.service.impl;

import com.lucas.spring.commons.utils.DigitConversionUtil;
import com.lucas.spring.components.compression.model.CompressModel;
import com.lucas.spring.components.compression.model.CompressRequest;
import com.lucas.spring.components.compression.service.ImageCompressionService;
import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Implementation of the {@link ImageCompressionService}.
 */
@Service
@AllArgsConstructor
public class ImageCompressionServiceImpl implements ImageCompressionService {
  private static final String COMPRESSED_FILES_FOLDER = "files/compressed-files";

  /**
   * {@inheritDoc}
   */
  @Override
  public void compress(final CompressRequest request) {
    // Step 1 - Get the binaries of the image.
    final byte[] originalBytes = getBinariesOfRemoteResource(request.getImagePath());

    // Step 2 - Converts the bytes into binaries.
    final String binaries = DigitConversionUtil.byteArrayToBinaryString(originalBytes);

    // Step 2 - Converts the bytes into a more readable format such as list of hexadecimals.
    //final String hexadecimals = DigitConversionUtil.byteArrayToHex(originalBytes);
    /*
    final List<String> modifiedHexadecimals = DigitConversionUtil.hexListToModifiedHexList(
            hexadecimals,
            request.getCompressionRate());
    */

    final List<CompressModel> compressModels = new ArrayList<>();
    final int maximumNumberOfCompressedData = (int) Math.pow(2, request.getDataLength());

    for (int i = 0; i < binaries.length() - 1; i += request.getDataLength()) {
      final char[] prefixCharacter = new char[]{ binaries.charAt(i), binaries.charAt(i + 1) };
      final CompressModel compressModel = getCompressModel(
              prefixCharacter, request, binaries, i, maximumNumberOfCompressedData
      );
      compressModels.add(compressModel);
      i += request.getDataLength() * (compressModel.getCompressedData().size() - 1);
    }

    // Step 4 - Join headers with compressed data
    final String compressedData = String.join("", compressModels.stream()
            .map(model -> String.format("%s%s",
                    model.getHeader(), String.join("", model.getCompressedData())))
            .toList());


    // Step last - Save the compressed image. TODO: The fileName should be dynamic.
    //writeToFileOutput(originalBytes, "pathname.jpg");

    Map<Integer, Integer> numberMap = new HashMap<>();

    compressModels.forEach(model -> {
      final Optional<Integer> opt =
              Optional.ofNullable(numberMap.get(model.getCompressedData().size()));
      numberMap.put(model.getCompressedData().size(), opt.map(number -> number + 1).orElse(1));
    });


    System.out.printf("Loop      : %d %n", request.getLoop());
    System.out.printf("Compressed: %d %n", compressedData.length());
    System.out.printf("Original  : %d %n", binaries.length());
    System.out.printf("Compression rate: %f",
            compressedData.length() * 1.0 / binaries.length() * 100.00);
    System.out.println("---------------------------");
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void decompress(String imagePath) {
    // TODO: ...
  }

  private CompressModel getCompressModel(
          final char[] prefix,
          final CompressRequest request,
          final String binaries,
          final int currentIndexOfBinaries,
          final int maximumNumberOfCompressedData
  ) {
    final List<Integer> indexOfSamePrefixBinaries = getIndexOfSamePrefixBinaries(
            prefix, request, binaries, currentIndexOfBinaries, maximumNumberOfCompressedData
    );

    // Step 1 - Append the prefix, so we could know the length of the compressed data.
    final String compressedNumberOfCharacters =
            getCompressedDataHeader(
                    prefix,
                    indexOfSamePrefixBinaries.size() - 1,
                    maximumNumberOfCompressedData);

    // Step 2 - Get the compressed data
    final List<String> compressedData = indexOfSamePrefixBinaries.stream().map(index -> {
      final StringBuilder builder = new StringBuilder();

      for (int i = index + 2; i < index + 2 + request.getCompressedDataLength(); i++) {
        builder.append(binaries.charAt(i));
      }

      return builder.toString();
    }).toList();

    return CompressModel.builder()
            .header(compressedNumberOfCharacters)
            .compressedData(compressedData)
            .build();
  }

  /**
   * Constructs the header of the compressed data that will tell what is the
   * prefix of the compressed data, and how much compressed data can be read after
   * the header that has the same prefix.
   * Example:
   * Input - prefix: '0', indexOfSamePrefixBinaries: 8, compressedDataLength: 4
   * Output - 0111
   *
   * @param prefix The prefix. Currently, it can only be 0 or 1.
   * @param indexOfSamePrefixBinaries The number of data that has been compressed.
   * @param maximumNumberOfCompressedData the length of the original data in bits.
   * @return Returns the header of the compressed data.
   */
  private String getCompressedDataHeader(
          final char[] prefix,
          final int indexOfSamePrefixBinaries,
          final int maximumNumberOfCompressedData

  ) {
    final char[] numberOfSelectedBinariesInBinary = Integer.toBinaryString(
                    maximumNumberOfCompressedData + indexOfSamePrefixBinaries
    ).toCharArray();

    // Set the first character to be the same as the prefix.
    System.arraycopy(prefix, 0, numberOfSelectedBinariesInBinary, 0, prefix.length);

    return new String(numberOfSelectedBinariesInBinary);
  }

  private List<Integer> getIndexOfSamePrefixBinaries(
          final char[] prefix,
          final CompressRequest request,
          final String binaries,
          final int currentIndexOfBinaries,
          final int maximumNumberOfCompressedData
  ) {
    final List<Integer> indexOfSamePrefixBinaries = new ArrayList<>();
    int k = maximumNumberOfCompressedData / 2;

    for (int j = currentIndexOfBinaries;
            j < binaries.length() && k > 0;
            j += request.getDataLength()) {

      if (binaries.charAt(j) == prefix[0] && binaries.charAt(j + 1) == prefix[1]) {
        indexOfSamePrefixBinaries.add(j);
        k--;
      } else {
        break;
      }
    }

    return indexOfSamePrefixBinaries;
  }

  /**
   * Based on the provided url, fetch the raw content of the file, and convert it to binary array.
   *
   * @param urlToResource The url of the file to fetch.
   * @return Returns the binaries of the file.
   */
  private byte[] getBinariesOfRemoteResource(final String urlToResource) {
    try {
      final URL url = new URL(urlToResource);
      final ByteArrayOutputStream output = new ByteArrayOutputStream();

      try (final InputStream inputStream = url.openStream()) {
        int n;
        byte [] buffer = new byte[1024];

        while (-1 != (n = inputStream.read(buffer))) {
          output.write(buffer, 0, n);
        }
      }

      return output.toByteArray();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  /**
   * Saves the provided byte array in the file system.
   */
  private void writeToFileOutput(final byte[] binaries, final String fileName) {
    final String fileSaveLocation = String.format("%s/%s", COMPRESSED_FILES_FOLDER, fileName);

    try (FileOutputStream fos = new FileOutputStream(fileSaveLocation)) {
      fos.write(binaries);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }
}
