'use client';
// REACT Imports
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";

// Component Communication Imports
import { Observable } from "rxjs";

// Component Imports
import { Button, Paper } from "@mui/material";


// Interface definiation of Keypad Component Properties
export interface IKeyPadProps {
  sendItem: (itemPrice: string) => void;
  clear: Observable<boolean>;
}

// KeyPad Component
export function KeyPad(props: Readonly<IKeyPadProps>) {
  // STATE Context
  const [price, setPrice] = useState<string>('0.00');
  let clearState = false;

  // subscribe to triggers
  props.clear.subscribe((x: boolean) => {
    if (x !== clearState) {
      clearState = !clearState;
      clearEntry();
    }
  });

  function addItem(): void {
    props.sendItem(price);
    clearEntry();
  }

  function clearEntry(): void {
    setPrice('0.00');

  }

  const incrementValue = () => {
    setPrice((parseInt(price) + 0.01).toFixed(2));
  };
  const decrementValue = () => {
    const value = parseInt(price);
    if(value === 0){return;}
    if(value < 0){setPrice('0.00'); return;}
    setPrice((parseInt(price) - 0.01).toFixed(2));
  };

  const handlePriceChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setPrice(event.target.value);
  };

  function keyPadHandler(key: number): void {
    let newValue = price;
    newValue = newValue.replace(".", "");
    newValue += `${key}`;
    newValue =
      newValue.substring(0, newValue.length - 2) +
      "." +
      newValue.substring(newValue.length - 2);
    setPrice(Number(newValue).toFixed(2));
  }

  return (
    <Paper elevation={3} className="
              flex
              flex-col
              size-full
              max-w-full md:max-w-1/2 lg:max-w-1/3
              m-3 p-3 place-items-center">
        <div className="flex flex-row size-full justify-between gap-3">
          <button
            id="decrement"
            className="btn btn-primary font-bold text-4xl"
            onClick={decrementValue}
          >
            -
          </button>
          <input
            type="number"
            className="text-center text-lg"
            value={price}
            onChange={handlePriceChange}
            min={0}
          />
          <button
            id="increment"
            className="btn btn-secondary font-bold text-4xl"
            onClick={incrementValue}
          >
            +
          </button>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col gap-2">
            <Button id="7" variant="contained" onClick={() => keyPadHandler(7)}>
              7
            </Button>
            <Button id="4" variant="contained" onClick={() => keyPadHandler(4)}>
              4
            </Button>
            <Button id="1" variant="contained" onClick={() => keyPadHandler(1)}>
              1
            </Button>
            <button
              id="clear"
              className="btn btn-primary"
              onClick={clearEntry}
              disabled={price === '0.00'}
            >
              Clear
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <Button id="8" variant="contained" onClick={() => keyPadHandler(8)}>
              8
            </Button>
            <Button id="5" variant="contained" onClick={() => keyPadHandler(5)}>
              5
            </Button>
            <Button id="2" variant="contained" onClick={() => keyPadHandler(2)}>
              2
            </Button>
            <Button id="0" variant="contained" onClick={() => keyPadHandler(0)}>
              0
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <Button id="9" variant="contained" onClick={() => keyPadHandler(9)}>
              9
            </Button>
            <Button id="6" variant="contained" onClick={() => keyPadHandler(6)}>
              6
            </Button>
            <Button id="3" variant="contained" onClick={() => keyPadHandler(3)}>
              3
            </Button>
            <button
              id="add"
              className="btn btn-secondary"
              onClick={addItem}
              disabled={price === '0.00'}
            >
              Add
            </button>
          </div>
        </div>
      </Paper>
  );
}
