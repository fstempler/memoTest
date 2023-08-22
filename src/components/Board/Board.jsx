import { useEffect } from 'react';
import MemoBlock from '../MemoBlock/MemoBlock';
import './board.css';

const Board = ({animating, handleMemoClick, memoBlocks, onGameCompletion}) => {

    const allBlocksMatched = memoBlocks.every((block) => block.flipped);
    useEffect(() => {
        if(allBlocksMatched) {
            onGameCompletion()
        }
    }, [allBlocksMatched, onGameCompletion]);
    return (
        <main className="board">
            {memoBlocks.map( (memoBlock, i) => {
                return <MemoBlock key={`${i}_${memoBlock.emoji}`} animating={animating} handleMemoClick={handleMemoClick} memoBlock={memoBlock} />
            })}
        </main>
    );
}



export default Board;