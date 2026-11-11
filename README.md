# ExpressFood — application de commande de repas

Projet collectif de commande de repas : consultation du catalogue, gestion d’un panier et création d’une commande avec affectation d’un livreur disponible.

Ce dépôt contient le **frontend React**. Le backend associé est [expressfoodBack](https://github.com/mrcut/expressfoodBack).

**Stack frontend :** React 18, JavaScript, Vite 5, React Router 6, Material UI 5, Axios.  
**Ensemble fullstack :** React → API Node.js / Express → MongoDB / Mongoose.

## Fonctionnalités présentes dans le code

- Inscription, connexion et profil utilisateur.
- Catalogue avec vues plats / desserts.
- Panier avec modification des quantités et persistance dans `localStorage`.
- Récapitulatif des prix et frais de livraison.
- Création d’une commande et sélection du premier livreur au statut `free` ; alerte si aucun n’est disponible.
- Écrans de consultation des commandes.
- Écrans d’administration des produits, utilisateurs et livreurs ; navigation conditionnée par le rôle.

Le checkout crée une commande : **aucune intégration de paiement en ligne n’est présente dans le parcours examiné**. L’estimation de livraison affichée est une valeur fixe de 20 minutes dans le code, pas un suivi en temps réel.

## Démarrage local

Prérequis : Node.js / npm compatibles avec Vite 5 et une instance du backend avec MongoDB. Le dépôt ne fixe pas de version Node.

### 1. Préparer le backend

Suivre les [instructions du backend](https://github.com/mrcut/expressfoodBack#readme). En développement, le frontend appelle `http://localhost:5003` par défaut. Tous les appels passent par `src/config/api.js`.

### 2. Lancer le frontend

```sh
git clone https://github.com/mrcut/expressFood.git
cd expressFood
npm ci
npm run dev -- --port 5173 --strictPort
```

Ouvrir `http://localhost:5173`. Le backend doit utiliser `PORT=5003` et `PORT_CLIENT=http://localhost:5173` pour correspondre aux URLs et à la configuration CORS.

### 3. Explorer le parcours

Créer un compte via `/register`, puis se connecter. Préparer des produits et au moins un livreur de statut `free` dans la base de démonstration pour tester une commande. Les écrans d’administration nécessitent un compte au rôle `admin` ; aucun compte de démonstration préconfiguré n’est fourni.

## Connexion à l’API en production

Définir `VITE_API_URL=https://expressfood-back-abdellahs-projects-4bd571ad.vercel.app` dans les variables Production du projet Vercel frontend, puis redéployer. Cette URL est publique ; aucun secret ne doit être placé dans une variable `VITE_*`.

En développement, `npm run dev` utilise `http://localhost:5003` par défaut. Une variable `VITE_API_URL` locale peut remplacer cette adresse. L’origine du frontend doit être autorisée par `PORT_CLIENT` dans le backend.

## Points de lecture

| Fichier | Compétence illustrée |
| --- | --- |
| [BasketContext.jsx](src/components/contexts/BasketContext.jsx) | État partagé React et persistance du panier |
| [Checkout.jsx](src/components/basket/Checkout.jsx) | Enchaînement d’appels API et création de commande |
| [MainRoutes.jsx](src/components/routes/MainRoutes.jsx) | Routage et accès aux écrans selon la session et le rôle |

Les gardes React contrôlent l’affichage des pages. Elles ne garantissent pas à elles seules les autorisations côté serveur ; plusieurs routes backend ne sont pas protégées dans la version actuelle. L’affectation du livreur s’effectue en plusieurs requêtes et ne garantit pas une réservation atomique.

## Aperçu à compléter

> Captures réelles à ajouter : catalogue, panier et récapitulatif d’une commande avec données fictives. Aucun placeholder n’est présenté comme une capture de l’application.

## Vérifications disponibles

- `npm run build` : compilation.
- `npm run lint` : analyse ESLint.

Ces commandes existent dans `package.json`. Elles n’ont pas été exécutées lors de cette mise à jour documentaire.

## Équipe

Crédits conservés du README d’origine :

- [Nicky](https://github.com/Yikkmee) — Développeur principal.
- [Abdellah](https://github.com/Mrcut) — Développeur principal.
- [Douaa](https://github.com/Doua) — Cheffe de projet.

La répartition individuelle des fonctionnalités n’est pas documentée ici ; ce projet est présenté comme un travail collectif.
