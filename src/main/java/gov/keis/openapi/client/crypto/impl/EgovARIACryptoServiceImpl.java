package gov.keis.openapi.client.crypto.impl;

import gov.keis.openapi.client.crypto.EgovARIACryptoService;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import org.apache.commons.codec.binary.Base64;

public class EgovARIACryptoServiceImpl
  implements EgovARIACryptoService
{
  private final Base64 base64 = new Base64();
  private int blockSize = 1024;
  
  public void setBlockSize(int paramInt)
  {
    if (paramInt % 16 != 0) {
      paramInt += 16 - paramInt % 16;
    }
    this.blockSize = paramInt;
  }
  
  public String encryptURL(String paramString1, String paramString2)
    throws UnsupportedEncodingException
  {
    return URLEncoder.encode(encrypt(paramString1, paramString2), "UTF-8");
  }
  
  public String encrypt(String paramString1, String paramString2)
  {
    return new String(this.base64.encode(encrypt(paramString1.getBytes(), paramString2)));
  }
  
  public byte[] encrypt(byte[] paramArrayOfByte, String paramString)
  {
    ARIACipher localARIACipher = new ARIACipher();
    localARIACipher.setPassword(paramString);
    return localARIACipher.encrypt(paramArrayOfByte);
  }
  
  public String decrypt(String paramString1, String paramString2)
  {
    return new String(decrypt(this.base64.decode(paramString1.getBytes()), paramString2));
  }
  
  public byte[] decrypt(byte[] paramArrayOfByte, String paramString)
  {
    ARIACipher localARIACipher = new ARIACipher();
    localARIACipher.setPassword(paramString);
    return localARIACipher.decrypt(paramArrayOfByte);
  }
}
