'use client';

// REACT Imports
import React, { useState } from "react";

// Component Imports
import { NumberField } from "@base-ui-components/react/number-field";
import { Paper } from "@mui/material";

// Type Imports
import standardWholeNumberFormat from "@/types/constants/standardWholeNumberFormat.const";

// Logic Imports
import { Observable } from "rxjs";

// Custom Number field Properties
type WholeNumberCurrFieldProps = {
  label: string;
  fieldId: string;
  changeHandler: (value: number) => void;
  step: number;
  smallStep: number;
  largeStep: number;
  clearTrigger: Observable<boolean>;
  multiplier: number;
};

// Custom Number field handling whole number to currency calculation
export default function WholeNumberCurrField(props: Readonly<WholeNumberCurrFieldProps>) {
  // state declaration
  const [value, setValue] = useState(0);

  // clear value trigger
  let clearState = false;
  props.clearTrigger.subscribe((x: boolean) => {
    if (clearState !== x) {
      clearState = x;
      setValue(0);
    }
  });

  // Change Handler
  function onChangeHandler(
    value: number | null,
    event: Event | undefined
  ): void {
    if (value && event) {
      setValue(value);
      props.changeHandler(value);
    }
  };

  // Componenet Markup
  return (
    <Paper elevation={2} className="m-3 p-3 bg-light-surface-main">
    <NumberField.Root
      id={props.fieldId}
      defaultValue={0}
      className="flex flex-col gap-1"
      onValueChange={onChangeHandler}
      step={props.step}
      smallStep={props.smallStep}
      largeStep={props.largeStep}
      format={standardWholeNumberFormat}
      value={value}
    >
      <NumberField.ScrubArea className="font-bold select-none cursor-crosshair">
      <div className="justify-between flex flex-row">
          <label htmlFor={props.fieldId} className="text-lg ">
            {props.label}
          </label><span className="font-mono font-light text-sm"> (${props.multiplier.toFixed(2)})</span>
        </div>
        <NumberField.ScrubAreaCursor className="drop-shadow-xs" />
      </NumberField.ScrubArea>

      <NumberField.Group className="flex gap-1">
        <NumberField.Decrement className="cursor-pointer box-border flex items-center justify-center size-10 m-0 p-0 outline-1 rounded-md border border-light-state-border bg-light-surface-muted text-light-text-primary">
          <MinusIcon />
        </NumberField.Decrement>
        <NumberField.Input className="box-border m-0 p-0 border-y border-y-light-state-border bg-light-surface-elevated text-light-text-primary font-mono text-lg w-12 text-center" />
        <NumberField.Increment className="cursor-pointer box-border flex items-center justify-center size-10 m-0 p-0 outline-1 rounded-md border border-light-state-border bg-light-surface-muted text-light-text-primary">
          <PlusIcon />
        </NumberField.Increment>
        <p className="ml-2">{`$ ${(value * props.multiplier).toFixed(2)}`}</p>
      </NumberField.Group>
    </NumberField.Root>
    </Paper>
  );
}

// Increment Icon
function PlusIcon(props: Readonly<React.ComponentProps<"svg">>) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
    </svg>
  );
}

// Decrement Icon
function MinusIcon(props: Readonly<React.ComponentProps<"svg">>) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 5H10" />
    </svg>
  );
}
