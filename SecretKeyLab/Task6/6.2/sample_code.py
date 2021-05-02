#!/usr/bin/python3

# XOR two bytearrays
def xor(first, second):
   return bytearray(x^y for x,y in zip(first, second))

P1 = "This is a known message!"
C1 = "a469b1c502c1cab966965e50425438e1bb1b5f9037a4c159"

# P2 is unknown
C2 = "bf73bcd3509299d566c35b5d450337e1bb175f903fafc159"

# Convert ascii string to bytearray
P1_b = bytes(P1, 'utf-8')

# Convert hex string to bytearray
C1_b = bytearray.fromhex(C1)
C2_b = bytearray.fromhex(C2)

# C1 = P1 XOR key --> key = P1 XOR C1 because OFB
key = xor(P1_b, C1_b)
P2_b = xor(C2_b, key)

P2 = P2_b.decode()

print(P2)
