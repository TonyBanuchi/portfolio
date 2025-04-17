'use client';
// REACT Imports
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";

// Component Imports
import { Button } from "@mui/material";

// type imports

// Style Imports
import { BehaviorSubject, Observable } from "rxjs";

export interface IKeyPadProps {
  sendItem: (total: number) => void;
  clear: Observable<boolean>;
}

export function KeyPad(props: IKeyPadProps) {
  // STATE Context
  const [price, setPrice] = useState<number>(0);
  let clearState = false;

  // subscribe to triggers
  props.clear.subscribe((x: boolean) => {
    if (x !== clearState) {
      clearState = !clearState;
      setPrice(0);
      clearEntry();
    }
  });

  let clearTriggerValue = false;
  const clearTrigger: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    clearTriggerValue
  );

  function addItem(): void {
    props.sendItem(price);
    clearEntry();
  }

  function clearEntry(): void {
    clearTriggerValue = !clearTriggerValue;
    clearTrigger.next(clearTriggerValue);
  }

  const incrementValue = () => {
    setPrice(price + 0.01);
  };
  const decrementValue = () => {
    setPrice(price - 0.01);
  };

  const handlePriceChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setPrice(Number(event.target.value));
  };

  function keyPadHandler(key: number): void {
    let newValue = price.toFixed(2);
    newValue = newValue.replace(".", "");
    newValue += `${key}`;
    newValue =
      newValue.substring(0, newValue.length - 2) +
      "." +
      newValue.substring(newValue.length - 2);
    setPrice(Number(newValue));
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <Button
            id="decrement"
            className="btn btn-primary"
            variant="contained"
            onClick={decrementValue}
          >
            -
          </Button>
          <input
            type="number"
            className="text-center text-lg"
            value={price}
            onChange={handlePriceChange}
            min={0}
          />
          <Button
            id="increment"
            className="btn btn-secondary"
            variant="contained"
            onClick={incrementValue}
          >
            +
          </Button>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <Button id="7" variant="contained" onClick={() => keyPadHandler(7)}>
              7
            </Button>
            <Button id="4" variant="contained" onClick={() => keyPadHandler(4)}>
              4
            </Button>
            <Button id="1" variant="contained" onClick={() => keyPadHandler(1)}>
              1
            </Button>
            <Button
              id="clear"
              className="btn btn-primary"
              variant="contained"
              onClick={clearEntry}
            >
              Clear
            </Button>
          </div>
          <div className="flex flex-col">
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
          <div className="flex flex-col">
            <Button id="9" variant="contained" onClick={() => keyPadHandler(9)}>
              9
            </Button>
            <Button id="6" variant="contained" onClick={() => keyPadHandler(6)}>
              6
            </Button>
            <Button id="3" variant="contained" onClick={() => keyPadHandler(3)}>
              3
            </Button>
            <Button
              id="add"
              className="btn btn-secondary"
              variant="contained"
              onClick={addItem}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
