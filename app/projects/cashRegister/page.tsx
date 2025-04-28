"use client";
// React Imports
import { useState } from "react";

// logic imports
import { BehaviorSubject } from "rxjs";

// componenet imports
import Paper from "@mui/material/Paper";
import { ItemsList } from "@/app/projects/cashRegister/ItemsList";
import { CashCounter } from "@/app/projects/cashRegister/CashCounter";
import UnderConstruction from "@/components/under-construction/UnderConstruction";

// type imports
import { MoneyBreakdown } from "@/types/classes/MoneyBreakdown.class";
import { eCashRegisterStatusMessages } from "@/types/enums/cashRegisterStatusMessages.enum";
import CalculateChangeResponse from "@/types/classes/CalculateChangeResponse";
import CashBreakdown from "./CashBreakdown";
import ModalBase from "@/components/reusable/modal/ModalBase";
import { useModal } from "@/components/reusable/modal/useModal";

export default function CashRegister() {
  // DEVELOPMENT SWITCH to show Under Construction
  const ready = true;

  // Establish State variables
  const [cashDrawer, setCashDrawer] = useState<MoneyBreakdown>(
    new MoneyBreakdown()
  );
  const [cashDrawerState, setDrawerState] =
    useState<eCashRegisterStatusMessages>(eCashRegisterStatusMessages.load);
  //const [changeBrkDwn, setChangeBrkDwn] = useState<MoneyBreakdown>(new MoneyBreakdown());
  //const [changeTotal, setChangeTotal] = useState<number>(0);

  // state from List
  const [priceValue, setPriceValue] = useState<string>("0.00");

  // state from CashCounter for transactions
  //const [moneyIn, setMoneyIn] = useState<MoneyBreakdown>(new MoneyBreakdown());
  //const [amountPaid, setAmountPaid] = useState<number>(0);

  // Clears transaction variables to prepare for next sale
  const clearTrigger: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  function resetRegister() {
    clearTrigger.next(true);
    clearTrigger.next(false);
  }

  // Set event handlers
  function setCashDrawerHandler(
    moneyChange: MoneyBreakdown,
    type: "add" | "remove"
  ): void {
    const clone: MoneyBreakdown = cashDrawer.clone();
    switch (type) {
      case "add":
        clone.addMoney(moneyChange);
        break;
      case "remove":
        clone.removeMoney(moneyChange);
        break;
    }

    setCashDrawer(clone);
  }

  function setDrawerStateHandler(status: eCashRegisterStatusMessages): void {
    setDrawerState(status);
  }

  async function updateRegister(
    update: CalculateChangeResponse,
    moneyIn: MoneyBreakdown
  ): Promise<boolean> {
    const ack = await handleAcknowledgement(update.status);
    if (ack) {
      switch (update.status) {
        // Money In returned to customer, no money added or removed
        case eCashRegisterStatusMessages.Failed: {
          setDrawerStateHandler(eCashRegisterStatusMessages.Failed);
          break;
        }

        // Money in added to cash drawer, no money returned
        case eCashRegisterStatusMessages.exact: {
          setDrawerStateHandler(eCashRegisterStatusMessages.exact);
          setCashDrawerHandler(moneyIn, "add");
          break;
        }

        // Money returned to customer, nothing added or removed from cash drawer
        case eCashRegisterStatusMessages.insuf: {
          setDrawerStateHandler(eCashRegisterStatusMessages.insuf);
          break;
        }

        // Drawer Closed previous state acknowledged
        case eCashRegisterStatusMessages.closed: {
          setDrawerStateHandler(eCashRegisterStatusMessages.closed);
          setCashDrawerHandler(update.change, "remove");
          break;
        }

        // Remove all money from cash draw and prepare for new load
        case eCashRegisterStatusMessages.empty: {
          setDrawerStateHandler(eCashRegisterStatusMessages.empty);
          setCashDrawer(new MoneyBreakdown());
          break;
        }

        // Drawer Open ready to recieve new cash
        case eCashRegisterStatusMessages.new: {
          setDrawerStateHandler(eCashRegisterStatusMessages.new);
          break;
        }

        // Add new cash to existing drawer
        case eCashRegisterStatusMessages.load: {
          setDrawerStateHandler(eCashRegisterStatusMessages.load);
          setCashDrawerHandler(moneyIn, "add");
          break;
        }

        // Sale conducted, new money in, prepare for change out
        case eCashRegisterStatusMessages.open: {
          setDrawerStateHandler(eCashRegisterStatusMessages.open);
          setCashDrawerHandler(moneyIn, "add");
          const changeDispensed = await handleChange(update.change);
          if (!changeDispensed) return false;
          break;
        }

        case eCashRegisterStatusMessages.systemError: {
          setDrawerStateHandler(eCashRegisterStatusMessages.Failed);
          break;
        }
      }
      await acknowledge();
    }
    return !!ack;
  }

  /* No Longer Necessary???
  function purchase() {
    const makeChangeResponse: CalculateChangeResponse = cashDrawer.makeChange(
      Number(priceValue),
      moneyIn
    );
    updateRegister(makeChangeResponse);
  };
*/
  // Acknowledge register state
  async function acknowledge(): Promise<void> {
    switch (cashDrawerState) {
      /**
       * Action: Acknowledged Failed, Insuff, or exact change transaction
       * Update: Close drawer, and clear transaction details
       */
      case eCashRegisterStatusMessages.exact:
      case eCashRegisterStatusMessages.insuf:
      case eCashRegisterStatusMessages.Failed: {
        setDrawerStateHandler(eCashRegisterStatusMessages.closed);
        resetRegister();
        break;
      }

      /**
       * Action: Register cleared, empty register remains
       * Update: Change status to new and launch cash input modal.
       */
      // Remove all money from cash drawer and prepare for new load
      case eCashRegisterStatusMessages.empty: {
        setDrawerStateHandler(eCashRegisterStatusMessages.new);
        await handleLoadCash();
        break;
      }

      /**
       * Action: Drawer placed in new state, moeny-in provided
       * Update:
       */
      // Drawer Open ready to recieve new cash
      case eCashRegisterStatusMessages.new: {
        setDrawerStateHandler(eCashRegisterStatusMessages.open);
        break;
      }

      /**
       * Action:
       * Update:
       */
      // Add new cash to existing drawer
      case eCashRegisterStatusMessages.load: {
        setDrawerStateHandler(eCashRegisterStatusMessages.open);
        await handleLoadCash();
        break;
      }

      /**
       * Action:
       * Update:
       */
      // Sale conducted, new money in, prepare for change out
      case eCashRegisterStatusMessages.open: {
        setDrawerStateHandler(eCashRegisterStatusMessages.open);
        //setCashDrawerHandler(moneyIn, "add");
        break;
      }

      /**
       * Action:
       * Update:
       */
      case eCashRegisterStatusMessages.systemError: {
        setDrawerStateHandler(eCashRegisterStatusMessages.Failed);
        break;
      }
    }
  }

  // Acknowledge register state

  /* No longer useful???
  const retry = (): void => {
    switch (cashDrawerState) {
      // Money In returned to customer, no money added or removed
      case eCashRegisterStatusMessages.Failed:
      // Money returned to customer, nothing added or removed from cash drawer
      case eCashRegisterStatusMessages.insuf: {
        purchase();
        break;
      }
    }
  };
  */

  // Modal instatiation via custom hook call
  const changeModal = useModal<MoneyBreakdown, boolean>();
  const loadModal = useModal<MoneyBreakdown, MoneyBreakdown | false>();
  const purchaseModal = useModal<
    { cash: MoneyBreakdown; price: string },
    MoneyBreakdown | false
  >();
  const acknowledgeModal = useModal<eCashRegisterStatusMessages, boolean>();

  // Modal handlers
  async function handleLoadCash() {
    const result = await loadModal.openModal({
      content: <CashCounter onSubmit={loadModal.closeModal} />,
      data: new MoneyBreakdown(), // Empty initial data
    });

    if (result) {
      console.log("Initial cash:", result.total);
      console.log("Breakdown:", result.generateCashArray);
      // Add cash to the system
      setCashDrawerHandler(result, "add");
    }
  }

  async function handlePurchase(price: string) {
    const result = await purchaseModal.openModal({
      content: <CashCounter onSubmit={purchaseModal.closeModal} />,
      data: { cash: new MoneyBreakdown(), price }, // Empty initial data
    });

    if (result) {
      console.log("Payment received:", result.total());
      console.log("Breakdown:", result.generateCashArray());
      // Process the purchase
      const changeResult = cashDrawer.makeChange(Number(price), result);

      const processing = await handleAcknowledgement(changeResult.status);
      if (processing) {
        updateRegister(changeResult, result);
      }
    }
  }

  async function handleChange(change: MoneyBreakdown) {
    const result = await changeModal.openModal({
      content: (
        <CashBreakdown initialData={change} onSubmit={changeModal.closeModal} />
      ),
      data: change, // Empty initial data
    });

    if (result) {
      console.log("Change Dispersed:", change.total());
      console.log("Breakdown:", change.generateCashArray());
      return true;
    } else {
      return false;
    }
  }

  async function handleAcknowledgement(
    registerState: eCashRegisterStatusMessages
  ) {
    const result = await acknowledgeModal.openModal({
      content: (
        <div className="text-xl">
          <h2>{prompt(registerState)}</h2>
          <button
            className="btn btn-secondary"
            type="submit"
            onSubmit={() => {
              acknowledgeModal.closeModal(true);
            }}
          >
            Acknowledge
          </button>
        </div>
      ),
      data: registerState, // Empty initial data
    });

    if (result) {
      console.log("Register State: ", registerState);
      console.log("Acknowledged: ", result);
      return result;
    }
  }

  if (!ready) {
    return <UnderConstruction />;
  }
  return (
    <div className="max-w-98/100 flex flex-col items-center justify-center justify-self-center">
      <div className="w-full h-1/10 text-center text-accent-secondary dark:text-accent-primary">
        <h1 className="text-4xl font-bold m-3">Cash Register</h1>
      </div>
      <Paper elevation={4} className="max-w-98/100 place-items-center">
        <ItemsList sendTotal={setPriceValue} resetTrigger={clearTrigger} />
        <div className="flex justify-around mt-3 mb-3 w-full">
          <div id="price-display" className="text-xl font-bold">
            <p id="price-symbol">
              Price: $<span id="price-value">{priceValue}</span>
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => handlePurchase(priceValue)}></button>
          {/*<div id="amtPaid-display" className="text-xl font-bold">
            <p id="amtPaid-symbol">
              Amount Paid: $<span id="amtPaid-value">{amountPaid}</span>
            </p>
          </div>*/}
        </div>
        <div className="text-xl font-bold flex flex-row justify-between items-center">
          <ModalBase<MoneyBreakdown, boolean>
            isOpen={changeModal.isOpen}
            onClose={changeModal.closeModal}
            prompt="Change Due"
            data={new MoneyBreakdown()}
          >
            {changeModal.content}
          </ModalBase>

          <ModalBase<{cash: MoneyBreakdown; price: string }, MoneyBreakdown | false>
            isOpen={purchaseModal.isOpen}
            onClose={purchaseModal.closeModal}
            prompt="Enter Cash Recieved"
            data={{cash: new MoneyBreakdown(), price: '0.00'}}
          >
            {purchaseModal.content}
          </ModalBase>

          <ModalBase<MoneyBreakdown, MoneyBreakdown | false>
            isOpen={loadModal.isOpen}
            onClose={loadModal.closeModal}
            prompt="Enter cash to add to drawer"
            data={new MoneyBreakdown()}
          >
            {loadModal.content}
          </ModalBase>

          <ModalBase<eCashRegisterStatusMessages, boolean>
            isOpen={acknowledgeModal.isOpen}
            onClose={acknowledgeModal.closeModal}
            prompt="Register Status"
            data={eCashRegisterStatusMessages.new}
          >
            {loadModal.content}
          </ModalBase>
        </div>
      </Paper>
      <Paper elevation={1}>
        <CashBreakdown initialData={cashDrawer} />
      </Paper>
    </div>
  );
}
