package gov.keis.openapi.client.crypto;

import java.io.UnsupportedEncodingException;

public abstract interface EgovARIACryptoService
{
  public abstract void setBlockSize(int paramInt);
  
  public abstract byte[] encrypt(byte[] paramArrayOfByte, String paramString);
  
  public abstract byte[] decrypt(byte[] paramArrayOfByte, String paramString);
  
  public abstract String encrypt(String paramString1, String paramString2);
  
  public abstract String encryptURL(String paramString1, String paramString2)
    throws UnsupportedEncodingException;
  
  public abstract String decrypt(String paramString1, String paramString2);
}
