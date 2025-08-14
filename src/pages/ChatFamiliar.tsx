import React, { useState, useEffect, useRef } from 'react';
import { Send, LogOut, Shield, Users, Lock, MessageCircle, Check, X, AlertCircle, Clock } from 'lucide-react';

// Tipos
interface User {
  id: string;
  username: string;
  password: string;
  joinedAt: string;
  lastSeen: string;
  inviteCode: string; // Código usado para registrarse
}

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  read?: boolean;
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

export default function ChatFamiliar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  
  // Form states
  const [formData, setFormData] = useState({
    inviteCode: '',
    username: '',
    password: ''
  });

  // Local Storage Keys
  const STORAGE_KEYS = {
    chatUsers: 'casaAlanizChatUsers',
    chatMessages: 'casaAlanizChatMessages',
    chatCurrentUser: 'casaAlanizChatCurrentUser',
    inviteCodes: 'casaAlanizInviteCodes',
    notifications: 'casaAlanizNotifications'
  };

  // Initialize storage
  useEffect(() => {
    initStorage();
    checkSession();
    checkInstallPrompt();
    
    // Limpiar códigos expirados
    cleanExpiredCodes();
    
    // Actualizar última conexión
    if (currentUser) {
      updateLastSeen();
    }
    
    // Polling para mensajes nuevos
    const interval = setInterval(() => {
      if (isAuthenticated) {
        loadMessages();
        updateOnlineUsers();
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isAuthenticated, currentUser]);

  // Scroll to bottom cuando hay mensajes nuevos
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initStorage = () => {
    if (!localStorage.getItem(STORAGE_KEYS.chatUsers)) {
      localStorage.setItem(STORAGE_KEYS.chatUsers, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.chatMessages)) {
      localStorage.setItem(STORAGE_KEYS.chatMessages, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.inviteCodes)) {
      localStorage.setItem(STORAGE_KEYS.inviteCodes, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.notifications)) {
      localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify([]));
    }
  };

  const checkInstallPrompt = () => {
    // Verificar si es móvil y no está instalada
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile && !isStandalone && !localStorage.getItem('installPromptDismissed')) {
      setTimeout(() => setShowInstallPrompt(true), 3000);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const cleanExpiredCodes = () => {
    const codes = JSON.parse(localStorage.getItem(STORAGE_KEYS.inviteCodes) || '[]') as InviteCode[];
    const now = new Date();
    
    const updatedCodes = codes.map(code => {
      if (code.status === 'active' && new Date(code.expiresAt) < now) {
        return { ...code, status: 'expired' as const };
      }
      return code;
    });
    
    localStorage.setItem(STORAGE_KEYS.inviteCodes, JSON.stringify(updatedCodes));
  };

  const validateInviteCode = (code: string): boolean => {
    const codes = JSON.parse(localStorage.getItem(STORAGE_KEYS.inviteCodes) || '[]') as InviteCode[];
    const inviteCode = codes.find(c => c.code === code.toUpperCase());
    
    if (!inviteCode) {
      setError('Código de invitación no válido');
      return false;
    }
    
    if (inviteCode.status === 'used') {
      setError('Este código ya ha sido utilizado');
      return false;
    }
    
    if (inviteCode.status === 'expired') {
      setError('Este código ha expirado');
      return false;
    }
    
    const now = new Date();
    if (new Date(inviteCode.expiresAt) < now) {
      setError('Este código ha expirado');
      // Actualizar estado a expirado
      inviteCode.status = 'expired';
      localStorage.setItem(STORAGE_KEYS.inviteCodes, JSON.stringify(codes));
      return false;
    }
    
    return true;
  };

  const markCodeAsUsed = (code: string, username: string) => {
    const codes = JSON.parse(localStorage.getItem(STORAGE_KEYS.inviteCodes) || '[]') as InviteCode[];
    const index = codes.findIndex(c => c.code === code.toUpperCase());
    
    if (index !== -1) {
      codes[index] = {
        ...codes[index],
        status: 'used',
        usedBy: username,
        usedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEYS.inviteCodes, JSON.stringify(codes));
      
      // Añadir notificación
      addNotification(`${username} se ha registrado usando el código ${code}`);
    }
  };

  const addNotification = (message: string) => {
    const notifications = JSON.parse(localStorage.getItem(STORAGE_KEYS.notifications) || '[]');
    notifications.push({
      id: Date.now().toString(),
      message,
      timestamp: new Date().toISOString(),
      read: false
    });
    localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(notifications));
  };

  const checkSession = () => {
    const user = localStorage.getItem(STORAGE_KEYS.chatCurrentUser);
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
      setIsAuthenticated(true);
      loadMessages();
    }
  };

  const updateLastSeen = () => {
    if (!currentUser) return;
    
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.chatUsers) || '[]') as User[];
    const index = users.findIndex(u => u.id === currentUser.id);
    
    if (index !== -1) {
      users[index].lastSeen = new Date().toISOString();
      localStorage.setItem(STORAGE_KEYS.chatUsers, JSON.stringify(users));
    }
  };

  const updateOnlineUsers = () => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.chatUsers) || '[]') as User[];
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    const online = users
      .filter(u => new Date(u.lastSeen) > fiveMinutesAgo)
      .map(u => u.username);
    
    setOnlineUsers(online);
  };

  const loadMessages = () => {
    const savedMessages = localStorage.getItem(STORAGE_KEYS.chatMessages);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const { inviteCode, username, password } = formData;
    
    if (!inviteCode || !username || !password) {
      setError('Por favor completa todos los campos');
      return;
    }
    
    // Validar código de invitación
    if (!validateInviteCode(inviteCode)) {
      return;
    }
    
    // Verificar si el usuario ya existe
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.chatUsers) || '[]') as User[];
    if (users.some(u => u.username === username)) {
      setError('Este nombre de usuario ya está en uso');
      return;
    }
    
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    // Crear nuevo usuario
    const newUser: User = {
      id: Date.now().toString(),
      username,
      password, // En producción, deberías hashear esto
      joinedAt: new Date().toISOString(),
      lastSeen: new Date().toISOString(),
      inviteCode: inviteCode.toUpperCase()
    };
    
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.chatUsers, JSON.stringify(users));
    
    // Marcar código como usado
    markCodeAsUsed(inviteCode, username);
    
    // Añadir mensaje de sistema
    const systemMessage: Message = {
      id: Date.now().toString(),
      sender: 'Sistema',
      text: `${username} se ha unido al chat familiar`,
      timestamp: new Date().toISOString()
    };
    
    const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.chatMessages) || '[]');
    messages.push(systemMessage);
    localStorage.setItem(STORAGE_KEYS.chatMessages, JSON.stringify(messages));
    
    setSuccess('¡Registro exitoso! Ahora puedes iniciar sesión');
    setFormData({ inviteCode: '', username: '', password: '' });
    
    setTimeout(() => {
      setIsRegistering(false);
      setSuccess('');
    }, 2000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const { username, password } = formData;
    
    if (!username || !password) {
      setError('Por favor completa todos los campos');
      return;
    }
    
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.chatUsers) || '[]') as User[];
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
      setError('Usuario o contraseña incorrectos');
      return;
    }
    
    // Actualizar última conexión
    user.lastSeen = new Date().toISOString();
    const index = users.findIndex(u => u.id === user.id);
    users[index] = user;
    localStorage.setItem(STORAGE_KEYS.chatUsers, JSON.stringify(users));
    
    setCurrentUser(user);
    localStorage.setItem(STORAGE_KEYS.chatCurrentUser, JSON.stringify(user));
    setIsAuthenticated(true);
    loadMessages();
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.chatCurrentUser);
    setCurrentUser(null);
    setIsAuthenticated(false);
    setFormData({ inviteCode: '', username: '', password: '' });
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageInput.trim() || !currentUser) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: currentUser.username,
      text: messageInput.trim(),
      timestamp: new Date().toISOString()
    };
    
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem(STORAGE_KEYS.chatMessages, JSON.stringify(updatedMessages));
    
    setMessageInput('');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    }
    
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Install PWA prompt
  const InstallPrompt = () => (
    <div className={`fixed bottom-20 left-4 right-4 z-50 transition-all duration-500 ${
      showInstallPrompt ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
    }`}>
      <div className="bg-alanizGreen-800 border border-alanizGold-600/30 rounded-lg p-4 shadow-lg">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-alanizGold-600 font-semibold mb-1">
              Instalar App Casa Alaniz
            </h3>
            <p className="text-parchment-300 text-sm">
              Añade el chat a tu pantalla de inicio para acceder más rápido
            </p>
          </div>
          <button
            onClick={() => {
              setShowInstallPrompt(false);
              localStorage.setItem('installPromptDismissed', 'true');
            }}
            className="text-parchment-400 hover:text-parchment-200 ml-4"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => {
              // Trigger PWA install
              if ((window as any).deferredPrompt) {
                (window as any).deferredPrompt.prompt();
              }
              setShowInstallPrompt(false);
            }}
            className="btn-alaniz text-sm py-2 px-4"
          >
            Instalar
          </button>
          <button
            onClick={() => {
              setShowInstallPrompt(false);
              localStorage.setItem('installPromptDismissed', 'true');
            }}
            className="btn-secondary text-sm py-2 px-4"
          >
            Ahora no
          </button>
        </div>
      </div>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card-elegant max-w-md w-full">
          {/* Header con escudo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-alanizGold-600/10 
                          rounded-full mb-4">
              <Shield className="w-10 h-10 text-alanizGold-600" />
            </div>
            <h1 className="text-2xl font-display font-bold text-alanizGold-600 mb-2">
              Chat Familiar Casa Alaniz
            </h1>
            <p className="text-parchment-400 text-sm italic">Memoria Ardet</p>
          </div>

          {/* Toggle entre Login y Register */}
          <div className="flex mb-6 bg-alanizGreen-900/30 rounded-lg p-1">
            <button
              onClick={() => setIsRegistering(false)}
              className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                !isRegistering 
                  ? 'bg-alanizGold-600 text-alanizGreen-950 font-semibold' 
                  : 'text-parchment-400 hover:text-parchment-200'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setIsRegistering(true)}
              className={`flex-1 py-2 px-4 rounded-md transition-all duration-200 ${
                isRegistering 
                  ? 'bg-alanizGold-600 text-alanizGreen-950 font-semibold' 
                  : 'text-parchment-400 hover:text-parchment-200'
              }`}
            >
              Registrarse
            </button>
          </div>

          {/* Formularios */}
          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
            {isRegistering && (
              <div>
                <label className="block text-alanizGold-600 text-sm font-semibold mb-2">
                  <Lock className="inline w-4 h-4 mr-1" />
                  Código de Invitación
                </label>
                <input
                  type="text"
                  value={formData.inviteCode}
                  onChange={(e) => setFormData({...formData, inviteCode: e.target.value})}
                  className="w-full px-4 py-3 bg-alanizGreen-900/30 border border-alanizGold-600/30 
                           rounded-lg text-parchment-200 placeholder-parchment-500
                           focus:outline-none focus:border-alanizGold-600 transition-colors"
                  placeholder="ALANIZ-XXXX"
                  autoComplete="off"
                />
                <p className="text-xs text-parchment-400 mt-1">
                  Solicita tu código al administrador familiar
                </p>
              </div>
            )}
            
            <div>
              <label className="block text-alanizGold-600 text-sm font-semibold mb-2">
                Nombre de Usuario
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full px-4 py-3 bg-alanizGreen-900/30 border border-alanizGold-600/30 
                         rounded-lg text-parchment-200 placeholder-parchment-500
                         focus:outline-none focus:border-alanizGold-600 transition-colors"
                placeholder="Tu nombre en la familia"
                autoComplete="username"
              />
            </div>
            
            <div>
              <label className="block text-alanizGold-600 text-sm font-semibold mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 bg-alanizGreen-900/30 border border-alanizGold-600/30 
                         rounded-lg text-parchment-200 placeholder-parchment-500
                         focus:outline-none focus:border-alanizGold-600 transition-colors"
                placeholder={isRegistering ? "Mínimo 6 caracteres" : "Tu contraseña"}
                autoComplete={isRegistering ? "new-password" : "current-password"}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 
                            border border-red-400/30 rounded-lg p-3">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
            
            {success && (
              <div className="flex items-center gap-2 text-green-400 text-sm bg-green-900/20 
                            border border-green-400/30 rounded-lg p-3">
                <Check size={16} />
                {success}
              </div>
            )}

            <button type="submit" className="btn-alaniz w-full">
              {isRegistering ? 'Unirse a la Familia' : 'Entrar al Chat'}
            </button>
          </form>

          {/* Info adicional */}
          <div className="mt-6 pt-6 border-t border-alanizGold-600/20 text-center">
            <p className="text-xs text-parchment-400">
              Chat privado exclusivo para miembros de Casa Alaniz
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header del chat */}
      <div className="bg-gradient-to-r from-alanizGreen-900 to-alanizGreen-800 
                    border-b border-alanizGold-600/30 px-4 py-3">
        <div className="content-container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-alanizGold-600/20 rounded-full flex items-center 
                          justify-center">
              <Shield className="w-6 h-6 text-alanizGold-600" />
            </div>
            <div>
              <h2 className="text-alanizGold-600 font-display font-semibold">
                Chat Casa Alaniz
              </h2>
              <p className="text-xs text-parchment-400 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                {onlineUsers.length} en línea
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-parchment-400 hover:text-alanizGold-600 transition-colors"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Área de mensajes */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-alanizGreen-950 to-alanizGreen-900">
        <div className="content-container py-4">
          {messages.length === 0 ? (
            <div className="text-center text-parchment-400 py-8">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No hay mensajes aún</p>
              <p className="text-sm mt-1">Sé el primero en escribir</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => {
                const isOwn = message.sender === currentUser?.username;
                const isSystem = message.sender === 'Sistema';
                
                if (isSystem) {
                  return (
                    <div key={message.id} className="text-center py-2">
                      <span className="text-xs text-parchment-400 bg-alanizGreen-800/50 
                                     px-3 py-1 rounded-full">
                        {message.text}
                      </span>
                    </div>
                  );
                }
                
                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${isOwn ? 'order-2' : ''}`}>
                      {!isOwn && (
                        <p className="text-xs text-alanizGold-600 mb-1 ml-2">
                          {message.sender}
                        </p>
                      )}
                      <div className={`rounded-2xl px-4 py-2 ${
                        isOwn 
                          ? 'bg-alanizGold-600 text-alanizGreen-950' 
                          : 'bg-alanizGreen-800 text-parchment-200 border border-alanizGold-600/20'
                      }`}>
                        <p className="break-words">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          isOwn ? 'text-alanizGreen-900/70' : 'text-parchment-400'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input de mensaje */}
      <form onSubmit={sendMessage} className="bg-alanizGreen-900 border-t border-alanizGold-600/30 p-4">
        <div className="content-container flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            className="flex-1 px-4 py-3 bg-alanizGreen-800/50 border border-alanizGold-600/30 
                     rounded-full text-parchment-200 placeholder-parchment-500
                     focus:outline-none focus:border-alanizGold-600 transition-colors"
            placeholder="Escribe un mensaje..."
          />
          <button
            type="submit"
            disabled={!messageInput.trim()}
            className="p-3 bg-alanizGold-600 text-alanizGreen-950 rounded-full 
                     hover:bg-alanizGold-500 disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <Send size={20} />
          </button>
        </div>
      </form>

      {/* Install prompt para PWA */}
      <InstallPrompt />
    </div>
  );
}
