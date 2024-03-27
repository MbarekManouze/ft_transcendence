import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import MyBotGame from "../../../../game/src/botGame.ts";
import MyMultiplayerGame from "../../../../game/src/multiplayerGame.ts";
import { socket_user, socketuser } from "../../socket";
import { fadeIn } from "./variants";

if (socket_user == undefined) {
  socketuser();
}

function GamePage() {
  const myCanvas = useRef<HTMLCanvasElement>(null);
  const myBotGameInstance = useRef<MyBotGame | null>(null);
  const myMultiplayerGameInstance = useRef<MyMultiplayerGame | null>(null);

  const handleExitButton = () => {
    if (myMultiplayerGameInstance.current) {
      window.location.href = "http://localhost:5173/home";
    }
  };

  const handleBotGameClick = () => {
    if (myBotGameInstance.current) {
      myBotGameInstance.current.startBotGame();
    }
  };

  const handleMultiplayerGameClick = async () => {
    try {
    if (myMultiplayerGameInstance.current) {
      myMultiplayerGameInstance.current.startMultiplayerGame();
      await axios.get("http://localhost:3000/profile/avatar", {
        withCredentials: true,
      });
    }
    }catch (err) {
    }
  };

  useEffect(() => {
    myBotGameInstance.current = new MyBotGame(myCanvas.current!);
    myMultiplayerGameInstance.current = new MyMultiplayerGame(
      myCanvas.current!
    );
  }, []);

  const handleGameFromHome = async () => {
    try {
    const outcome = await axios.get("http://localhost:3000/profile/GameFlag", {
      withCredentials: true,
    });
    if (outcome.data.flag === 1) {
      axios.post(
        "http://localhost:3000/profile/GameFlag",
        { flag: 0 },
        {
          withCredentials: true,
        }
      );
      setTimeout(() => {
        handleBotGameClick();
      }, 200);
    } else if (outcome.data.flag === 2) {
      handleMultiplayerGameClick();
    }
    }catch (err) {
    }
  };

  handleGameFromHome();

  return (
    <motion.div
      variants={fadeIn("down", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
      className="flex flex-col w-full justify-end items-center"
    >
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <motion.div
        id="avatars"
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
        className="flex-row justify-center items-center pt-[6rem] hidden"
      ></motion.div>
      <div className="box-border relative inset-0 flex flex-col justify-center w-full h-full -mt-[10rem] mx-[1rem] text-white items-center text-6x">
        <canvas
          ref={myCanvas}
          className="bg-pale-blue absolute m-auto inset-0 rounded-main max-w-full max-h-full w-1088 h-644"
          id="canvas"
        ></canvas>
        <div className="">
          <p
            className="relative text-bluish-purple inset-0 text-2xl font-roboto font-normal px-4 text-center"
            id="message"
          ></p>
          <motion.button
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="btn text-bluish-purple bg-gradient-to-br from-[#f78562] to-[#ce502a] hover:scale-105 duration-300   block relative text-4xl border-none rounded-[18px] font-PalanquinDark text-center font-medium tracking-normal my-2 mx-auto pt-1 px-7 pb-2 cursor-pointer"
            id="online-game"
            onClick={handleMultiplayerGameClick}
          >
            Play Online
          </motion.button>
          <motion.button
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="btn text-pale-blue bg-gradient-to-tr from-[#2A2742] to-[#3f3a5f] hover:scale-105 duration-300  block relative text-4xl border-none rounded-[18px] font-zcool text-center font-medium tracking-normal my-2 mx-auto pt-1 px-7 pb-2 cursor-pointer"
            id="bot-game"
            onClick={handleBotGameClick}
          >
            Play vs Bot
          </motion.button>
          <motion.button
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="btn text-[#3f3a5f]  bg-gradient-to-br from-[#3f3a5f] to-[#ce502acc] hover:scale-105 duration-300  block relative text-4xl border-none rounded-[18px] font-PalanquinDark text-center font-medium tracking-normal my-2 mx-auto pt-1 px-7 pb-2 cursor-pointer"
            id="exit-btn"
            onClick={handleExitButton}
          >
            Back Home
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default GamePage;
