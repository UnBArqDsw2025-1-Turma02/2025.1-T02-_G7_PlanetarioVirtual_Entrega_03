"use client";

import { useState } from 'react';

type CreatePostFormProps = {
  onPostSubmit: (postText: string) => void; 
};

export function CreatePostForm({ onPostSubmit }: CreatePostFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onPostSubmit(text);
      setText(''); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-gray-800 border border-gray-700 p-4 rounded-lg">
      <h2 className="text-xl font-semibold text-white mb-3">Criar Nova Postagem</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 bg-gray-700 text-gray-200 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="O que você está pensando sobre o universo?"
        rows={4}
      />
      <div className="text-right mt-3">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300 disabled:opacity-50"
          disabled={!text.trim()}
        >
          Publicar
        </button>
      </div>
    </form>
  );
}