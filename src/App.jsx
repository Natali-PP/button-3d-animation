import { useState, Suspense, useRef } from "react";
import './App.css';
import Shapes from './components/Shapes.jsx';
import { motion, useMotionValue } from "framer-motion";
import { MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";

const transition = {
  type: "spring",
  duration: 0.7,
  bounce: 0.2
};
function App() {
  const [isHover, setIsHover] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const [ref, bounds] = useMeasure({ scroll: false });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  return (

    <MotionConfig transition={transition}>
      <motion.button
        ref={ref}
        variants={{
          rest:{scale:1},
          hover:{scale:1.5},
          press: {scale:1.4}
        }}
        initial={false}
        whileTap="press"
        animate={ isHover ? 'hover' : 'rest'}
        onHoverStart={(e) => {
          console.log('hover empieza')
          setIsHover(true);
        }}
        onHoverEnd={(e) => {
          console.log('hoverendddd')
          setIsHover(false);
        }}
        onTapStart={() => setIsPress(true)}
        onTap={() => setIsPress(false)}
        onTapCancel={() => setIsPress(false)}
        onPointerMove={(e) => {
          mouseX.set(e.clientX - bounds.x - bounds.width / 2);
          mouseY.set(e.clientY - bounds.y - bounds.height / 2);
        }}
      >
        <motion.div
          variants={{
            rest:{opacity:0},
            hover:{opacity:1}
          }}
          className="scene"
        >
          <div className='container'>
            <div className='shadow hack1'></div>
            <div className='shadow hack2'></div>
            <Suspense fallback={null}>
              <Shapes 
                isHover={isHover}
                isPress={isPress}
                mouseX={mouseX}
                mouseY={mouseY}
              />
            </Suspense>
          </div>

        </motion.div>
        <motion.div
          variants={{ hover: { scale: 0.85 }, press: { scale: 1.1 } }}
          className="label"
        >
          play
        </motion.div>
      </motion.button>

    </MotionConfig>
  )
}

export default App


