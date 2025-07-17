"use client";
import { box } from "./board.module.css";
import { SUCCESS_COMBINATION } from "./constants";
import { useState, useEffect } from "react";
import Layout from "@/libs/layout";

const TicTacToe = () => {
  const boardInitialValue = Object.fromEntries(
    Array.from(new Set(SUCCESS_COMBINATION.flat())).map((k) => [k, null])
  );
  const [board, setBoard] = useState(boardInitialValue);
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(null);

  const onReset = () => {
    setBoard(boardInitialValue);
    setTurn(1);
    setWinner(null);
  };

  useEffect(() => {
    SUCCESS_COMBINATION.forEach((comboArr) => {
      const playerValue = board[comboArr[0]];
      const isWinner = comboArr.every(
        (boxId) => board[boxId] !== null && board[boxId] === playerValue
      );
      if (isWinner) {
        onReset();
        setWinner(playerValue === "X" ? "Player 1" : "Player 2");
        return;
      }
    });
  }, [board]);

  const onBoxClick = (boxId) => {
    const turnValue = turn ? "X" : "O";
    setBoard({
      ...board,
      [boxId]: turnValue,
    });
    setTurn(!turn);
  };

  return (
    <Layout>
      {winner && <span>{`${winner} has won`}</span>}
      <table>
        <tbody>
          {Array.from({ length: 3 }, () => 0).map((_, i) => {
            return (
              <tr key={i}>
                {Array.from({ length: 3 }, () => 0).map((_, j) => {
                  return (
                    <td
                      key={j}
                      id={`${i}${j}`}
                      className={box}
                      onClick={() => onBoxClick(`${i}${j}`, turn)}
                    >
                      {board[`${i}${j}`] && <span>{board[`${i}${j}`]}</span>}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={onReset}>Reset</button>
    </Layout>
  );
};

export default TicTacToe;
