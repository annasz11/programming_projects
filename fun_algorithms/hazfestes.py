# n db házat pirosra, kékre, zöldre akarunk festeni, úgy hogy szomszédosak különbözőek legyenek
# adott minden házra hogy mennyit ér ha piros/kéék/zöld színű
# mi a legnagyobb értékű festés?

from pulp import *
import numpy as np

def dp_hazfestes(n, C_p, C_k, C_z):   #C_p: minden házra a piros színű festés értéke
    #1=p,2=k,3=z
    P=[(0,0) for i in range(n)]
    K=[(0,0) for i in range(n)]
    Z=[(0,0) for i in range(n)]
    
    P[0] = (C_p[0],0)
    K[0] = (C_k[0],0)
    Z[0] = (C_z[0],0)

    for i in range(1,n):
        
        if K[i-1] >= Z[i-1]:
            s = 2
        else: 
            s = 3
        P[i] = ( max(K[i-1][0], Z[i-1][0]) + C_p[i] , s)

        if P[i-1] >= Z[i-1]:
            s = 1
        else: 
            s = 3
        K[i] = (max(P[i-1][0], Z[i-1][0]) + C_k[i],s)

        if P[i-1] >= K[i-1]:
            s = 1
        else: 
            s = 2
        Z[i] = (max(K[i-1][0], P[i-1][0]) + C_z[i],s)

    M=max(P[n-1][0], K[n-1][0], Z[n-1][0])

    if P[n-1][0] ==M: last=1
    elif K[n-1][0] ==M: last=2
    else: last=3

    szinek=[last]  #reverse!!!
    for i in range(n-1,0,-1):
        if last == 1:
            last = P[i][1]
        elif last == 2:
            last = K[i][1]
        else:
            last = Z[i][1]
        szinek.append(last)

    szinek.reverse()
    pirosak = [i+1 for i in range(len(szinek)) if szinek[i] == 1]
    kekek = [i+1 for i in range(len(szinek)) if szinek[i] == 2]
    zoldek = [i+1 for i in range(len(szinek)) if szinek[i] == 3]
    print('Dinamikus programozással: ')
    print('Max érték: ', M)
    print('Piros színűek: ', pirosak)
    print('Kék színűek: ',kekek)
    print('Zöld színűek: ',zoldek)
    print()


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

    pirosak=[]
    for i in range(len(x_p)):
        if x_p[i].varValue ==1:
            pirosak.append(i+1) 
    kekek=[]
    for i in range(len(x_k)):
        if x_k[i].varValue ==1:
            kekek.append(i+1) 
    zoldek=[]
    for i in range(len(x_z)):
        if x_z[i].varValue ==1:
            zoldek.append(i+1)

    print('IP programozással: ')
    print('Max érték: ', value(prob.objective))
    print('Piros színűek: ', pirosak)
    print('Kék színűek: ',kekek)
    print('Zöld színűek: ',zoldek)
    print()


dp_hazfestes(3,[22,10,2],[10,2,1],[3,12,5])
ip_hazfestes(3,[22,10,2],[10,2,1],[3,12,5])