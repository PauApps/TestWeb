import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PROTOTYPES_DIR = path.join(ROOT_DIR, 'src', 'prototypes');
const REGISTRY_FILE = path.join(PROTOTYPES_DIR, 'registry.ts');

// Helper to ask questions via readline
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.trim());
    })
  );
}

// Convert string to slug and PascalCase
function toSlug(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function toPascalCase(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^[a-z]/, (chr) => chr.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '');
}

// Template generators
function getBlankTemplate(componentName, title, description) {
  return `import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button, Card, CardHeader, CardTitle, CardDescription, Input, useToast, PauAppsFooter } from '../../components/ui';

export const ${componentName}: React.FC = () => {
  const { toast } = useToast();
  const [value, setValue] = useState('');

  const handleAction = () => {
    if (!value.trim()) {
      toast('Escriu alguna cosa al camp abans de continuar', 'error');
      return;
    }
    toast(\`Acció executada amb èxit: "\${value}"\`, 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-brand-100 bg-linear-to-br from-white to-brand-50/30">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-brand-100 text-brand-700 rounded-xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">${title}</h2>
            <p className="text-sm text-slate-600 mt-1">${description}</p>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Espai de Prova</CardTitle>
          <CardDescription>Introdueix dades per provar la interactivitat.</CardDescription>
        </CardHeader>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-end gap-3">
            <div className="flex-1 w-full">
              <Input
                label="Paràmetre de prova"
                placeholder="Introdueix un valor..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <Button onClick={handleAction}>
              Executar <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Referència PauApps */}
      <PauAppsFooter
        projectName="${title}"
        customText="${title} és un projecte independent creat per PauApps."
      />
    </div>
  );
};
`;
}

function getCrudTemplate(componentName, title, description) {
  return `import React, { useState } from 'react';
import { Plus, Search, Trash2, Tag } from 'lucide-react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  Input,
  Badge,
  Modal,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  useToast,
  PauAppsFooter,
} from '../../components/ui';
import { useMockStore } from '../../mocks/useMockStore';

interface MockItem {
  id: string;
  name: string;
  category: string;
  status: 'active' | 'pending' | 'draft';
  date: string;
}

const INITIAL_ITEMS: MockItem[] = [
  { id: '1', name: 'Element Demo 1', category: 'General', status: 'active', date: '2026-03-01' },
  { id: '2', name: 'Element Demo 2', category: 'Proves', status: 'pending', date: '2026-03-05' },
  { id: '3', name: 'Element Demo 3', category: 'Arxiu', status: 'draft', date: '2026-03-10' },
];

export const ${componentName}: React.FC = () => {
  const { toast } = useToast();
  const { items, add, remove, reset } = useMockStore<MockItem>(
    'store_${componentName.toLowerCase()}',
    INITIAL_ITEMS
  );

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('General');

  const filtered = items.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    add({
      name: newName.trim(),
      category: newCategory,
      status: 'active',
      date: new Date().toISOString().split('T')[0],
    });

    setNewName('');
    setIsModalOpen(false);
    toast(\`Item "\${newName}" afegit correctament!\`, 'success');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900">${title}</h1>
          <p className="text-sm text-slate-500 mt-0.5">${description}</p>
        </div>
        <Button size="sm" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4 mr-1.5" /> Nou Element
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex-1">
            <CardTitle>Llistat d'elements</CardTitle>
            <CardDescription>Les modificacions es mantenen al navegador (localStorage).</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={reset} className="text-xs text-slate-500">
            Reiniciar Dades
          </Button>
        </CardHeader>

        <div className="mb-4">
          <div className="relative max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cercar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nom</TableHeaderCell>
              <TableHeaderCell>Categoria</TableHeaderCell>
              <TableHeaderCell>Estat</TableHeaderCell>
              <TableHeaderCell>Data</TableHeaderCell>
              <TableHeaderCell className="text-right">Accions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-slate-400">
                  No s'han trobat elements.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-semibold text-slate-800">{item.name}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Tag className="w-3 h-3 text-slate-400" /> {item.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'active' ? 'success' : item.status === 'pending' ? 'warning' : 'default'}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-slate-500">{item.date}</TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() => {
                        remove(item.id);
                        toast(\`Element eliminat\`, 'info');
                      }}
                      className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Afegir Nou Element">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Nom de l'element"
            placeholder="Ex: Factura Gener, Ticket #204..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700">Categoria</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500"
            >
              <option value="General">General</option>
              <option value="Proves">Proves</option>
              <option value="Finances">Finances</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel·lar</Button>
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </Modal>

      {/* Referència PauApps */}
      <PauAppsFooter
        projectName="${title}"
        customText="${title} és un projecte independent creat per PauApps."
      />
    </div>
  );
};
`;
}

function getDashboardTemplate(componentName, title, description) {
  return `import React from 'react';
import { Activity, DollarSign, TrendingUp, Users, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, Badge, Button, useToast, PauAppsFooter } from '../../components/ui';

export const ${componentName}: React.FC = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900">${title}</h1>
          <p className="text-sm text-slate-500 mt-0.5">${description}</p>
        </div>
        <Button size="sm" onClick={() => toast('Dades de mètriques actualitzades!', 'success')}>
          Actualitzar Mètriques
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card hoverEffect>
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>TOTAL USUARIS</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">1.280</div>
          <div className="mt-1 text-xs text-emerald-600 flex items-center font-medium">
            <TrendingUp className="w-3 h-3 mr-1" /> +14% aquest mes
          </div>
        </Card>

        <Card hoverEffect>
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>INGRESSOS ESTIMATS</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">18.420 €</div>
          <div className="mt-1 text-xs text-emerald-600 flex items-center font-medium">
            <TrendingUp className="w-3 h-3 mr-1" /> +9.2% creixement
          </div>
        </Card>

        <Card hoverEffect>
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>ACTIVITAT EN DIRECTE</span>
            <Activity className="w-4 h-4 text-purple-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">94.8%</div>
          <div className="mt-1 text-xs text-slate-400">Temps de resposta òptim</div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activitat Recent</CardTitle>
          <CardDescription>Flux simulador d'esdeveniments del projecte.</CardDescription>
        </CardHeader>
        <div className="space-y-3">
          {[
            { id: 1, text: 'Nou usuari registrat a la plataforma', time: 'Fa 5 min', badge: 'Usuaris' },
            { id: 2, text: 'Pagament confirmat de 240 €', time: 'Fa 23 min', badge: 'Finances' },
            { id: 3, text: 'Backup automàtic completat amb èxit', time: 'Fa 2 hores', badge: 'Sistema' },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2.5">
                <Badge variant="info">{item.badge}</Badge>
                <span className="text-sm text-slate-700 font-medium">{item.text}</span>
              </div>
              <span className="text-xs text-slate-400">{item.time}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Referència PauApps */}
      <PauAppsFooter
        projectName="${title}"
        customText="${title} és un projecte independent creat per PauApps."
      />
    </div>
  );
};
`;
}

function getFormTemplate(componentName, title, description) {
  return `import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Button, Card, CardHeader, CardTitle, CardDescription, Input, useToast, PauAppsFooter } from '../../components/ui';

export const ${componentName}: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    email: '',
    type: 'Consulta General',
    notes: '',
    subscribed: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.email) {
      toast('Sisplau, omple els camps obligatoris', 'error');
      return;
    }
    toast(\`Formulari enviat correctament per: \${formData.title}\`, 'success');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>${title}</CardTitle>
            <CardDescription>${description}</CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nom del projecte o sol·licitant *"
            placeholder="Ex. Projecte Alfa"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <Input
            label="Correu electrònic de contacte *"
            type="email"
            placeholder="contacte@empresa.cat"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700">Tipologia de sol·licitud</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500"
            >
              <option value="Consulta General">Consulta General</option>
              <option value="Pressupost">Sol·licitud de Pressupost</option>
              <option value="Suport Tècnic">Suport Tècnic</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700">Notes addicionals / Requisits</label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Escriu qualsevol detall rellevant..."
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="sub"
              checked={formData.subscribed}
              onChange={(e) => setFormData({ ...formData, subscribed: e.target.checked })}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <label htmlFor="sub" className="text-xs text-slate-600 select-none">
              Rebre notificacions d'estat del mock
            </label>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <Button type="submit">
              <Send className="w-4 h-4 mr-1.5" /> Enviar Formulari
            </Button>
          </div>
        </form>
      </Card>

      {/* Referència PauApps */}
      <PauAppsFooter
        projectName="${title}"
        customText="${title} és un projecte independent creat per PauApps."
      />
    </div>
  );
};
`;
}

// Main runner
async function main() {
  const args = process.argv.slice(2);
  let title = args[0];
  let category = args[1];
  let preset = args[2]?.toLowerCase();

  console.log('\n⚡ Generador Ràpid de Templates per a Mocks ⚡\n');

  if (!title) {
    title = await askQuestion('👉 Nom del projecte / mock (ex. Botiga Online, CRM): ');
  }
  if (!title) {
    console.error('❌ Cal especificar un nom.');
    process.exit(1);
  }

  if (!category) {
    category = await askQuestion('👉 Categoria (ex. E-commerce, SaaS, Intern, Landing) [SaaS]: ');
    if (!category) category = 'SaaS';
  }

  if (!preset) {
    console.log('\nTipus de plantilla disponibles:');
    console.log('  1) blank     - Plantilla mínima i neta amb targeta i botó d\'acció');
    console.log('  2) crud      - Taula interactiva completa amb modal de creació, cerca i localStorage');
    console.log('  3) dashboard - Tauler amb targetes de mètriques KPI i flux d\'activitat');
    console.log('  4) form      - Formulari detallat amb validació i camps variats');
    const choice = await askQuestion('\nTria una opció (1-4 o nom) [1]: ');
    if (choice === '2' || choice === 'crud') preset = 'crud';
    else if (choice === '3' || choice === 'dashboard') preset = 'dashboard';
    else if (choice === '4' || choice === 'form') preset = 'form';
    else preset = 'blank';
  }

  const slug = toSlug(title);
  const basePascal = toPascalCase(title);
  const componentName = `${basePascal}Prototype`;
  const description = `Prototip de mock ràpid per a ${title}.`;

  const targetDir = path.join(PROTOTYPES_DIR, slug);
  const targetFile = path.join(targetDir, `${componentName}.tsx`);

  if (fs.existsSync(targetFile)) {
    console.error(`❌ El fitxer ja existeix a: ${targetFile}`);
    process.exit(1);
  }

  // Create folder
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Generate code according to preset
  let content = '';
  let badge = 'Mock';
  if (preset === 'crud') {
    content = getCrudTemplate(componentName, title, description);
    badge = 'CRUD';
  } else if (preset === 'dashboard') {
    content = getDashboardTemplate(componentName, title, description);
    badge = 'Mètriques';
  } else if (preset === 'form') {
    content = getFormTemplate(componentName, title, description);
    badge = 'Form';
  } else {
    content = getBlankTemplate(componentName, title, description);
    badge = 'Base';
  }

  fs.writeFileSync(targetFile, content, 'utf-8');
  console.log(`✅ Creat nou fitxer: src/prototypes/${slug}/${componentName}.tsx`);

  // Update registry.ts
  let registryContent = fs.readFileSync(REGISTRY_FILE, 'utf-8');
  const importStatement = `import { ${componentName} } from './${slug}/${componentName}';\n`;

  // Insert import at the top after other prototype imports
  const lastImportIndex = registryContent.lastIndexOf("import {");
  const endOfImportsIndex = registryContent.indexOf(";", lastImportIndex) + 1;
  registryContent =
    registryContent.slice(0, endOfImportsIndex) +
    '\n' +
    importStatement +
    registryContent.slice(endOfImportsIndex);

  // Insert entry into PROTOTYPES array
  const arrayClosingIndex = registryContent.lastIndexOf('];');
  const newEntry = `  {
    id: '${slug}',
    title: '${title.replace(/'/g, "\\'")}',
    category: '${category.replace(/'/g, "\\'")}',
    description: '${description.replace(/'/g, "\\'")}',
    component: ${componentName},
    badge: '${badge}',
    overview: 'Prototip de mock per a ${title.replace(/'/g, "\\'")}. Creat amb la plantilla ${preset}.',
    sections: [
      { title: 'Secció Principal', description: 'Interfície principal i components interactius.' },
    ],
  },\n`;

  registryContent =
    registryContent.slice(0, arrayClosingIndex) +
    newEntry +
    registryContent.slice(arrayClosingIndex);

  fs.writeFileSync(REGISTRY_FILE, registryContent, 'utf-8');
  console.log(`✅ Registrat automàticament a: src/prototypes/registry.ts`);

  console.log(`\n🎉 Template creat amb èxit!`);
  console.log(`👉 Ja el pots veure al desplegable de la web ([http://localhost:3000](http://localhost:3000)).`);
  console.log(`👉 Pots editar el component directament a: src/prototypes/${slug}/${componentName}.tsx\n`);
}

main().catch((err) => {
  console.error('Error executant el generador:', err);
  process.exit(1);
});
