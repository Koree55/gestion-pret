# ⚡ Aide-Mémoire Rapide - Firebase

## 🎯 En 5 minutes

### 1. Configurer Firebase Console
```
https://console.firebase.google.com/
→ Nouveau projet "gestion-pret"
→ Ajouter app Web
→ Copier la config
```

### 2. Modifier src/firebase.js
```javascript
const firebaseConfig = {
  apiKey: "VOTRE_CLE",        // ⚠️ MODIFIER ICI
  authDomain: "votre.firebaseapp.com",
  projectId: "votre-projet",
  // ...
};
```

### 3. Activer Firestore
```
Firebase Console → Firestore Database
→ Créer base de données
→ Mode test
```

### 4. Règles de sécurité (dev)
```javascript
allow read, write: if true;
```

### 5. Lancer l'app
```bash
npm install firebase
npm run dev
```

---

## 📁 Fichiers importants

| Fichier | Action |
|---------|--------|
| `src/firebase.js` | ⚠️ Configurer avec vos clés |
| `src/useFirebase.js` | ✅ Ne pas toucher |
| `src/App.jsx` | 🔧 Modifier selon guide |

---

## 🔧 Modifications App.jsx

### Remplacer imports
```javascript
// Supprimer
import { initializeApp } from 'firebase/app';
// ...

// Ajouter
import { useAppareils, useHistorique } from './useFirebase';
```

### Remplacer states
```javascript
// Supprimer
const [appareils, setAppareils] = useState([]);

// Remplacer par
const { appareils, addAppareil, updateAppareil, deleteAppareil } = useAppareils();
```

### Modifier fonctions
```javascript
// Ajouter async partout
const handleAddDevice = async () => { ... }
const handleLoanDevice = async () => { ... }
const confirmReturn = async () => { ... }
const handleDeleteDevice = async (id) => { ... }
```

---

## ✅ Test rapide

1. Démarrer: `npm run dev`
2. Vérifier: Indicateur "🟢 Synchronisé"
3. Ajouter un appareil
4. Ouvrir Firebase Console → Firestore
5. Vérifier que l'appareil apparaît

---

## 🆘 Dépannage express

### ❌ Erreur "Firebase not initialized"
→ Vérifier `src/firebase.js`

### ❌ Erreur "Permission denied"
→ Vérifier règles Firestore (mode test)

### ❌ Page blanche
→ F12 → Console → Regarder l'erreur

### ❌ Pas de synchronisation
→ Vérifier Firebase Console → Firestore → Voir si données apparaissent

---

## 📚 Documentation complète

Voir les fichiers détaillés:
- `README_FIREBASE.md` - Résumé complet
- `FIREBASE_SETUP.md` - Installation détaillée
- `MODIFIER_APP_JSX.md` - Guide modification code
- `INTEGRATION_FIREBASE.md` - Vue d'ensemble

---

## 🎉 C'est fait ?

- [x] Firebase configuré
- [x] Firestore activé
- [x] Code modifié
- [x] Application fonctionne
- [x] Synchronisation OK

**Félicitations ! 🚀**
