# A kosárlabda meccshez Pistike csapattársakat választ a 2⋅n barátja közül. 
# Pistike barátai két egymás mögötti n hosszú sorban állnak az ábra szerint.
# Pistike úgy szeretné kiválasztani a csapattársait, hogy mind az n oszlopból legfeljebb 1-1 embert válasszon,
# és ha balról jobbra felsorolja a kiválasztott barátait, akkor a felsorolásban egymást követő tagok különböző sorban álljanak. 
# Pistike céja, hogy csapattársai magasságának összege minél nagyobb legyen. A csapattagok számára nincs megkötés.


n = input()
row1 = input().split()
row2 = input().split()
n = int(n)
row1 = list(map(int, row1))
row2 = list(map(int, row2))
 
 
def csapat2(n,row1,row2):
    maxfent=[0,row1[0]]
    maxlent=[0,row2[0]]
    
    for i in range(2,n+1):
        mf=max(maxlent[i-1]+row1[i-1],maxlent[i-2]+row1[i-1])
        ml=max(maxfent[i-1]+row2[i-1],maxfent[i-2]+row2[i-1])
        maxfent.append(mf)
        maxlent.append(ml)
        
    return max(maxfent[n],maxlent[n])
        
    
    
print(csapat2(n,row1,row2))