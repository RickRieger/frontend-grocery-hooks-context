import React, { useContext, useState, useEffect } from 'react';
import { GroceryListContext } from '../../context/context';
import './GroceryList.css';

function GroceryList() {
  const {
    groceryList,
    selected,
    setSelected,
    handleMarkCompleted,
    notDisabled,
    setSelectedElement,
  } = useContext(GroceryListContext);

  function onBackgroundClick(e) {
    //awesome!
    e.stopPropagation();
    setSelected('');
  }

  return (
    <div id='grocery-container' onClick={(e) => onBackgroundClick(e)}>
      <div id='grocery-list'>
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
                  onClick={
                    notDisabled
                      ? (e) => setSelectedElement(e, index)
                      : undefined
                  }
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
