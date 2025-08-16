import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// CONFIGURACIÓN SUPABASE
const SUPABASE_URL = 'https://rbicywnjsbrbezomrnss.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiaWN5d25qc2JyYmV6b21ybnNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MjE5MDgsImV4cCI6MjA3MDQ5NzkwOH0.eVW1XGZVFmQa49-Ai2rwqSXbMdthqHHRZsCpOU3k6bw';

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  url: string;
}

interface Condecorado {
  id: string;
  nombre: string;
  fecha_otorgamiento: string;
  motivo: string;
  condecoracion: string;
  created_at?: string;
}

const condecoraciones = [
  { id: 'gran-cruz', nombre: 'Gran Cruz de la Distinción Alaniz' },
  { id: 'cruz-honor-merito', nombre: 'Cruz del Honor y el Mérito' }
];

export default function AdminPanel() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDocuments: 0,
    totalCondecoraciones: 0,
    activeUsers: 0
  });
  const [users, setUsers] = useState<any[]>([]);
  const [condecorados, setCondecorados] = useState<Condecorado[]>([]);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showDocumentManager, setShowDocumentManager] = useState(false);
  const [showCondecoracionesManager, setShowCondecoracionesManager] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [userDocuments, setUserDocuments] = useState<Document[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loadingCondecoraciones, setLoadingCondecoraciones] = useState(false);
  const [newUser, setNewUser] = useState({
    dni: '',
    name: '',
    type: 'user' as 'admin' | 'user'
  });
  const [documentForm, setDocumentForm] = useState({
    name: '',
    type: '',
    file: null as File | null
  });
  const [condecoracionForm, setCondecoracionForm] = useState({
    nombre: '',
    fechaOtorgamiento: '',
    motivo: '',
    condecoracion: ''
  });
  const navigate = useNavigate();

  // Función para cargar condecoraciones desde Supabase
  const loadCondecoracionesFromSupabase = async () => {
    setLoadingCondecoraciones(true);
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/condecoraciones?select=*&order=created_at.desc`, {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al cargar condecoraciones desde Supabase');
      }

      const data = await response.json();
      setCondecorados(data);
      return data.length;
    } catch (error) {
      console.error('Error cargando condecoraciones:', error);
      // Fallback a localStorage si falla Supabase
      const savedCondecorados = localStorage.getItem('alanizCondecorados');
      if (savedCondecorados) {
        const localData = JSON.parse(savedCondecorados);
        setCondecorados(localData);
        return localData.length;
      }
      return 0;
    } finally {
      setLoadingCondecoraciones(false);
    }
  };

  // Función para añadir condecoración a Supabase
  const addCondecoracionToSupabase = async (condecoracion: Omit<Condecorado, 'id' | 'created_at'>) => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/condecoraciones`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(condecoracion)
      });

      if (!response.ok) {
        throw new Error('Error al añadir condecoración a Supabase');
      }

      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error('Error añadiendo condecoración:', error);
      throw error;
    }
  };

  // Función para eliminar condecoración de Supabase
  const deleteCondecoracionFromSupabase = async (id: string) => {
    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/condecoraciones?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error al eliminar condecoración de Supabase');
      }
    } catch (error) {
      console.error('Error eliminando condecoración:', error);
      throw error;
    }
  };

  // Inicializar solo administrador
  const initializeAdmin = () => {
    const existingUsers = localStorage.getItem('alanizUsers');
    
    if (!existingUsers) {
      const adminUser = {
        '34323575P': {
          name: 'Administrador',
          password: '110788',
          type: 'admin',
          createdDate: new Date().toISOString()
        }
      };
      
      localStorage.setItem('alanizUsers', JSON.stringify(adminUser));
      localStorage.setItem('alanizDocuments', JSON.stringify({}));
    }
  };

  useEffect(() => {
    initializeAdmin();
    loadStats();
    loadUsers();
  }, []);

  const loadStats = async () => {
    const users = JSON.parse(localStorage.getItem('alanizUsers') || '{}');
    const documents = JSON.parse(localStorage.getItem('alanizDocuments') || '{}');
    
    let totalDocs = 0;
    Object.values(documents).forEach((userDocs: any) => {
      totalDocs += userDocs.length;
    });

    // Cargar condecoraciones desde Supabase
    const totalCondecoraciones = await loadCondecoracionesFromSupabase();

    setStats({
      totalUsers: Object.keys(users).length,
      totalDocuments: totalDocs,
      totalCondecoraciones: totalCondecoraciones,
      activeUsers: Object.keys(users).length
    });
  };

  const loadUsers = () => {
    const usersData = JSON.parse(localStorage.getItem('alanizUsers') || '{}');
    const usersList = Object.entries(usersData).map(([dni, userData]: [string, any]) => ({
      dni,
      ...userData
    }));
    setUsers(usersList);
  };

  const loadUserDocuments = (userDni: string) => {
    const allDocuments = JSON.parse(localStorage.getItem('alanizDocuments') || '{}');
    const docs = allDocuments[userDni] || [];
    setUserDocuments(docs);
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleCreateUser = () => {
    if (!newUser.dni || !newUser.name) {
      alert('DNI y nombre son obligatorios');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('alanizUsers') || '{}');
    
    if (existingUsers[newUser.dni.toUpperCase()]) {
      alert('Ya existe un usuario con ese DNI');
      return;
    }

    const password = generateRandomPassword();
    const userData = {
      name: newUser.name,
      password: password,
      type: newUser.type,
      createdDate: new Date().toISOString()
    };

    existingUsers[newUser.dni.toUpperCase()] = userData;
    localStorage.setItem('alanizUsers', JSON.stringify(existingUsers));
    
    // Crear carpeta de documentos vacía para el usuario
    const documents = JSON.parse(localStorage.getItem('alanizDocuments') || '{}');
    documents[newUser.dni.toUpperCase()] = [];
    localStorage.setItem('alanizDocuments', JSON.stringify(documents));

    setShowCreateUser(false);
    setNewUser({ dni: '', name: '', type: 'user' });
    loadStats();
    loadUsers();
    
    alert(`Usuario creado exitosamente.\n\nDNI: ${newUser.dni.toUpperCase()}\nContraseña: ${password}\n\n¡Guarda esta información!`);
  };

  const handleCreateCondecorado = async () => {
    if (!condecoracionForm.nombre || !condecoracionForm.fechaOtorgamiento || !condecoracionForm.motivo || !condecoracionForm.condecoracion) {
      alert('Todos los campos son obligatorios');
      return;
    }

    setLoadingCondecoraciones(true);

    try {
      // Intentar añadir a Supabase primero
      const nuevoCondecorado = await addCondecoracionToSupabase({
        nombre: condecoracionForm.nombre,
        fecha_otorgamiento: condecoracionForm.fechaOtorgamiento,
        motivo: condecoracionForm.motivo,
        condecoracion: condecoracionForm.condecoracion
      });

      // Actualizar estado local
      setCondecorados(prev => [nuevoCondecorado, ...prev]);

      // También guardar en localStorage como backup
      const nuevosCondecorados = [nuevoCondecorado, ...condecorados];
      localStorage.setItem('alanizCondecorados', JSON.stringify(nuevosCondecorados));

      setCondecoracionForm({ nombre: '', fechaOtorgamiento: '', motivo: '', condecoracion: '' });
      loadStats();
      
      alert('Condecorado añadido exitosamente a Supabase');
    } catch (error) {
      // Si falla Supabase, usar localStorage como fallback
      console.error('Error con Supabase, usando localStorage:', error);
      
      const nuevoCondecorado: Condecorado = {
        id: Date.now().toString(),
        nombre: condecoracionForm.nombre,
        fecha_otorgamiento: condecoracionForm.fechaOtorgamiento,
        motivo: condecoracionForm.motivo,
        condecoracion: condecoracionForm.condecoracion
      };

      const nuevosCondecorados = [...condecorados, nuevoCondecorado];
      setCondecorados(nuevosCondecorados);
      localStorage.setItem('alanizCondecorados', JSON.stringify(nuevosCondecorados));

      setCondecoracionForm({ nombre: '', fechaOtorgamiento: '', motivo: '', condecoracion: '' });
      loadStats();
      
      alert('Condecorado añadido (modo offline)');
    } finally {
      setLoadingCondecoraciones(false);
    }
  };

  const handleDeleteCondecorado = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este condecorado?')) return;

    setLoadingCondecoraciones(true);

    try {
      // Intentar eliminar de Supabase
      await deleteCondecoracionFromSupabase(id);

      // Actualizar estado local
      const nuevosCondecorados = condecorados.filter(c => c.id !== id);
      setCondecorados(nuevosCondecorados);
      localStorage.setItem('alanizCondecorados', JSON.stringify(nuevosCondecorados));
      
      loadStats();
      alert('Condecorado eliminado exitosamente');
    } catch (error) {
      console.error('Error eliminando de Supabase:', error);
      alert('Error al eliminar. Intenta de nuevo.');
    } finally {
      setLoadingCondecoraciones(false);
    }
  };

  const handleDeleteUser = (dni: string) => {
    if (!confirm(`¿Estás seguro de eliminar al usuario ${dni}?`)) {
      return;
    }

    const users = JSON.parse(localStorage.getItem('alanizUsers') || '{}');
    const documents = JSON.parse(localStorage.getItem('alanizDocuments') || '{}');
    
    delete users[dni];
    delete documents[dni];
    
    localStorage.setItem('alanizUsers', JSON.stringify(users));
    localStorage.setItem('alanizDocuments', JSON.stringify(documents));
    
    loadStats();
    loadUsers();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Solo se permiten archivos PDF');
        return;
      }
      
      setDocumentForm({
        ...documentForm,
        file: file,
        name: documentForm.name || file.name.replace('.pdf', '')
      });
    }
  };

  // Función para subir archivo a Supabase Storage
  const uploadToSupabase = async (file: File, dni: string): Promise<string> => {
    const fileName = `${dni}/${Date.now()}_${file.name}`;
    
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(
      `${SUPABASE_URL}/storage/v1/object/documentos/${fileName}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: formData
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Error al subir archivo: ${error}`);
    }

    // Generar URL pública del archivo
    const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/documentos/${fileName}`;
    return publicUrl;
  };

  const handleUploadDocument = async () => {
    if (!selectedUser || !documentForm.file || !documentForm.name || !documentForm.type) {
      alert('Todos los campos son obligatorios');
      return;
    }

    setUploading(true);

    try {
      // Subir a Supabase
      const fileUrl = await uploadToSupabase(documentForm.file, selectedUser);
      const fileSize = (documentForm.file.size / (1024 * 1024)).toFixed(1) + ' MB';
      
      const newDocument: Document = {
        id: Date.now().toString(),
        name: documentForm.name + '.pdf',
        type: documentForm.type,
        uploadDate: new Date().toLocaleDateString(),
        size: fileSize,
        url: fileUrl
      };

      // Añadir documento al usuario
      const allDocuments = JSON.parse(localStorage.getItem('alanizDocuments') || '{}');
      if (!allDocuments[selectedUser]) {
        allDocuments[selectedUser] = [];
      }
      
      allDocuments[selectedUser].push(newDocument);
      localStorage.setItem('alanizDocuments', JSON.stringify(allDocuments));

      // Resetear formulario
      setDocumentForm({ name: '', type: '', file: null });
      loadUserDocuments(selectedUser);
      loadStats();
      
      alert('Documento subido exitosamente');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al subir el documento: ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    if (!confirm('¿Estás seguro de eliminar este documento?')) {
      return;
    }

    try {
      const document = userDocuments.find(doc => doc.id === documentId);
      if (document && document.url) {
        // Extraer el path del archivo de la URL de Supabase
        const urlParts = document.url.split('/storage/v1/object/public/documentos/');
        if (urlParts.length > 1) {
          const filePath = urlParts[1];
          
          // Eliminar archivo de Supabase Storage
          const deleteResponse = await fetch(
            `${SUPABASE_URL}/storage/v1/object/documentos/${filePath}`,
            {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
              }
            }
          );

          if (!deleteResponse.ok) {
            console.warn('No se pudo eliminar el archivo del storage, pero se eliminará de la lista');
          }
        }
      }

      // Eliminar de la lista local
      const allDocuments = JSON.parse(localStorage.getItem('alanizDocuments') || '{}');
      allDocuments[selectedUser] = allDocuments[selectedUser].filter((doc: Document) => doc.id !== documentId);
      localStorage.setItem('alanizDocuments', JSON.stringify(allDocuments));
      
      loadUserDocuments(selectedUser);
      loadStats();
      
      alert('Documento eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar documento:', error);
      alert('Error al eliminar el documento');
    }
  };

  const openDocumentManager = (userDni: string) => {
    setSelectedUser(userDni);
    loadUserDocuments(userDni);
    setShowDocumentManager(true);
  };

  const getCondecoracionName = (id: string) => {
    return condecoraciones.find(c => c.id === id)?.nombre || id;
  };

  const handleLogout = () => {
    localStorage.removeItem('alanizAuth');
    localStorage.removeItem('alanizUserId');
    localStorage.removeItem('alanizUserType');
    localStorage.removeItem('alanizUserName');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-alanizGreen-950 py-8">
      <div className="content-container">
        
        {/* Header */}
        <div className="card-elegant mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-alanizGold-600 rounded-full flex items-center justify-center">
                <span className="text-alanizGreen-950 text-xl">⚙️</span>
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold text-alanizGold-600">
                  Panel de Administración
                </h1>
                <p className="text-parchment-300">
                  Gestión del sistema Casa Alaniz • Supabase conectado ✅
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn-secondary"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card-elegant">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-blue-400 text-xl">👥</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-alanizGold-600">
                  Usuarios
                </h3>
                <p className="text-2xl font-bold text-parchment-100">
                  {stats.totalUsers}
                </p>
              </div>
            </div>
          </div>

          <div className="card-elegant">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span className="text-green-400 text-xl">📄</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-alanizGold-600">
                  Documentos
                </h3>
                <p className="text-2xl font-bold text-parchment-100">
                  {stats.totalDocuments}
                </p>
              </div>
            </div>
          </div>

          <div className="card-elegant">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <span className="text-yellow-400 text-xl">🏆</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-alanizGold-600">
                  Condecoraciones
                </h3>
                <p className="text-2xl font-bold text-parchment-100">
                  {loadingCondecoraciones ? '⏳' : stats.totalCondecoraciones}
                </p>
              </div>
            </div>
          </div>

          <div className="card-elegant">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <span className="text-purple-400 text-xl">☁️</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-alanizGold-600">
                  Storage
                </h3>
                <p className="text-2xl font-bold text-parchment-100">
                  Supabase
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gestión de condecoraciones */}
        <div className="card-elegant mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold text-alanizGold-600">
              Gestión de Condecoraciones
            </h2>
            <button
              onClick={() => setShowCondecoracionesManager(!showCondecoracionesManager)}
              className="btn-alaniz"
              disabled={loadingCondecoraciones}
            >
              🏆 {showCondecoracionesManager ? 'Ocultar' : 'Gestionar'} Condecoraciones
            </button>
          </div>

          {showCondecoracionesManager && (
            <div className="bg-alanizGreen-900/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-alanizGold-600 mb-4">
                Añadir Nuevo Condecorado
              </h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-alanizGold-600 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={condecoracionForm.nombre}
                    onChange={(e) => setCondecoracionForm({...condecoracionForm, nombre: e.target.value})}
                    className="w-full px-3 py-2 bg-alanizGreen-800/50 border border-alanizGold-600/30 
                               rounded-lg text-parchment-100 placeholder-parchment-400
                               focus:border-alanizGold-600"
                    placeholder="Don Fernando de Castilla"
                    disabled={loadingCondecoraciones}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-alanizGold-600 mb-2">
                    Fecha de otorgamiento
                  </label>
                  <input
                    type="date"
                    value={condecoracionForm.fechaOtorgamiento}
                    onChange={(e) => setCondecoracionForm({...condecoracionForm, fechaOtorgamiento: e.target.value})}
                    className="w-full px-3 py-2 bg-alanizGreen-800/50 border border-alanizGold-600/30 
                               rounded-lg text-parchment-100 focus:border-alanizGold-600"
                    disabled={loadingCondecoraciones}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-alanizGold-600 mb-2">
                  Condecoración otorgada
                </label>
                <select
                  value={condecoracionForm.condecoracion}
                  onChange={(e) => setCondecoracionForm({...condecoracionForm, condecoracion: e.target.value})}
                  className="w-full px-3 py-2 bg-alanizGreen-800/50 border border-alanizGold-600/30 
                             rounded-lg text-parchment-100 focus:border-alanizGold-600"
                  disabled={loadingCondecoraciones}
                >
                  <option value="">Seleccionar condecoración</option>
                  {condecoraciones.map(condecoracion => (
                    <option key={condecoracion.id} value={condecoracion.id}>
                      {condecoracion.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-alanizGold-600 mb-2">
                  Motivo del otorgamiento
                </label>
                <textarea
                  value={condecoracionForm.motivo}
                  onChange={(e) => setCondecoracionForm({...condecoracionForm, motivo: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 bg-alanizGreen-800/50 border border-alanizGold-600/30 
                             rounded-lg text-parchment-100 placeholder-parchment-400
                             focus:border-alanizGold-600 resize-none"
                  placeholder="Descripción del motivo por el cual se otorga la condecoración..."
                  disabled={loadingCondecoraciones}
                />
              </div>

              <div className="flex space-x-4 mb-6">
                <button
                  onClick={handleCreateCondecorado}
                  className="btn-alaniz disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loadingCondecoraciones}
                >
                  {loadingCondecoraciones ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-alanizGreen-950 border-t-transparent rounded-full animate-spin"></div>
                      <span>Añadiendo...</span>
                    </div>
                  ) : (
                    'Añadir Condecorado'
                  )}
                </button>
                <button
                  onClick={() => loadCondecoracionesFromSupabase()}
                  className="btn-secondary"
                  disabled={loadingCondecoraciones}
                >
                  🔄 Recargar
                </button>
              </div>

              {/* Lista de condecorados */}
              <div>
                <h4 className="text-lg font-semibold text-alanizGold-600 mb-4">
                  Condecorados Registrados ({condecorados.length}) {loadingCondecoraciones && '⏳'}
                </h4>
                
                {condecorados.length === 0 ? (
                  <p className="text-parchment-400 italic text-center py-4">
                    {loadingCondecoraciones ? 'Cargando condecoraciones...' : 'No hay condecorados registrados aún.'}
                  </p>
                ) : (
                  <div className="space-y-3">
                    {condecorados.map((condecorado) => (
                      <div key={condecorado.id} className="bg-alanizGreen-800/30 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-semibold text-alanizGold-600">
                              {condecorado.nombre}
                            </h5>
                            <p className="text-sm text-parchment-400 mb-1">
                              {getCondecoracionName(condecorado.condecoracion)}
                            </p>
                            <p className="text-sm text-parchment-400 mb-2">
                              Otorgada el {new Date(condecorado.fecha_otorgamiento).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                            <p className="text-parchment-200 text-sm">
                              {condecorado.motivo}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteCondecorado(condecorado.id)}
                            className="ml-4 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors
                                       disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Eliminar condecorado"
                            disabled={loadingCondecoraciones}
                          >
                            <span className="text-sm">🗑️</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Gestión de usuarios */}
        <div className="card-elegant mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold text-alanizGold-600">
              Gestión de Usuarios
            </h2>
            <button
              onClick={() => setShowCreateUser(true)}
              className="btn-alaniz"
            >
              + Crear Usuario
            </button>
          </div>

          {/* Formulario crear usuario */}
          {showCreateUser && (
            <div className="bg-alanizGreen-900/30 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-alanizGold-600 mb-4">
                Crear Nuevo Usuario
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-alanizGold-600 mb-2">
                    DNI
                  </label>
                  <input
                    type="text"
                    placeholder="12345678A"
                    value={newUser.dni}
                    onChange={(e) => setNewUser({...newUser, dni: e.target.value.toUpperCase()})}
                    maxLength={9}
                    className="w-full px-3 py-2 bg-alanizGreen-800/50 border border-alanizGold-600/30 
                               rounded-lg text-parchment-100 placeholder-parchment-400
                               focus:border-alanizGold-600 uppercase"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-alanizGold-600 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    placeholder="Juan Alaniz López"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="w-full px-3 py-2 bg-alanizGreen-800/50 border border-alanizGold-600/30 
                               rounded-lg text-parchment-100 placeholder-parchment-400
                               focus:border-alanizGold-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-alanizGold-600 mb-2">
                    Tipo
                  </label>
                  <select
                    value={newUser.type}
                    onChange={(e) => setNewUser({...newUser, type: e.target.value as 'admin' | 'user'})}
                    className="w-full px-3 py-2 bg-alanizGreen-800/50 border border-alanizGold-600/30 
                               rounded-lg text-parchment-100 focus:border-alanizGold-600"
                  >
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={handleCreateUser}
                  className="btn-alaniz"
                >
                  Crear Usuario
                </button>
                <button
                  onClick={() => setShowCreateUser(false)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Lista de usuarios */}
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.dni} className="bg-alanizGreen-900/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-alanizGold-600/20 rounded-lg flex items-center justify-center">
                      <span className="text-alanizGold-600">
                        {user.type === 'admin' ? '👑' : '👤'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-alanizGold-600">
                        {user.name}
                      </h3>
                      <p className="text-sm text-parchment-400">
                        DNI: {user.dni} • Contraseña: {user.password} • {user.type === 'admin' ? 'Administrador' : 'Usuario'} • 
                        Creado: {new Date(user.createdDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openDocumentManager(user.dni)}
                      className="btn-alaniz text-sm"
                    >
                      📄 Documentos
                    </button>
                    {user.type !== 'admin' && (
                      <button
                        onClick={() => handleDeleteUser(user.dni)}
                        className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm
                                   hover:bg-red-500/30 transition-colors"
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal de gestión de documentos */}
        {showDocumentManager && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-alanizGreen-900 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-bold text-alanizGold-600">
                  Documentos de {users.find(u => u.dni === selectedUser)?.name}
                </h2>
                <button
                  onClick={() => setShowDocumentManager(false)}
                  className="text-alanizGold-600 hover:text-alanizGold-500 text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* Formulario subir documento */}
              <div className="bg-alanizGreen-800/30 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-alanizGold-600 mb-4">
                  Subir Nuevo Documento
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-alanizGold-600 mb-2">
                      Nombre del Documento
                    </label>
                    <input
                      type="text"
                      placeholder="Nombramiento de Caballero"
                      value={documentForm.name}
                      onChange={(e) => setDocumentForm({...documentForm, name: e.target.value})}
                      className="w-full px-3 py-2 bg-alanizGreen-800/50 border border-alanizGold-600/30 
                                 rounded-lg text-parchment-100 placeholder-parchment-400
                                 focus:border-alanizGold-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-alanizGold-600 mb-2">
                      Tipo de Documento
                    </label>
                    <select
                      value={documentForm.type}
                      onChange={(e) => setDocumentForm({...documentForm, type: e.target.value})}
                      className="w-full px-3 py-2 bg-alanizGreen-800/50 border border-alanizGold-600/30 
                                 rounded-lg text-parchment-100 focus:border-alanizGold-600"
                    >
                      <option value="">Seleccionar tipo</option>
                      <option value="Recompensas">🏆 Recompensas</option>
                      <option value="Nombramientos">⚔️ Nombramientos</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-alanizGold-600 mb-2">
                    Archivo PDF
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 bg-alanizGreen-800/50 border border-alanizGold-600/30 
                               rounded-lg text-parchment-100 file:mr-4 file:py-1 file:px-3
                               file:rounded file:border-0 file:bg-alanizGold-600 file:text-alanizGreen-950
                               file:font-medium hover:file:bg-alanizGold-500"
                  />
                </div>
                <button
                  onClick={handleUploadDocument}
                  disabled={uploading}
                  className="btn-alaniz disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-alanizGreen-950 border-t-transparent rounded-full animate-spin"></div>
                      <span>Subiendo...</span>
                    </div>
                  ) : (
                    '☁️ Subir Documento'
                  )}
                </button>
              </div>

              {/* Lista de documentos */}
              <div>
                <h3 className="text-lg font-semibold text-alanizGold-600 mb-4">
                  Documentos Existentes ({userDocuments.length})
                </h3>
                
                {userDocuments.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl text-alanizGold-600/30 mb-2">📄</div>
                    <p className="text-parchment-400">No hay documentos para este usuario</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {userDocuments.map((doc) => (
                      <div key={doc.id} className="bg-alanizGreen-800/30 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-red-500/20 rounded flex items-center justify-center">
                              <span className="text-red-400 text-sm">
                                {doc.type === 'Recompensas' ? '🏆' : '⚔️'}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-alanizGold-600">{doc.name}</h4>
                              <p className="text-sm text-parchment-400">
                                {doc.type} • {doc.size} • {doc.uploadDate} • Supabase
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm
                                         hover:bg-blue-500/30 transition-colors"
                            >
                              Ver PDF
                            </a>
                            <button
                              onClick={() => handleDeleteDocument(doc.id)}
                              className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-sm
                                         hover:bg-red-500/30 transition-colors"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Información del sistema */}
        <div className="card-elegant">
          <h2 className="text-xl font-display font-bold text-alanizGold-600 mb-4">
            Información del Sistema
          </h2>
          <div className="bg-alanizGreen-900/30 rounded-lg p-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-alanizGold-600 mb-2">Estado del Sistema</h4>
                <p className="text-green-400">✅ Operativo</p>
                <p className="text-parchment-400">Última actualización: {new Date().toLocaleString()}</p>
              </div>
              <div>
                <h4 className="font-semibold text-alanizGold-600 mb-2">Almacenamiento</h4>
                <p className="text-parchment-400">☁️ Supabase Storage (Documentos)</p>
                <p className="text-parchment-400">🗄️ Supabase Database (Condecoraciones)</p>
                <p className="text-green-400 text-xs">Global access enabled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
