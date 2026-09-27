import React, { useState } from 'react';
import { Sparkles, Code2, ArrowRight } from 'lucide-react';
import { Button, Card, CardHeader, CardTitle, CardDescription, Input, useToast, PauAppsFooter } from '../../components/ui';

export const BlankPrototype: React.FC = () => {
  const { toast } = useToast();
  const [testInput, setTestInput] = useState('');

  const handleTest = () => {
    if (!testInput) {
      toast('Escriu alguna cosa al camp abans de provar!', 'error');
      return;
    }
    toast(`Has provat l'acció amb: "${testInput}"`, 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Welcome Card */}
      <Card className="border-brand-100 bg-linear-to-br from-white to-brand-50/40">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-brand-100 text-brand-700 rounded-xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Plantilla de Prototipatge Ràpid</h2>
            <p className="text-sm text-slate-600 mt-1">
              Aquesta és una pantalla neta per començar a dissenyar el teu nou mock. Pots duplicar aquesta
              carpeta a <code className="px-1.5 py-0.5 bg-slate-100 rounded text-brand-700 font-mono text-xs">src/prototypes/el-teu-mock</code> i
              afegir-lo a <code className="px-1.5 py-0.5 bg-slate-100 rounded text-brand-700 font-mono text-xs">registry.ts</code>.
            </p>
          </div>
        </div>
      </Card>

      {/* Interactive Sandbox Example */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Zona de Proves Interactiva</CardTitle>
            <CardDescription>Comprova com funcionen els components ràpidament.</CardDescription>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <Code2 className="w-4 h-4" />
            <span>Exemple Starter</span>
          </div>
        </CardHeader>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-end gap-3">
            <div className="flex-1 w-full">
              <Input
                label="Nom del projecte o paràmetre de prova"
                placeholder="ex. Nova passarel·la Stripe..."
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
              />
            </div>
            <Button onClick={handleTest}>
              Executar Mock <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 text-xs text-slate-600 space-y-2">
            <p className="font-semibold text-slate-800">🛠 Utilitats incloses en l'ecosistema:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-500">
              <li><strong>useMockStore:</strong> Estat reactiu amb persistència opcional a localStorage</li>
              <li><strong>fakeApi:</strong> Simulador de latència i errors HTTP</li>
              <li><strong>Components UI:</strong> Button, Card, Input, Modal, Badge, Table, Toast</li>
              <li><strong>Tailwind CSS 3:</strong> Totes les utilitats de disseny preparades</li>
              <li><strong>Lucide Icons:</strong> Centenars d'icones modernes llestes</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Referència PauApps */}
      <PauAppsFooter
        projectName="Plantilla Starter"
        customText="Plantilla Starter és un projecte independent creat per PauApps."
      />
    </div>
  );
};
