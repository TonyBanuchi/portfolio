// REACT Imports
import React, { useState } from "react";

// logic imports
import { BehaviorSubject, Observable } from "rxjs";

// type imports
import { MoneyBreakdown } from "@/types/classes/MoneyBreakdown.class";

// component imports
import { Button } from "@mui/material";
import WholeNumberCurrField from "@/components/reusable/WholeNumberCurrField";

//style imports
export interface ICashCounterProps {
  sendCashCount: (newCashCount: MoneyBreakdown) => void;
  sendTotal: (total: number) => void;
  resetTrigger: Observable<boolean>;
}

export function CashCounter(props: ICashCounterProps) {
  // Establish State
  const [ones, setOnes] = useState<number>(0);
  const [fives, setFives] = useState<number>(0);
  const [tens, setTens] = useState<number>(0);
  const [twenties, setTwenties] = useState<number>(0);
  const [fifties, setFifties] = useState<number>(0);
  const [hundreds, setHundreds] = useState<number>(0);
  const [pennies, setPennies] = useState<number>(0);
  const [nickles, setNickels] = useState<number>(0);
  const [dimes, setDimes] = useState<number>(0);
  const [quarters, setQuarters] = useState<number>(0);
  const [cash, setCash] = useState<MoneyBreakdown>(new MoneyBreakdown());

  //configure child trigger
  let clearTriggerValue = false;
  const clearTrigger: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    clearTriggerValue
  );
  function fireClearTrigger(): void {
    clearTriggerValue = !clearTriggerValue;
    clearTrigger.next(clearTriggerValue);
  }

  // configure parent trigger response
  props.resetTrigger.subscribe((observer) => {
    if (observer) {
      clearCash();
    }
  });

  // configure state handlers
  function setDenominationHandler(denomination: string, value: number): void {
    switch (denomination) {
      case "penny":
        setPennies(value);
        break;
      case "nickel":
        setNickels(value);
        break;
      case "dime":
        setDimes(value);
        break;
      case "quarter":
        setQuarters(value);
        break;
      case "one":
        setOnes(value);
        break;
      case "five":
        setFives(value);
        break;
      case "ten":
        setTens(value);
        break;
      case "twenty":
        setTwenties(value);
        break;
      case "fifty":
        setFifties(value);
        break;
      case "hundred":
        setHundreds(value);
        break;
    }
    countCash();
  }

  function countCash(): void {
    const newCashCount: MoneyBreakdown = new MoneyBreakdown(
      pennies,
      nickles,
      dimes,
      quarters,
      ones,
      fives,
      tens,
      twenties,
      fifties,
      hundreds
    );
    setCash(newCashCount);
    props.sendTotal(cash.total());
  }

  function submitCash(): void {
    props.sendCashCount(cash);
  }

  function clearCash(): void {
    setPennies(0);
    setNickels(0);
    setDimes(0);
    setQuarters(0);
    setOnes(0);
    setFives(0);
    setTens(0);
    setTwenties(0);
    setFifties(0);
    setHundreds(0);
    fireClearTrigger();
  }

  return (
    <>
      <p>start cash counter</p>
      <div className="flex flex-row">
        <div className="flex flex-wrap flex-row">
          <div className="flex flex-wrap flex-col">
            <WholeNumberCurrField
              label={"Pennies"}
              name={"pennies"}
              fieldId={React.useId()}
              changeHandler={(outVal: number) =>
                setDenominationHandler("penny", outVal)
              }
              step={1}
              smallStep={1}
              largeStep={10}
              clearTrigger={clearTrigger}
              multiplier={cash.penny.valueMultiplier}
            />
            <WholeNumberCurrField
              label={"Nickels"}
              name={"nickels"}
              fieldId={React.useId()}
              changeHandler={(outVal: number) =>
                setDenominationHandler("nickel", outVal)
              }
              step={1}
              smallStep={1}
              largeStep={10}
              clearTrigger={clearTrigger}
              multiplier={cash.nickel.valueMultiplier}
            />
          </div>
          <div className="flex flex-wrap flex-col">
            <WholeNumberCurrField
              label={"Dimes"}
              name={"dimes"}
              fieldId={React.useId()}
              changeHandler={(outVal: number) =>
                setDenominationHandler("dime", outVal)
              }
              step={1}
              smallStep={1}
              largeStep={10}
              clearTrigger={clearTrigger}
              multiplier={cash.dime.valueMultiplier}
            />
            <WholeNumberCurrField
              label={"Quarters"}
              name={"quarters"}
              fieldId={React.useId()}
              changeHandler={(outVal: number) =>
                setDenominationHandler("quarter", outVal)
              }
              step={1}
              smallStep={1}
              largeStep={10}
              clearTrigger={clearTrigger}
              multiplier={cash.quarter.valueMultiplier}
            />
          </div>
        </div>
        <div className="flex flex-wrap flex-row">
          <div className="flex flex-wrap flex-col">
            <WholeNumberCurrField
              label={"Ones"}
              name={"ones"}
              fieldId={React.useId()}
              changeHandler={(outVal: number) =>
                setDenominationHandler("one", outVal)
              }
              step={1}
              smallStep={1}
              largeStep={10}
              clearTrigger={clearTrigger}
              multiplier={cash.one.valueMultiplier}
            />
            <WholeNumberCurrField
              label={"Fives"}
              name={"fives"}
              fieldId={React.useId()}
              changeHandler={(outVal: number) =>
                setDenominationHandler("five", outVal)
              }
              step={1}
              smallStep={1}
              largeStep={10}
              clearTrigger={clearTrigger}
              multiplier={cash.five.valueMultiplier}
            />
            <WholeNumberCurrField
              label={"Tens"}
              name={"tens"}
              fieldId={React.useId()}
              changeHandler={(outVal: number) =>
                setDenominationHandler("ten", outVal)
              }
              step={1}
              smallStep={1}
              largeStep={10}
              clearTrigger={clearTrigger}
              multiplier={cash.ten.valueMultiplier}
            />
          </div>
          <div className="flex flex-wrap flex-col">
            <WholeNumberCurrField
              label={"Twenties"}
              name={"twenties"}
              fieldId={React.useId()}
              changeHandler={(outVal: number) =>
                setDenominationHandler("twenty", outVal)
              }
              step={1}
              smallStep={1}
              largeStep={10}
              clearTrigger={clearTrigger}
              multiplier={cash.twenty.valueMultiplier}
            />
            <WholeNumberCurrField
              label={"Fifties"}
              name={"fifties"}
              fieldId={React.useId()}
              changeHandler={(outVal: number) =>
                setDenominationHandler("fifty", outVal)
              }
              step={1}
              smallStep={1}
              largeStep={10}
              clearTrigger={clearTrigger}
              multiplier={cash.fifty.valueMultiplier}
            />
            <WholeNumberCurrField
              label={"One Hundreds"}
              name={"hundreds"}
              fieldId={React.useId()}
              changeHandler={(outVal: number) =>
                setDenominationHandler("hundred", outVal)
              }
              step={1}
              smallStep={1}
              largeStep={10}
              clearTrigger={clearTrigger}
              multiplier={cash["hundred"].valueMultiplier}
            />
          </div>
        </div>
        <div className="btn-panel">
          <Button id="submit-btn" variant="contained" onClick={submitCash}>
            Submit
          </Button>
          <Button id="clear-btn" variant="contained" onClick={clearCash}>
            Clear
          </Button>
        </div>
      </div>
      <p>end cash counter</p>
    </>
  );
}
