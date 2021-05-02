#!/usr/bin/python3.8
import random
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad

f = open("words.txt", "r")

words = []
for x in f:
	x = x.strip()
	while len(x) < 16:
		x += "#"
	words.append(x)

ivFile = open("iv.txt", "r")
iv = bytearray.fromhex(ivFile.read())

ciphertextFile = open("encrypted.bin", "rb");
ciphertext = ciphertextFile.read()

results = open("results.txt", "w")

w = "penis###########"
for w in words:
	try:
		cipher = AES.new(w.encode('utf8'), AES.MODE_CBC, iv)
		test = cipher.decrypt(ciphertext)
		pt = unpad(test, AES.block_size)
		results.write(w + " = " + pt.decode('utf8') + "\n")
	except:
		continue

