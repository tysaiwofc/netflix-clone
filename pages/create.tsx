// pages/index.js
import { useState } from 'react';
import Image from 'next/image'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    thumbnail: '',
    video: '',
    description: '',
    duration: '',
    gender: '',

  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

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
        <h1 className="text-3xl font-bold text-white mb-6">Adicionar Filme</h1>
        <form onSubmit={handleSubmit}>
          <label className="flex flex-col mb-4">
            <span className="text-gray-300">Nome: </span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input rounded"
            />
          </label>
          <label className="flex flex-col mb-4">
            <span className="text-gray-300">Video: </span>
            <input
              type="text"
              name="video"
              value={formData.video}
              onChange={handleChange}
              className="form-input rounded"
            />
          </label>
          <label className="flex flex-col mb-4">
            <span className="text-gray-300">Thumbnail: </span>
            <input
              type="text"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              className="form-input rounded text-gray-600"
            />
          </label>
          <label className="flex flex-col mb-4">
            <span className="text-gray-300">Genero: </span>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="form-input rounded text-gray-600"
            />
          </label>
          <label className="flex flex-col mb-4">
            <span className="text-gray-300">Duração: </span>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="form-input rounded"
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
          <button type="submit" className="form-button bg-red-500 text-white py-2 px-4 rounded-md">
            Submit
          </button>
        </form>
        </div>
      </div>
    </div>
  );
}
