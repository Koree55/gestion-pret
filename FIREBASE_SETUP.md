# 🔥 Guide d'Installation Firebase

## ⚠️ Configuration Firebase Requise

Votre application a besoin d'une configuration Firebase pour fonctionner. Suivez ces étapes:

### 📋 Étape 1: Créer un projet Firebase

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur "Ajouter un projet"
3. Donnez un nom à votre projet (ex: "gestion-pret")
4. Désactivez Google Analytics (optionnel)
5. Cliquez sur "Créer le projet"

### 🌐 Étape 2: Créer une application Web

1. Dans votre projet Firebase, cliquez sur l'icône **Web** `</>`
2. Donnez un nom à votre app (ex: "Gestion Prêt Web")
3. **NE PAS** cocher "Firebase Hosting"
4. Cliquez sur "Enregistrer l'application"
5. **COPIEZ** la configuration qui s'affiche

### 🔑 Étape 3: Configurer src/firebase.js

Ouvrez le fichier `src/firebase.js` et remplacez les valeurs par votre configuration:

```javascript
const firebaseConfig = {
  apiKey: "VOTRE_CLE_API_ICI",           // Exemple: AIzaSyAbc123...
  authDomain: "VOTRE_PROJET.firebaseapp.com",
  projectId: "VOTRE_PROJET_ID",
  storageBucket: "VOTRE_PROJET.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 🗄️ Étape 4: Activer Firestore Database

1. Dans la console Firebase, allez dans **"Firestore Database"**
2. Cliquez sur **"Créer une base de données"**
3. Choisissez **"Démarrer en mode test"** (pour le développement)
4. Sélectionnez une région proche de vous (ex: europe-west)
5. Cliquez sur **"Activer"**

### 🔒 Étape 5: Configurer les règles de sécurité

Dans l'onglet **"Règles"** de Firestore, collez ces règles:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permettre la lecture/écriture pour tous (mode développement)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **IMPORTANT**: Ces règles sont pour le DÉVELOPPEMENT uniquement. En production, ajoutez une authentification !

### 📦 Étape 6: Installer et démarrer

```bash
# Installer les dépendances
npm install

# Lancer l'application
npm run dev
```

### ✅ Vérification

Si tout fonctionne:
- ✅ Vous verrez un indicateur "Synchronisé" avec une icône WiFi verte
- ✅ Les données seront sauvegardées dans Firebase
- ✅ Plusieurs utilisateurs verront les mêmes données en temps réel

Si vous voyez une erreur:
- ❌ Vérifiez votre configuration Firebase dans `src/firebase.js`
- ❌ Vérifiez que Firestore est activé
- ❌ Vérifiez les règles de sécurité

---

## 🎯 Ce qui a changé

### ✨ Avant (localStorage)
- ❌ Données locales uniquement
- ❌ Perdues si le cache est vidé
- ❌ Pas de synchronisation
- ❌ Chaque PC voit des données différentes

### ✨ Après (Firebase)
- ✅ Données dans le cloud
- ✅ Sauvegarde automatique
- ✅ Synchronisation temps réel
- ✅ Tous les PC voient les mêmes données
- ✅ Accessible de partout

---

## 🚀 Fonctionnalités Firebase

### Hooks disponibles

```javascript
// Dans useFirebase.js

// Gestion des appareils
const { 
  appareils,           // Liste des appareils
  loading,             // État de chargement
  error,               // Erreurs éventuelles
  addAppareil,         // Ajouter un appareil
  updateAppareil,      // Modifier un appareil
  deleteAppareil       // Supprimer un appareil
} = useAppareils();

// Gestion de l'historique
const { 
  historique,          // Liste de l'historique
  loading,             // État de chargement
  error,               // Erreurs éventuelles
  addHistorique,       // Ajouter une entrée
  updateHistorique     // Modifier une entrée
} = useHistorique();
```

### Synchronisation automatique

Les hooks utilisent `onSnapshot` de Firebase, ce qui signifie:
- Les données se mettent à jour automatiquement
- Pas besoin de rafraîchir la page
- Les modifications des autres utilisateurs apparaissent instantanément

---

## 🔐 Sécurité (Pour Production)

Pour sécuriser votre application en production:

1. **Activer l'authentification Firebase**
2. **Modifier les règles Firestore**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Seulement les utilisateurs connectés
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. **Ajouter une page de connexion**

---

## 📊 Structure de la base de données

### Collection: `appareils`
```javascript
{
  id: "auto-generated",
  nom: "MacBook Pro 14\"",
  numero: "MPB-001",
  statut: "disponible", // ou "emprunté" ou "maintenance"
  emprunteur: null,
  telephoneEmprunteur: null,
  emailEmprunteur: null,
  entrepriseEmprunteur: null,
  client: null,
  telephoneClient: null,
  emailClient: null,
  entrepriseClient: null,
  notes: null,
  dateEmprunt: null,
  dateRetour: null,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Collection: `historique`
```javascript
{
  id: "auto-generated",
  appareilId: "ref-to-appareil",
  appareilNom: "MacBook Pro 14\"",
  appareilNumero: "MPB-001",
  emprunteur: "Marie Dubois",
  telephoneEmprunteur: "06 12 34 56 78",
  emailEmprunteur: "marie@email.com",
  entrepriseEmprunteur: "Tech Solutions",
  client: "Jean Martin",
  telephoneClient: "06 98 76 54 32",
  emailClient: "jean@client.com",
  entrepriseClient: "Client Corp",
  notes: "Important pour la démo",
  dateEmprunt: "2026-01-15",
  dateRetourPrevue: "2026-03-15",
  dateRetourEffective: null,
  statut: "en cours", // ou "terminé"
  notesRetour: null,
  conditionRetour: null,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## 🆘 Dépannage

### Erreur: "Firebase not initialized"
- Vérifiez que vous avez bien configuré `src/firebase.js`

### Erreur: "Permission denied"
- Vérifiez les règles de sécurité Firestore
- Assurez-vous que les règles sont en mode test pour le développement

### Erreur: "Failed to fetch"
- Vérifiez votre connexion internet
- Vérifiez que Firestore est activé dans Firebase Console

### Les données ne se synchronisent pas
- Ouvrez la console Firebase et vérifiez que les données apparaissent
- Vérifiez qu'il n'y a pas d'erreurs dans la console du navigateur
- Essayez de vider le cache et de recharger

---

## 📞 Support

Si vous avez des problèmes:
1. Vérifiez la console du navigateur (F12)
2. Vérifiez la console Firebase
3. Relisez ce guide étape par étape

Bon développement ! 🚀
