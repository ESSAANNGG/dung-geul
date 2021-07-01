package gov.keis.openapi.client.crypto.impl.aria;

import java.io.PrintStream;

public class AnsiX923Padding
  implements CryptoPadding
{
  private String name = "ANSI-X.923-Padding";
  private final byte PADDING_VALUE = 0;
  
  public byte[] addPadding(byte[] paramArrayOfByte, int paramInt)
  {
    int i = paramArrayOfByte.length % paramInt;
    byte[] arrayOfByte = null;
    if (i != 0)
    {
      arrayOfByte = new byte[paramArrayOfByte.length + (paramInt - i)];
      System.arraycopy(paramArrayOfByte, 0, arrayOfByte, 0, paramArrayOfByte.length);
      int j = paramInt - i;
      for (int k = 0; k < j; k++) {
        arrayOfByte[(paramArrayOfByte.length + k)] = 0;
      }
      arrayOfByte[(arrayOfByte.length - 1)] = ((byte)j);
    }
    else
    {
      arrayOfByte = paramArrayOfByte;
    }
    return arrayOfByte;
  }
  
  public byte[] removePadding(byte[] paramArrayOfByte, int paramInt)
  {
    byte[] arrayOfByte = null;
    int i = 0;
    int j = paramArrayOfByte[(paramArrayOfByte.length - 1)];
    int k;
    if (j < paramInt)
    {
      k = j - 1;
      for (int m = 2; m < k + 2; m++) {
        if (paramArrayOfByte[(paramArrayOfByte.length - m)] != 0)
        {
          i = 0;
          break;
        }
      }
      i = 1;
    }
    else
    {
      i = 0;
    }
    if ((i != 0) && (j < 1)) {
      i = 0;
    }
    if (i != 0) {
      for (k = paramArrayOfByte.length - j; k < paramArrayOfByte.length - 1; k++) {
        if (paramArrayOfByte[k] != 0)
        {
          i = 0;
          break;
        }
      }
    }
    if (i != 0)
    {
      arrayOfByte = new byte[paramArrayOfByte.length - j];
      try
      {
        System.arraycopy(paramArrayOfByte, 0, arrayOfByte, 0, arrayOfByte.length);
      }
      catch (ArrayIndexOutOfBoundsException localArrayIndexOutOfBoundsException)
      {
        System.out.println("removePadding Exception.....");
        return paramArrayOfByte;
      }
    }
    else
    {
      arrayOfByte = paramArrayOfByte;
    }
    return arrayOfByte;
  }
  
  public String getName()
  {
    return this.name;
  }
  
  public void print(byte[] paramArrayOfByte)
  {
    StringBuffer localStringBuffer = new StringBuffer();
    localStringBuffer.append("[").append(paramArrayOfByte.length).append("] ");
    for (int i = 0; i < paramArrayOfByte.length; i++) {
      localStringBuffer.append(paramArrayOfByte[i]).append(" ");
    }
  }
}
