import React, { useContext } from 'react';
import { HeaderContext } from '../../context/context';

import './Header.css';
function Header() {
  const {
    groceryInput,
    setGroceryInput,
    handleCreateItem,
    handleUpdateItem,
    handleRemoveItem,
    handleMakeItemPriority,
    setSelected,
    buttonDisabled,
    sortByDate,
    sortByPurchased,
  } = useContext(HeaderContext);
  function setGroceryInputFunction(e) {
    setGroceryInput(e.target.value);
  }
  return (
    <div id='header'>
      <h1>Grocery List</h1>
      <br />
      <form>
        <div>
          <input
            type='text'
            autoFocus
            onChange={(e) => {
              setGroceryInputFunction(e);
            }}
            value={groceryInput}
          />
        </div>
        <br />
        <div>
          <button
            onClick={handleCreateItem}
            disabled={buttonDisabled}
            style={{ backgroundColor: buttonDisabled ? 'grey' : '' }}
          >
            Create Item
          </button>
          <button onClick={handleUpdateItem}>Update Item</button>
          <button
            onClick={handleRemoveItem}
            disabled={buttonDisabled}
            style={{ backgroundColor: buttonDisabled ? 'grey' : '' }}
          >
            Delete Item
          </button>
          <button
            onClick={handleMakeItemPriority}
            disabled={buttonDisabled}
            style={{ backgroundColor: buttonDisabled ? 'grey' : '' }}
          >
            Prioritize{' '}
          </button>
        </div>
      </form>
      <div>
        <button
          disabled={buttonDisabled}
          style={{ backgroundColor: buttonDisabled ? 'grey' : '' }}
          onClick={() => {
            sortByDate('asc');
          }}
        >
          Sort by oldest
        </button>
        <button
          disabled={buttonDisabled}
          style={{ backgroundColor: buttonDisabled ? 'grey' : '' }}
          onClick={() => {
            sortByDate('desc');
          }}
        >
          Sort by newest
        </button>
        <button
          disabled={buttonDisabled}
          style={{ backgroundColor: buttonDisabled ? 'grey' : '' }}
          onClick={() => {
            sortByPurchased(true);
          }}
        >
          Sort by completed
        </button>
        <button
          disabled={buttonDisabled}
          style={{
            backgroundColor: buttonDisabled ? 'grey' : '',
            pointerEvents: buttonDisabled ? 'none' : '',
          }}
          onClick={() => {
            sortByPurchased(false);
          }}
        >
          Sort by not completed
        </button>
        <h4>(click once to select, double click to mark complete)</h4>
      </div>
    </div>
  );
}

export default Header;
