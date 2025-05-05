import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameHub = () => {
  const navigate = useNavigate();

  // Sample game data - you can replace with your actual game information
  const games = [
    {
      id: 1,
      title: 'Tambola',
      description: 'Classic Tambola (Housie) game with exciting prizes!',
      image: 'https://images.unsplash.com/photo-1605870445919-838d190e8e1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmluZ298ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      route: '/tambola'
    },
    {
      id: 2,
      title: 'Scream4IceCream',
      description: 'A fun and exciting ice cream themed game!',
      image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGljJTIwdGFjJTIwdG9lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
      route: '/scream4icecream'
    },
    {
      id: 3,
      title: 'Stop@10',
      description: 'Challenge yourself to stop at exactly 10!',
      image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FyZCUyMGdhbWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
      route: '/stop10'
    }
  ];

  const handleGameSelect = (route) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Game Hub</h1>
          <p className="text-xl text-gray-600">Choose a game and start playing!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <div 
              key={game.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
              onClick={() => handleGameSelect(game.route)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={game.image} 
                  alt={game.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{game.title}</h3>
                <p className="text-gray-600 mb-4">{game.description}</p>
                <button 
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition duration-300"
                >
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameHub;
