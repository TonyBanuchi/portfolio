"use client";
// REACT Imports
import { useReducer } from "react";

// Logic imports
import { BehaviorSubject, Observable } from "rxjs";

// Component Imports
import { Paper } from "@mui/material";
import { KeyPad } from "@/app/projects/cashRegister/KeyPad";

// REDUCER - enum for types
enum listActionType {
  add = "add",
  clear = "clear",
}

// REDUCER - interface for actions
interface IListAction {
  type: listActionType;
  payload: string;
}

// REDUCER - interface for state
interface IListState {
  items: string[];
  total: string;
}

// interface for item list component

export interface IitemListProps {
  sendTotal: (total: string) => void;
  resetTrigger: Observable<boolean>;
}

function listReducer(state: IListState, action: IListAction) {
  const { type, payload } = action;
  switch (type) {
    case listActionType.add:
      return {
        ...state,
        items: [...state.items, payload],
        total: (Number(state.total) + Number(payload)).toFixed(2),
      };

    case listActionType.clear:
      return {
        ...state,
        items: [],
        total: "0.00",
      };
    default:
      return state;
  }
}

export function ItemsList(props: Readonly<IitemListProps>) {
  // STATE Context
  const [state, dispatch] = useReducer(listReducer, {
    items: [],
    total: "0.00",
  });

  // configure parent trigger response
  props.resetTrigger.subscribe((observer) => {
    if (observer) {
      clearList();
    }
  });

  let keypadTriggerValue = false;
  const keyPadClear: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    keypadTriggerValue
  );

  // Add item to list handler and updates total
  function addItem(item: string): void {
    dispatch({ type: listActionType.add, payload: item });
  }

  // clear item list entries
  function clearList(): void {
    dispatch({ type: listActionType.clear, payload: "" });
    keypadTriggerValue = !keypadTriggerValue;
    keyPadClear.next(keypadTriggerValue);
  }

  function sendTotalHandler(): void {
    props.sendTotal(state.total);
  }

  return (
    <Paper elevation={2} className="size-full">
      <div className="flex flex-col w-full bg-light-surface-muted">
        <div className="size-full max-w-98/100 place-items-center justify-evenly flex flex-col md:flex-row m-3 p-3">
          {/* Itemized prices list */}
          <Paper
            elevation={3}
            className="flex flex-col size-full m-3 p-3 place-items-center max-h-60 max-w-full md:max-w-1/4"
          >
            <h3 className="mt-2 mb-4">Items</h3>
            <ul className="list-none overflow-y-auto max-h-40 place-self-end">
              {state.items.map((item) => (
                <li
                  className="text-lg text-end mr-10"
                  key={crypto.randomUUID()}
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-row justify-between mt-3">
              <h3 className="font-bold text-xl">Total:</h3>
              <h3 className="font-bold text-xl">{`$${state.total}`}</h3>
            </div>
          </Paper>

          <KeyPad
            sendItem={(item: string) => addItem(item)}
            clear={keyPadClear}
          />
        </div>

        <div className="flex flex-row m-3 p-3 place-items-center justify-around">
          <button
            id="acknowledge-btn"
            className="btn btn-primary"
            onClick={clearList}
          >
            Clear List
          </button>
          <button
            id="purchase-btn"
            className="btn btn-secondary"
            onClick={sendTotalHandler}
          >
            Submit Purchase
          </button>
        </div>
      </div>
    </Paper>
  );
}
