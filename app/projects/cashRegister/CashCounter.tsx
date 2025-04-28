"use client";
// REACT Imports
import React, { useReducer } from "react";

// logic imports
import { BehaviorSubject } from "rxjs";

// type imports
import { MoneyBreakdown } from "@/types/classes/MoneyBreakdown.class";

// component imports
import WholeNumberCurrField from "@/components/reusable/WholeNumberCurrField";

// Component Properties
export interface ICashCounterProps {
  initialData?: MoneyBreakdown;
  onSubmit: (result: MoneyBreakdown) => void;
}

// currancy denominations/Reducer action types
enum DenominationTypes {
  ones = "ones",
  fives = "fives",
  tens = "tens",
  twenties = "twenties",
  fifties = "fifties",
  hundreds = "hundreds",
  pennies = "pennies",
  nickles = "nickles",
  dimes = "dimes",
  quarters = "quarters",
  clear = "clear",
}

// Reducer Action
interface IDenomUpdate {
  type: DenominationTypes;
  payload: number;
}

// State Object
interface ICashState {
  ones: number;
  fives: number;
  tens: number;
  twenties: number;
  fifties: number;
  hundreds: number;
  pennies: number;
  nickels: number;
  dimes: number;
  quarters: number;
  cash: MoneyBreakdown;
  total: string;
}

// reducer function
function reducer(state: ICashState, action: IDenomUpdate): ICashState {
  const { type, payload } = action;

  const newState = { ...state };

  switch (type) {
    case DenominationTypes.pennies:
      newState.pennies = payload;
      break;
    case DenominationTypes.nickles:
      newState.nickels = payload;
      break;
    case DenominationTypes.dimes:
      newState.dimes = payload;
      break;
    case DenominationTypes.quarters:
      newState.quarters = payload;
      break;
    case DenominationTypes.ones:
      newState.ones = payload;
      break;
    case DenominationTypes.fives:
      newState.fives = payload;
      break;
    case DenominationTypes.tens:
      newState.tens = payload;
      break;
    case DenominationTypes.twenties:
      newState.twenties = payload;
      break;
    case DenominationTypes.fifties:
      newState.fifties = payload;
      break;
    case DenominationTypes.hundreds:
      newState.hundreds = payload;
      break;
    case DenominationTypes.clear:
      newState.pennies = 0;
      newState.nickels = 0;
      newState.dimes = 0;
      newState.quarters = 0;
      newState.ones = 0;
      newState.fives = 0;
      newState.tens = 0;
      newState.twenties = 0;
      newState.fifties = 0;
      newState.hundreds = 0;
  }

  const newCash = new MoneyBreakdown(
    state.pennies,
    state.nickels,
    state.dimes,
    state.quarters,
    state.ones,
    state.fives,
    state.tens,
    state.twenties,
    state.fifties,
    state.hundreds
  );

  const newTotal = newCash.total().toFixed(2);

  return { ...newState, total: newTotal, cash: newCash };
}

// Component Function
export function CashCounter(props: Readonly<ICashCounterProps>) {
  
  // Establish State
  const [state, dispatch] = useReducer(reducer, {
    pennies: 0,
    nickels: 0,
    dimes: 0,
    quarters: 0,
    ones: 0,
    fives: 0,
    tens: 0,
    twenties: 0,
    fifties: 0,
    hundreds: 0,
    cash: new MoneyBreakdown(),
    total: "0.00",
  });

  //configure child trigger
  let clearTriggerValue = false;
  const clearTrigger: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    clearTriggerValue
  );
  
  // child trigger function
  function fireClearTrigger(): void {
    clearTriggerValue = !clearTriggerValue;
    clearTrigger.next(clearTriggerValue);
  }

  // Submit cash object to parent
  function submitCash(): void {
    props.onSubmit(state.cash);
  }

  // Clear cash entries
  function clearCash(): void {
    dispatch({type: DenominationTypes.clear, payload: 0});
    fireClearTrigger();
  }

  // component markup
  return (
    <div className="flex flex-row">
      <div className="flex flex-wrap flex-row">
        <div className="flex flex-wrap flex-col">
          <WholeNumberCurrField
            label={"Pennies"}
            fieldId={React.useId()}
            changeHandler={(outVal: number) =>
              dispatch({type: DenominationTypes.pennies, payload: outVal})
            }
            step={1}
            smallStep={1}
            largeStep={10}
            clearTrigger={clearTrigger}
            multiplier={state.cash.penny.valueMultiplier}
          />
          <WholeNumberCurrField
            label={"Nickels"}
            fieldId={React.useId()}
            changeHandler={(outVal: number) =>
              dispatch({type: DenominationTypes.pennies, payload: outVal})
            }
            step={1}
            smallStep={1}
            largeStep={10}
            clearTrigger={clearTrigger}
            multiplier={state.cash.nickel.valueMultiplier}
          />
        </div>
        <div className="flex flex-wrap flex-col">
          <WholeNumberCurrField
            label={"Dimes"}
            fieldId={React.useId()}
            changeHandler={(outVal: number) =>
              dispatch({type: DenominationTypes.pennies, payload: outVal})
            }
            step={1}
            smallStep={1}
            largeStep={10}
            clearTrigger={clearTrigger}
            multiplier={state.cash.dime.valueMultiplier}
          />
          <WholeNumberCurrField
            label={"Quarters"}
            fieldId={React.useId()}
            changeHandler={(outVal: number) =>
              dispatch({type: DenominationTypes.pennies, payload: outVal})
            }
            step={1}
            smallStep={1}
            largeStep={10}
            clearTrigger={clearTrigger}
            multiplier={state.cash.quarter.valueMultiplier}
          />
        </div>
      </div>
      <div className="flex flex-wrap flex-row">
        <div className="flex flex-wrap flex-col">
          <WholeNumberCurrField
            label={"Ones"}
            fieldId={React.useId()}
            changeHandler={(outVal: number) =>
              dispatch({type: DenominationTypes.pennies, payload: outVal})
            }
            step={1}
            smallStep={1}
            largeStep={10}
            clearTrigger={clearTrigger}
            multiplier={state.cash.one.valueMultiplier}
          />
          <WholeNumberCurrField
            label={"Fives"}
            fieldId={React.useId()}
            changeHandler={(outVal: number) =>
              dispatch({type: DenominationTypes.pennies, payload: outVal})
            }
            step={1}
            smallStep={1}
            largeStep={10}
            clearTrigger={clearTrigger}
            multiplier={state.cash.five.valueMultiplier}
          />
          <WholeNumberCurrField
            label={"Tens"}
            fieldId={React.useId()}
            changeHandler={(outVal: number) =>
              dispatch({type: DenominationTypes.pennies, payload: outVal})
            }
            step={1}
            smallStep={1}
            largeStep={10}
            clearTrigger={clearTrigger}
            multiplier={state.cash.ten.valueMultiplier}
          />
        </div>
        <div className="flex flex-wrap flex-col">
          <WholeNumberCurrField
            label={"Twenties"}
            fieldId={React.useId()}
            changeHandler={(outVal: number) =>
              dispatch({type: DenominationTypes.pennies, payload: outVal})
            }
            step={1}
            smallStep={1}
            largeStep={10}
            clearTrigger={clearTrigger}
            multiplier={state.cash.twenty.valueMultiplier}
          />
          <WholeNumberCurrField
            label={"Fifties"}
            fieldId={React.useId()}
            changeHandler={(outVal: number) =>
              dispatch({type: DenominationTypes.pennies, payload: outVal})
            }
            step={1}
            smallStep={1}
            largeStep={10}
            clearTrigger={clearTrigger}
            multiplier={state.cash.fifty.valueMultiplier}
          />
          <WholeNumberCurrField
            label={"One Hundreds"}
            fieldId={React.useId()}
            changeHandler={(outVal: number) =>
              dispatch({type: DenominationTypes.pennies, payload: outVal})
            }
            step={1}
            smallStep={1}
            largeStep={10}
            clearTrigger={clearTrigger}
            multiplier={state.cash["hundred"].valueMultiplier}
          />
        </div>
      </div>
      <div className="btn-panel flex flex-row justify-around items-center mt-2 mb-2 ml-auto mr-auto">
        <button id="submit-btn" className="btn btn-secondary" onClick={submitCash}>
          Submit
        </button>
        <p className="total-cash">{state.total}</p>
        <button id="clear-btn" className="btn btn-primary" onClick={clearCash}>
          Clear
        </button>
      </div>
    </div>
  );
}
