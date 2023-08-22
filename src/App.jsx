import { useEffect, useState } from 'react';
import Board from './components/Board/Board';
import fetchEmojis  from './lib/emojis.request';
import Navbar from './components/NavBar/NavBar';
import './App.css'

const initialEmojiCount = 24;
const additionalEmojiCount = 6;

function App() {

  //Estamos para almacenar los bloques, el bloque seleccionado y si tiene una animación. 
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]); //Almacena los bloques en la memoria
  const [selectedMemoBlock, setSelectedMemoBlock] = useState(null); //Almacena los bloques que selecciona el usuario
  const [animating, setAnimating] = useState(false); //Almacena los bloques seleccionados en el tablero

  useEffect( () => {
  
    async function fetchData() {
      try {
        const emojis = await fetchEmojis(initialEmojiCount);
        console.log(emojis);
        setShuffledMemoBlocks(emojis);
      } catch (error) {
        console.error('Error fetching emojis:', error);
      }
    }

    fetchData();
    
  },  []);
 


 
  const handleMemoClick = memoBlock => {
    const flippedMemoBlock = {...memoBlock, flipped: true }; //Cambia el estado del bloque cuando se hace click y lo voltea
    let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
    shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
    setShuffledMemoBlocks(shuffledMemoBlocksCopy);
    if(selectedMemoBlock === null){
      setSelectedMemoBlock(memoBlock);
    }else if(selectedMemoBlock.emoji === memoBlock.emoji) {
      setSelectedMemoBlock(null);
    }else{
      setAnimating(true);
      setTimeout(() => {
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
        shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1 , selectedMemoBlock);
        setShuffledMemoBlocks(shuffledMemoBlocksCopy);
        setSelectedMemoBlock(null);
        setAnimating(false);
      }, 1000);
    }
  }

  const handleGameCompletion = () => {
    const newEmojiCount = shuffledMemoBlocks.length + additionalEmojiCount;
    fetchEmojis(newEmojiCount).then((emojis) => {
      setShuffledMemoBlocks(emojis);
    });
  };
 
  return (
    <><Navbar />
    <Board memoBlocks={shuffledMemoBlocks} 
    animating={animating} 
    handleMemoClick={handleMemoClick} 
    onGameCompletion={handleGameCompletion} />
    </>
  );
}

export default App
