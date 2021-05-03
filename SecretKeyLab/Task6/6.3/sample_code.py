#!/usr/bin/python3
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad

# XOR two bytearrays
def xor(first, second):
   return bytearray(x^y for x,y in zip(first, second))

# Yes
P1_guess = "596573"
P1_guess_bytearray = bytearray.fromhex(P1_guess)

# No
P2_guess = "4e6f"
P2_guess_bytearray = bytearray.fromhex(P2_guess)

bob_cypher = "78782623a8bbf5bd113e9637af157fbd"
bob_cypher_bytearray = bytearray.fromhex(bob_cypher)

IV_bob = "58883739aefbefd833279cdbd6032c53"
IV_bob_bytearray = bytearray.fromhex(IV_bob)

IV_next = "0f5c064aaefbefd833279cdbd6032c53"
IV_next_bytearray = bytearray.fromhex(IV_next)

found_key = False

n1 = xor(P1_guess_bytearray, IV_bob_bytearray)
n2 = xor(P2_guess_bytearray, IV_bob_bytearray)

n1_final_binary = xor(n1, IV_next_bytearray)
print(n1_final_binary)
n1_final = ''.join('{:02x}'.format(x) for x in n1_final_binary)
print(n1_final)

n2_final_binary = xor(n2, IV_next_bytearray)
print(n2_final_binary)
n2_final = ''.join('{:02x}'.format(x) for x in n2_final_binary)
print(n2_final)

start = 0x00000000000000000000000000000000
end = 0xffffffffffffffffffffffffffffffff

i = start
while (True):

    if(i > end):
        break

    i_hex = hex(i)

    print(i_hex)

    cipher = AES.new(i.encode('utf8'), AES.MODE_CBC, IV_next_bytearray)

    ciphertext = cipher.encrypt(pad(n1_final, AES.block_size))

    # ni_final com ciphertext
    print("--------")
    print(bob_cypher)
    print(ciphertext)

    i = i + 1


# f = open("words.txt", "r")

# words = []
# for x in f:
# 	words.append(x.strip())

# index = random.randint(0, len(words))
# key = words[index]

# while len(key) < 16:
# 	key += "#"

# plaintextFile = open("plaintext.txt", "rb")
# plaintext = plaintextFile.read()

# ivFile = open("iv.txt", "r")
# iv = bytearray.fromhex(ivFile.read())

# cipher = AES.new(key.encode('utf8'), AES.MODE_CBC, iv)
# encryptedFile = open("encrypted.bin", "wb")

# ciphertext = cipher.encrypt(pad(plaintext, AES.block_size))
# encryptedFile.write(ciphertext)

# # Convert ascii string to bytearray
# P1_b = bytes(P1, 'utf-8')

# # Convert hex string to bytearray
# C1_b = bytearray.fromhex(C1)
# C2_b = bytearray.fromhex(C2)

# # C1 = P1 XOR key --> key = P1 XOR C1 because OFB
# key = xor(P1_b, C1_b)
# P2_b = xor(C2_b, key)

# P2 = P2_b.decode()

# print(P2)
