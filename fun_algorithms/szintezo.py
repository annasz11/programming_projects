#szintező algoritmus

class csucs:
    def __init__(self,k,b): #k:sorszam
        self.k=k
        self.b=b
        self.t=0
        self.be=[]
        self.ki=[]

#fv-ek:
def aktiv(w):
    return len(w.be) > w.b
def aktiv_frissit(V,aktivak):
    for v in V:
        if aktiv(v) and v not in aktivak:
            aktivak.append(v)
        if not aktiv(v) and v in aktivak:
            aktivak.remove(v)

def megfordit(u,v):  #u->v élből v->u kell
    u.ki.remove(v)
    u.be.append(v)
    v.be.remove(u)
    v.ki.append(u)
            
def vege(V):
    for v in V:
        if v.t==len(V):
            return True
    else: return False

def sertohalmaz(V):
    szintek=[i for i in range(len(V))]
    for v in V:
        if v.t in szintek:
            szintek.remove(v.t)
    ures=szintek[0]
    sertok=[]
    for v in V:
        if v.t > ures:
            sertok.append(v)
    return sertok

def iranyitas(V):
    iranyitas=[]   #matrix: minden sor: [csucsindex, mellette egy listaban hogy hova mennek elek belole]
    for v in V:
        sor=[]
        sor.append(v.k )
        kimenok=[]
        for w in v.ki:
            kimenok.append(w.k)
        sor.append(kimenok)
        iranyitas.append(sor)
    return iranyitas


def szintezo(n,b,V):  #V:matrix, b:vektor

    csucsok=[]
    for i in range(len(V)):
        w = csucs(i,b[i])
        csucsok.append(w)
        
    for j in csucsok:
        for w in V[j.k]:
            if j.k > w:
                j.be.append(csucsok[w])
            else:
                j.ki.append(csucsok[w])

    aktivak=[] #ezt kell majd frissítgetni
    for w in csucsok:
        if aktiv(w) and w not in aktivak:
            aktivak.append(w)


    while len(aktivak)!=0 and not vege(csucsok):
        w=aktivak[0]
        if len(w.be)!=0:
            for i in range (len(w.be)):
                if w.be[i].t + 1 == w.t:
                    megfordit(w.be[i],w)
                    aktiv_frissit(csucsok,aktivak)
                    break
            else:
                w.t+=1

    if len(aktivak)==0:
        print ("van megoldás, lehetséges irányítás (csúcsindex, belőle kimenő élek végpontjai): ")
        print([v for v in iranyitas(csucsok)])
        return
    if vege(csucsok):
        print ("nincs megoldás, sértő halmaz (amelyik csúcsokkal baj van): ")
        print([v.k for v in sertohalmaz(csucsok)])
        return
    
    
szintezo(5,[2,1,2,1,3],[[1,2,3,4],[0,2,4],[0,1,4],[0],[0,1,2]])  #van

szintezo(5,[0,1,1,1,3],[[1,2,3,4],[0,2,4],[0,1,4],[0],[0,1,2]])  #nincs