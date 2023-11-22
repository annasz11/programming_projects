# n db házat pirosra, kékre, zöldre akarunk festeni, úgy hogy szomszédosak különbözőek legyenek
# adott minden házra hogy mennyit ér ha piros/kéék/zöld színű
# mi a legnagyobb értékű festés?
# integer programming vs dynamic programming

from pulp import *
import numpy as np
import random
import time

#random egész n-re, random értékekre:
n = random.randint(100, 10000)
C_p = [random.randrange(0,500) for i in range(n)]
C_k = [random.randrange(0,500) for i in range(n)]
C_z = [random.randrange(0,500) for i in range(n)]

print('Házak száma: ', n)
print()

start_time = time.time()

def dp_hazfestes(n, C_p, C_k, C_z):   #C_p: minden házra a piros színű festés értéke
    P=[0 for i in range(n)]
    K=[0 for i in range(n)]
    Z=[0 for i in range(n)]
    
    P[0] = C_p[0]
    K[0] = C_k[0]
    Z[0] = C_z[0]

    for i in range(1,n):
        P[i] = max(K[i-1], Z[i-1]) + C_p[i]
        K[i] = max(P[i-1], Z[i-1]) + C_k[i]
        Z[i] = max(K[i-1], P[i-1]) + C_z[i]

    print('Dinamikus programozással: ')
    print('Max érték: ', max(P[n-1], K[n-1], Z[n-1]))
    print("--- %s seconds ---" % (time.time() - start_time))
    print()

start_time = time.time()

def ip_hazfestes(n, C_p, C_k, C_z):
    prob = LpProblem('hazfestes', LpMaximize)
    
    x_p = {i: LpVariable(name=f"x_p{i}",lowBound=0, upBound=1, cat="Integer") for i in range(0, n)}
    x_k = {i: LpVariable(name=f"x_k{i}",lowBound=0, upBound=1, cat="Integer") for i in range(0, n)}
    x_z = {i: LpVariable(name=f"x_z{i}",lowBound=0, upBound=1, cat="Integer") for i in range(0, n)}

    cf = 0
    for i in range(n):
        cf += (C_p[i]*x_p[i] + C_k[i]*x_k[i] + C_z[i]*x_z[i])
    prob+= cf, 'Objective Function'

    for i in range(n):
        prob += (lpSum(x_p[i] + x_k[i] + x_z[i])  == 1)   #1 ház pontosan 1 színt kapjon
    for i in range(1,n):
        prob += (lpSum(x_p[i] + x_p[i-1])  <= 1)    #minden 2 egymást követő ház kül. színű
        prob += (lpSum(x_k[i] + x_k[i-1])  <= 1)
        prob += (lpSum(x_z[i] + x_z[i-1])  <= 1)

    prob.solve()

    print('IP programozással: ')
    print('Max érték: ', value(prob.objective))
    print("--- %s seconds ---" % (time.time() - start_time))
    print()


#dp_hazfestes(3,[22,10,2],[10,2,1],[3,12,5])
#ip_hazfestes(3,[22,10,2],[10,2,1],[3,12,5])

dp_hazfestes(n, C_p, C_k, C_z)
ip_hazfestes(n, C_p, C_k, C_z)