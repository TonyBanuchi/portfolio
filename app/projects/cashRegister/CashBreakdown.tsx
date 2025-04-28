import { MoneyBreakdown } from "@/types/classes/MoneyBreakdown.class";
import React from "react";

interface ICashBreakdownProps {
  
  initialData: MoneyBreakdown;
  onSubmit?: () => void;
}

export default function CashBreakdown(props: Readonly<ICashBreakdownProps>) {
  const acknowledge = props.onSubmit ? (<button className="btn btn-primary p-2 mt-5" onClick={props.onSubmit}>Complete Transaction</button>) : null; 

  return (
      <div className="size-full flex flex-col">
        <table>
          <thead>
            <tr>
              <th className="text-center p-2 m-2">Denomination</th>
              <th className="text-center p-2 m-2">#</th>
              <th className="text-center p-2 m-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {props.initialData.generateCashArray().map((denom: string[]) => {
              return (
                <tr key={crypto.randomUUID()}>
                  <td className="text-start py-2 pl-3 p m-2">{denom[0]}</td>
                  <td className="text-end py-2 pr-3 m-2">{denom[1]}</td>
                  <td className="text-end py-2 pr-3 m-2">{denom[2]}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td />
              <td />
              <td>{props.initialData.total()}</td>
            </tr>
          </tfoot>
        </table>
        {acknowledge}
      </div>
  );
}
