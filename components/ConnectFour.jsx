"use client";
import Link from "next/link";
import React, { useState } from "react";
import Startup from "./Startup";

const ConnectFour = ({Player_1st, Player_2nd, ActiveGame, setActiveGame}) => {
  const array = Array.from({length : 10}, () => Array.from({length : 10}, () => 'white'))
  const [divColors, setDivColors] = useState(array);
  const [Player, setPlayer] = useState(1)
  const [Winner, setWinner] = useState('')
  const [Chance, setChance] = useState(Player_1st.player_name)

  const [FilledRow, setFilledRow] = useState([])
  const changeColor = (index, col_index) => {
    
    let newFilledRow
    if(divColors[index][col_index] === 'white'){

      if(Player){
        newFilledRow = [Player_1st.player_color, index, col_index]
        divColors[index][col_index] = Player_1st.player_color
        setWinner(CheckWinner(divColors, index, col_index, Player_1st.player_color))
        setPlayer(!Player)
        setChance(Player_2nd.player_name)
      }

      else{
        newFilledRow = [Player_2nd.player_color, index, col_index]
        divColors[index][col_index] = Player_2nd.player_color
        setWinner(CheckWinner(divColors, index, col_index, Player_2nd.player_color))
        setPlayer(!Player)
        setChance(Player_1st.player_name)
      }
    }
    setFilledRow((FilledRow) => [...FilledRow, newFilledRow])
    setDivColors(divColors)
  }

  let intt = 0
  let vis = Array.from({length : 10}, () => Array.from({length : 10}, () => 0))
   
  const CheckWinner = (divColors, row, col, color) => {
    if(intt === 3){
      return color === Player_1st.player_color ? Player_1st.player_name : Player_2nd.player_name
    }
    vis[row][col] = 1
    let Row = [-1, 0, 1, 0]
    let Col = [0, 1, 0, -1]
    for(let i=0;i<4;i++){
      let nrow = Row[i] + row
      let ncol = Col[i] + col
      
      if(nrow >= 0 && nrow < 10 && ncol >=0 && ncol < 10 && !vis[nrow][ncol] && divColors[nrow][ncol] === color){
          intt++
        return CheckWinner(divColors, nrow, ncol, color)
      }
    }
    return ''
  }
  
  const makeArrary = () => {
    return Array.from({ length: 10 }, (_, index) => 
    <div key={index} className="flex">
      {Array.from({length : 10}, (_, col_index) => (
        <div 
        key={col_index} 
        className={`h-10 w-10 rounded-full m-2 bg-[${divColors[index][col_index]}]`}
        style={{backgroundColor:divColors[index][col_index]}}
        onClick={() => changeColor(index, col_index)}
        >
    
        </div>
      ))}
    </div>
    );
  };

  const Replay = () => {
    setDivColors(array)
    setWinner('')
    setChance(Player_1st.player_name)
  }

  const handleReplay = () => {
    setWinner('')
    setDivColors(array)
    setActiveGame(false)
  }

  return (
    <section className={`flex items-center justify-center h-screen relative`}>
      <div className="flex absolute top-10 text-2xl font-mono">Chance : {Chance}</div>
      <div className={`border-2 rounded-md p-2 ${Winner === '' ? 'opacity-100' : 'opacity-20'}`}>
        {makeArrary()}
      </div>
      <div className={`${Winner === '' ? 'hidden' : 'absolute'}`}>
        <span className="flex justify-center items-center font-bold text-2xl">{Winner} wins the match</span>
        <div className="flex m-2 gap-2">
        <div className="button flex h-50 rounded-xl" onClick={Replay}>Replay with same Players</div>
        <div className={`button flex rounded-xl h-50 `} onClick={handleReplay}>New Match with new Player</div>
        </div>
      </div>
    </section>
  );
};

export default ConnectFour;
