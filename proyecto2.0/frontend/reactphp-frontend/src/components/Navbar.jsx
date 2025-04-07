import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Inicios
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md ${isActive('/') 
                ? 'bg-blue-100 text-blue-700 font-medium' 
                : 'text-gray-600 hover:text-gray-900'}`}
            >
              Inicio
            </Link>
            <Link 
              to="/contact" 
              className={`px-3 py-2 rounded-md ${isActive('/contact') 
                ? 'bg-blue-100 text-blue-700 font-medium' 
                : 'text-gray-600 hover:text-gray-900'}`}
            >
              Contacto
            </Link>
            <Link 
              to="/data" 
              className={`px-3 py-2 rounded-md ${isActive('/data') 
                ? 'bg-blue-100 text-blue-700 font-medium' 
                : 'text-gray-600 hover:text-gray-900'}`}
            >
              Datos
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar