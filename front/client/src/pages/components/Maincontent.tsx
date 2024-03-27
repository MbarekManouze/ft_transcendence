import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Astronaut from "../../img/Astronaut.png";
import Group from "../../img/Group.png";
import Maskgroup from "../../img/Maskgroupp.png";
import Raket from "../../img/Raket.png";
import Rakets from "../../img/Rakets.png";
import Table from "../../img/tableping.png";
import { socket_user, socketuser } from "../../socket";
import Friends from "./Friends";
import TopStreamer from "./TopStreamer";
import { fadeIn } from "./variants";

type User = {
  id_user: number;
  name: string;
  avatar: string;
  TwoFactor: boolean;
  secretKey: string | null;
  status_user: string;
  wins: number;
  losses: number;
  games_played: number;
  Progress: number;
  Wins_percent: number;
  Losses_percent: number;
  About: string;
};

function Maincontent() {
  const [toggle, setToggle] = useState(false);

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleBotGame = () => {
    axios.post(
      "http://localhost:3000/profile/GameFlag",
      { flag: 1 },
      { withCredentials: true }
    );
    setTimeout(() => {
      window.location.href = "/game";
    }, 200);
    setToggle(false);
  };

  const handleMultiplayerGame = () => {
    axios.post(
      "http://localhost:3000/profile/GameFlag",
      { flag: 2 },
      { withCredentials: true }
    );
    setTimeout(() => {
      window.location.href = "/game";
    }, 1000);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [user, setUser] = useState<User[]>([]);
  useEffect(() => {
    if (socket_user == undefined) {
      socketuser();
    }
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/auth/get-user",
          {
            withCredentials: true,
          }
        );
        setUser(data);
      } catch (err) {}
    };
    fetchData();
  }, []);

  return (
    <main className="overflow-scroll resultContainer flex flex-col w-full  overflow-x-hidden overflow-y-auto mb-14">
      <div className="flex w-full mx-auto pr-6">
        <div className="flex flex-col w-full h-full text-gray-900 text-xl lg-laptop:mr-20">
          <div className="flex w-full h-full text-gray-900 text-xl space-x-0 lg-laptop:space-x-32 laptop:ml-3 flex-col lg-laptop:flex-row mt-0 2xl:mt-20">
            <motion.div
              variants={fadeIn("down", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="flex w-full h-96 lg-laptop:h-[30rem] pl-2 lg:pl-10 pt-10 mt-10 rounded-[46px] lg-laptop:ml-32  mx-auto bg-gradient-to-tr from-[#2A2742] via-[#3f3a5f] to-[#2A2742] shadow-2xl"
            >
              <div className="flex flex-col text-white">
                <img
                  className=" xl:ml-auto mobile:block mobile:ml-14 mobile:-mt-14  mobile:max-w-[100%]  laptop:hidden tablet:hidden tablet:max-w-[70%]"
                  src={Group}
                />
                <p className=" flex mobile:text-center p-2 tablet:text-left w-auto text-stone-300 text-xs font-normal ">
                  FREE-TO-PLAY . PLAY-TO-EARN
                </p>
                <h1 className=" flex mobile:text-center mobile:pl-5 tablet:pl-2 tablet:text-left font-Lemon laptop:text-4xl lg-laptop:text-6xl text-2xl lg:text-[50px] w-[30px] leading-[40px] lg:leading-[50px] mt-1 mb-2">
                  WELCOME TO PING PONG GAME
                </h1>
                <p className="flex mobile:text-center mobile:px-2  tablet:text-left tablet:max-w-[60%] text-stone-300 text-xs mt-1 font-normal">
                  Enter the world of paddles and balls Begin your Pong journey
                </p>
              </div>
              <img
                className="max-w-6xl -mt-20 xl:ml-auto hidden laptop:block laptop:max-w-[70%] tablet:block mobile:hidden tablet:max-w-[70%]"
                src={Group}
                alt=""
              />
            </motion.div>
            <motion.div
              variants={fadeIn("down", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className="flex w-full lg-laptop:-mr-20 justify-between lg-laptop:h-[30rem] tablet:h-96 mobile:h-full p-12 mt-10 rounded-[46px] mx-auto bg-gradient-to-tr from-[#3F3B5B] via-[#2A2742] to-[#302c4bc7] shadow-2xl"
            >
              <div className="flex flex-col text-white">
                <h1 className=" text-2xl tablet:text-[45px] mb-5 -ml-7  font-bold tablet:ml-1 laptop:ml-10">
                  Top Streamer
                </h1>
                <div className="flex flex-row ">
                  <TopStreamer toggle={toggle} />
                </div>
              </div>
              <img
                className=" flex -mr-[50px] h-[27rem]"
                src={Maskgroup}
                alt=""
              />
            </motion.div>
          </div>
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="text-white font-PalanquinDark mobile:mt-10 mobile:text-2xl lg-laptop:mt-20 text-4xl tablet:text-5xl lg-laptop:ml-32 lg-laptop::text-6xl ml-5 my-8 "
          >
            Game mode
          </motion.div>
          <motion.div
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className="flex w-full  h-60 items-center justify-center mt-72 lg:-mt-1 mx-auto lg-laptop:mt-20 lg-laptop:mx-0"
          >
            <div className="flex flex-col lg-laptop:flex-row laptop:mt-[38rem] lg-laptop:mt-10 max-w-full mx-auto gap-8 justify-center items-center  group">
              <div
                className="bg-gradient-to-tr from-[#3F3B5B] via-[#2A2742] to-[#2A2742]  lg:h-60 tablet:w-96 lg-laptop:w-[30rem] lg-laptop:h-72  mobile:w-44 h-56  duration-500 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 cursor-pointer p-8 rounded-[46px] group-hover:mix-blend-luminosity hover:!mix-blend-normal shadow-2xl"
                onClick={handleClickOpen}
              >
                <img
                  className="mx-auto lg-laptop:-mt-14 tablet:w-44 lg-laptop:w-60 mobile:mb-8 text-center tablet:mb-0 lg-laptop:mb-10"
                  src={Raket}
                  alt=""
                />
                <h4 className="uppercase text-lg tablet:text-xl mobile:text-center tablet:text-start  font-bold text-white">
                  classic
                </h4>
              </div>
              <div
                className="bg-gradient-to-tr from-[#3F3B5B] via-[#2A2742] to-[#2A2742] lg:h-60 tablet:w-96 mobile:w-44 lg-laptop:w-[30rem] lg-laptop:h-72 h-56  duration-500 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 cursor-pointer p-8 rounded-[46px] group-hover:mix-blend-luminosity hover:!mix-blend-normal shadow-2xl"
                onClick={handleBotGame}
              >
                <img
                  className="mx-auto w-40 lg-laptop:-mt-24 -mt-7 tablet:w-36 lg-laptop:w-60 laptop:w-40 mobile:mb-8 tablet:mb-0"
                  src={Astronaut}
                  alt=""
                />
                <span className="uppercase text-lg tablet:text-2xl font-bold mobile:text-center tablet:text-start text-white ml-3">
                  BOT
                </span>
              </div>
              <div
                className=" bg-gradient-to-tr from-[#3F3B5B] via-[#2A2742] to-[#2A2742] lg:h-60 tablet:w-96 mobile:w-44 lg-laptop:w-[30rem]  h-56 lg-laptop:h-72 duration-500 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 cursor-pointer p-8 rounded-[46px] group-hover:mix-blend-luminosity hover:!mix-blend-normal shadow-2xl"
                onClick={handleMultiplayerGame}
              >
                <img
                  className="mx-auto lg-laptop:-mt-14 tablet:-mt-5 mobile:mb-8 tablet:mb-0 lg-laptop:mb-16"
                  src={Rakets}
                  alt=""
                />
                <h4 className="uppercase text-lg tablet:text-2xl font-bold mobile:text-center tablet:text-start text-white">
                  Random player
                </h4>
              </div>
            </div>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              maxWidth="xl"
              aria-labelledby="responsive-dialog-title"
              sx={{
                p: 5,
                "& .MuiPaper-root": {
                  borderRadius: "26px",
                },
              }}
              PaperProps={{
                style: {
                  backgroundColor: "transparent",

                  borderRadius: "28px",
                },
              }}
              className="duration-500 backdrop-blur-lg  group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 cursor-pointer p-8 group-hover:mix-blend-luminosity hover:!mix-blend-normal shadow-2xl"
            >
              <div className="bg-[#8b98e452] h-[65vh] ">
                <DialogContent>
                  <div className="flex justify-center gap-5 ">
                    {user.map((data) => {
                      return (
                        <div key={data.id_user}>
                          <div className="bg-[#8b98e452] h-[20vh] w-[15vw] rounded-[30px] gap-5 ml-7 ">
                            <div className=" flex flex-col justify-end items-end m-2">
                              <div className=" flex flex-row justify-end space-x-24">
                                <img
                                  className="  flex w-24 h-24 justify-end rounded-full border-[4px] border-white mt-3"
                                  src={data.avatar}
                                  alt=""
                                />
                                <div className=" flex justify-end text-6xl text-white mt-4">
                                  0
                                </div>
                              </div>
                            </div>
                            <div className=" flex justify-center items-center text-white text-center  font-bold mt-2 text-xl">
                              {data.name}
                            </div>
                            <div className=" flex justify-between mx-10 mt-5 text-white">
                              <div className=" flex flex-col justify-center items-center">
                                <div className=" font-bold text-xl">Status</div>
                                <div className=" bg-[#457336] px-3 rounded-full mt-5">
                                  {data.status_user}
                                </div>
                              </div>
                              <div className=" flex flex-col justify-center items-center">
                                <div className=" font-bold text-xl">
                                  Progress
                                </div>
                                <div className=" px-3 text-[#FE754D] text-lg font-bold rounded-full mt-5">
                                  {data.Progress}%
                                </div>
                              </div>
                              <div className=" flex flex-col justify-center items-center">
                                <div className=" font-bold text-xl">Win</div>
                                <div className=" px-3 text-white font-bold rounded-full mt-5">
                                  {data.Wins_percent}%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <span className=" text-white text-6xl font-bold mt-4 -mx-3 ">
                      :
                    </span>
                    <Friends user={user} />
                  </div>

                  <div className=" flex flex-col justify-center items-center mt-5">
                    <div className="text-white font-bold text-[8rem] mb-10">
                      vs
                    </div>
                    <img className=" -mt-10" src={Table} alt="" />
                  </div>
                </DialogContent>
              </div>
            </Dialog>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
export default Maincontent;
