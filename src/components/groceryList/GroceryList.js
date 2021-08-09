import React, { useContext, useState } from 'react';
import { GroceryListContext } from '../../context/context';
import './GroceryList.css';

function GroceryList() {
  const {
    groceryList,
    selected,
    setSelected,
    handleMarkCompleted,
    notDisabled,
  } = useContext(GroceryListContext);
  console.log(notDisabled);
  console.log(selected);

  return (
    <div id='grocery-container'>
      <div id='grocery-list'>
        <h4>(click once to select, double click to mark complete)</h4>
        <ul className='unordered-list'>
          {groceryList.map((item, index) => {
            return (
              <li
                key={index}
                style={{
                  backgroundColor: selected === index ? 'whitesmoke' : '',
                  textDecorationLine:
                    item.purchased === true ? 'line-through' : '',
                }}
              >
                <span
                  onClick={notDisabled ? () => setSelected(index) : undefined}
                  onDoubleClick={handleMarkCompleted}
                >
                  <span className='priority'>
                    {' '}
                    {item.priority === true && item.purchased === false
                      ? '! '
                      : ''}
                  </span>

                  {item.grocery}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default GroceryList;
