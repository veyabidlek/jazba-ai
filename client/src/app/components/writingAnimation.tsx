import React from "react";
import Lottie from "lottie-react";
import animationData from "../writing-animation.json"; // You'll need to save the JSON data in this file

interface WritingAnimationProps {
  width?: number;
  height?: number;
}

const WritingAnimation: React.FC<WritingAnimationProps> = ({
  width = 150,
  height = 150,
}) => {
  return (
    <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      style={{ width, height }}
    />
  );
};

export default WritingAnimation;
