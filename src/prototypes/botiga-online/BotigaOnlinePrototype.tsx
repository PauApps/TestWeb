import React, { useState } from 'react';
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

export const BotigaOnlinePrototype: React.FC = () => {
  const { toast } = useToast();
  const { items, add, remove, reset } = useMockStore<MockItem>(
    'store_botigaonlineprototype',
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
    toast(`Item "${newName}" afegit correctament!`, 'success');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Botiga Online</h1>
          <p className="text-sm text-slate-500 mt-0.5">Prototip de mock ràpid per a Botiga Online.</p>
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
                        toast(`Element eliminat`, 'info');
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
        projectName="Botiga Online"
        customText="Botiga Online és un projecte independent creat per PauApps."
      />
    </div>
  );
};
