"use client"
import React, { useState } from "react";
import ConnectFour from "./ConnectFour";

const Startup = () => {
    const [Player_1st, setPlayer_1st] = useState({player_name:'', player_color:''})
    const [Player_2nd, setPlayer_2nd] = useState({player_name:'', player_color:''})
    const [ActiveGame, setActiveGame] = useState(false)
    const [SameColor, setSameColor] = useState(false)

    const handleChange_1 = (e) => {
        setPlayer_1st({
            ...Player_1st, [e.target.name]: [e.target.value]
    })
    }

    const handleChange_2 = (e) => {
        setPlayer_2nd({
            ...Player_2nd, [e.target.name]: [e.target.value]
    })
    }

    const handleGame = () => {
      {Player_1st.player_color === Player_2nd.player_color || Player_1st.player_name === '' || Player_2nd.player_name === '' ? setSameColor(true) : setActiveGame(true)}
      
    }

  return (
    <>
    <section className={`flex items-center justify-center h-screen relative font-mono ${ActiveGame === false ? 'visible' : 'hidden'}`}>
      <div className="m-auto">
        <h1 className="text-5xl font-bold flex items-center justify-center mb-10">
          Conncet Four Game
        </h1>
        <p className="flex items-center justify-center text-xl my-3">
          This is 2 player game where to win connect 4 points consecutive
        </p>
        <div className="flex justify-between my-3 gap-4">
          <div>
            1St Player Name ={" "}
            <input
              type="text"
              name="player_name"
              placeholder="Player Name"
              className="rounded-xl bg-[#101010] px-2 py-1"
              onChange={handleChange_1}
            />
          </div>
          <div className="items-center justify-center gap-2">
            1St Player Colour ={" "}
            <input
              type="color"
              name="player_color"
              placeholder="Pick Colour"
              className="bg-transparent"
              onChange={handleChange_1}
            />
          </div>
        </div>
        <div className="flex justify-between my-3 gap-4">
          <div>
            2nd Player Name ={" "}
            <input
              type="text"
              name="player_name"
              placeholder="Player Name"
              className="rounded-xl bg-[#101010] px-2 py-1"
              onChange={handleChange_2}
            />
          </div>

          <div className="items-center justify-center gap-2">
            2nd Player Colour ={" "}
            <input
              type="color"
              value={Player_2nd.player_color}
              placeholder="Pick Colour"
              name="player_color"
              className="bg-transparent"
              onChange={handleChange_2}
            />
          </div>
        </div>
        <div className="button flex items-center justify-center rounded-xl mx-auto"
        onClick={handleGame}
        >
          Start 
        </div>
        <div>{SameColor === true ? <div className="text-xl flex items-center justify-center text-red-500 p-4">Oops color is same please choose different color and name <br /> can not be empty!</div> : <div></div>}</div>
      </div>
    </section>
    <div className={`${ActiveGame === true ? 'visible' : 'hidden'}`}><ConnectFour Player_1st={Player_1st} Player_2nd={Player_2nd} ActiveGame={ActiveGame} setActiveGame={setActiveGame}/></div>
    
    </>
  );
};

export default Startup;
