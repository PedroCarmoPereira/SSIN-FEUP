#!/usr/bin/python3.8
import random
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

f = open("words.txt", "r")

words = []
for x in f:
	words.append(x.strip())

index = random.randint(0, len(words))
key = words[index]

while len(key) < 16:
	key += "#"

plaintextFile = open("plaintext.txt", "rb")
plaintext = plaintextFile.read()

ivFile = open("iv.txt", "r")
iv = bytearray.fromhex(ivFile.read())

cipher = AES.new(key.encode('utf8'), AES.MODE_CBC, iv)
encryptedFile = open("encrypted.bin", "wb")

ciphertext = cipher.encrypt(pad(plaintext, AES.block_size))
encryptedFile.write(ciphertext)

