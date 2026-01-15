import { useEffect, useState } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Hook personnalisé pour gérer les appareils dans Firestore
 * Fournit la synchronisation temps réel avec Firebase
 */
export const useAppareils = () => {
  const [appareils, setAppareils] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Créer une requête pour écouter les changements en temps réel
    const q = query(collection(db, 'appareils'), orderBy('createdAt', 'desc'));
    
    // S'abonner aux changements
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const appareilsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAppareils(appareilsData);
        setLoading(false);
      },
      (err) => {
        console.error('Erreur Firestore:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    // Nettoyer l'abonnement lors du démontage
    return () => unsubscribe();
  }, []);

  // Ajouter un appareil
  const addAppareil = async (appareilData) => {
    try {
      const docRef = await addDoc(collection(db, 'appareils'), {
        ...appareilData,
        statut: 'disponible',
        emprunteur: null,
        dateEmprunt: null,
        dateRetour: null,
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (err) {
      console.error('Erreur lors de l\'ajout:', err);
      return { success: false, error: err.message };
    }
  };

  // Mettre à jour un appareil
  const updateAppareil = async (id, updates) => {
    try {
      const appareilRef = doc(db, 'appareils', id);
      await updateDoc(appareilRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
      return { success: false, error: err.message };
    }
  };

  // Supprimer un appareil
  const deleteAppareil = async (id) => {
    try {
      await deleteDoc(doc(db, 'appareils', id));
      return { success: true };
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      return { success: false, error: err.message };
    }
  };

  return {
    appareils,
    loading,
    error,
    addAppareil,
    updateAppareil,
    deleteAppareil
  };
};

/**
 * Hook personnalisé pour gérer l'historique dans Firestore
 */
export const useHistorique = () => {
  const [historique, setHistorique] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'historique'), orderBy('dateEmprunt', 'desc'));
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const historiqueData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setHistorique(historiqueData);
        setLoading(false);
      },
      (err) => {
        console.error('Erreur Firestore historique:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Ajouter une entrée d'historique
  const addHistorique = async (historiqueData) => {
    try {
      const docRef = await addDoc(collection(db, 'historique'), {
        ...historiqueData,
        createdAt: serverTimestamp()
      });
      return { success: true, id: docRef.id };
    } catch (err) {
      console.error('Erreur lors de l\'ajout à l\'historique:', err);
      return { success: false, error: err.message };
    }
  };

  // Mettre à jour une entrée d'historique
  const updateHistorique = async (id, updates) => {
    try {
      const historiqueRef = doc(db, 'historique', id);
      await updateDoc(historiqueRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'historique:', err);
      return { success: false, error: err.message };
    }
  };

  return {
    historique,
    loading,
    error,
    addHistorique,
    updateHistorique
  };
};
