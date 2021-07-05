package com.dung.geul.crypto.impl.aria;

public abstract interface CryptoPadding
{
  public abstract byte[] addPadding(byte[] paramArrayOfByte, int paramInt);
  
  public abstract byte[] removePadding(byte[] paramArrayOfByte, int paramInt);
}
