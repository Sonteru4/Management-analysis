import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ProgressProvider from "./ProgressProvider";

function CircularGraph(props: any) {
  const { percentage, color, trackColor } = props;
  return (
    <div className="p-2 pr-10 flex justify-center flex-col gap-2 ">
      {/* Progress bar */}
      <div className="max-w-[200px] max-h-[200px] border-dashed  rounded-full text-center items-center flex justify-center text-[50px] font-extrabold">
        <ProgressProvider valueStart={0} valueEnd={percentage}>
          {(value: any) => (
            <CircularProgressbar
              styles={buildStyles({
                strokeLinecap: "butt",
                pathTransitionDuration: 3,
                pathColor: `${color}`,
                textColor: `${color}`,
                trailColor: `${trackColor}`,
                // backgroundColor: `${colors.C11}`,
              })}
              value={value}
              text={`${percentage}%`}
            />
          )}
        </ProgressProvider>
      </div>
      <div className="text-center font-bold">Overall Performance</div>
    </div>
  );
}

export default CircularGraph;
