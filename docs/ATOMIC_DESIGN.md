# Atomic Design dans MDS

Ce document explique comment MDS utilise la méthodologie **Atomic Design** pour organiser les composants.

## 🎯 Pourquoi Atomic Design ?

**Avantages** :
- ✅ **Cohérence** : structure claire et prévisible
- ✅ **Réutilisabilité** : composants modulaires
- ✅ **Scalabilité** : facile d'ajouter de nouveaux composants
- ✅ **Collaboration** : tout le monde comprend où chercher
- ✅ **Documentation** : hiérarchie auto-documentée dans Storybook

## 📊 Mapping des Composants Courants

### Atoms ⚛️

| Composant | Description | Dépendances |
|-----------|-------------|-------------|
| Button | Bouton cliquable | Aucune |
| Input | Champ de saisie | Aucune |
| Label | Étiquette de formulaire | Aucune |
| Icon | Icône SVG | Aucune |
| Badge | Pastille de statut | Aucune |
| Avatar | Photo de profil | Aucune (ou Icon) |
| Spinner | Indicateur de chargement | Aucune |
| Divider | Ligne de séparation | Aucune |
| Checkbox | Case à cocher | Aucune |
| Radio | Bouton radio | Aucune |
| Switch | Toggle on/off | Aucune |
| Link | Lien hypertexte | Aucune |
| Text | Composant typographie | Aucune |
| Tooltip | Info-bulle simple | Aucune |

### Molecules 🧬

| Composant | Description | Composition |
|-----------|-------------|-------------|
| SearchBar | Barre de recherche | Input + Button |
| FormField | Champ de formulaire complet | Label + Input + ErrorText |
| ButtonGroup | Groupe de boutons | Button × N |
| InputWithIcon | Input avec icône | Input + Icon |
| Stat | Statistique | Label + Value + Icon |
| Tag | Étiquette supprimable | Badge + Button (close) |
| MenuItem | Item de menu | Icon + Text + Badge |
| Breadcrumb | Fil d'Ariane | Link × N + Divider |
| Pagination | Navigation par pages | Button × N + Text |
| Alert | Message d'alerte simple | Icon + Text + Button (close) |

### Organisms 🦠

| Composant | Description | Composition |
|-----------|-------------|-------------|
| Card | Carte de contenu | Avatar + Text + Tag + Button |
| Header | En-tête de page | Logo + Nav + SearchBar + Menu |
| Sidebar | Barre latérale | Nav + User + Settings |
| Modal | Fenêtre modale | Header + Body + Footer |
| DataTable | Tableau de données | Header + Rows + Pagination + Filters |
| Form | Formulaire complet | FormField × N + ButtonGroup |
| Dropdown | Menu déroulant | Button + MenuItem × N |
| Tabs | Système d'onglets | ButtonGroup + Content panels |
| Accordion | Accordéon | Header × N + Content × N |
| Toast | Notification | Alert + Animation |

### Templates 📐

| Template | Description | Usage |
|----------|-------------|-------|
| PageLayout | Structure de page standard | Header + Sidebar + Main + Footer |
| DashboardLayout | Layout dashboard | Grid de widgets |
| ArticleLayout | Layout article | Header + Content + Sidebar |

**Note** : Les templates sont **optionnels** dans un design system. La plupart du temps, les apps créent leurs propres layouts.

---

## 🤔 Cas Ambigus : Où Ranger ?

### Cas 1 : Tooltip

**Question** : Atom ou Molecule ?

**Réponse** : **Atom**
- C'est un composant simple
- Pas de dépendances (juste du texte)
- Réutilisable partout

**Sauf si** : Tooltip avec Icon + Title + Description → **Molecule**

### Cas 2 : Card

**Question** : Molecule ou Organism ?

**Réponse** : Dépend de la complexité

**Card Simple** → **Molecule**
- Title + Text + Button
- Pas de logique complexe

**Card Complexe** → **Organism**
- Avatar + Title + Subtitle + Tags + Description + Actions + Menu
- State interne (expanded/collapsed)
- Logique métier

**Règle** : Si tu hésites entre Molecule et Organism, commence par Molecule. Tu peux toujours le déplacer plus tard.

### Cas 3 : Navigation

**Question** : Molecule ou Organism ?

**Réponse** : **Organism**
- Même si c'est "juste des liens"
- La navigation est une **section distincte** de l'interface
- Souvent avec state (active item, mobile menu, etc.)

---

## 🎨 Organisation dans Storybook

Avec Atomic Design, Storybook sera organisé ainsi :

```
📂 Storybook Sidebar
│
├── 📁 Atoms
│   ├── Button
│   ├── Input
│   ├── Icon
│   └── Badge
│
├── 📁 Molecules
│   ├── SearchBar
│   ├── FormField
│   └── ButtonGroup
│
├── 📁 Organisms
│   ├── Card
│   ├── Header
│   └── Modal
│
├── 📁 Templates (optionnel)
│   └── PageLayout
│
└── 📁 Examples
    └── Token Demo
```

**Avantage** : Navigation intuitive, hiérarchie claire dans la doc.

---

## 📋 Checklist de Classification

Quand tu crées un nouveau composant, pose-toi ces questions :

### Est-ce un Atom ?
- [ ] Le composant est indivisible
- [ ] Il ne contient aucun autre composant
- [ ] Il est réutilisable partout
- [ ] Il a une seule responsabilité

➡️ **OUI** = `src/components/atoms/`

### Est-ce une Molecule ?
- [ ] Le composant combine 2-5 atoms
- [ ] Les atoms doivent toujours être ensemble
- [ ] Ça forme une unité fonctionnelle
- [ ] Pas de logique métier complexe

➡️ **OUI** = `src/components/molecules/`

### Est-ce un Organism ?
- [ ] Le composant est une section distincte de l'UI
- [ ] Il combine molecules et/ou atoms
- [ ] Il peut avoir de la logique métier
- [ ] Il peut avoir un state interne complexe

➡️ **OUI** = `src/components/organisms/`

### Est-ce un Template ?
- [ ] C'est un layout de page
- [ ] Utilisé dans plusieurs apps différentes
- [ ] Définit la structure, pas le contenu

➡️ **OUI** = `src/components/templates/` (rare)

---

## 💡 Bonnes Pratiques

### 1. Commence Simple (Atoms First)

**Toujours commencer par les atoms** avant de créer molecules/organisms.

❌ **Mauvais** :
```
Créer Card (organism) qui utilise Button
→ Mais Button n'existe pas encore !
```

✅ **Bon** :
```
1. Créer Button (atom)
2. Créer Image (atom)
3. Créer Text (atom)
4. Créer Card (organism) qui les utilise
```

### 2. Éviter les Dépendances Circulaires

**Règle** : Un niveau **ne peut dépendre que des niveaux inférieurs**.

✅ **Autorisé** :
- Atom → Aucune dépendance
- Molecule → Atoms
- Organism → Atoms + Molecules
- Template → Atoms + Molecules + Organisms

❌ **Interdit** :
- Atom → Molecule (inversion !)
- Molecule → Organism (inversion !)

### 3. Garder les Atoms Simples

**Un atom ne doit PAS** :
- ❌ Faire des appels API
- ❌ Gérer du state métier complexe
- ❌ Dépendre d'un contexte global
- ❌ Contenir d'autres composants

**Un atom DOIT** :
- ✅ Être "dump" (props in, JSX out)
- ✅ Utiliser uniquement des tokens CSS
- ✅ Avoir des props simples et claires
- ✅ Être réutilisable n'importe où

### 4. Documenter le Niveau dans les Stories

```typescript
// atoms/Button/Button.stories.tsx
const meta = {
  title: 'Atoms/Button',  // ← Indique le niveau
  component: Button,
};

// molecules/SearchBar/SearchBar.stories.tsx
const meta = {
  title: 'Molecules/SearchBar',  // ← Indique le niveau
  component: SearchBar,
};
```

---

## 🎓 Ressources d'Apprentissage

**Pour approfondir** :
- 📖 [Atomic Design Book (gratuit)](https://atomicdesign.bradfrost.com/table-of-contents/)
- 🎥 [Brad Frost - Atomic Design Talk](https://www.youtube.com/watch?v=YaVY3zH0T1s)
- 📝 [Atomic Design in Practice](https://www.smashingmagazine.com/2016/07/building-maintainable-atomic-design-systems/)

**Exemples de Design Systems qui l'utilisent** :
- Shopify Polaris
- IBM Carbon
- Salesforce Lightning

---

## 📂 Structure Finale MDS

```
src/components/
├── atoms/
│   ├── HelloWorld/      # Composant de référence
│   │   ├── HelloWorld.tsx
│   │   ├── HelloWorld.css
│   │   ├── HelloWorld.test.tsx
│   │   ├── HelloWorld.stories.tsx
│   │   └── index.ts
│   └── index.ts         # Export tous les atoms
│
├── molecules/
│   └── index.ts         # Export toutes les molecules
│
├── organisms/
│   └── index.ts         # Export tous les organisms
│
├── templates/
│   └── index.ts         # Export tous les templates (rare)
│
├── index.ts             # Barrel export TOUT
└── README.md            # Ce fichier
```

---

**La structure Atomic Design est maintenant en place ! 🎉**

Prêt à créer ton premier Atom (Button) ? 😊

