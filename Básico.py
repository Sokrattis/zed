class Copo:
    nomeDoCopo = ""
    volumeTotal = 200
    volumeAtual = 0

    def __init__(self, quantidadeInicial, nomeDoCopo):
        self.volumeAtual = quantidadeInicial
        self.nomeDoCopo = nomeDoCopo

    def encher(self):
        self.volumeAtual = self.volumeAtual + 10
        if(self.volumeAtual <= self.volumeTotal):            
            pass
            #print("Copo %s agora tem %d " % (self.nomeDoCopo, self.volumeAtual))
        else:                        
            pass 
            #print("Copo %s transbordou!" % self.nomeDoCopo)

#using a dictionary
listaDeCopos = {
    "azul" : 150,
    "verde" : 180,
    "amarelo" : 100
}
del listaDeCopos["verde"]
listaDeCopos["roxo"] = 225

# using a list
meusCopos = []
for name, number in listaDeCopos.items():
    meusCopos.append(Copo(number, name))

for _ in range(8):
    for copo in meusCopos:    
        copo.encher()

import pandas as pd
from itertools import chain

#using Loops
mergedCopos = {}
nomes = []
for _ in meusCopos:
    nomes.append(_.nomeDoCopo)
mergedCopos["nome"] = nomes

#using sets
a = set(nomes)
b = set(nomes)
print(a.union(b))
    
# using lists and dataframe
volumes = []
for _ in meusCopos:
    volumes.append(_.volumeAtual)

mergedCopos["VolumeAtual"] = volumes

volumes = []
for _ in meusCopos:
    volumes.append(_.volumeTotal)

mergedCopos["volumeTotal"] = volumes

tabela = pd.DataFrame(mergedCopos)
print(tabela)

#using Jsons
import jsons
tabela = pd.DataFrame(jsons.dump(meusCopos))
print(tabela)
