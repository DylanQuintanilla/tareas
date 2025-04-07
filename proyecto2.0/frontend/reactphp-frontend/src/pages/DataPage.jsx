import { useState, useEffect } from 'react'
import { Loader, Trash2, Edit, Plus, AlertCircle } from 'lucide-react'
import ItemDialog from '../components/ItemDialog'

function DataPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  
  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8080/api/items');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('No se pudieron cargar los datos. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchItems();
  }, []);
  
  const handleAddNew = () => {
    setCurrentItem(null);
    setIsDialogOpen(true);
  };
  
  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsDialogOpen(true);
  };
  
  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este elemento?')) return;
    
    try {
      const response = await fetch(`http://localhost:8080/api/items/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        // Actualizar la lista de elementos
        setItems(items.filter(item => item.id !== id));
      } else {
        throw new Error('Error al eliminar');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('No se pudo eliminar el elemento. Inténtalo de nuevo más tarde.');
    }
  };
  
  const handleSave = (savedItem) => {
    if (currentItem) {
      // Actualizar elemento existente
      setItems(items.map(item => 
        item.id === savedItem.id ? savedItem : item
      ));
    } else {
      // Añadir nuevo elemento
      setItems([savedItem, ...items]);
    }
    setIsDialogOpen(false);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Gestión de Datos</h1>
            <p className="text-gray-600">
              Administra los elementos de la base de datos
            </p>
          </div>
          <button 
            onClick={handleAddNew}
            className="btn btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" /> Nuevo
          </button>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No hay elementos disponibles. Crea uno nuevo para comenzar.
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="card border">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                  </div>
                  <div className="bg-gray-50 p-3 flex justify-end space-x-2 border-t">
                    <button 
                      onClick={() => handleEdit(item)}
                      className="btn btn-outline flex items-center text-sm"
                    >
                      <Edit className="h-4 w-4 mr-1" /> Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-danger flex items-center text-sm"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <ItemDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        item={currentItem}
        onSave={handleSave}
      />
    </div>
  )
}

export default DataPage