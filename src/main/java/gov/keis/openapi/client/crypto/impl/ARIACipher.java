package gov.keis.openapi.client.crypto.impl;

import gov.keis.openapi.client.crypto.impl.aria.ARIAEngine;
import gov.keis.openapi.client.crypto.impl.aria.AnsiX923Padding;
import gov.keis.openapi.client.crypto.impl.aria.CryptoPadding;
import java.security.InvalidKeyException;

public class ARIACipher
{
  String masterKey = null;
  
  public void setPassword(String paramString)
  {
    paramString = paramString.length() > 32 ? paramString.substring(0, 32) : paramString;
    this.masterKey = paramString;
  }
  
  public byte[] encrypt(byte[] paramArrayOfByte)
  {
    try
    {
      AnsiX923Padding localAnsiX923Padding = new AnsiX923Padding();
      byte[] arrayOfByte = localAnsiX923Padding.addPadding(this.masterKey.getBytes(), 32);
      ARIAEngine localARIAEngine = new ARIAEngine(256);
      return localARIAEngine.encrypt(paramArrayOfByte, arrayOfByte);
    }
    catch (InvalidKeyException localInvalidKeyException)
    {
      throw new RuntimeException(localInvalidKeyException);
    }
  }
  
  public byte[] decrypt(byte[] paramArrayOfByte)
  {
    try
    {
      AnsiX923Padding localAnsiX923Padding = new AnsiX923Padding();
      byte[] arrayOfByte = localAnsiX923Padding.addPadding(this.masterKey.getBytes(), 32);
      ARIAEngine localARIAEngine = new ARIAEngine(256);
      return localARIAEngine.decrypt(paramArrayOfByte, arrayOfByte);
    }
    catch (InvalidKeyException localInvalidKeyException)
    {
      throw new RuntimeException(localInvalidKeyException);
    }
  }
}
