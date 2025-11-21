# LEGALEO – Plateforme d’onboarding juridique (Next.js)

LEGALEO est une application web d’onboarding juridique pour réseaux de franchise / enseignes.  
Elle permet notamment :

- la création d’un **workspace** (espace de travail) par enseigne,
- l’**onboarding général** de l’utilisateur / de l’entreprise,
- l’**onboarding juridique** via un questionnaire dynamique,
- l’intégration avec l’API **DataInfogreffe** (avec mise en cache en base),
- l’authentification via **Google** et **Microsoft Entra ID**.

---

## 🧱 Stack technique

- **Framework** : [Next.js](https://nextjs.org/) (App Router)
- **Langage** : TypeScript
- **Base de données** : PostgreSQL (hébergée via Supabase)
- **ORM** : Prisma
- **Auth** : Auth.js / NextAuth (Google + Microsoft Entra ID)
- **UI** : React, composants internes (et potentiellement shadcn/ui / Tailwind selon ton setup)
- **Intégrations externes** :
  - API **DataInfogreffe** pour récupérer les informations légales d’une entité
  - Stockage des réponses d’onboarding (général + juridique)

---

## 📂 Structure du projet (simplifiée)

```text
.
├── app/
│   ├── api/
│   │   ├── auth/...[routes Auth.js]
│   │   └── onboarding/...[routes onboarding]
│   ├── onboarding/
│   │   ├── general/      # Onboarding général
│   │   └── juridique/    # Onboarding juridique
│   ├── (autres pages)...
│
├── prisma/
│   ├── schema.prisma     # Schéma Prisma
│   └── migrations/       # Migrations Prisma
│
├── lib/
│   ├── prisma.ts         # Client Prisma
│   └── (utils).ts
│
├── public/
│
├── package.json
├── README.md
└── ...
