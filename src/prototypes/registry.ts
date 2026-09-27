import React from 'react';
import { DashboardPrototype } from './dashboard/DashboardPrototype';
import { BlankPrototype } from './blank-template/BlankPrototype';
import { BotigaOnlinePrototype } from './botiga-online/BotigaOnlinePrototype';
import { WebPsicologaPrototype } from './web-psicologa/WebPsicologaPrototype';

export interface MockSection {
  title: string;
  description: string;
}

export interface PrototypeDefinition {
  id: string;
  title: string;
  category: string;
  description: string;
  component: React.ComponentType;
  badge?: string;
  overview?: string;
  sections?: MockSection[];
}

export const PROTOTYPES: PrototypeDefinition[] = [
  {
    id: 'web-psicologa',
    title: 'Web Consulta Psicologia (Neus Solé)',
    category: 'Salut & Benestar',
    description: 'Web de presentació per a psicòloga autònoma amb àrees d\'especialitat interactives, tarifes clares, metodologia, FAQ i modal de reserva de 1a sessió.',
    component: WebPsicologaPrototype,
    badge: 'Landing',
    overview: 'Lloc web de presentació i captació per a una psicòloga sanitària autònoma. L\'objectiu és transmetre calidesa, rigor científic i confiança des del primer segon, reduint la fricció del pacient amb una primera sessió informativa gratuïta de 20 minuts i tarifes totalment transparents tant per a modalitat presencial com online.',
    sections: [
      {
        title: 'Barra de Confiança Professional',
        description: 'Dades de col·legiació oficial (COPC), ubicació física de la consulta i distintiu de 1a sessió gratuïta.',
      },
      {
        title: 'Hero de Benvinguda & Crida a l\'Acció',
        description: 'Missatge tranquil·litzador enfocat al retrobament personal, fotografia professional i acció directa per demanar cita.',
      },
      {
        title: 'Pilars Terapèutics',
        description: 'Tres targetes clau: acceptació incondicional sense judicis, eines pràctiques per al dia a dia i enfocament basat en l\'evidència (TCC, ACT, Sistèmica).',
      },
      {
        title: 'Selector Dinàmic d\'Especialitats',
        description: 'Explorador interactiu dels motius de consulta: Ansietat, Autoestima, Límits, Dols i Teràpia de Parella amb llistat de símptomes.',
      },
      {
        title: 'Sobre Mi & Despatx',
        description: 'Acreditació acadèmica (UB), trajectòria clínica de +8 anys i fotografia de l\'espai acollidor de consulta.',
      },
      {
        title: 'Metodologia Pas a Pas',
        description: 'Procés terapèutic transparent en 4 etapes: Contacte → Avaluació → Treball i eines → Alta.',
      },
      {
        title: 'Tarifes i Modalitats',
        description: 'Preus clars i desglossats: Individual Online (55€), Individual Presencial (65€) i Parella (80€).',
      },
      {
        title: 'Testimonis i FAQ',
        description: 'Opinions respectant la confidencialitat clínica i acordió desplegable de dubtes freqüents.',
      },
      {
        title: 'Modal Interactiu de Reserva de Cita',
        description: 'Formulari complet per sol·licitar la primera presa de contacte amb preferència horària i confirmació immediata.',
      },
    ],
  },
  {
    id: 'dashboard',
    title: 'CRM & Projectes Dashboard',
    category: 'B2B / SaaS',
    description: 'Tauler de control complet amb mètriques, gràfic interactiu simulat, taula CRUD amb cerca i modal de creació.',
    component: DashboardPrototype,
    badge: 'Complet',
    overview: 'Tauler de gestió intern per a equips i projectes. Permet monitoritzar KPIs clau en temps real, cercar i gestionar usuaris amb assignació de rols i persistència al navegador sense backend.',
    sections: [
      {
        title: 'Targetes de Mètriques KPI',
        description: 'Mètriques d\'usuaris totals, ingressos mensuals, projectes actius i taxes de conversió amb percentatges de creixement.',
      },
      {
        title: 'Gestor CRUD d\'Usuaris',
        description: 'Taula completa amb cerca instantània, filtre ràpid per rols (Admin, Editor, Viewer) i eliminació.',
      },
      {
        title: 'Modal de Creació',
        description: 'Formulari per donar d\'alta nous membres a l\'equip amb validació.',
      },
      {
        title: 'Sincronització Simulada d\'API',
        description: 'Botó per provar càrregues asíncrones i estats de latència de xarxa.',
      },
    ],
  },
  {
    id: 'botiga-online',
    title: 'Botiga Online',
    category: 'E-commerce',
    description: 'Prototip de mock ràpid per a Botiga Online.',
    component: BotigaOnlinePrototype,
    badge: 'CRUD',
    overview: 'Prototip ràpid per provar un flux de catàleg de productes o gestió d\'articles comercials amb afegir, cercar i eliminar elements.',
    sections: [
      {
        title: 'Catàleg / Llistat d\'articles',
        description: 'Taula interactiva de productes amb categories, estats i dates.',
      },
      {
        title: 'Filtres i Cerca',
        description: 'Camp de cerca instantània per text i filtratge per categoria.',
      },
      {
        title: 'Modal de Nou Article',
        description: 'Formulari ràpid per donar d\'alta articles a la botiga.',
      },
    ],
  },
  {
    id: 'blank-template',
    title: 'Plantilla en Blanc (Starter)',
    category: 'Template',
    description: 'Plantilla bàsica neta per duplicar i començar a dissenyar un mock des de zero en pocs segons.',
    component: BlankPrototype,
    badge: 'Base',
    overview: 'Plantilla mínima dissenyada per servir com a punt de partida per a qualsevol nou prototip dins de l\'ecosistema.',
    sections: [
      {
        title: 'Targeta Hero Starter',
        description: 'Espai per definir el propòsit del mock.',
      },
      {
        title: 'Sandbox Interactiu',
        description: 'Inputs, botons i integració directa amb el sistema de notificacions Toast.',
      },
    ],
  },
];
