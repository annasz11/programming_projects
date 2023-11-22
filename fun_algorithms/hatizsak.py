def hatizsak(n,b,A,C):
    #n = tárgyak száma, b = hátizsák teherbírása, A = a1,a2,...,an súlyok, C = c1,c2,...,cn értékek
    T = [] #j teherbírású hátizsákban a max. kivihető érték, 0-tól b-ig
    for i in range(n+1):  #n*(b+1)
        t=[]
        for j in range(b+1):
            t.append(0)
        T.append(t)

    for i in range(A[1],b+1):
        T[1][i] = C[1]
    
    for i in range(1,n+1):
        for j in range(b+1):
            if  j>=A[i-1] and T[i-1][j-A[i-1]] + C[i-1] > T[i-1][j] :               
                T[i][j] = T[i-1][j-A[i-1]] + C[i-1]
            else:
                T[i][j] = T[i-1][j]

    targyak = [0 for i in range(n+1)]

    k = n
    l = b
    while k !=0 and l != 0:
        if T[k][l] == T[k-1][l]:
            k = k-1
        else:
            targyak[k] = 1
            l = l- A[k-1]
            k = k-1
    
    print('Kivihető max érték: ', T[n][b])
    print('Tárgyak egy lehetséges kiválasztása: ', [i for i in range(len(targyak)) if targyak[i] ==1])
    return

#tesztek: 
hatizsak(3,2,[1,1,2],[2,4,3])
hatizsak(4,8,[4,3,2,2], [6,5,3,3])
hatizsak(4,11,[4,5,8,3], [8,10,15,4])

n=19
b= 31181
T=[
1945,4990,
321,1142,
2945,7390,
4136,10372,
1107,3114,
1022,2744,
1101,3102,
2890,7280,
962,2624,
1060,3020,
805,2310,
689,2078,
1513,3926,
3878,9656,
13504,32708,
1865,4830,
667,2034,
1833,4766,
16553,40006]
A=[]
C=[]
for i in range(len(T)):
    if i%2 == 0:
        C.append(T[i])
    else:
        A.append(T[i])
hatizsak(n,b,A,C)
