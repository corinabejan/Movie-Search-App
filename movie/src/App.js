import React from 'react';
import Movies from './components/Movies';

function App() {
  return (
    <div className="App">
      <header>
       <h1>Movie Database</h1>
      </header>
      <main>
        <Movies />
      </main>
    </div>
  );
}

export default App;
