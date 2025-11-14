# MDS Components - Atomic Design Structure

Ce design system suit la méthodologie **Atomic Design** de Brad Frost pour organiser les composants de manière cohérente et scalable.

## 📚 Méthodologie Atomic Design

### Hiérarchie (du simple au complexe)

```
Atoms → Molecules → Organisms → Templates → Pages
  ↓         ↓            ↓            ↓         ↓
Base    Compositions  Sections     Layouts   Apps
```

---

## ⚛️ Atoms (Atomes)

**Définition** : Les briques de base **indivisibles** de l'interface.

**Caractéristiques** :
- Composants les plus simples
- Ne contiennent **pas** d'autres composants
- Réutilisables partout
- Gèrent un seul concept

**Exemples** :
- `Button` : bouton interactif
- `Input` : champ de saisie
- `Label` : étiquette de formulaire
- `Icon` : icône
- `Badge` : pastille de statut
- `Avatar` : photo de profil
- `Spinner` : indicateur de chargement
- `Divider` : séparateur visuel
- `Checkbox` : case à cocher
- `Radio` : bouton radio
- `Switch` : toggle on/off

**Quand créer un atom** :
- ✅ Le composant est réutilisable partout
- ✅ Il ne dépend d'aucun autre composant
- ✅ Il a une seule responsabilité claire

**Où ranger** : `src/components/atoms/ComponentName/`

---

## 🧬 Molecules (Molécules)

**Définition** : Groupes d'**atomes** qui fonctionnent ensemble.

**Caractéristiques** :
- Combinent 2-5 atomes
- Forment une unité fonctionnelle
- Plus complexes qu'un atom, plus simples qu'un organism

**Exemples** :
- `SearchBar` : Input + Button (recherche)
- `FormField` : Label + Input + ErrorMessage
- `ButtonGroup` : plusieurs Buttons groupés
- `InputWithIcon` : Input + Icon
- `Stat` : Label + Value + Icon
- `Tag` : Badge + CloseButton

**Quand créer une molecule** :
- ✅ Tu combines plusieurs atoms pour une fonction précise
- ✅ La combinaison est réutilisable
- ✅ Les atoms doivent toujours être ensemble

**Où ranger** : `src/components/molecules/ComponentName/`

---

## 🦠 Organisms (Organismes)

**Définition** : Sections **complexes** de l'interface combinant molecules et atoms.

**Caractéristiques** :
- Composants robustes et autonomes
- Peuvent contenir state et logique métier
- Forment des sections distinctes de l'UI
- Plus spécifiques que molecules

**Exemples** :
- `Header` : Logo + Navigation + SearchBar + UserMenu
- `Card` : Image + Title + Description + Tags + Actions
- `Modal` : Header + Body + Footer + CloseButton
- `DataTable` : Header + Rows + Pagination + Filters
- `Sidebar` : Navigation + UserProfile + Settings
- `Hero` : Title + Subtitle + Image + CTA buttons

**Quand créer un organism** :
- ✅ Le composant forme une section distincte de l'interface
- ✅ Il combine plusieurs molecules et/ou atoms
- ✅ Il a une logique métier ou state complexe

**Où ranger** : `src/components/organisms/ComponentName/`

---

## 📐 Templates (Gabarits)

**Définition** : Structures de **page** définissant le layout sans contenu réel.

**Caractéristiques** :
- Définissent l'agencement des organisms
- Utilisent des placeholders
- Rarement dans un design system (plus dans les apps)
- Focus sur le layout, pas le contenu

**Exemples** :
- `PageLayout` : Header + Sidebar + Main + Footer
- `DashboardTemplate` : Grid avec zones pour widgets
- `ArticleTemplate` : Header + Content + Sidebar
- `SettingsTemplate` : Tabs + Content area

**Quand créer un template** :
- ⚠️ Rarement dans un design system
- ✅ Si tu veux standardiser des layouts réutilisables
- ✅ Si plusieurs apps utilisent les mêmes structures de page

**Où ranger** : `src/components/templates/ComponentName/`

**Note** : La plupart des design systems s'arrêtent aux **organisms** et laissent les templates/pages aux applications consommatrices.

---

## 📂 Structure des Fichiers

### Pour chaque composant

```
atoms/Button/
├── Button.tsx          # Composant
├── Button.css          # Styles (tokens uniquement)
├── Button.test.tsx     # Tests (≥80% coverage)
├── Button.stories.tsx  # Stories Storybook
└── index.ts            # Export
```

### Exports en cascade

```typescript
// atoms/Button/index.ts
export * from './Button';

// atoms/index.ts
export * from './Button';
export * from './Input';
export * from './Icon';

// components/index.ts
export * from './atoms';
export * from './molecules';
export * from './organisms';
```

---

## 🎯 Guide de Décision : Où Ranger Mon Composant ?

### Flowchart

```
Est-ce un composant de base indivisible ?
├─ OUI → ATOM
└─ NON
   └─ Combine-t-il 2-5 atoms pour une fonction précise ?
      ├─ OUI → MOLECULE
      └─ NON
         └─ Est-ce une section complexe avec logique métier ?
            ├─ OUI → ORGANISM
            └─ NON
               └─ Est-ce un layout de page ?
                  ├─ OUI → TEMPLATE
                  └─ NON → Reconsidérer la structure
```

### Exemples Concrets

| Composant | Niveau | Raison |
|-----------|--------|--------|
| Button | Atom | Indivisible, réutilisable partout |
| Input | Atom | Champ de base, pas de dépendances |
| Icon | Atom | Élément graphique simple |
| SearchBar | Molecule | Input + Button pour chercher |
| FormField | Molecule | Label + Input + Error message |
| Card | Organism | Image + Title + Text + Button (section complète) |
| Header | Organism | Logo + Nav + Search + Menu (section page) |
| Modal | Organism | Header + Content + Footer (logique overlay) |
| PageLayout | Template | Structure de page générique |

---

## 🚀 Ordre de Développement Recommandé

### Phase 1 : Atoms (Fondations)

1. **Button** (critique - utilisé partout)
2. **Input** (formulaires)
3. **Icon** (système d'icônes)
4. **Label** (formulaires)
5. **Badge** (statuts)
6. **Spinner** (loading)
7. **Avatar** (utilisateurs)
8. **Checkbox** (formulaires)
9. **Radio** (formulaires)
10. **Switch** (toggle)

### Phase 2 : Molecules (Compositions)

11. **SearchBar** (Input + Button)
12. **FormField** (Label + Input + Error)
13. **ButtonGroup** (plusieurs Buttons)
14. **InputWithIcon** (Input + Icon)
15. **Stat** (Label + Value + Icon)

### Phase 3 : Organisms (Sections)

16. **Card** (composant complexe)
17. **Modal** (overlay avec header/body/footer)
18. **Header** (navigation complète)
19. **Sidebar** (navigation latérale)
20. **DataTable** (tableau avec tri/pagination)

### Phase 4 : Templates (Optionnel)

21. **PageLayout** (si nécessaire)
22. **DashboardLayout** (si nécessaire)

---

## 📖 Ressources

- **[Atomic Design par Brad Frost](https://atomicdesign.bradfrost.com/)** : méthodologie complète
- **[Pattern Lab](https://patternlab.io/)** : outil basé sur Atomic Design
- **HelloWorld** (`atoms/HelloWorld/`) : exemple de référence dans MDS

---

## 🎯 Commencer à Développer

### Créer ton premier Atom (Button)

```bash
mkdir -p src/components/atoms/Button
touch src/components/atoms/Button/Button.tsx
touch src/components/atoms/Button/Button.css
touch src/components/atoms/Button/Button.test.tsx
touch src/components/atoms/Button/Button.stories.tsx
touch src/components/atoms/Button/index.ts
```

Puis édite `src/components/atoms/index.ts` :
```typescript
export * from './HelloWorld';
export * from './Button';  // Ajouter après création
```

**Le reste de MDS s'adapte automatiquement** grâce aux barrel exports ! ✨

