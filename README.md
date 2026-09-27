# 🧪 Proves SPA Hub - Ecosistema de Mocks Ràpids

Aquest ecosistema està dissenyat per provar ràpidament idees, crear prototips funcionals i fer mocks interactius de projectes web Single Page en qüestió de minuts, sense haver de configurar projectes des de zero cada vegada.

---

## 🚀 Comandes principals

- **Arrencar en desenvolupament (Live Reload):**
  ```bash
  npm run dev
  ```
- **Generar un nou Mock/Template automàticament:**
  ```bash
  # Mode interactiu (et preguntarà nom, categoria i tipus)
  npm run new

  # O en una sola línia amb arguments:
  npm run new -- "Nom del Mock" "Categoria" "crud"
  # Opcions de plantilla: blank | crud | dashboard | form
  ```
- **Compilar per a producció:**
  ```bash
  npm run build
  ```
- **Previsualitzar la compilació:**
  ```bash
  npm run preview
  ```

---

## 🌟 Funcionalitats Globals de l'Ecosistema

1. **Selector d'Idioma (Mode IATA)**:
   - Suport per als 10 idiomes més parlats del món (`en`, `zh`, `hi`, `es`, `fr`, `ar`, `bn`, `pt`, `ru`, `ur`) més `ca` per defecte.
   - Suport per escriure qualsevol codi IATA/ISO lliurement amb canvi automàtic de direcció de text (LTR / RTL).

2. **Dossier Tècnic & Descàrrega PDF amb Prompts d'IA**:
   - Cada mock disposa de metadades de visió global, detall d'apartats i un prompt preparat per generar-lo amb IA.
   - Botó **"PDF"** a la barra superior per generar i descarregar el fitxer PDF A4 a l'instant.

3. **Compartir enllaç en Mode Net (`?pure=true`)**:
   - Botó **"Compartir"** que genera un link directe.
   - El destinatari que obre aquest link veu exclusivament el mock web completament net, sense la barra del hub ni cap interfície de proves.

---

## 📁 Estructura del Projecte

```text
000-Proves/
├── src/
│   ├── components/
│   │   └── ui/              # Components d'interfície reutilitzables (Button, Card, Input, Modal, Table, Badge, Toast)
│   ├── mocks/               # Eines de prototipatge
│   │   ├── fakeApi.ts       # Simulador de latència i errors HTTP
│   │   ├── mockData.ts      # Conjunts de dades inicials (usuaris, projectes, mètriques)
│   │   └── useMockStore.ts  # Hook reactiu amb persistència opcional a localStorage
│   ├── prototypes/          # Mocks independents de cada projecte
│   │   ├── dashboard/       # Prototip d'exemple complet (CRM & Dashboard)
│   │   ├── blank-template/  # Plantilla en blanc per iniciar nous mocks
│   │   └── registry.ts      # Registre central de prototips visibles al desplegable
│   ├── utils/
│   │   └── cn.ts            # Utilitat Tailwind per combinar classes
│   ├── App.tsx              # Shell amb selector de prototips i mode pantalla completa
│   ├── index.css            # Estils globals i Tailwind CSS
│   └── main.tsx             # Punt d'entrada de React
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## ⚡ Com afegir un nou Mock o Prova en 3 passos

1. **Crea el teu fitxer de component:**
   Copia la plantilla de `src/prototypes/blank-template/` o crea un fitxer nou, per exemple:
   `src/prototypes/meu-projecte/MeuProjecte.tsx`

2. **Registra el teu prototip a `src/prototypes/registry.ts`:**
   ```typescript
   import { MeuProjecte } from './meu-projecte/MeuProjecte';

   export const PROTOTYPES: PrototypeDefinition[] = [
     // ...
     {
       id: 'meu-projecte',
       title: 'El Meu Nou Projecte',
       category: 'Landing / E-commerce / SaaS',
       description: 'Descripció breu del que fa el mock.',
       component: MeuProjecte,
     },
   ];
   ```

3. **Fet!**
   El nou mock apareixerà instantàniament al desplegable superior de la interfície. Pots prémer **"Mode Mock Pur"** per amagar la barra de navegació i presentar el mock com si fos l'aplicació final.

---

## 🧰 Utilitats disponibles llestes per fer servir

- **Persistència local:**
  ```typescript
  import { useMockStore } from '@/mocks/useMockStore';

  const { items, add, update, remove, reset } = useMockStore('clau_unica', dadesInicials);
  ```
- **Notificacions Toast:**
  ```typescript
  import { useToast } from '@/components/ui';

  const { toast } = useToast();
  toast('Acció completada amb èxit!', 'success');
  ```
- **Simulació d'API asíncrona:**
  ```typescript
  import { simulateApiCall } from '@/mocks/fakeApi';

  const resultat = await simulateApiCall(dades, { delayMs: 700 });
  ```
