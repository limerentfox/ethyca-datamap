import React from 'react';
import GridDataMap from '../GridDataMap/GridDataMap';
import '../../index.css'; // Ensure global styles are imported

const App: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-100">
      <header className="text-center p-6">
        <h1 className="text-3xl font-bold">Ethyca Data Map</h1>
      </header>
      <GridDataMap />
    </main>
  );
};

export default App;