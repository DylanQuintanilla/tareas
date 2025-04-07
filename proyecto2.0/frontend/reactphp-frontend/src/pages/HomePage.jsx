import { useNavigate } from 'react-router-dom'

function HomePage() {
  const navigate = useNavigate();
  
  return (
    <div className="card max-w-4xl mx-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Bienvenido a nuestra plataforma
        </h1>

        <div className="mt-8">
          <button 
            onClick={() => navigate('/data')} 
            className="btn btn-primary"
          >
            Ver datos
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomePage