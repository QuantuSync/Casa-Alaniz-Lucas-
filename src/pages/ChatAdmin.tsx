import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, Users, Key, Clock, Check, X, AlertCircle, 
  Copy, Trash2, Eye, EyeOff, Bell, UserX, RefreshCw,
  Download, ChevronDown, ChevronUp, Hash
} from 'lucide-react';

interface User {
  id: string;
  username: string;
  password: string;
  joinedAt: string;
  lastSeen: string;
  inviteCode: string;
}

interface InviteCode {
  code: string;
  createdAt: string;
  createdBy: string;
  usedBy: string | null;
  usedAt: string | null;
  status: 'active' | 'used' | 'expired';
  expiresAt: string;
  notes?: string;
}

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export default function ChatAdmin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  // Data states
  const [users, setUsers] = useState<User[]>([]);
  const [inviteCodes, setInviteCodes] = useState<InviteCode[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [messages, setMessages] = useState([]);
  
  // UI states
  const [activeTab, setActiveTab] = useState<'codes' | 'users' | 'notifications'>('codes');
  const [showNotes, setShowNotes] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    active: true,
    used: false,
    expired: false
  });

  // Storage keys
  const STORAGE_KEYS = {
    adminAuth: 'casaAlanizAdminAuth',
    adminPassword: 'casaAlanizAdminPassword',
    chatUsers: 'casaAlanizChatUsers',
    inviteCodes: 'casaAlanizInviteCodes',
    notifications: 'casaAlanizNotifications',
    chatMessages: 'casaAlanizChatMessages'
  };

  // Admin password por defecto (cambiar en primer uso)
  const DEFAULT_ADMIN_PASSWORD = 'Admin2024!';

  useEffect(() => {
    checkAdminAuth();
    if (isAuthenticated) {
      loadAllData();
      // Actualizar cada 5 segundos
      const interval = setInterval(loadAllData, 5000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const checkAdminAuth = () => {
    const auth = sessionStorage.getItem(STORAGE_KEYS.adminAuth);
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    
    // Inicializar contraseña admin si no existe
    if (!localStorage.getItem(STORAGE_KEYS.adminPassword)) {
      localStorage.setItem(STORAGE_KEYS.adminPassword, DEFAULT_ADMIN_PASSWORD);
    }
  };

  const loadAllData = () => {
    // Cargar usuarios
    const savedUsers = localStorage.getItem(STORAGE_KEYS.chatUsers);
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
    
    // Cargar códigos
    const savedCodes = localStorage.getItem(STORAGE_KEYS.inviteCodes);
    if (savedCodes) {
      const codes = JSON.parse(savedCodes);
      // Actualizar códigos expirados
      const now = new Date();
      const updatedCodes = codes.map((code: InviteCode) => {
        if (code.status === 'active' && new Date(code.expiresAt) < now) {
          return { ...code, status: 'expired' };
        }
        return code;
      });
      setInviteCodes(updatedCodes);
      localStorage.setItem(STORAGE_KEYS.inviteCodes, JSON.stringify(updatedCodes));
    }
    
    // Cargar notificaciones
    const savedNotifications = localStorage.getItem(STORAGE_KEYS.notifications);
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
    
    // Cargar mensajes para estadísticas
    const savedMessages = localStorage.getItem(STORAGE_KEYS.chatMessages);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem(STORAGE_KEYS.adminPassword);
    
    if (adminPassword === storedPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem(STORAGE_KEYS.adminAuth, 'true');
      setError('');
      loadAllData();
    } else {
      setError('Contraseña incorrecta');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEYS.adminAuth);
    setIsAuthenticated(false);
    navigate('/chat');
  };

  const generateInviteCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let suffix = '';
    for (let i = 0; i < 4; i++) {
      suffix += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    const code = `ALANIZ-${suffix}`;
    
    // Calcular fecha de expiración (7 días)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    
    const newCode: InviteCode = {
      code,
      createdAt: new Date().toISOString(),
      createdBy: 'Admin',
      usedBy: null,
      usedAt: null,
      status: 'active',
      expiresAt: expiresAt.toISOString(),
      notes: noteText || undefined
    };
    
    const updatedCodes = [...inviteCodes, newCode];
    setInviteCodes(updatedCodes);
    localStorage.setItem(STORAGE_KEYS.inviteCodes, JSON.stringify(updatedCodes));
    
    // Copiar al portapapeles
    navigator.clipboard.writeText(code);
    
    // Reset notes
    setNoteText('');
    setShowNotes(false);
    
    // Mostrar notificación temporal
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    notification.textContent = `Código ${code} copiado al portapapeles`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const deleteUser = (userId: string) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
    
    const updatedUsers = users.filter(u => u.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem(STORAGE_KEYS.chatUsers, JSON.stringify(updatedUsers));
  };

  const deleteCode = (code: string) => {
    if (!confirm('¿Estás seguro de eliminar este código?')) return;
    
    const updatedCodes = inviteCodes.filter(c => c.code !== code);
    setInviteCodes(updatedCodes);
    localStorage.setItem(STORAGE_KEYS.inviteCodes, JSON.stringify(updatedCodes));
  };

  const markNotificationAsRead = (id: string) => {
    const updatedNotifications = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updatedNotifications);
    localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(updatedNotifications));
  };

  const clearAllNotifications = () => {
    if (!confirm('¿Eliminar todas las notificaciones?')) return;
    setNotifications([]);
    localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify([]));
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    
    // Mostrar notificación temporal
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    notification.textContent = `Código ${code} copiado`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
  };

  const exportData = () => {
    const data = {
      users,
      codes: inviteCodes,
      messages,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `casa-alaniz-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `Hace ${diffMinutes} min`;
    } else if (diffHours < 24) {
      return `Hace ${diffHours}h`;
    } else if (diffDays < 7) {
      return `Hace ${diffDays} días`;
    } else {
      return date.toLocaleDateString('es-ES');
    }
  };

  const getTimeUntilExpiry = (expiryDate: string) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffMs = expiry.getTime() - now.getTime();
    
    if (diffMs < 0) return 'Expirado';
    
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} días`;
    } else {
      return `${diffHours} horas`;
    }
  };

  // Estadísticas
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      return new Date(u.lastSeen) > fiveMinutesAgo;
    }).length,
    activeCodes: inviteCodes.filter(c => c.status === 'active').length,
    usedCodes: inviteCodes.filter(c => c.status === 'used').length,
    unreadNotifications: notifications.filter(n => !n.read).length,
    todayMessages: messages.filter((m: any) => {
      const today = new Date().toDateString();
      return new Date(m.timestamp).toDateString() === today;
    }).length
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card-elegant max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600/10 
                          rounded-full mb-4">
              <Shield className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-2xl font-display font-bold text-alanizGold-600 mb-2">
              Panel de Administración
            </h1>
            <p className="text-parchment-400 text-sm">Acceso restringido</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-alanizGold-600 text-sm font-semibold mb-2">
                Contraseña de Administrador
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-alanizGreen-900/30 border border-alanizGold-600/30 
                           rounded-lg text-parchment-200 placeholder-parchment-500
                           focus:outline-none focus:border-alanizGold-600 transition-colors pr-12"
                  placeholder="Contraseña maestra"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-parchment-400 
                           hover:text-alanizGold-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 
                            border border-red-400/30 rounded-lg p-3">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button type="submit" className="btn-alaniz w-full">
              Acceder al Panel
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-alanizGold-600/20">
            <button
              onClick={() => navigate('/chat')}
              className="text-parchment-400 hover:text-alanizGold-600 text-sm transition-colors"
            >
              ← Volver al chat
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 border-b border-red-600/30 px-4 py-3">
        <div className="content-container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-red-400" />
            <h1 className="text-xl font-display font-bold text-white">
              Panel de Administración - Chat Casa Alaniz
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={exportData}
              className="text-white/70 hover:text-white transition-colors"
              title="Exportar datos"
            >
              <Download size={20} />
            </button>
            <button
              onClick={handleLogout}
              className="text-white/70 hover:text-white transition-colors"
            >
              Salir
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="content-container py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="card-elegant text-center">
            <Users className="w-8 h-8 text-alanizGold-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-parchment-200">{stats.totalUsers}</div>
            <div className="text-xs text-parchment-400">Usuarios Total</div>
          </div>
          <div className="card-elegant text-center">
            <div className="w-8 h-8 text-green-500 mx-auto mb-2 flex items-center justify-center">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
            </div>
            <div className="text-2xl font-bold text-parchment-200">{stats.activeUsers}</div>
            <div className="text-xs text-parchment-400">En Línea</div>
          </div>
          <div className="card-elegant text-center">
            <Key className="w-8 h-8 text-alanizGold-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-parchment-200">{stats.activeCodes}</div>
            <div className="text-xs text-parchment-400">Códigos Activos</div>
          </div>
          <div className="card-elegant text-center">
            <Check className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-parchment-200">{stats.usedCodes}</div>
            <div className="text-xs text-parchment-400">Códigos Usados</div>
          </div>
          <div className="card-elegant text-center">
            <Bell className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-parchment-200">{stats.unreadNotifications}</div>
            <div className="text-xs text-parchment-400">Sin Leer</div>
          </div>
          <div className="card-elegant text-center">
            <Hash className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-parchment-200">{stats.todayMessages}</div>
            <div className="text-xs text-parchment-400">Mensajes Hoy</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('codes')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'codes' 
                ? 'bg-alanizGold-600 text-alanizGreen-950' 
                : 'bg-alanizGreen-800 text-parchment-400 hover:text-parchment-200'
            }`}
          >
            Códigos de Invitación
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              activeTab === 'users' 
                ? 'bg-alanizGold-600 text-alanizGreen-950' 
                : 'bg-alanizGreen-800 text-parchment-400 hover:text-parchment-200'
            }`}
          >
            Usuarios
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all relative ${
              activeTab === 'notifications' 
                ? 'bg-alanizGold-600 text-alanizGreen-950' 
                : 'bg-alanizGreen-800 text-parchment-400 hover:text-parchment-200'
            }`}
          >
            Notificaciones
            {stats.unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs 
                             rounded-full flex items-center justify-center">
                {stats.unreadNotifications}
              </span>
            )}
          </button>
        </div>

        {/* Content */}
        {activeTab === 'codes' && (
          <div className="space-y-6">
            {/* Generate new code */}
            <div className="card-elegant">
              <h3 className="text-lg font-semibold text-alanizGold-600 mb-4">
                Generar Nuevo Código
              </h3>
              <div className="space-y-4">
                {showNotes && (
                  <input
                    type="text"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Nota opcional (ej: Para el primo Juan)"
                    className="w-full px-4 py-2 bg-alanizGreen-900/30 border border-alanizGold-600/30 
                             rounded-lg text-parchment-200 placeholder-parchment-500
                             focus:outline-none focus:border-alanizGold-600"
                  />
                )}
                <div className="flex gap-2">
                  <button
                    onClick={generateInviteCode}
                    className="btn-alaniz"
                  >
                    <Key className="w-4 h-4 mr-2" />
                    Generar Código
                  </button>
                  <button
                    onClick={() => setShowNotes(!showNotes)}
                    className="btn-secondary"
                  >
                    {showNotes ? 'Ocultar Nota' : 'Añadir Nota'}
                  </button>
                </div>
                <p className="text-xs text-parchment-400">
                  Los códigos expiran automáticamente en 7 días y son de un solo uso
                </p>
              </div>
            </div>

            {/* Active codes */}
            <div className="card-elegant">
              <button
                onClick={() => setExpandedSections({...expandedSections, active: !expandedSections.active})}
                className="w-full flex items-center justify-between text-left mb-4"
              >
                <h3 className="text-lg font-semibold text-green-500">
                  Códigos Activos ({inviteCodes.filter(c => c.status === 'active').length})
                </h3>
                {expandedSections.active ? <ChevronUp /> : <ChevronDown />}
              </button>
              
              {expandedSections.active && (
                <div className="space-y-2">
                  {inviteCodes.filter(c => c.status === 'active').map(code => (
                    <div key={code.code} className="bg-alanizGreen-900/30 rounded-lg p-3 
                                                   border border-green-500/20">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-parchment-200 font-semibold">
                              {code.code}
                            </span>
                            <button
                              onClick={() => copyCode(code.code)}
                              className="text-parchment-400 hover:text-alanizGold-600"
                            >
                              <Copy size={16} />
                            </button>
                          </div>
                          <div className="text-xs text-parchment-400 mt-1">
                            Creado {formatDate(code.createdAt)} • Expira en {getTimeUntilExpiry(code.expiresAt)}
                          </div>
                          {code.notes && (
                            <div className="text-xs text-yellow-500 mt-1">
                              Nota: {code.notes}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => deleteCode(code.code)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {inviteCodes.filter(c => c.status === 'active').length === 0 && (
                    <p className="text-parchment-400 text-center py-4">
                      No hay códigos activos
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Used codes */}
            <div className="card-elegant">
              <button
                onClick={() => setExpandedSections({...expandedSections, used: !expandedSections.used})}
                className="w-full flex items-center justify-between text-left mb-4"
              >
                <h3 className="text-lg font-semibold text-blue-500">
                  Códigos Usados ({inviteCodes.filter(c => c.status === 'used').length})
                </h3>
                {expandedSections.used ? <ChevronUp /> : <ChevronDown />}
              </button>
              
              {expandedSections.used && (
                <div className="space-y-2">
                  {inviteCodes.filter(c => c.status === 'used').map(code => (
                    <div key={code.code} className="bg-alanizGreen-900/30 rounded-lg p-3 
                                                   border border-blue-500/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-mono text-parchment-400 line-through">
                            {code.code}
                          </span>
                          <div className="text-xs text-parchment-400 mt-1">
                            Usado por <span className="text-alanizGold-600">{code.usedBy}</span> {formatDate(code.usedAt!)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="card-elegant">
            <h3 className="text-lg font-semibold text-alanizGold-600 mb-4">
              Usuarios Registrados
            </h3>
            <div className="space-y-2">
              {users.map(user => {
                const isOnline = new Date(user.lastSeen) > new Date(Date.now() - 5 * 60 * 1000);
                return (
                  <div key={user.id} className="bg-alanizGreen-900/30 rounded-lg p-3 
                                               border border-alanizGold-600/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
                        }`} />
                        <div>
                          <div className="font-semibold text-parchment-200">
                            {user.username}
                          </div>
                          <div className="text-xs text-parchment-400">
                            Registrado {formatDate(user.joinedAt)} • 
                            Última vez {formatDate(user.lastSeen)} • 
                            Código: {user.inviteCode}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <UserX size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
              {users.length === 0 && (
                <p className="text-parchment-400 text-center py-4">
                  No hay usuarios registrados aún
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="card-elegant">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-alanizGold-600">
                Notificaciones
              </h3>
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Limpiar todo
                </button>
              )}
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {notifications.sort((a, b) => 
                new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
              ).map(notification => (
                <div key={notification.id} className={`rounded-lg p-3 border ${
                  notification.read 
                    ? 'bg-alanizGreen-900/20 border-alanizGold-600/10' 
                    : 'bg-yellow-900/20 border-yellow-500/30'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-parchment-200 text-sm">
                        {notification.message}
                      </p>
                      <p className="text-xs text-parchment-400 mt-1">
                        {formatDate(notification.timestamp)}
                      </p>
                    </div>
                    {!notification.read && (
                      <button
                        onClick={() => markNotificationAsRead(notification.id)}
                        className="text-green-400 hover:text-green-300 ml-2"
                      >
                        <Check size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {notifications.length === 0 && (
                <p className="text-parchment-400 text-center py-4">
                  No hay notificaciones
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
