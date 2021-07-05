package com.dung.geul.crypto.impl.aria;

import java.io.PrintStream;
import java.security.InvalidKeyException;
import java.util.Date;

public class ARIAEngine
{
  private static final char[] HEX_DIGITS = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };
  private static final int[][] KRK = { { 1367130551, 656542356, -32265240, -90542368 }, { 1840335564, -1641953248, -14110251, -279059792 }, { -611174627, 556198256, 52729717, 82364686 } };
  private static final byte[] S1 = new byte['Ā'];
  private static final byte[] S2 = new byte['Ā'];
  private static final byte[] X1 = new byte['Ā'];
  private static final byte[] X2 = new byte['Ā'];
  private static final int[] TS1 = new int['Ā'];
  private static final int[] TS2 = new int['Ā'];
  private static final int[] TX1 = new int['Ā'];
  private static final int[] TX2 = new int['Ā'];
  private static final int blockSize = 16;
  private static com.dung.geul.crypto.impl.aria.CryptoPadding padding = null;
  private int keySize = 0;
  private int numberOfRounds = 0;
  private byte[] masterKey = null;
  private int[] encRoundKeys = null;
  private int[] decRoundKeys = null;
  
  public ARIAEngine(int paramInt)
    throws InvalidKeyException
  {
    setKeySize(paramInt);
  }
  
  void reset()
  {
    this.keySize = 0;
    this.numberOfRounds = 0;
    this.masterKey = null;
    this.encRoundKeys = null;
    this.decRoundKeys = null;
  }
  
  int getKeySize()
  {
    return this.keySize;
  }
  
  void setKeySize(int paramInt)
    throws InvalidKeyException
  {
    reset();
    if ((paramInt != 128) && (paramInt != 192) && (paramInt != 256)) {
      throw new InvalidKeyException("keySize=" + paramInt);
    }
    this.keySize = paramInt;
    switch (paramInt)
    {
    case 128: 
      this.numberOfRounds = 12;
      break;
    case 192: 
      this.numberOfRounds = 14;
      break;
    case 256: 
      this.numberOfRounds = 16;
    }
  }
  
  void setKey(byte[] paramArrayOfByte)
    throws InvalidKeyException
  {
    if (paramArrayOfByte.length * 8 < this.keySize) {
      throw new InvalidKeyException("masterKey size=" + paramArrayOfByte.length);
    }
    this.decRoundKeys = null;
    this.encRoundKeys = null;
    this.masterKey = ((byte[])paramArrayOfByte.clone());
  }
  
  void setupEncRoundKeys()
    throws InvalidKeyException
  {
    if (this.keySize == 0) {
      throw new InvalidKeyException("keySize");
    }
    if (this.masterKey == null) {
      throw new InvalidKeyException("masterKey");
    }
    if (this.encRoundKeys == null) {
      this.encRoundKeys = new int[4 * (this.numberOfRounds + 1)];
    }
    this.decRoundKeys = null;
    doEncKeySetup(this.masterKey, this.encRoundKeys, this.keySize);
  }
  
  void setupDecRoundKeys()
    throws InvalidKeyException
  {
    if (this.keySize == 0) {
      throw new InvalidKeyException("keySize");
    }
    if (this.encRoundKeys == null)
    {
      if (this.masterKey == null) {
        throw new InvalidKeyException("masterKey");
      }
      setupEncRoundKeys();
    }
    this.decRoundKeys = ((int[])this.encRoundKeys.clone());
    doDecKeySetup(this.masterKey, this.decRoundKeys, this.keySize);
  }
  
  void setupRoundKeys()
    throws InvalidKeyException
  {
    setupDecRoundKeys();
  }
  
  private static void doCrypt(byte[] paramArrayOfByte1, int paramInt1, int[] paramArrayOfInt, int paramInt2, byte[] paramArrayOfByte2, int paramInt3)
  {
    int n = 0;
    int i = toInt(paramArrayOfByte1[(0 + paramInt1)], paramArrayOfByte1[(1 + paramInt1)], paramArrayOfByte1[(2 + paramInt1)], paramArrayOfByte1[(3 + paramInt1)]);
    int j = toInt(paramArrayOfByte1[(4 + paramInt1)], paramArrayOfByte1[(5 + paramInt1)], paramArrayOfByte1[(6 + paramInt1)], paramArrayOfByte1[(7 + paramInt1)]);
    int k = toInt(paramArrayOfByte1[(8 + paramInt1)], paramArrayOfByte1[(9 + paramInt1)], paramArrayOfByte1[(10 + paramInt1)], paramArrayOfByte1[(11 + paramInt1)]);
    int m = toInt(paramArrayOfByte1[(12 + paramInt1)], paramArrayOfByte1[(13 + paramInt1)], paramArrayOfByte1[(14 + paramInt1)], paramArrayOfByte1[(15 + paramInt1)]);
    for (int i1 = 1; i1 < paramInt2 / 2; i1++)
    {
      i ^= paramArrayOfInt[(n++)];
      j ^= paramArrayOfInt[(n++)];
      k ^= paramArrayOfInt[(n++)];
      m ^= paramArrayOfInt[(n++)];
      i = TS1[(i >>> 24 & 0xFF)] ^ TS2[(i >>> 16 & 0xFF)] ^ TX1[(i >>> 8 & 0xFF)] ^ TX2[(i & 0xFF)];
      j = TS1[(j >>> 24 & 0xFF)] ^ TS2[(j >>> 16 & 0xFF)] ^ TX1[(j >>> 8 & 0xFF)] ^ TX2[(j & 0xFF)];
      k = TS1[(k >>> 24 & 0xFF)] ^ TS2[(k >>> 16 & 0xFF)] ^ TX1[(k >>> 8 & 0xFF)] ^ TX2[(k & 0xFF)];
      m = TS1[(m >>> 24 & 0xFF)] ^ TS2[(m >>> 16 & 0xFF)] ^ TX1[(m >>> 8 & 0xFF)] ^ TX2[(m & 0xFF)];
      j ^= k;
      k ^= m;
      i ^= j;
      m ^= j;
      k ^= i;
      j ^= k;
      j = badc(j);
      k = cdab(k);
      m = dcba(m);
      j ^= k;
      k ^= m;
      i ^= j;
      m ^= j;
      k ^= i;
      j ^= k;
      i ^= paramArrayOfInt[(n++)];
      j ^= paramArrayOfInt[(n++)];
      k ^= paramArrayOfInt[(n++)];
      m ^= paramArrayOfInt[(n++)];
      i = TX1[(i >>> 24 & 0xFF)] ^ TX2[(i >>> 16 & 0xFF)] ^ TS1[(i >>> 8 & 0xFF)] ^ TS2[(i & 0xFF)];
      j = TX1[(j >>> 24 & 0xFF)] ^ TX2[(j >>> 16 & 0xFF)] ^ TS1[(j >>> 8 & 0xFF)] ^ TS2[(j & 0xFF)];
      k = TX1[(k >>> 24 & 0xFF)] ^ TX2[(k >>> 16 & 0xFF)] ^ TS1[(k >>> 8 & 0xFF)] ^ TS2[(k & 0xFF)];
      m = TX1[(m >>> 24 & 0xFF)] ^ TX2[(m >>> 16 & 0xFF)] ^ TS1[(m >>> 8 & 0xFF)] ^ TS2[(m & 0xFF)];
      j ^= k;
      k ^= m;
      i ^= j;
      m ^= j;
      k ^= i;
      j ^= k;
      m = badc(m);
      i = cdab(i);
      j = dcba(j);
      j ^= k;
      k ^= m;
      i ^= j;
      m ^= j;
      k ^= i;
      j ^= k;
    }
    i ^= paramArrayOfInt[(n++)];
    j ^= paramArrayOfInt[(n++)];
    k ^= paramArrayOfInt[(n++)];
    m ^= paramArrayOfInt[(n++)];
    i = TS1[(i >>> 24 & 0xFF)] ^ TS2[(i >>> 16 & 0xFF)] ^ TX1[(i >>> 8 & 0xFF)] ^ TX2[(i & 0xFF)];
    j = TS1[(j >>> 24 & 0xFF)] ^ TS2[(j >>> 16 & 0xFF)] ^ TX1[(j >>> 8 & 0xFF)] ^ TX2[(j & 0xFF)];
    k = TS1[(k >>> 24 & 0xFF)] ^ TS2[(k >>> 16 & 0xFF)] ^ TX1[(k >>> 8 & 0xFF)] ^ TX2[(k & 0xFF)];
    m = TS1[(m >>> 24 & 0xFF)] ^ TS2[(m >>> 16 & 0xFF)] ^ TX1[(m >>> 8 & 0xFF)] ^ TX2[(m & 0xFF)];
    j ^= k;
    k ^= m;
    i ^= j;
    m ^= j;
    k ^= i;
    j ^= k;
    j = badc(j);
    k = cdab(k);
    m = dcba(m);
    j ^= k;
    k ^= m;
    i ^= j;
    m ^= j;
    k ^= i;
    j ^= k;
    i ^= paramArrayOfInt[(n++)];
    j ^= paramArrayOfInt[(n++)];
    k ^= paramArrayOfInt[(n++)];
    m ^= paramArrayOfInt[(n++)];
    paramArrayOfByte2[(0 + paramInt3)] = ((byte)(X1[(0xFF & i >>> 24)] ^ paramArrayOfInt[n] >>> 24));
    paramArrayOfByte2[(1 + paramInt3)] = ((byte)(X2[(0xFF & i >>> 16)] ^ paramArrayOfInt[n] >>> 16));
    paramArrayOfByte2[(2 + paramInt3)] = ((byte)(S1[(0xFF & i >>> 8)] ^ paramArrayOfInt[n] >>> 8));
    paramArrayOfByte2[(3 + paramInt3)] = ((byte)(S2[(0xFF & i)] ^ paramArrayOfInt[n]));
    paramArrayOfByte2[(4 + paramInt3)] = ((byte)(X1[(0xFF & j >>> 24)] ^ paramArrayOfInt[(n + 1)] >>> 24));
    paramArrayOfByte2[(5 + paramInt3)] = ((byte)(X2[(0xFF & j >>> 16)] ^ paramArrayOfInt[(n + 1)] >>> 16));
    paramArrayOfByte2[(6 + paramInt3)] = ((byte)(S1[(0xFF & j >>> 8)] ^ paramArrayOfInt[(n + 1)] >>> 8));
    paramArrayOfByte2[(7 + paramInt3)] = ((byte)(S2[(0xFF & j)] ^ paramArrayOfInt[(n + 1)]));
    paramArrayOfByte2[(8 + paramInt3)] = ((byte)(X1[(0xFF & k >>> 24)] ^ paramArrayOfInt[(n + 2)] >>> 24));
    paramArrayOfByte2[(9 + paramInt3)] = ((byte)(X2[(0xFF & k >>> 16)] ^ paramArrayOfInt[(n + 2)] >>> 16));
    paramArrayOfByte2[(10 + paramInt3)] = ((byte)(S1[(0xFF & k >>> 8)] ^ paramArrayOfInt[(n + 2)] >>> 8));
    paramArrayOfByte2[(11 + paramInt3)] = ((byte)(S2[(0xFF & k)] ^ paramArrayOfInt[(n + 2)]));
    paramArrayOfByte2[(12 + paramInt3)] = ((byte)(X1[(0xFF & m >>> 24)] ^ paramArrayOfInt[(n + 3)] >>> 24));
    paramArrayOfByte2[(13 + paramInt3)] = ((byte)(X2[(0xFF & m >>> 16)] ^ paramArrayOfInt[(n + 3)] >>> 16));
    paramArrayOfByte2[(14 + paramInt3)] = ((byte)(S1[(0xFF & m >>> 8)] ^ paramArrayOfInt[(n + 3)] >>> 8));
    paramArrayOfByte2[(15 + paramInt3)] = ((byte)(S2[(0xFF & m)] ^ paramArrayOfInt[(n + 3)]));
  }
  
  void encrypt(byte[] paramArrayOfByte1, int paramInt1, byte[] paramArrayOfByte2, int paramInt2)
    throws InvalidKeyException
  {
    if (this.keySize == 0) {
      throw new InvalidKeyException("keySize");
    }
    if (this.encRoundKeys == null)
    {
      if (this.masterKey == null) {
        throw new InvalidKeyException("masterKey");
      }
      setupEncRoundKeys();
    }
    doCrypt(paramArrayOfByte1, paramInt1, this.encRoundKeys, this.numberOfRounds, paramArrayOfByte2, paramInt2);
  }
  
  byte[] encrypt(byte[] paramArrayOfByte, int paramInt)
    throws InvalidKeyException
  {
    byte[] arrayOfByte1 = padding.addPadding(paramArrayOfByte, 16);
    byte[] arrayOfByte2 = new byte[arrayOfByte1.length];
    int i = arrayOfByte1.length / 16;
    for (int j = 0; j < i; j++)
    {
      byte[] arrayOfByte3 = new byte[16];
      byte[] arrayOfByte4 = new byte[16];
      System.arraycopy(arrayOfByte1, j * 16, arrayOfByte3, 0, 16);
      encrypt(arrayOfByte3, paramInt, arrayOfByte4, 0);
      System.arraycopy(arrayOfByte4, 0, arrayOfByte2, j * 16, arrayOfByte4.length);
    }
    return arrayOfByte2;
  }
  
  void decrypt(byte[] paramArrayOfByte1, int paramInt1, byte[] paramArrayOfByte2, int paramInt2)
    throws InvalidKeyException
  {
    if (this.keySize == 0) {
      throw new InvalidKeyException("keySize");
    }
    if (this.decRoundKeys == null)
    {
      if (this.masterKey == null) {
        throw new InvalidKeyException("masterKey");
      }
      setupDecRoundKeys();
    }
    doCrypt(paramArrayOfByte1, paramInt1, this.decRoundKeys, this.numberOfRounds, paramArrayOfByte2, paramInt2);
  }
  
  byte[] decrypt(byte[] paramArrayOfByte, int paramInt)
    throws InvalidKeyException
  {
    byte[] arrayOfByte1 = new byte[paramArrayOfByte.length];
    int i = paramArrayOfByte.length / 16;
    for (int j = 0; j < i; j++)
    {
      byte[] arrayOfByte2 = new byte[16];
      byte[] arrayOfByte3 = new byte[16];
      System.arraycopy(paramArrayOfByte, j * 16, arrayOfByte2, 0, 16);
      decrypt(arrayOfByte2, paramInt, arrayOfByte3, 0);
      System.arraycopy(arrayOfByte3, 0, arrayOfByte1, j * 16, 16);
    }
    return padding.removePadding(arrayOfByte1, 16);
  }
  
  private static void doEncKeySetup(byte[] paramArrayOfByte, int[] paramArrayOfInt, int paramInt)
  {
    int i1 = 0;
    int[] arrayOfInt1 = new int[4];
    int[] arrayOfInt2 = new int[4];
    int[] arrayOfInt3 = new int[4];
    int[] arrayOfInt4 = new int[4];
    arrayOfInt1[0] = toInt(paramArrayOfByte[0], paramArrayOfByte[1], paramArrayOfByte[2], paramArrayOfByte[3]);
    arrayOfInt1[1] = toInt(paramArrayOfByte[4], paramArrayOfByte[5], paramArrayOfByte[6], paramArrayOfByte[7]);
    arrayOfInt1[2] = toInt(paramArrayOfByte[8], paramArrayOfByte[9], paramArrayOfByte[10], paramArrayOfByte[11]);
    arrayOfInt1[3] = toInt(paramArrayOfByte[12], paramArrayOfByte[13], paramArrayOfByte[14], paramArrayOfByte[15]);
    int n = (paramInt - 128) / 64;
    int i = arrayOfInt1[0] ^ KRK[n][0];
    int j = arrayOfInt1[1] ^ KRK[n][1];
    int k = arrayOfInt1[2] ^ KRK[n][2];
    int m = arrayOfInt1[3] ^ KRK[n][3];
    i = TS1[(i >>> 24 & 0xFF)] ^ TS2[(i >>> 16 & 0xFF)] ^ TX1[(i >>> 8 & 0xFF)] ^ TX2[(i & 0xFF)];
    j = TS1[(j >>> 24 & 0xFF)] ^ TS2[(j >>> 16 & 0xFF)] ^ TX1[(j >>> 8 & 0xFF)] ^ TX2[(j & 0xFF)];
    k = TS1[(k >>> 24 & 0xFF)] ^ TS2[(k >>> 16 & 0xFF)] ^ TX1[(k >>> 8 & 0xFF)] ^ TX2[(k & 0xFF)];
    m = TS1[(m >>> 24 & 0xFF)] ^ TS2[(m >>> 16 & 0xFF)] ^ TX1[(m >>> 8 & 0xFF)] ^ TX2[(m & 0xFF)];
    j ^= k;
    k ^= m;
    i ^= j;
    m ^= j;
    k ^= i;
    j ^= k;
    j = badc(j);
    k = cdab(k);
    m = dcba(m);
    j ^= k;
    k ^= m;
    i ^= j;
    m ^= j;
    k ^= i;
    j ^= k;
    if (paramInt > 128)
    {
      arrayOfInt2[0] = toInt(paramArrayOfByte[16], paramArrayOfByte[17], paramArrayOfByte[18], paramArrayOfByte[19]);
      arrayOfInt2[1] = toInt(paramArrayOfByte[20], paramArrayOfByte[21], paramArrayOfByte[22], paramArrayOfByte[23]);
      if (paramInt > 192)
      {
        arrayOfInt2[2] = toInt(paramArrayOfByte[24], paramArrayOfByte[25], paramArrayOfByte[26], paramArrayOfByte[27]);
        arrayOfInt2[3] = toInt(paramArrayOfByte[28], paramArrayOfByte[29], paramArrayOfByte[30], paramArrayOfByte[31]);
      }
      else
      {
        arrayOfInt2[2] = (arrayOfInt2[3] = 0);
      }
    }
    else
    {
      arrayOfInt2[0] = (arrayOfInt2[1] = arrayOfInt2[2] = arrayOfInt2[3] = 0);
    }
    arrayOfInt2[0] ^= i;
    arrayOfInt2[1] ^= j;
    arrayOfInt2[2] ^= k;
    arrayOfInt2[3] ^= m;
    i = arrayOfInt2[0];
    j = arrayOfInt2[1];
    k = arrayOfInt2[2];
    m = arrayOfInt2[3];
    n = n == 2 ? 0 : n + 1;
    i ^= KRK[n][0];
    j ^= KRK[n][1];
    k ^= KRK[n][2];
    m ^= KRK[n][3];
    i = TX1[(i >>> 24 & 0xFF)] ^ TX2[(i >>> 16 & 0xFF)] ^ TS1[(i >>> 8 & 0xFF)] ^ TS2[(i & 0xFF)];
    j = TX1[(j >>> 24 & 0xFF)] ^ TX2[(j >>> 16 & 0xFF)] ^ TS1[(j >>> 8 & 0xFF)] ^ TS2[(j & 0xFF)];
    k = TX1[(k >>> 24 & 0xFF)] ^ TX2[(k >>> 16 & 0xFF)] ^ TS1[(k >>> 8 & 0xFF)] ^ TS2[(k & 0xFF)];
    m = TX1[(m >>> 24 & 0xFF)] ^ TX2[(m >>> 16 & 0xFF)] ^ TS1[(m >>> 8 & 0xFF)] ^ TS2[(m & 0xFF)];
    j ^= k;
    k ^= m;
    i ^= j;
    m ^= j;
    k ^= i;
    j ^= k;
    m = badc(m);
    i = cdab(i);
    j = dcba(j);
    j ^= k;
    k ^= m;
    i ^= j;
    m ^= j;
    k ^= i;
    j ^= k;
    i ^= arrayOfInt1[0];
    j ^= arrayOfInt1[1];
    k ^= arrayOfInt1[2];
    m ^= arrayOfInt1[3];
    arrayOfInt3[0] = i;
    arrayOfInt3[1] = j;
    arrayOfInt3[2] = k;
    arrayOfInt3[3] = m;
    n = n == 2 ? 0 : n + 1;
    i ^= KRK[n][0];
    j ^= KRK[n][1];
    k ^= KRK[n][2];
    m ^= KRK[n][3];
    i = TS1[(i >>> 24 & 0xFF)] ^ TS2[(i >>> 16 & 0xFF)] ^ TX1[(i >>> 8 & 0xFF)] ^ TX2[(i & 0xFF)];
    j = TS1[(j >>> 24 & 0xFF)] ^ TS2[(j >>> 16 & 0xFF)] ^ TX1[(j >>> 8 & 0xFF)] ^ TX2[(j & 0xFF)];
    k = TS1[(k >>> 24 & 0xFF)] ^ TS2[(k >>> 16 & 0xFF)] ^ TX1[(k >>> 8 & 0xFF)] ^ TX2[(k & 0xFF)];
    m = TS1[(m >>> 24 & 0xFF)] ^ TS2[(m >>> 16 & 0xFF)] ^ TX1[(m >>> 8 & 0xFF)] ^ TX2[(m & 0xFF)];
    j ^= k;
    k ^= m;
    i ^= j;
    m ^= j;
    k ^= i;
    j ^= k;
    j = badc(j);
    k = cdab(k);
    m = dcba(m);
    j ^= k;
    k ^= m;
    i ^= j;
    m ^= j;
    k ^= i;
    j ^= k;
    arrayOfInt4[0] = (i ^ arrayOfInt2[0]);
    arrayOfInt4[1] = (j ^ arrayOfInt2[1]);
    arrayOfInt4[2] = (k ^ arrayOfInt2[2]);
    arrayOfInt4[3] = (m ^ arrayOfInt2[3]);
    gsrk(arrayOfInt1, arrayOfInt2, 19, paramArrayOfInt, i1);
    i1 += 4;
    gsrk(arrayOfInt2, arrayOfInt3, 19, paramArrayOfInt, i1);
    i1 += 4;
    gsrk(arrayOfInt3, arrayOfInt4, 19, paramArrayOfInt, i1);
    i1 += 4;
    gsrk(arrayOfInt4, arrayOfInt1, 19, paramArrayOfInt, i1);
    i1 += 4;
    gsrk(arrayOfInt1, arrayOfInt2, 31, paramArrayOfInt, i1);
    i1 += 4;
    gsrk(arrayOfInt2, arrayOfInt3, 31, paramArrayOfInt, i1);
    i1 += 4;
    gsrk(arrayOfInt3, arrayOfInt4, 31, paramArrayOfInt, i1);
    i1 += 4;
    gsrk(arrayOfInt4, arrayOfInt1, 31, paramArrayOfInt, i1);
    i1 += 4;
    gsrk(arrayOfInt1, arrayOfInt2, 67, paramArrayOfInt, i1);
    i1 += 4;
    gsrk(arrayOfInt2, arrayOfInt3, 67, paramArrayOfInt, i1);
    i1 += 4;
    gsrk(arrayOfInt3, arrayOfInt4, 67, paramArrayOfInt, i1);
    i1 += 4;
    gsrk(arrayOfInt4, arrayOfInt1, 67, paramArrayOfInt, i1);
    i1 += 4;
    gsrk(arrayOfInt1, arrayOfInt2, 97, paramArrayOfInt, i1);
    i1 += 4;
    if (paramInt > 128)
    {
      gsrk(arrayOfInt2, arrayOfInt3, 97, paramArrayOfInt, i1);
      i1 += 4;
      gsrk(arrayOfInt3, arrayOfInt4, 97, paramArrayOfInt, i1);
      i1 += 4;
    }
    if (paramInt > 192)
    {
      gsrk(arrayOfInt4, arrayOfInt1, 97, paramArrayOfInt, i1);
      i1 += 4;
      gsrk(arrayOfInt1, arrayOfInt2, 109, paramArrayOfInt, i1);
    }
  }
  
  private static void doDecKeySetup(byte[] paramArrayOfByte, int[] paramArrayOfInt, int paramInt)
  {
    int i = 0;
    int[] arrayOfInt = new int[4];
    int j = 32 + paramInt / 8;
    swapBlocks(paramArrayOfInt, 0, j);
    i += 4;
    j -= 4;
    while (i < j)
    {
      swapAndDiffuse(paramArrayOfInt, i, j, arrayOfInt);
      i += 4;
      j -= 4;
    }
    diff(paramArrayOfInt, i, arrayOfInt, 0);
    paramArrayOfInt[i] = arrayOfInt[0];
    paramArrayOfInt[(i + 1)] = arrayOfInt[1];
    paramArrayOfInt[(i + 2)] = arrayOfInt[2];
    paramArrayOfInt[(i + 3)] = arrayOfInt[3];
  }
  
  private static int toInt(byte paramByte1, byte paramByte2, byte paramByte3, byte paramByte4)
  {
    return (paramByte1 & 0xFF) << 24 ^ (paramByte2 & 0xFF) << 16 ^ (paramByte3 & 0xFF) << 8 ^ paramByte4 & 0xFF;
  }
  
  private static void toByteArray(int paramInt1, byte[] paramArrayOfByte, int paramInt2)
  {
    paramArrayOfByte[paramInt2] = ((byte)(paramInt1 >>> 24));
    paramArrayOfByte[(paramInt2 + 1)] = ((byte)(paramInt1 >>> 16));
    paramArrayOfByte[(paramInt2 + 2)] = ((byte)(paramInt1 >>> 8));
    paramArrayOfByte[(paramInt2 + 3)] = ((byte)paramInt1);
  }
  
  private static int m(int paramInt)
  {
    return 65793 * (paramInt >>> 24 & 0xFF) ^ 16777473 * (paramInt >>> 16 & 0xFF) ^ 16842753 * (paramInt >>> 8 & 0xFF) ^ 16843008 * (paramInt & 0xFF);
  }
  
  private static final int badc(int paramInt)
  {
    return paramInt << 8 & 0xFF00FF00 ^ paramInt >>> 8 & 0xFF00FF;
  }
  
  private static final int cdab(int paramInt)
  {
    return paramInt << 16 & 0xFFFF0000 ^ paramInt >>> 16 & 0xFFFF;
  }
  
  private static final int dcba(int paramInt)
  {
    return (paramInt & 0xFF) << 24 ^ (paramInt & 0xFF00) << 8 ^ (paramInt & 0xFF0000) >>> 8 ^ (paramInt & 0xFF000000) >>> 24;
  }
  
  private static final void gsrk(int[] paramArrayOfInt1, int[] paramArrayOfInt2, int paramInt1, int[] paramArrayOfInt3, int paramInt2)
  {
    int i = 4 - paramInt1 / 32;
    int j = paramInt1 % 32;
    int k = 32 - j;
    paramArrayOfInt3[paramInt2] = (paramArrayOfInt1[0] ^ paramArrayOfInt2[(i % 4)] >>> j ^ paramArrayOfInt2[((i + 3) % 4)] << k);
    paramArrayOfInt3[(paramInt2 + 1)] = (paramArrayOfInt1[1] ^ paramArrayOfInt2[((i + 1) % 4)] >>> j ^ paramArrayOfInt2[(i % 4)] << k);
    paramArrayOfInt3[(paramInt2 + 2)] = (paramArrayOfInt1[2] ^ paramArrayOfInt2[((i + 2) % 4)] >>> j ^ paramArrayOfInt2[((i + 1) % 4)] << k);
    paramArrayOfInt3[(paramInt2 + 3)] = (paramArrayOfInt1[3] ^ paramArrayOfInt2[((i + 3) % 4)] >>> j ^ paramArrayOfInt2[((i + 2) % 4)] << k);
  }
  
  private static final void diff(int[] paramArrayOfInt1, int paramInt1, int[] paramArrayOfInt2, int paramInt2)
  {
    int i = m(paramArrayOfInt1[paramInt1]);
    int j = m(paramArrayOfInt1[(paramInt1 + 1)]);
    int k = m(paramArrayOfInt1[(paramInt1 + 2)]);
    int m = m(paramArrayOfInt1[(paramInt1 + 3)]);
    j ^= k;
    k ^= m;
    i ^= j;
    m ^= j;
    k ^= i;
    j ^= k;
    j = badc(j);
    k = cdab(k);
    m = dcba(m);
    j ^= k;
    k ^= m;
    i ^= j;
    m ^= j;
    k ^= i;
    j ^= k;
    paramArrayOfInt2[paramInt2] = i;
    paramArrayOfInt2[(paramInt2 + 1)] = j;
    paramArrayOfInt2[(paramInt2 + 2)] = k;
    paramArrayOfInt2[(paramInt2 + 3)] = m;
  }
  
  private static final void swapBlocks(int[] paramArrayOfInt, int paramInt1, int paramInt2)
  {
    for (int j = 0; j < 4; j++)
    {
      int i = paramArrayOfInt[(paramInt1 + j)];
      paramArrayOfInt[(paramInt1 + j)] = paramArrayOfInt[(paramInt2 + j)];
      paramArrayOfInt[(paramInt2 + j)] = i;
    }
  }
  
  private static final void swapAndDiffuse(int[] paramArrayOfInt1, int paramInt1, int paramInt2, int[] paramArrayOfInt2)
  {
    diff(paramArrayOfInt1, paramInt1, paramArrayOfInt2, 0);
    diff(paramArrayOfInt1, paramInt2, paramArrayOfInt1, paramInt1);
    paramArrayOfInt1[paramInt2] = paramArrayOfInt2[0];
    paramArrayOfInt1[(paramInt2 + 1)] = paramArrayOfInt2[1];
    paramArrayOfInt1[(paramInt2 + 2)] = paramArrayOfInt2[2];
    paramArrayOfInt1[(paramInt2 + 3)] = paramArrayOfInt2[3];
  }
  
  private static void printBlock(PrintStream paramPrintStream, byte[] paramArrayOfByte)
  {
    for (int i = 0; i < 4; i++) {
      byteToHex(paramPrintStream, paramArrayOfByte[i]);
    }
    paramPrintStream.print(" ");
    for (int i = 4; i < 8; i++) {
      byteToHex(paramPrintStream, paramArrayOfByte[i]);
    }
    paramPrintStream.print(" ");
    for (int i = 8; i < 12; i++) {
      byteToHex(paramPrintStream, paramArrayOfByte[i]);
    }
    paramPrintStream.print(" ");
    for (int i = 12; i < 16; i++) {
      byteToHex(paramPrintStream, paramArrayOfByte[i]);
    }
  }
  
  private static void printSBox(PrintStream paramPrintStream, byte[] paramArrayOfByte)
  {
    for (int i = 0; i < 16; i++)
    {
      for (int j = 0; j < 16; j++)
      {
        byteToHex(paramPrintStream, paramArrayOfByte[(16 * i + j)]);
        paramPrintStream.print(" ");
      }
      paramPrintStream.println();
    }
  }
  
  private static void byteToHex(PrintStream paramPrintStream, byte paramByte)
  {
    char[] arrayOfChar = { HEX_DIGITS[(paramByte >>> 4 & 0xF)], HEX_DIGITS[(paramByte & 0xF)] };
    paramPrintStream.print(new String(arrayOfChar));
  }
  
  private static void intToHex(PrintStream paramPrintStream, int paramInt)
  {
    byte[] arrayOfByte = new byte[4];
    toByteArray(paramInt, arrayOfByte, 0);
    byteToHex(paramPrintStream, arrayOfByte[0]);
    byteToHex(paramPrintStream, arrayOfByte[1]);
    byteToHex(paramPrintStream, arrayOfByte[2]);
    byteToHex(paramPrintStream, arrayOfByte[3]);
  }
  
  private static void printRoundKeys(PrintStream paramPrintStream, int[] paramArrayOfInt)
  {
    int i = 0;
    while (i < paramArrayOfInt.length)
    {
      paramPrintStream.print("* ");
      intToHex(paramPrintStream, paramArrayOfInt[(i++)]);
      paramPrintStream.print(" ");
      intToHex(paramPrintStream, paramArrayOfInt[(i++)]);
      paramPrintStream.print(" ");
      intToHex(paramPrintStream, paramArrayOfInt[(i++)]);
      paramPrintStream.print(" ");
      intToHex(paramPrintStream, paramArrayOfInt[(i++)]);
      paramPrintStream.print(" \n");
    }
  }
  
  public static void ARIA_test()
    throws InvalidKeyException
  {
    byte[] arrayOfByte1 = new byte[16];
    byte[] arrayOfByte2 = new byte[16];
    byte[] arrayOfByte3 = new byte[32];
    int i = 0;
    PrintStream localPrintStream = System.out;
    ARIAEngine localARIAEngine = new ARIAEngine(256);
    for (int j = 0; j < 32; j++) {
      arrayOfByte3[j] = 0;
    }
    for (int j = 0; j < 16; j++) {
      arrayOfByte1[j] = 0;
    }
    localPrintStream.println("BEGIN testing the roundtrip...");
    localPrintStream.println("For key size of 256 bits, starting with the zero plaintext and the zero key, let's see if we may recover the plaintext by decrypting the encrypted ciphertext.");
    localARIAEngine.setKey(arrayOfByte3);
    localARIAEngine.setupRoundKeys();
    localPrintStream.print("plaintext : ");
    printBlock(localPrintStream, arrayOfByte1);
    localPrintStream.println();
    localARIAEngine.encrypt(arrayOfByte1, 0, arrayOfByte2, 0);
    localPrintStream.print("ciphertext: ");
    printBlock(localPrintStream, arrayOfByte2);
    localPrintStream.println();
    localARIAEngine.decrypt(arrayOfByte2, 0, arrayOfByte1, 0);
    localPrintStream.print("decrypted : ");
    printBlock(localPrintStream, arrayOfByte1);
    localPrintStream.println();
    i = 0;
    for (int j = 0; j < 16; j++) {
      if (arrayOfByte1[j] != 0) {
        i = 1;
      }
    }
    if (i != 0) {
      localPrintStream.println("The result is incorrect!");
    } else {
      localPrintStream.println("Okay.  The result is correct.");
    }
    localPrintStream.println("END   testing the roundtrip.\n");
    int j = 8388608;
    localPrintStream.println("BEGIN speed measurement...");
    for (int k = 0; k < 16; k++) {
      arrayOfByte3[k] = ((byte)k);
    }
    localPrintStream.println("  First, EncKeySetup():");
    localPrintStream.print("  masterkey: ");
    printBlock(localPrintStream, arrayOfByte3);
    localPrintStream.println();
    localARIAEngine.reset();
    localARIAEngine.setKeySize(128);
    localARIAEngine.setKey(arrayOfByte3);
    for (int k = 0; k < 1000; k++) {
      localARIAEngine.setupEncRoundKeys();
    }
    Date localDate1 = new Date();
    for (int m = 0; m < j; m++) {
      localARIAEngine.setupEncRoundKeys();
    }
    Date localDate2 = new Date();
    float f = (float)(localDate2.getTime() - localDate1.getTime()) / 1000.0F;
    localPrintStream.print("  time lapsed: ");
    localPrintStream.print(f);
    localPrintStream.println(" sec.");
    localPrintStream.print("  speed      : ");
    localPrintStream.print(j * 128 / (f * 1024.0F * 1024.0F));
    localPrintStream.println(" megabits/sec.\n");
    localPrintStream.println("  Next, Crypt():");
    for (int n = 0; n < 16; n++) {
      arrayOfByte1[n] = ((byte)(n << 4 ^ n));
    }
    localPrintStream.print("  plaintext : ");
    printBlock(localPrintStream, arrayOfByte1);
    localPrintStream.println();
    for (int n = 0; n < 1000; n++) {
      localARIAEngine.encrypt(arrayOfByte1, 0, arrayOfByte2, 0);
    }
    localDate1 = new Date();
    for (int n = 0; n < j; n++) {
      localARIAEngine.encrypt(arrayOfByte1, 0, arrayOfByte2, 0);
    }
    localDate2 = new Date();
    localPrintStream.print("  ciphertext: ");
    printBlock(localPrintStream, arrayOfByte2);
    localPrintStream.println();
    f = (float)(localDate2.getTime() - localDate1.getTime()) / 1000.0F;
    localPrintStream.print("  time lapsed: ");
    localPrintStream.print(f);
    localPrintStream.println(" sec.");
    localPrintStream.print("  speed      : ");
    localPrintStream.print(j * 128 / (f * 1024.0F * 1024.0F));
    localPrintStream.println(" megabits/sec.\n");
    localPrintStream.println("  Finally, DecKeySetup():");
    for (int n = 0; n < 1000; n++) {
      localARIAEngine.setupDecRoundKeys();
    }
    localDate1 = new Date();
    for (int n = 0; n < j; n++) {
      localARIAEngine.setupDecRoundKeys();
    }
    localDate2 = new Date();
    f = (float)(localDate2.getTime() - localDate1.getTime()) / 1000.0F;
    localPrintStream.print("  time lapsed: ");
    localPrintStream.print(f);
    localPrintStream.println(" sec.");
    localPrintStream.print("  speed      : ");
    localPrintStream.print(j * 128 / (f * 1024.0F * 1024.0F));
    localPrintStream.println(" megabits/sec.");
    localPrintStream.println("END   speed measurement.");
  }
  
  public byte[] decrypt(byte[] paramArrayOfByte1, byte[] paramArrayOfByte2)
    throws InvalidKeyException
  {
    setKey(paramArrayOfByte2);
    setupRoundKeys();
    return decrypt(paramArrayOfByte1, 0);
  }
  
  public byte[] encrypt(byte[] paramArrayOfByte1, byte[] paramArrayOfByte2)
    throws InvalidKeyException
  {
    setKey(paramArrayOfByte2);
    setupRoundKeys();
    return encrypt(paramArrayOfByte1, 0);
  }
  
  public static void main(String[] paramArrayOfString)
  {
  }
  
  static
  {
    padding = new AnsiX923Padding();
    int[] arrayOfInt1 = new int['Ā'];
    int[] arrayOfInt2 = new int['Ā'];
    arrayOfInt1[0] = 1;
    for (int i = 1; i < 256; i++)
    {
      int j = arrayOfInt1[(i - 1)] << 1 ^ arrayOfInt1[(i - 1)];
      if ((j & 0x100) != 0) {
        j ^= 0x11B;
      }
      arrayOfInt1[i] = j;
    }
    for (int i = 1; i < 255; i++) {
      arrayOfInt2[arrayOfInt1[i]] = i;
    }
    int[][] arrayOfInt3 = { { 1, 0, 0, 0, 1, 1, 1, 1 }, { 1, 1, 0, 0, 0, 1, 1, 1 }, { 1, 1, 1, 0, 0, 0, 1, 1 }, { 1, 1, 1, 1, 0, 0, 0, 1 }, { 1, 1, 1, 1, 1, 0, 0, 0 }, { 0, 1, 1, 1, 1, 1, 0, 0 }, { 0, 0, 1, 1, 1, 1, 1, 0 }, { 0, 0, 0, 1, 1, 1, 1, 1 } };
    int[][] arrayOfInt4 = { { 0, 1, 0, 1, 1, 1, 1, 0 }, { 0, 0, 1, 1, 1, 1, 0, 1 }, { 1, 1, 0, 1, 0, 1, 1, 1 }, { 1, 0, 0, 1, 1, 1, 0, 1 }, { 0, 0, 1, 0, 1, 1, 0, 0 }, { 1, 0, 0, 0, 0, 0, 0, 1 }, { 0, 1, 0, 1, 1, 1, 0, 1 }, { 1, 1, 0, 1, 0, 0, 1, 1 } };
    int m;
    int n;
    int i1;
    int i2;
    int i3;
    for (int k = 0; k < 256; k++)
    {
      m = 0;
      if (k == 0) {
        n = 0;
      } else {
        n = arrayOfInt1[(255 - arrayOfInt2[k])];
      }
      for (i1 = 0; i1 < 8; i1++)
      {
        i2 = 0;
        for (i3 = 0; i3 < 8; i3++) {
          if ((n >>> 7 - i3 & 0x1) != 0) {
            i2 ^= arrayOfInt3[i3][i1];
          }
        }
        m = m << 1 ^ i2;
      }
      m ^= 0x63;
      S1[k] = ((byte)m);
      X1[m] = ((byte)k);
    }
    for (int k = 0; k < 256; k++)
    {
      m = 0;
      if (k == 0) {
        n = 0;
      } else {
        n = arrayOfInt1[(247 * arrayOfInt2[k] % 255)];
      }
      for (i1 = 0; i1 < 8; i1++)
      {
        i2 = 0;
        for (i3 = 0; i3 < 8; i3++) {
          if ((n >>> i3 & 0x1) != 0) {
            i2 ^= arrayOfInt4[(7 - i1)][i3];
          }
        }
        m = m << 1 ^ i2;
      }
      m ^= 0xE2;
      S2[k] = ((byte)m);
      X2[m] = ((byte)k);
    }
    for (int k = 0; k < 256; k++)
    {
      TS1[k] = (65793 * (S1[k] & 0xFF));
      TS2[k] = (16777473 * (S2[k] & 0xFF));
      TX1[k] = (16842753 * (X1[k] & 0xFF));
      TX2[k] = (16843008 * (X2[k] & 0xFF));
    }
  }
}
