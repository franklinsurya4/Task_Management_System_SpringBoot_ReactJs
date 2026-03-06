package com.TaskManagementTool.util;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Base64;

@Component
public class EncryptionUtil {

    @Value("${app.encryption.key}")
    private String key;

    private SecretKeySpec secretKey;

    @PostConstruct
    public void init() {
        byte[] keyBytes = key.getBytes(StandardCharsets.UTF_8);

        if (!(keyBytes.length == 16 || keyBytes.length == 24 || keyBytes.length == 32)) {
            throw new IllegalArgumentException(
                    "Encryption key must be 16, 24, or 32 bytes long");
        }

        secretKey = new SecretKeySpec(keyBytes, "AES");
    }

    public String encrypt(String str) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        return Base64.getEncoder()
                .encodeToString(cipher.doFinal(str.getBytes(StandardCharsets.UTF_8)));
    }

    public String decrypt(String str) throws Exception {
        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        return new String(
                cipher.doFinal(Base64.getDecoder().decode(str)),
                StandardCharsets.UTF_8);
    }
}