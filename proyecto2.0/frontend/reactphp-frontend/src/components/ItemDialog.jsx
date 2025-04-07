import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

function ItemDialog({ isOpen, onClose, item, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        description: item.description
      });
    } else {
      setFormData({
        title: '',
        description: ''
      });
    }
  }, [item, isOpen]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const url = item 
      ? `http://localhost:8080/api/items/${item.id}` 
      : 'http://localhost:8080/api/items';
    
    const method = item ? 'PUT' : 'POST';
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const savedItem = await response.json();
        onSave(savedItem);
      } else {
        throw new Error(item ? 'Error al actualizar' : 'Error al crear');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('No se pudo guardar el elemento. Inténtalo de nuevo más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose}></div>
        
        <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
          <div className="absolute top-4 right-4">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="mb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {item ? 'Editar elemento' : 'Crear nuevo elemento'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {item 
                ? 'Actualiza los detalles del elemento seleccionado.' 
                : 'Completa el formulario para crear un nuevo elemento.'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Título
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className="input"
                placeholder="Título del elemento"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input min-h-[120px]"
                placeholder="Descripción del elemento"
                rows={4}
                required
              />
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                className="btn btn-outline"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting 
                  ? 'Guardando...' 
                  : item ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ItemDialog