#!/usr/bin/python3
#from Crypto.Cipher import AES
#from Crypto.Util.Padding import pad
import os
import subprocess

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
n1_final = ''.join('{:02x}'.format(x) for x in n1_final_binary)

n2_final_binary = xor(n2, IV_next_bytearray)
n2_final = ''.join('{:02x}'.format(x) for x in n2_final_binary)

start = 0x00000000000000000000000000000000
end = 0xffffffffffffffffffffffffffffffff

i = start
while (True):

    if(i > end):
        break
    
    os.system("echo -n \"" + str(n1_final) + "\" | xxd -r -p > P2")
    
    command = "openssl enc -aes-128-cbc -e -in P2 -out C2.bin -K " + format(i, 'x') + " -iv " + str(IV_next)
    
    os.system(command)

    getOutput = subprocess.check_output("xxd -p C2.bin", shell=True).decode()
    
    print("------")
    print(bob_cypher)
    print(getOutput)
    
    if(bob_cypher == getOutput):
    	break

    i = i + 1
