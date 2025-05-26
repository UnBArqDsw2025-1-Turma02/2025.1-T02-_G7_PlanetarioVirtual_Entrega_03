export default function HomePage() {
  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8">Planetário Virtual - Fórum</h1>
      
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Todas as Postagens</h2>
        
        {/* Futuramente, aqui entrará o componente <PostList /> */}
        <div className="p-10 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-center text-gray-500">
            A lista de postagens do backend será exibida aqui.
          </p>
        </div>
      </div>
    </main>
  );
}