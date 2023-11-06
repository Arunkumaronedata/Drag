import React, { useState } from 'react';
import DragDrop from './components/DrgaDrop';
import deletedItem from '../src/assets/delete.png';
import addItem from '../src/assets/add-item.png'


function App() {
  const card = {
    width: '70vw',
    height: '70vh',
    padding: '20px 20px',
    margin: '5vh 10vw',
  };

  const [boxes, setBoxes] = useState([]);
  const [idCounter, setIdCounter] = useState(0);
  const [selectedBoxId, setSelectedBoxId] = useState(null);

  const addResizableBox = () => {
    const newBoxes = {
      id: idCounter,
      left: '0',
    };
    setIdCounter(idCounter + 1);

    setBoxes([...boxes, newBoxes]);
  };

  const deleteBox = () => {
    if (selectedBoxId !== null) {
      const updatedBoxes = boxes.filter((box) => box.id !== selectedBoxId);
      setBoxes(updatedBoxes);
      setSelectedBoxId(null); // Clear the selected item
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card" style={card}>
            <div className="card-body">
              <div className='sidebar d-flex'>
                <div className='col-md-1'>
                  <div className="card addBox1" style={{ height: '60vh' }}>
                    <div className="card-body">
                      {/* <button onClick={addResizableBox}>Add</button> */}
                      <img  onClick={addResizableBox} src={addItem} alt="add" style={{width:'30px'}}/>
                      <img onClick={deleteBox} src={deletedItem} alt="delete" style={{width:'30px', marginTop:'10px'}}/> {/* Delete button in addBox1 */}
                    </div>
                  </div>
                </div>
                <div className='col-md-11'>
                  <div className="card addBox2" style={{ height: '60vh', position: 'relative' }} >
                    <div className="card-body">
                      {boxes.map((box) => (
                        <div
                          key={box.id}
                          style={{ position: 'absolute', left: box.left }}
                          onClick={() => setSelectedBoxId(box.id)} // Select the item
                        >
                          <DragDrop element={box} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
