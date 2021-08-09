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
        <div>
          <button
            disabled={buttonDisabled}
            style={{ backgroundColor: buttonDisabled ? 'grey' : '' }}
          >
            Sort by oldest
          </button>
          <button
            disabled={buttonDisabled}
            style={{ backgroundColor: buttonDisabled ? 'grey' : '' }}
          >
            Sort by newest
          </button>
          <button
            disabled={buttonDisabled}
            style={{ backgroundColor: buttonDisabled ? 'grey' : '' }}
          >
            Sort by completed
          </button>
          <button
            disabled={buttonDisabled}
            style={{ backgroundColor: buttonDisabled ? 'grey' : '' }}
          >
            Sort by not completed
          </button>
        </div>
      </form>
    </div>
  );
}

export default Header;
