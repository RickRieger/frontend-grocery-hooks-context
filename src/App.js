import React, { useState, useEffect } from 'react';
import Header from './components/header/Header';
import GroceryList from './components/groceryList/GroceryList';
import { GroceryListContext, HeaderContext } from './context/context';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [groceryList, setGroceryList] = useState([]);
  const [selected, setSelected] = useState('');
  const [groceryInput, setGroceryInput] = useState('');
  const [notDisabled, setNotDisabled] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const URL = 'http://localhost:3001';

  useEffect(() => {
    getAllGroceryItems();
  }, []);

  async function getAllGroceryItems() {
    try {
      let allGroceryItems = await axios.get(
        `${URL}/api/grocery/get-all-grocery-items`
      );
      let array = allGroceryItems.data.payload;
      console.log(array);
      let newArray = [];
      for (const item of array) {
        if (item.priority === true) {
          newArray.unshift(item);
        } else {
          newArray.push(item);
        }
      }
      setGroceryList(newArray);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleCreateItem(e) {
    e.preventDefault();

    if (groceryInput === '') {
      toast.warn('Please enter an item!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    } else {
      let checkIfGroceryItemAlreadyExists = groceryList.findIndex(
        (item) =>
          item.grocery.toLocaleLowerCase() === groceryInput.toLocaleLowerCase()
      );
      if (checkIfGroceryItemAlreadyExists > -1) {
        toast.warn('Grocery Item already exists!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      } else {
        try {
          let createdGroceryItem = await axios.post(
            `${URL}/api/grocery/create-grocery-item`,
            {
              grocery: groceryInput,
            }
          );
          let newArray = [...groceryList, createdGroceryItem.data.payload];
          setGroceryList(newArray);
          setGroceryInput('');
        } catch (e) {
          toast.warn('Error:', e, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    }
  }

  async function handleRemoveItem(e) {
    e.preventDefault();
    if (selected === '') {
      toast.warn('Please select an item!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const _id = groceryList[selected]._id;
    try {
      let deletedGroceryItem = await axios.delete(
        `${URL}/api/grocery/delete-grocery-by-id/${_id}`
      );
      let filteredArray = groceryList.filter(
        (item) => item._id !== deletedGroceryItem.data.payload._id
      );
      setGroceryList(filteredArray);
    } catch (e) {
      toast.warn('Error:', e, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  async function handleUpdateItem(e) {
    e.preventDefault();

    if (selected === '') {
      toast.warn('Please select an item!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    setButtonDisabled(true);
    if (groceryInput === '') {
      setGroceryInput(groceryList[selected].grocery);
      setNotDisabled(false);
      return;
    }

    const _id = groceryList[selected]._id;

    try {
      let editedGroceryItem = await axios.put(
        `${URL}/api/grocery/update-grocery-by-id/${_id}`,
        {
          grocery: groceryInput,
        }
      );
      let updatedGroceryArray = groceryList.map((item) => {
        if (item._id === _id) {
          item.grocery = editedGroceryItem.data.payload.grocery;
        }
        setNotDisabled(true);
        return item;
      });
      setGroceryList(updatedGroceryArray);
      setGroceryInput('');
      setSelected('');
      setButtonDisabled(false);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleMakeItemPriority(e) {
    e.preventDefault();
    if (selected === '') {
      toast.warn('Please select an item!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const _id = groceryList[selected]._id;

    let priorityValue = !groceryList[selected].priority;

    try {
      let editedGroceryItem = await axios.put(
        `${URL}/api/grocery/update-grocery-by-id/${_id}`,
        {
          priority: priorityValue,
        }
      );

      // let updatedGroceryArray = groceryList.map((item) => {
      //   if (item._id === _id) {
      //     item.grocery = editedGroceryItem.data.payload.grocery;
      //   }
      //   setNotDisabled(true);
      //   return item;
      // });
      // setGroceryList(updatedGroceryArray);
      setNotDisabled(true);
      getAllGroceryItems();
      setGroceryInput('');
      setSelected('');
    } catch (e) {
      console.log(e);
    }
  }

  async function handleMarkCompleted(e) {
    e.preventDefault();
    const _id = groceryList[selected]._id;
    const purchasedValue = !groceryList[selected].purchased;
    try {
      let groceryIsPurchasedUpdated = await axios.put(
        `${URL}/api/grocery/update-purchased-by-id/${_id}`,
        {
          purchased: purchasedValue,
        }
      );
      let updatedArray = groceryList.map((item) => {
        if (item._id === groceryIsPurchasedUpdated.data.payload._id) {
          item.purchased = groceryIsPurchasedUpdated.data.payload.purchased;
        }
        return item;
      });
      setGroceryList(updatedArray);
    } catch (e) {
      console.log(e);
    }
  }

  async function sortByDate(sortOrder) {
    try {
      let sortedGroceryItems = await axios.get(
        `${URL}/api/grocery/get-grocery-by-sort?sort=${sortOrder}`
      );
      console.log(sortedGroceryItems.data.payload);
      setGroceryList(sortedGroceryItems.data.payload);
    } catch (e) {
      console.log(e);
    }
  }
  async function sortByPurchased(isPurchased) {
    try {
      let isPurchasedGroceryArray = await axios.get(
        `${URL}/api/grocery/get-grocery-by-purchased?isPurchased=${isPurchased}`
      );
      setGroceryList(isPurchasedGroceryArray.data.payload);
    } catch (e) {
      console.log(e);
    }
  }

  const itemsToGroceryList = {
    groceryList,
    selected,
    setSelected,
    handleMarkCompleted,
    notDisabled,
  };

  const itemsToHeader = {
    groceryInput,
    setGroceryInput,
    handleCreateItem,
    handleRemoveItem,
    handleUpdateItem,
    handleMakeItemPriority,
    setSelected,
    buttonDisabled,
    sortByDate,
    sortByPurchased,
  };

  return (
    <div className='App'>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <HeaderContext.Provider value={itemsToHeader}>
        <Header />
      </HeaderContext.Provider>

      <GroceryListContext.Provider value={itemsToGroceryList}>
        <GroceryList />
      </GroceryListContext.Provider>
    </div>
  );
}

export default App;
