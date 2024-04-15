import React from "react";
import { Chessboard } from "react-chessboard";
import toast from "react-hot-toast";

interface StyledChessBoardProps {
  position: any;
  boardOrientation: "white" | "black";
  onDrop: any;
  myAddress: string;
  opponentAddress: string;
  isCheck: boolean;
}

function StyledChessBoard({
  position,
  boardOrientation,
  onDrop,
  myAddress,
  opponentAddress,
  isCheck,
}: StyledChessBoardProps) {
  const boardwidth = Math.round(
    Math.min(window.innerWidth, window.innerHeight) * 0.8
  );

  return (
    <div className="flex_center ">
      <div className="glassmorphism-chessboard-bg ">
        <div className="flex w-full text-text-color justify-end text-xl p-2 mt-2  rounded-lg">
          <p>{opponentAddress}</p>
        </div>
        <Chessboard
          boardWidth={boardwidth}
          boardOrientation={boardOrientation}
          position={position()}
          onPieceDrop={onDrop}
        />
        <div className="flex w-full justify-between text-text-color text-xl p-2 mt-2 rounded-lg">
          <p>{myAddress}</p>
          {isCheck && (
            <>
              {toast("Check!", {
                icon: "♟️",
              })}
              <p className="text-cyan-500 text-3xl font-bold p-2">Check!</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default StyledChessBoard;
