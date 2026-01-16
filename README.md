# Mœba Protocol - Hybrid Parametric Insurance Vault (HPIV)

## 1. Vue d'Ensemble

Ce protocole introduit une nouvelle architecture pour les Obligations Catastrophe (Cat Bonds) sur la blockchain.  
Il résout le principal frein à l'adoption des assurances décentralisées : le risque binaire (« tout ou rien »).

Contrairement aux Cat Bonds traditionnels où l'investisseur perd 100 % de son capital en cas de sinistre, ce protocole utilise un mécanisme de **sur-collatéralisation** et de **tranches de risque (Junior / Senior)** pour garantir qu'en cas de catastrophe majeure, les investisseurs récupèrent une partie significative de leur mise.  
Ce mécanisme est appelé **Soft Default**.

---

## 2. Architecture du Vault

### 2.1 Structure du Capital

L'innovation centrale repose sur la répartition de la liquidité entre l'Assureur (demandeur de couverture) et les Investisseurs (fournisseurs de liquidité).

- **Besoin de Couverture Réel (Sinistre Max)** : 20,000,000 USD  
- **Cible de Levée de Fonds (Vault Cap)** : 40,000,000 USD  
- **Ratio de Sur-collatéralisation** : 200 %  
  (le vault lève 2× le montant du risque)

#### Répartition des apports ("Skin in the Game")

Pour aligner les intérêts et protéger les investisseurs, l'assureur doit verrouiller du capital dans le vault aux côtés des utilisateurs.

| Acteur                         | Apport | % du Vault | Rôle                                   |
|--------------------------------|--------|------------|----------------------------------------|
| Investisseurs (Retail / Whales)| 36 M$  | 90 %       | Tranche Senior (protégée)              |
| Assureur (Sponsor)             | 4 M$   | 10 %       | Tranche Junior (première perte)        |
| **TOTAL**                      | 40 M$  | 100 %      | Liquidité totale                       |

---

## 3. Logique de Rendement et Frais

### 3.1 Structure de l'APR

Le rendement total pour l'investisseur :

- **Prime d'Assurance (Insurance Fee)** : X % APR  
(payée par l'assureur pour la couverture)

- **APR Total Cible (scénario sans catastrophe)** : ~15 %

---

### 3.2 Mécanique des Retraits

- **Liquidité**  
Les retraits sont possibles grâce au buffer de 20 %.

- **Frais Dynamiques**  
Les frais de sortie augmentent à l'approche de la date de maturité afin de décourager la fuite des capitaux avant l'événement climatique.

- **Verrouillage (Hard Lock)**  
Les retraits deviennent impossibles 5 jours avant la date de maturité.

---

## 4. Scénario de Sinistre : le "Soft Default"

En cas de catastrophe validée par l'oracle (ex. ouragan catégorie > 4), le paiement du sinistre est déclenché.

### 4.1 Calcul de l'Absorption des Pertes

- **Montant du sinistre** : 20 M$  

L'absorption se fait dans l'ordre suivant :

1. **Tranche Assureur (prioritaire)**  
 Les 4 M$ déposés par l'assureur sont utilisés en premier  
 (auto-assurance partielle / franchise).

2. **Tranche Investisseurs (secondaire)**  
 Le reste du sinistre est prélevé sur le capital des investisseurs.

Calcul :

Reste à payer = 20 M$ − 4 M$ = 16 M$
Pool investisseurs = 36 M$


---

### 4.2 Ratio de Perte (Haircut)

Le pourcentage de perte appliqué aux investisseurs est :

Ratio de Perte = 16,000,000 / 36,000,000 ≈ 44.44 %


L'investisseur conserve donc **55.56 % de son capital (+ intérêts)** au lieu de perdre 100 %.

---

## 5. Simulation Mathématique Concrète

Simulation basée sur un investissement réel.

### Paramètres d'entrée

- **Investissement initial (P)** : 100 USDC  
- **Date de dépôt** : 19 décembre 2025  
- **Date de maturité** : 18 janvier 2026  
- **Durée (t)** : 30 jours  
- **Rendement collatéral (r)** : 5 % APR  
- **Événement** : Catastrophe confirmée (sinistre total)

---

### Formule de calcul

Valeur Finale = P × (1 + r)^(t / 365) × (1 − Ratio de Perte)


---

### Étape 1 : Intérêts acquis avant le sinistre

100 × (1 + 0.05)^(30 / 365)
≈ 100 × 1.0040
≈ 100.40 USDC


---

### Étape 2 : Application du Haircut (44.44 %)


100.40 × (1 − 0.4444)
≈ 100.40 × 0.5556
≈ 55.78 USDC


---

## Conclusion de la Simulation

Dans le pire scénario possible (catastrophe majeure), l'investisseur ne repart pas avec 0.  
Il récupère **55.78 USDC**, limitant sa perte nette à **−44.2 %**.

Ce profil de risque asymétrique :

- Gain potentiel : ~15 %
- Perte maximale : ~44 %

comparé à :

- Gain potentiel : ~15 %
- Perte maximale : 100 % (Cat Bonds traditionnels)

rend ce produit **viable pour une adoption retail (grand public)**.

<img width="1714" height="1455" alt="shapes at 25-12-19 11 55 22" src="https://github.com/user-attachments/assets/6bc26e6b-9ef2-464f-b038-a73a06e5d96f" />
