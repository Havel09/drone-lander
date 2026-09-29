# Drone Lander — PWA de téléchargement

Page web installable (PWA) qui héberge l'APK Android du jeu, avec un bouton
« Télécharger l'APK » et la possibilité d'installer l'app directement depuis le
navigateur.

## Contenu

- `index.html` — la page (téléchargement de l'APK + bouton d'installation PWA)
- `manifest.json` — nom, icônes, affichage standalone
- `sw.js` — service worker (mode hors-ligne pour la page, l'APK n'est pas mis en cache)
- `icons/` — icônes 180 / 192 / 512 px générées depuis `drone1.png`
- `drone-lander.apk` — l'APK Android (copie de `DroneCordova\...\app-debug.apk`)

## Pour mettre à jour l'APK

```powershell
Copy-Item "C:\Users\Admin\Downloads\DroneCordova\dronecom\platforms\android\app\build\outputs\apk\debug\app-debug.apk" `
          "C:\Users\Admin\Downloads\DronePWA\drone-lander.apk" -Force
```

## Pour héberger (il faut HTTPS pour l'installation PWA et le service worker)

- **Test en local** : `npx serve C:\Users\Admin\Downloads\DronePWA` puis ouvrir
  `http://localhost:3000` (localhost est autorisé pour les PWA).
- **En ligne conseillé** :
  - Netlify Drop : glisser-déposer le dossier `DronePWA` sur https://app.netlify.com/drop
  - GitHub Pages : pousser le dossier dans un dépôt, activer Pages
  - Vercel : `vercel --prod` depuis le dossier

## Rappel install Android

1. Télécharger l'APK → ouvrir le fichier
2. Autoriser « Sources inconnues » si demandé
3. Lancer l'application

> L'APK est auto-signé (debug). Pour une distribution officielle, il faudra
> signer un APK de release avec sa propre clé (`cordova build android --release`).