// pages/index.js
import { useState } from 'react';
import { Loader2 } from 'lucide-react'
export default function Home() {

  const [formData, setFormData] = useState({
    name: '',
    thumbnail: '',
    description: '',
    duration: '',
    gender: '',

  });

  const [loading, setLoading] = useState(false)
  const [video, setVideo] = useState('') as any
  


  const handleChange = (e: any) => {
    if(e.target.name === 'video') {
      const video = e.target.files[0];
      setVideo(video)
    } else if (e.target.name === 'thumbnail') {
      // Processar a imagem e obter a visualização em base64
      const reader = new FileReader();
      const file = e.target.files[0];

      reader.onloadend = () => {
        setFormData({
          ...formData,
          thumbnail: reader.result as string, // Armazenar a visualização em base64
        });
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    
    
    try {
      setLoading(true)
      
      
      const formDataWithUser = {
        ...formData,
        username: 'Tysaiw',
        video: `http://localhost:80/api/stream/` + video.name
      }

      console.log(formDataWithUser)
      const response = await fetch('/api/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithUser),
      });

      console.log(response)
      
      
      
      const videoData = new FormData()
      videoData.append('video', video)
      await fetch(`http://localhost:80/api/upload`, {
        method: 'POST',
        body: videoData
      }).catch(() => {}) as any
      

      setTimeout(() => {
        setLoading(false)
      }, 2000)
      setFormData({
       name: '',
       thumbnail: '',
       description: '',
       duration: '',
       gender: '',
      })

      if (response.ok) {
        console.log('Data sent successfully');
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-3 rounded-md max-w-md w-full">
        <div>
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Adicionar Filme</h1>
        <form onSubmit={handleSubmit}>
          <label className="flex flex-col mb-4">
            <span className="text-gray-300">Nome: </span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input rounded p-2"
            />
          </label>
          <label className="flex flex-col mb-4">
  <span className="text-gray-300">Video:</span>
  <div className="relative rounded-md">
    <input
      type="file"
      name="video"
      onChange={handleChange}
      accept="video/*"
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer "
    />
    <div className="form-input rounded bg-gray-200 cursor-pointer p-2">
      {video?.name ? String(video?.name) : "Selecione um video"}
    </div>
  </div>
</label>



          <label className="flex flex-col mb-4">
  <span className="text-gray-300">Gênero:</span>
  <select
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    className="form-select rounded text-gray-600 cursor-pointer p-2"
  >
    <option value="" disabled>
      Selecione um Gênero
    </option>
    <option value="Ação" className="cursor-pointer">
      Ação
    </option>
    <option value="Animação" className="cursor-pointer">
      Animação
    </option>
    <option value="Aventura" className="cursor-pointer">
      Aventura
    </option>
    <option value="Comédia" className="cursor-pointer">
      Comédia
    </option>
    <option value="Crime" className="cursor-pointer">
      Crime
    </option>
    <option value="Documentário" className="cursor-pointer">
      Documentário
    </option>
    <option value="Drama" className="cursor-pointer">
      Drama
    </option>
    <option value="Fantasia" className="cursor-pointer">
      Fantasia
    </option>
    <option value="Ficção Científica" className="cursor-pointer">
      Ficção Científica
    </option>
    <option value="Guerra" className="cursor-pointer">
      Guerra
    </option>
    <option value="Horror" className="cursor-pointer">
      Horror
    </option>
    <option value="Musical" className="cursor-pointer">
      Musical
    </option>
    <option value="Mistério" className="cursor-pointer">
      Mistério
    </option>
    <option value="Romance" className="cursor-pointer">
      Romance
    </option>
    <option value="Suspense" className="cursor-pointer">
      Suspense
    </option>
    <option value="Thriller" className="cursor-pointer">
      Thriller
    </option>
  </select>
</label>

<label className="flex flex-col mb-4">
  <span className="text-gray-300">Thumbnail:</span>
  <div className="relative rounded-md">
    <input
      type="file"
      name="thumbnail"
      accept='image/*'
      onChange={handleChange}
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer "
    />
    <div className="form-input rounded bg-gray-200 cursor-pointer p-2">
      {formData.thumbnail && (
        <img
          src={formData.thumbnail}
          
          alt="Thumbnail Preview"
          className="mt-2 rounded"
          style={{ maxWidth: '100%', maxHeight: '200px' }}
        />
      )}
      {!formData.thumbnail && "Selecione uma Thumbnail"}
    </div>
  </div>
</label>

            <label className="flex flex-col mb-4 ">
  <span className="text-gray-300">Duração:</span>
  <input
    type="text"
    name="duration"
    value={formData.duration}
    onChange={handleChange}
    placeholder="Digite a duração em minutos"
    className="form-input rounded text-gray-600 p-2"
  />
</label>

          <label className="mb-4 flex flex-col">
            <span className="text-gray-300">Descrição:</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea rounded"
            ></textarea>
          </label>
          {
            loading ? 
            <button disabled type="submit" className="form-button bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
            <span className='flex flex-row gap-2'><Loader2 className='animate-spin'/> Carregando</span>
          </button>
          : <button type="submit" className="form-button bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
          Enviar
        </button>
          }
        </form>
        </div>
      </div>
    </div>
  );
}
