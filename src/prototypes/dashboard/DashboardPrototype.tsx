import React, { useState } from 'react';
import {
  Users,
  TrendingUp,
  FolderKanban,
  DollarSign,
  Plus,
  Search,
  Trash2,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
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
import { INITIAL_USERS, MockUser } from '../../mocks/mockData';
import { simulateApiCall } from '../../mocks/fakeApi';
import { useI18n } from '../../i18n/I18nContext';

const STRINGS: Record<string, any> = {
  ca: {
    title: 'Tauler de Control & Projectes',
    badge: 'Mock Interactiu',
    subtitle: 'Exemple de prototip ràpid amb gestió d\'usuaris, mètriques en viu i persistència local.',
    syncBtn: 'Sincronitzar API',
    newUserBtn: 'Nou Usuari',
    totalUsers: 'Usuaris Totals',
    monthlyRevenue: 'Facturació Mensual',
    activeProjects: 'Projectes Actius',
    conversionRate: 'Taxa de Conversió',
    cardTitle: 'Membres de l\'Equip & Rols',
    cardSub: 'Gestiona els accessos dels usuaris al sistema (les modificacions es desen a localStorage).',
    resetBtn: 'Reiniciar Dades Mock',
    searchPlaceholder: 'Cercar per nom o correu...',
    allRoles: 'Tots els rols',
    colUser: 'Usuari',
    colRole: 'Rol',
    colStatus: 'Estat',
    colDate: 'Data Alta',
    colActions: 'Accions',
    statusActive: 'Actiu',
    statusPending: 'Pendent',
    statusInactive: 'Inactiu',
    modalTitle: 'Crear Nou Membre d\'Equip',
    labelName: 'Nom complet',
    labelEmail: 'Correu electrònic',
    labelRole: 'Rol a l\'organització',
    cancelBtn: 'Cancel·lar',
    saveBtn: 'Guardar Membre',
  },
  en: {
    title: 'CRM & Projects Dashboard',
    badge: 'Interactive Mock',
    subtitle: 'Rapid prototype example with user management, live metrics, and local persistence.',
    syncBtn: 'Sync API',
    newUserBtn: 'New User',
    totalUsers: 'Total Users',
    monthlyRevenue: 'Monthly Revenue',
    activeProjects: 'Active Projects',
    conversionRate: 'Conversion Rate',
    cardTitle: 'Team Members & Roles',
    cardSub: 'Manage team access privileges (changes are saved to localStorage).',
    resetBtn: 'Reset Mock Data',
    searchPlaceholder: 'Search by name or email...',
    allRoles: 'All roles',
    colUser: 'User',
    colRole: 'Role',
    colStatus: 'Status',
    colDate: 'Joined Date',
    colActions: 'Actions',
    statusActive: 'Active',
    statusPending: 'Pending',
    statusInactive: 'Inactive',
    modalTitle: 'Create New Team Member',
    labelName: 'Full name',
    labelEmail: 'Email address',
    labelRole: 'Role in organization',
    cancelBtn: 'Cancel',
    saveBtn: 'Save Member',
  },
  es: {
    title: 'Panel de Control y Proyectos',
    badge: 'Mock Interactivo',
    subtitle: 'Ejemplo de prototipo rápido con gestión de usuarios, métricas y persistencia local.',
    syncBtn: 'Sincronizar API',
    newUserBtn: 'Nuevo Usuario',
    totalUsers: 'Usuarios Totales',
    monthlyRevenue: 'Facturación Mensual',
    activeProjects: 'Proyectos Activos',
    conversionRate: 'Tasa de Conversión',
    cardTitle: 'Miembros del Equipo y Roles',
    cardSub: 'Gestiona los accesos de los usuarios (las modificaciones se guardan en localStorage).',
    resetBtn: 'Reiniciar Datos Mock',
    searchPlaceholder: 'Buscar por nombre o correo...',
    allRoles: 'Todos los roles',
    colUser: 'Usuario',
    colRole: 'Rol',
    colStatus: 'Estado',
    colDate: 'Fecha Alta',
    colActions: 'Acciones',
    statusActive: 'Activo',
    statusPending: 'Pendiente',
    statusInactive: 'Inactivo',
    modalTitle: 'Crear Nuevo Miembro del Equipo',
    labelName: 'Nombre completo',
    labelEmail: 'Correo electrónico',
    labelRole: 'Rol en la organización',
    cancelBtn: 'Cancelar',
    saveBtn: 'Guardar Miembro',
  },
  fr: {
    title: 'Tableau de Bord & Projets',
    badge: 'Mock Interactif',
    subtitle: 'Exemple de prototype rapide avec gestion des utilisateurs, métriques et persistance locale.',
    syncBtn: 'Synchroniser API',
    newUserBtn: 'Nouvel Utilisateur',
    totalUsers: 'Utilisateurs Totaux',
    monthlyRevenue: 'Chiffre d\'Affaires Mensuel',
    activeProjects: 'Projets Actifs',
    conversionRate: 'Taux de Conversion',
    cardTitle: 'Membres de l\'Équipe & Rôles',
    cardSub: 'Gérez les accès des utilisateurs (modifications enregistrées dans localStorage).',
    resetBtn: 'Réinitialiser les Données',
    searchPlaceholder: 'Rechercher par nom ou email...',
    allRoles: 'Tous les rôles',
    colUser: 'Utilisateur',
    colRole: 'Rôle',
    colStatus: 'Statut',
    colDate: 'Date d\'inscription',
    colActions: 'Actions',
    statusActive: 'Actif',
    statusPending: 'En attente',
    statusInactive: 'Inactif',
    modalTitle: 'Créer un Nouveau Membre',
    labelName: 'Nom complet',
    labelEmail: 'Adresse email',
    labelRole: 'Rôle dans l\'organisation',
    cancelBtn: 'Annuler',
    saveBtn: 'Enregistrer',
  },
  zh: {
    title: 'CRM 与项目仪表板',
    badge: '交互式模型',
    subtitle: '快速原型示例，包含用户管理、实时指标和本地存储持久化。',
    syncBtn: '同步 API',
    newUserBtn: '新建用户',
    totalUsers: '用户总数',
    monthlyRevenue: '月度收入',
    activeProjects: '活跃项目',
    conversionRate: '转化率',
    cardTitle: '团队成员与角色',
    cardSub: '管理团队访问权限（更改会自动保存到 localStorage）。',
    resetBtn: '重置模拟数据',
    searchPlaceholder: '按姓名或邮箱搜索...',
    allRoles: '所有角色',
    colUser: '用户',
    colRole: '角色',
    colStatus: '状态',
    colDate: '加入日期',
    colActions: '操作',
    statusActive: '活跃',
    statusPending: '待审核',
    statusInactive: '未激活',
    modalTitle: '创建新团队成员',
    labelName: '全名',
    labelEmail: '电子邮件',
    labelRole: '团队角色',
    cancelBtn: '取消',
    saveBtn: '保存成员',
  },
  hi: {
    title: 'सीआरएम और प्रोजेक्ट्स डैशबोर्ड',
    badge: 'इंटरैक्टिव मॉक',
    subtitle: 'उपयोगकर्ता प्रबंधन, वास्तविक मीट्रिक और स्थानीय संग्रहण के साथ त्वरित प्रोटोटाइप।',
    syncBtn: 'सिंक एपीआई',
    newUserBtn: 'नया उपयोगकर्ता',
    totalUsers: 'कुल उपयोगकर्ता',
    monthlyRevenue: 'मासिक राजस्व',
    activeProjects: 'सक्रिय प्रोजेक्ट',
    conversionRate: 'रूपांतरण दर',
    cardTitle: 'टीम के सदस्य और भूमिकाएं',
    cardSub: 'टीम के एक्सेस प्रबंधित करें (बदलाव localStorage में सहेजे जाते हैं)।',
    resetBtn: 'डेटा रीसेट करें',
    searchPlaceholder: 'नाम या ईमेल से खोजें...',
    allRoles: 'सभी भूमिकाएं',
    colUser: 'उपयोगकर्ता',
    colRole: 'भूमिका',
    colStatus: 'स्थिति',
    colDate: 'शामिल होने की तिथि',
    colActions: 'कार्रवाई',
    statusActive: 'सक्रिय',
    statusPending: 'लंबित',
    statusInactive: 'निष्क्रिय',
    modalTitle: 'नया सदस्य जोड़ें',
    labelName: 'पूरा नाम',
    labelEmail: 'ईमेल पता',
    labelRole: 'संगठन में भूमिका',
    cancelBtn: 'रद्द करें',
    saveBtn: 'सदस्य सहेजें',
  },
  ar: {
    title: 'لوحة تحكم إدارة العملاء والمشاريع',
    badge: 'نموذج تفاعلي',
    subtitle: 'مثال على نموذج أولي سريع مع إدارة المستخدمين والمقاييس والتخزين المحلي.',
    syncBtn: 'مزامنة الواجهة',
    newUserBtn: 'مستخدم جديد',
    totalUsers: 'إجمالي المستخدمين',
    monthlyRevenue: 'الإيرادات الشهرية',
    activeProjects: 'المشاريع النشطة',
    conversionRate: 'معدل التحويل',
    cardTitle: 'أعضاء الفريق والأدوار',
    cardSub: 'إدارة صلاحيات الوصول (يتم حفظ التعديلات في التخزين المحلي).',
    resetBtn: 'إعادة ضبط البيانات',
    searchPlaceholder: 'البحث بالاسم أو البريد...',
    allRoles: 'كل الأدوار',
    colUser: 'المستخدم',
    colRole: 'الدور',
    colStatus: 'الحالة',
    colDate: 'تاريخ الانضمام',
    colActions: 'الإجراءات',
    statusActive: 'نشط',
    statusPending: 'معلق',
    statusInactive: 'غير نشط',
    modalTitle: 'إنشاء عضو فريق جديد',
    labelName: 'الاسم الكامل',
    labelEmail: 'البريد الإلكتروني',
    labelRole: 'الدور في الفريق',
    cancelBtn: 'إلغاء',
    saveBtn: 'حفظ العضو',
  },
  bn: {
    title: 'সিআরএম ও প্রজেক্টস ড্যাশবোর্ড',
    badge: 'ইন্টারেক্টিভ ডেমো',
    subtitle: 'ব্যবহারকারী ব্যবস্থাপনা, লাইভ মেট্রিক্স এবং লোকাল স্টোরেজ সহ প্রোটোটাইপ।',
    syncBtn: 'এপিআই সিঙ্ক',
    newUserBtn: 'নতুন ব্যবহারকারী',
    totalUsers: 'মোট ব্যবহারকারী',
    monthlyRevenue: 'মাসিক আয়',
    activeProjects: 'সক্রিয় প্রজেক্ট',
    conversionRate: 'রূপান্তর হার',
    cardTitle: 'দলের সদস্য ও ভূমিকা',
    cardSub: 'অ্যাক্সেস পরিচালনা করুন (পরিবর্তনগুলি স্বয়ংক্রিয়ভাবে সংরক্ষিত থাকে)।',
    resetBtn: 'রিসেট ডাটা',
    searchPlaceholder: 'নাম বা ইমেইল দিয়ে খুঁজুন...',
    allRoles: 'সকল ভূমিকা',
    colUser: 'ব্যবহারকারী',
    colRole: 'ভূমিকা',
    colStatus: 'অবস্থা',
    colDate: 'যোগদানের তারিখ',
    colActions: 'পদক্ষেপ',
    statusActive: 'সক্রিয়',
    statusPending: 'অপেক্ষমাণ',
    statusInactive: 'নিষ্ক্রিয়',
    modalTitle: 'নতুন সদস্য তৈরি করুন',
    labelName: 'সম্পূর্ণ নাম',
    labelEmail: 'ইমেইল ঠিকানা',
    labelRole: 'প্রতিষ্ঠানে ভূমিকা',
    cancelBtn: 'বাতিল',
    saveBtn: 'সংরক্ষণ করুন',
  },
  pt: {
    title: 'Painel de Controlo CRM e Projetos',
    badge: 'Mock Interativo',
    subtitle: 'Exemplo de protótipo rápido com gestão de utilizadores, métricas e persistência local.',
    syncBtn: 'Sincronizar API',
    newUserBtn: 'Novo Utilizador',
    totalUsers: 'Total de Utilizadores',
    monthlyRevenue: 'Faturação Mensal',
    activeProjects: 'Projetos Ativos',
    conversionRate: 'Taxa de Conversão',
    cardTitle: 'Membros da Equipa e Funções',
    cardSub: 'Faça a gestão dos acessos da equipa (as alterações são guardadas no localStorage).',
    resetBtn: 'Repor Dados Mock',
    searchPlaceholder: 'Pesquisar por nome ou e-mail...',
    allRoles: 'Todas as funções',
    colUser: 'Utilizador',
    colRole: 'Função',
    colStatus: 'Estado',
    colDate: 'Data de Entrada',
    colActions: 'Ações',
    statusActive: 'Ativo',
    statusPending: 'Pendente',
    statusInactive: 'Inativo',
    modalTitle: 'Criar Novo Membro da Equipa',
    labelName: 'Nome completo',
    labelEmail: 'Endereço de e-mail',
    labelRole: 'Função na organização',
    cancelBtn: 'Cancelar',
    saveBtn: 'Guardar Membro',
  },
  ru: {
    title: 'Панель управления проектами и CRM',
    badge: 'Интерактивный мок',
    subtitle: 'Быстрый прототип с управлением пользователями, метриками и локальным сохранением.',
    syncBtn: 'Синхронизация API',
    newUserBtn: 'Новый пользователь',
    totalUsers: 'Всего пользователей',
    monthlyRevenue: 'Выручка за месяц',
    activeProjects: 'Активные проекты',
    conversionRate: 'Конверсия',
    cardTitle: 'Команда и роли',
    cardSub: 'Управление доступом сотрудников (данные сохраняются в localStorage).',
    resetBtn: 'Сбросить данные',
    searchPlaceholder: 'Поиск по имени или email...',
    allRoles: 'Все роли',
    colUser: 'Пользователь',
    colRole: 'Роль',
    colStatus: 'Статус',
    colDate: 'Дата добавления',
    colActions: 'Действия',
    statusActive: 'Активен',
    statusPending: 'В ожидании',
    statusInactive: 'Неактивен',
    modalTitle: 'Добавить нового сотрудника',
    labelName: 'Полное имя',
    labelEmail: 'Электронная почта',
    labelRole: 'Роль в организации',
    cancelBtn: 'Отмена',
    saveBtn: 'Сохранить',
  },
  ur: {
    title: 'سی آر ایم اور پروجیکٹس ڈیش بورڈ',
    badge: 'انٹرایکٹو نمونہ',
    subtitle: 'صارفین کے انتظام، لائیو میٹرکس اور لوکل اسٹوریج کے ساتھ فوری پروٹوٹائپ۔',
    syncBtn: 'اے پی آئی سنک',
    newUserBtn: 'نیا صارف',
    totalUsers: 'کل صارفین',
    monthlyRevenue: 'ماہانہ آمدنی',
    activeProjects: 'فعال پروجیکٹس',
    conversionRate: 'کنورژن ریٹ',
    cardTitle: 'ٹیم ممبران اور کردار',
    cardSub: 'ٹیم کی رسائی کا انتظام کریں (تبدیلیاں لوکل اسٹوریج میں محفوظ ہوتی ہیں)۔',
    resetBtn: 'ڈیٹا ری سیٹ کریں',
    searchPlaceholder: 'نام یا ای میل سے تلاش کریں...',
    allRoles: 'تمام کردار',
    colUser: 'صارف',
    colRole: 'کردار',
    colStatus: 'حیثیت',
    colDate: 'شمولیت کی تاریخ',
    colActions: 'اقدامات',
    statusActive: 'فعال',
    statusPending: 'زیر التواء',
    statusInactive: 'غیر فعال',
    modalTitle: 'نیا ٹیم ممبر شامل کریں',
    labelName: 'مکمل نام',
    labelEmail: 'ای میل ایڈریس',
    labelRole: 'تنظیم میں کردار',
    cancelBtn: 'منسوخ کریں',
    saveBtn: 'محفوظ کریں',
  },
  de: {
    title: 'CRM- & Projekt-Dashboard',
    badge: 'Interaktiver Mock',
    subtitle: 'Schneller Prototyp mit Benutzerverwaltung, Kennzahlen und lokaler Speicherung.',
    syncBtn: 'API synchronisieren',
    newUserBtn: 'Neuer Benutzer',
    totalUsers: 'Benutzer Gesamt',
    monthlyRevenue: 'Monatlicher Umsatz',
    activeProjects: 'Aktive Projekte',
    conversionRate: 'Konversionsrate',
    cardTitle: 'Teammitglieder & Rollen',
    cardSub: 'Zugriffsrechte verwalten (Änderungen werden im localStorage gespeichert).',
    resetBtn: 'Mock-Daten zurücksetzen',
    searchPlaceholder: 'Nach Name oder E-Mail suchen...',
    allRoles: 'Alle Rollen',
    colUser: 'Benutzer',
    colRole: 'Rolle',
    colStatus: 'Status',
    colDate: 'Beitrittsdatum',
    colActions: 'Aktionen',
    statusActive: 'Aktiv',
    statusPending: 'Ausstehend',
    statusInactive: 'Inaktiv',
    modalTitle: 'Neues Teammitglied anlegen',
    labelName: 'Vollständiger Name',
    labelEmail: 'E-Mail-Adresse',
    labelRole: 'Rolle im Unternehmen',
    cancelBtn: 'Abbrechen',
    saveBtn: 'Mitglied speichern',
  },
  it: {
    title: 'Dashboard Progetti & CRM',
    badge: 'Mock Interattivo',
    subtitle: 'Prototipo rapido con gestione utenti, metriche e salvataggio locale.',
    syncBtn: 'Sincronizza API',
    newUserBtn: 'Nuovo Utente',
    totalUsers: 'Utenti Totali',
    monthlyRevenue: 'Fatturato Mensile',
    activeProjects: 'Progetti Attivi',
    conversionRate: 'Tasso di Conversione',
    cardTitle: 'Membri del Team & Ruoli',
    cardSub: 'Gestisci gli accessi del team (le modifiche sono salvate in localStorage).',
    resetBtn: 'Reimposta Dati',
    searchPlaceholder: 'Cerca per nome o email...',
    allRoles: 'Tutti i ruoli',
    colUser: 'Utente',
    colRole: 'Ruolo',
    colStatus: 'Stato',
    colDate: 'Data Iscrizione',
    colActions: 'Azioni',
    statusActive: 'Attivo',
    statusPending: 'In attesa',
    statusInactive: 'Inattivo',
    modalTitle: 'Aggiungi Nuovo Membro',
    labelName: 'Nome completo',
    labelEmail: 'Indirizzo email',
    labelRole: 'Ruolo nell\'organizzazione',
    cancelBtn: 'Annulla',
    saveBtn: 'Salva Membro',
  },
  ja: {
    title: 'CRM・プロジェクトダッシュボード',
    badge: 'インタラクティブモック',
    subtitle: 'ユーザー管理、リアルタイム指標、ローカル保存を備えた高速プロトタイプ。',
    syncBtn: 'API同期',
    newUserBtn: '新規ユーザー',
    totalUsers: '総ユーザー数',
    monthlyRevenue: '月間収益',
    activeProjects: '進行中プロジェクト',
    conversionRate: '成約率',
    cardTitle: 'チームメンバーと権限',
    cardSub: 'チームの権限を管理します（変更内容はlocalStorageに保存されます）。',
    resetBtn: 'データをリセット',
    searchPlaceholder: '名前またはメールで検索...',
    allRoles: 'すべての権限',
    colUser: 'ユーザー',
    colRole: '権限',
    colStatus: 'ステータス',
    colDate: '登録日',
    colActions: '操作',
    statusActive: '有効',
    statusPending: '保留中',
    statusInactive: '無効',
    modalTitle: '新規メンバーの追加',
    labelName: '氏名',
    labelEmail: 'メールアドレス',
    labelRole: 'チームでの役割',
    cancelBtn: 'キャンセル',
    saveBtn: 'メンバーを保存',
  },
};

export const DashboardPrototype: React.FC = () => {
  const { toast } = useToast();
  const { currentLang, currentLangInfo } = useI18n();
  const langKey = currentLang.split('-')[0].toLowerCase();
  const txt = STRINGS[langKey] || STRINGS['en'] || STRINGS['ca'];
  const isRtl = currentLangInfo?.dir === 'rtl';

  const { items: users, add: addUser, remove: removeUser, reset: resetUsers } = useMockStore<MockUser>(
    'dashboard_users',
    INITIAL_USERS
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | 'Admin' | 'Editor' | 'Viewer'>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  // Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'Admin' | 'Editor' | 'Viewer'>('Editor');

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) {
      toast('Omple tots els camps obligatoris', 'error');
      return;
    }

    addUser({
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      status: 'active',
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      createdAt: new Date().toISOString().split('T')[0],
    });

    setNewName('');
    setNewEmail('');
    setIsAddModalOpen(false);
    toast(`Usuari "${newName}" afegit correctament!`, 'success');
  };

  const handleDeleteUser = (id: string, name: string) => {
    removeUser(id);
    toast(`Usuari "${name}" eliminat`, 'info');
  };

  const handleSimulateSync = async () => {
    setIsSimulating(true);
    try {
      await simulateApiCall({ status: 'ok' }, { delayMs: 800 });
      toast('Dades sincronitzades correctament!', 'success');
    } catch {
      toast('Error en la sincronització simulada', 'error');
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="space-y-6">
      {/* Top Banner / Hero */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">{txt.title}</h1>
            <Badge variant="info">{txt.badge}</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            {txt.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSimulateSync}
            isLoading={isSimulating}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {txt.syncBtn}
          </Button>
          <Button size="sm" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4" />
            {txt.newUserBtn}
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card hoverEffect>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{txt.totalUsers}</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900">{users.length}</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +12%
            </span>
          </div>
        </Card>

        <Card hoverEffect>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{txt.monthlyRevenue}</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900">48.250 €</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +8.4%
            </span>
          </div>
        </Card>

        <Card hoverEffect>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{txt.activeProjects}</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900">14</span>
            <span className="text-xs text-slate-400">4 en revisió</span>
          </div>
        </Card>

        <Card hoverEffect>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{txt.conversionRate}</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900">3.8%</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +0.5%
            </span>
          </div>
        </Card>
      </div>

      {/* Main Content Area */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>{txt.cardTitle}</CardTitle>
            <CardDescription>
              {txt.cardSub}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={resetUsers} className="text-xs text-slate-500">
            {txt.resetBtn}
          </Button>
        </CardHeader>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={txt.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {(['All', 'Admin', 'Editor', 'Viewer'] as const).map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  roleFilter === role
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {role === 'All' ? txt.allRoles : role}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>{txt.colUser}</TableHeaderCell>
              <TableHeaderCell>{txt.colRole}</TableHeaderCell>
              <TableHeaderCell>{txt.colStatus}</TableHeaderCell>
              <TableHeaderCell>{txt.colDate}</TableHeaderCell>
              <TableHeaderCell className="text-right">{txt.colActions}</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-slate-400">
                  Sense resultats.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="font-semibold text-slate-800">{u.name}</div>
                        <div className="text-xs text-slate-400">{u.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-slate-700">{u.role}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        u.status === 'active'
                          ? 'success'
                          : u.status === 'pending'
                          ? 'warning'
                          : 'default'
                      }
                    >
                      {u.status === 'active' ? txt.statusActive : u.status === 'pending' ? txt.statusPending : txt.statusInactive}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-slate-500">{u.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() => handleDeleteUser(u.id, u.name)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar"
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

      {/* Add User Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={txt.modalTitle}
      >
        <form onSubmit={handleCreateUser} className="space-y-4">
          <Input
            label={txt.labelName}
            placeholder="Laia Soler"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
          <Input
            label={txt.labelEmail}
            type="email"
            placeholder="laia@example.cat"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-700">{txt.labelRole}</label>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as any)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            >
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={() => setIsAddModalOpen(false)}>
              {txt.cancelBtn}
            </Button>
            <Button type="submit">
              {txt.saveBtn}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Referència PauApps */}
      <PauAppsFooter
        projectName="CRM & Projectes Dashboard"
        customText="CRM & Projectes Dashboard és un projecte independent creat per PauApps."
      />
    </div>
  );
};
