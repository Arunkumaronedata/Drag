import React, { useState } from 'react';
import DragDrop from './components/DrgaDrop';

function App() {
  const [showDragDrop, setShowDragDrop] = useState(false);

  const handleButtonClick = () => {
    setShowDragDrop(true);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Click</button>
      {showDragDrop && <DragDrop />}
    </div>
  );
}

export default App;
