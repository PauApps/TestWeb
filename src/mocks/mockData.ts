export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'active' | 'inactive' | 'pending';
  avatar: string;
  createdAt: string;
}

export interface MockProject {
  id: string;
  title: string;
  category: string;
  progress: number;
  budget: string;
  status: 'In Progress' | 'Completed' | 'On Hold';
  updatedAt: string;
}

export const INITIAL_USERS: MockUser[] = [
  {
    id: 'usr_1',
    name: 'Laia Soler',
    email: 'laia.soler@example.cat',
    role: 'Admin',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-15',
  },
  {
    id: 'usr_2',
    name: 'Marc Rovira',
    email: 'marc.rovira@example.cat',
    role: 'Editor',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-02-01',
  },
  {
    id: 'usr_3',
    name: 'Clara Puig',
    email: 'clara.puig@example.cat',
    role: 'Viewer',
    status: 'pending',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-02-14',
  },
  {
    id: 'usr_4',
    name: 'Jordi Vila',
    email: 'jordi.vila@example.cat',
    role: 'Editor',
    status: 'inactive',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-02-20',
  },
];

export const INITIAL_PROJECTS: MockProject[] = [
  {
    id: 'prj_101',
    title: 'Portal de Clients B2B',
    category: 'Web App',
    progress: 75,
    budget: '14.500 €',
    status: 'In Progress',
    updatedAt: 'Fa 2 hores',
  },
  {
    id: 'prj_102',
    title: 'App Mòbil de Repartiment',
    category: 'Mobile',
    progress: 100,
    budget: '22.000 €',
    status: 'Completed',
    updatedAt: 'Fa 1 dia',
  },
  {
    id: 'prj_103',
    title: 'Dashboard d’Analítica en Temps Real',
    category: 'Big Data',
    progress: 40,
    budget: '31.200 €',
    status: 'In Progress',
    updatedAt: 'Fa 3 dies',
  },
  {
    id: 'prj_104',
    title: 'Integració Passarel·la de Pagaments',
    category: 'Fintech',
    progress: 15,
    budget: '8.900 €',
    status: 'On Hold',
    updatedAt: 'Fa 1 setmana',
  },
];
