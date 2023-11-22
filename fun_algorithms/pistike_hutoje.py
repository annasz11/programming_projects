#Pistike hűtője egy h×2-es mátrixnak felel meg. Kezdetben csak a hűtő alján (a legalsó sor alatt) van polc,
# de Pistike bármely két sor közé berakhat egy-egy polcot. 
# Mindegyik polc elhanyagolható vastagságú, két oszlop szélességű, és elválasztja az alatta és felette lévő sorokat.
# Pistike n üveg tejet szeretne behűteni. Minden tejesüveg 1 oszlop szélességű, az i-edik tejesüveg ai sor magaságú. 
# A hűtőbe természetesen csak polcokra helyezhetők tejesüvegek, két üveg nem helyezhető egymásra (ha nincs köztük polc).
# Határozzuk meg a legnagyobb k számot, amire a 1, 2, ..., k sorszámú tejesüvegek egyszerre beférnek a hűtőbe! 
# (Ha mindegyik üveg egyszerre befér a hűtőbe, akkor a megoldás n.)

n, h = input().split()
milks=input().split()
n, h = int(n),int(h)
milks = list(map(int, milks))


def huto(n, h, milks):
    befer = True
    k=1   

    while befer and k<=len(milks):
        
        list = (milks[:k])
        list.sort()
        list.reverse()

        s = sum(list[0::2])
        
        befer = (s <= h)

        if befer and k==len(milks):
            return k
        elif befer and k+1 <= len(milks):
            k+=1
        else: k-=1


    return k

print(huto(n,h,milks))
#k = huto(5 ,10, [3,1,4,2,4])
#print(k)


    
