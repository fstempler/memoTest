import { useEffect, useState } from 'react';
import Board from './components/Board/Board';
const emojiList = ['🍋', '🎗️', '💰', '🐭', '🌄', '👾', '🦸‍♀️', '🌙', '🌜', '🙈', '🍉', '🔰']
;
import './App.css'


function App() {

  //Estamos para almacenar lso bloques, el bloque seleccionado y si tiene una animación. 
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]); //Almacena los bloques en la memoria
  const [selectedMemoBlock, setSelectedMemoBlock] = useState(null); //Almacena los bloques que selecciona el usuario
  const [animating, setAnimating] = useState(false); //Almacena los bloques seleccionados en el tablero

  useEffect( () => {
    const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]);
    setShuffledMemoBlocks(shuffledEmojiList.map( (emoji, i) => ({ index: i, emoji, flipped: false}) ));
  }, []);

  //Algoritmo Fisher-Yates
  const shuffleArray = a => { //se pasa el array (a) como argumento
    for (let i = a.length - 1; i > 0; i--) { //Itera desde el último elemento del array hacia el primero
        const j = Math.floor(Math.random() * (i + 1)); //Genera un número aleatorio entre 0 y 1
        [a[i], a[j]] = [a[j], a[i]];//Intercamvia los elementos en las posiciones i y j desestructurando el array
    }
    return a; //devuelve el array mezclado
  }

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
 
  return (
    <Board memoBlocks={shuffledMemoBlocks} animating={animating} handleMemoClick={handleMemoClick}/>
  );
}

export default App
