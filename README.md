# Mini Application Immobilière – Test Technique CFP GROUP

## 🏗️ Architecture

### Backend (`/backend`)
- **Multi-couches** : `/routes`, `/services`, `/schemas`, `/models`
- **Validation** : Zod pour les corps et paramètres
- **API** : RESTful CRUD complet sur `/api/properties` (incluant `DELETE`)
- **Données** : tableau en mémoire (conforme au sujet)
- **Sécurité** : CORS configuré pour le développement local

### Frontend (`/frontend`)
- **3 écrans** : Liste (cards), Détail, Formulaire (création/édition)
- **Structure** : `/pages`, `/components`, `/services`, `/types`
- **Routing** : `react-router-dom`
- **Appels API** : `axios` avec proxy Vite (pas d’URLs hardcodées)
- **UI** : thème beige confortable, cartes uniformes, hover subtils

## ▶️ Lancement

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

> 💡 L’application est accessible à `http://localhost:5173`.  
> Le backend est exposé sur `http://localhost:3001`.

## 💡 Améliorations implémentées
- Interface beige chaleureuse et cohérente sur tous les écrans
- Recherche en temps réel par **titre** ou **ville**
- Validation du formulaire avec **erreurs lisibles** en ligne
- Bouton de **suppression** avec confirmation utilisateur
- Cartes de taille **uniforme** et design responsive
- Architecture modulaire prête à évoluer (sans sur-ingénierie)

## 🧠 Pourquoi cette architecture ?
- **Backend** : séparation stricte entre routes, services, modèles et schémas → facile à tester, maintenir et étendre.
- **Frontend** : découpage clair en pages/composants → évolutivité sans duplication.
- **Validation** : Zod côté backend + feedback visuel côté frontend → robustesse et UX.
- **Scalabilité** : chaque couche a une responsabilité unique, prête à accueillir de nouvelles features (ex: authentification, gestion de documents, etc.) sans remettre en cause la base.

## ✨ Remerciements
Merci pour cette opportunité de démontrer mes compétences full-stack !  
Sarra Bousnina
