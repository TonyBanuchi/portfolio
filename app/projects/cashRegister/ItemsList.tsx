'use client';
// REACT Imports
import { useState } from 'react';

// Logic imports
import { BehaviorSubject, Observable } from 'rxjs';

// Component Imports
import { Button, Paper } from '@mui/material';
import { KeyPad } from '@/app/projects/CashRegister/KeyPad';


// Style Imports

export interface ICashCounterProps {
  sendTotal: (total: number) => void;
  resetTrigger: Observable<boolean>;

}

export function ItemsList(props: ICashCounterProps) {
  // STATE Context
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [items, setItems] = useState<number[]>([]);

  // configure parent trigger response
  props.resetTrigger.subscribe((observer) => {
    if(observer){
      clearList();
    }
  })

  let keypadTriggerValue = false;
  const keyPadClear: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(keypadTriggerValue);

  // Add item to list handler
  function addItem(item: number): void {
    setItems([...items, item]);
    setTotalHandler();
  }

  // calculate and update total
  function setTotalHandler(): void {
    const newTotal = items.reduce((p: number, a: number) => parseInt((a += p).toFixed(2)), 0);
    setTotalPrice(newTotal);
  }

  // clear item list entries
  const clearList = () => { 
    setItems([]) 
    keypadTriggerValue = !keypadTriggerValue;
    keyPadClear.next(keypadTriggerValue);
    setTotalPrice(0);
  };

  function sendTotalHandler():void {
      props.sendTotal(totalPrice);
  }

  return (
    <>
      <Paper elevation={2}>
        <div className="flex flex-col place-items-center size-8/10 m-1 p-1">
      <div className={`flex flex-row`}>
        <Paper elevation={3}>
        <div className="list-none">
          <ul>
            {items.map((item) => (
              <li key={crypto.randomUUID()} >{item}</li>
            ))}
          </ul>
        </div>
        </Paper>
        <div id="price-display" className="font-bold text-xl">{`$${totalPrice.toFixed(2)}`}
        <Paper elevation={3}>
        <KeyPad sendItem={(item: number) => addItem(item)} clear={keyPadClear}/>
        </Paper>
        </div>
        </div>
        <Paper elevation={3}>
        <div className="flex flex-row">
        <Button id="purchase-btn" className="btn btn-primary" variant="contained" onClick={sendTotalHandler}>
          Add Item
        </Button>
        <Button id="acknowledge-btn" className='btn btn-primary' variant="contained" onClick={clearList}>
          Clear
        </Button>
      </div>
      </Paper>
    </div >
    </Paper>
    </>
  );
}
