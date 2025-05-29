"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

type CommentFormProps = {
  onCommentSubmit: (commentText: string) => void;
};

export function CommentForm({ onCommentSubmit }: CommentFormProps) {
  const [text, setText] = useState('');
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onCommentSubmit(text);
      setText('');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-grow p-2 bg-gray-700 text-gray-200 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Adicione um comentário..."
      />
      <button
        type="submit"
        className="bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50"
        disabled={!text.trim()}
      >
        Enviar
      </button>
    </form>
  );
}