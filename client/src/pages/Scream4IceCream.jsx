import React from 'react';
import { Link } from 'react-router-dom';

const Scream4IceCream = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh' }}>
      <div style={{ padding: '10px', backgroundColor: '#6b46c1', textAlign: 'center' }}>
        <Link 
          to="/lander" 
          style={{ 
            color: 'white', 
            textDecoration: 'none', 
            fontWeight: 'bold',
            padding: '8px 16px',
            borderRadius: '4px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            display: 'inline-block'
          }}
        >
          ← Back to Game Hub
        </Link>
      </div>
      <iframe 
        src="/src/games/Scream4IceCream/scream.html" 
        style={{ 
          flex: 1,
          width: '100%', 
          border: 'none',
          overflow: 'hidden'
        }}
        title="Scream 4 Ice Cream Game"
      />
    </div>
  );
};

export default Scream4IceCream;
