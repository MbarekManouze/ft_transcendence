import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
interface LogoProps {
    toggle: boolean;
  }
const Logo: React.FC<LogoProps> = ({  }) => {
    return(
        <div className=" mb-5 ">
            <motion.div 
            className="box"
            animate={{
              scale: [1, 1.5, 1.5, 1, 1],
              rotate: [0, 0, 180, 180, 0],
              borderRadius: ["0%", "0%", "50%", "50%", "0%"]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.2, 0.5, 0.8, 1],
              repeatDelay: 1
            }}>
                <Link to="/home"><img src={logo} alt="logo" className=""/></Link>
            </motion.div>
        </div>
    );
}
export default Logo;