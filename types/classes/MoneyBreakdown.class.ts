import { eCashRegisterStatusMessages } from "../enums/cashRegisterStatusMessages.enum";
import CalculateChangeResponse from "./CalculateChangeResponse";
import { MoneyUnit } from "./MoneyUnit.class";

export class MoneyBreakdown extends Object {
  penny: MoneyUnit;
  nickel: MoneyUnit;
  dime: MoneyUnit;
  quarter: MoneyUnit;
  one: MoneyUnit;
  five: MoneyUnit;
  ten: MoneyUnit;
  twenty: MoneyUnit;
  fifty: MoneyUnit;
  hundred: MoneyUnit;

  constructor(
    pennies: number = 0,
    nickels: number = 0,
    dimes: number = 0,
    quarters: number = 0,
    ones: number = 0,
    fives: number = 0,
    tens: number = 0,
    twenties: number = 0,
    fifties: number = 0,
    hundreds: number = 0
  ) {
    super();
    this.penny = new MoneyUnit(pennies, 0.01, 'Pennies');
    this.nickel = new MoneyUnit(nickels, 0.05, 'Nickels');
    this.dime = new MoneyUnit(dimes, 0.10, 'Dimes');
    this.quarter = new MoneyUnit(quarters, 0.25, 'Quarters');
    this.one = new MoneyUnit(ones, 1.00, 'Ones');
    this.five = new MoneyUnit(fives, 5.00, 'Fives');
    this.ten = new MoneyUnit(tens, 10.00, 'Tens');
    this.twenty = new MoneyUnit(twenties, 20.00, 'Twenties');
    this.fifty = new MoneyUnit(fifties, 50.00, 'Fifties');
    this.hundred = new MoneyUnit(hundreds, 100.00, 'Hundreds');
  };

  total(): number {
    return parseFloat((this.penny.value() +
      this.nickel.value() +
      this.dime.value() +
      this.quarter.value() +
      this.one.value() +
      this.five.value() +
      this.ten.value() +
      this.twenty.value() +
      this.fifty.value() +
      this['hundred'].value()).toFixed(2));
  }

  clone(): MoneyBreakdown {
    const clone: MoneyBreakdown = new MoneyBreakdown();

    clone.penny.unitCount = this.penny.unitCount;
    clone.nickel.unitCount = this.nickel.unitCount;
    clone.dime.unitCount = this.dime.unitCount;
    clone.quarter.unitCount = this.quarter.unitCount;
    clone.one.unitCount = this.one.unitCount;
    clone.five.unitCount = this.five.unitCount;
    clone.ten.unitCount = this.ten.unitCount;
    clone.twenty.unitCount = this.twenty.unitCount;
    clone.fifty.unitCount = this.fifty.unitCount;
    clone["hundred"].unitCount = this["hundred"].unitCount;


    return clone;
  }

  addMoney(moneyIn: MoneyBreakdown): void {
    this.penny.unitCount += moneyIn.penny.unitCount;
    this.nickel.unitCount += moneyIn.nickel.unitCount;
    this.dime.unitCount += moneyIn.dime.unitCount;
    this.quarter.unitCount += moneyIn.quarter.unitCount;
    this.one.unitCount += moneyIn.one.unitCount;
    this.five.unitCount += moneyIn.five.unitCount;
    this.ten.unitCount += moneyIn.ten.unitCount;
    this.twenty.unitCount += moneyIn.twenty.unitCount;
    this.fifty.unitCount += moneyIn.fifty.unitCount;
    this["hundred"].unitCount += moneyIn["hundred"].unitCount;
  }

  removeMoney(moneyIn: MoneyBreakdown): void {
    this.penny.unitCount -= moneyIn.penny.unitCount;
    this.nickel.unitCount -= moneyIn.nickel.unitCount;
    this.dime.unitCount -= moneyIn.dime.unitCount;
    this.quarter.unitCount -= moneyIn.quarter.unitCount;
    this.one.unitCount -= moneyIn.one.unitCount;
    this.five.unitCount -= moneyIn.five.unitCount;
    this.ten.unitCount -= moneyIn.ten.unitCount;
    this.twenty.unitCount -= moneyIn.twenty.unitCount;
    this.fifty.unitCount -= moneyIn.fifty.unitCount;
    this["hundred"].unitCount -= moneyIn["hundred"].unitCount;
  }

  makeChange(price: number, moneyIn: MoneyBreakdown): CalculateChangeResponse {
    try {
      let changeAmount = parseFloat((moneyIn.total() - price).toFixed(2));
      const immChangeAmount = parseFloat((moneyIn.total() - price).toFixed(2));

      // Not Enough Cash Paid - Return Cash In - No Transaction
      if (changeAmount < 0) {
        return new CalculateChangeResponse(eCashRegisterStatusMessages.insuf, moneyIn);
      }

      // Exact change provided - add money in - complete transaction
      if (changeAmount === 0) {
        return new CalculateChangeResponse(eCashRegisterStatusMessages.exact, new MoneyBreakdown());
      }

      // Change Due - calcuate change
      // Money object for counted change
      const changeInHand = new MoneyBreakdown();

      // Money object for immutable cashDrawer
      const cashDrawerClone = this.clone();

      // Loop for denominations
      while (changeAmount >= 100 && cashDrawerClone["hundred"].unitCount > 0) {
        cashDrawerClone["hundred"].unitCount--;
        changeInHand["hundred"].unitCount++;
        changeAmount -= 100;
      }

      while (changeAmount >= 50 && cashDrawerClone.fifty.unitCount > 0) {
        cashDrawerClone.fifty.unitCount--;
        changeInHand.fifty.unitCount++;
        changeAmount -= 50;
      }

      while (changeAmount >= 20 && cashDrawerClone.twenty.unitCount > 0) {
        cashDrawerClone.twenty.unitCount--;
        changeInHand.twenty.unitCount++;
        changeAmount -= 20;
      }

      while (changeAmount >= 10 && cashDrawerClone.ten.unitCount > 0) {
        cashDrawerClone.ten.unitCount--;
        changeInHand.ten.unitCount++;
        changeAmount -= 10;
      }

      while (changeAmount >= 5 && cashDrawerClone.five.unitCount > 0) {
        cashDrawerClone.five.unitCount--;
        changeInHand.five.unitCount++;
        changeAmount -= 5;
      }

      while (changeAmount >= 1 && cashDrawerClone.one.unitCount > 0) {
        cashDrawerClone.one.unitCount--;
        changeInHand.one.unitCount++;
        changeAmount -= 1;
      }

      while (changeAmount >= 0.25 && cashDrawerClone.quarter.unitCount > 0) {
        cashDrawerClone.quarter.unitCount--;
        changeInHand.quarter.unitCount++;
        changeAmount = parseFloat((changeAmount - .25).toFixed(2));
      }

      while (changeAmount >= 0.10 && cashDrawerClone.dime.unitCount > 0) {
        cashDrawerClone.dime.unitCount--;
        changeInHand.dime.unitCount++;
        changeAmount = parseFloat((changeAmount - .10).toFixed(2));
      }

      while (changeAmount >= 0.05 && cashDrawerClone.nickel.unitCount > 0) {
        cashDrawerClone.nickel.unitCount--;
        changeInHand.nickel.unitCount++;
        changeAmount = parseFloat((changeAmount - .05).toFixed(2));
      }

      while (changeAmount >= 0.01 && cashDrawerClone.penny.unitCount > 0) {
        cashDrawerClone.penny.unitCount--;
        changeInHand.penny.unitCount++;
        changeAmount = parseFloat((changeAmount - .01).toFixed(2));
      }

      if (changeAmount === 0 && changeInHand.total() === immChangeAmount) {
        return new CalculateChangeResponse(eCashRegisterStatusMessages.open, changeInHand)
      } else {
        throw new Error(eCashRegisterStatusMessages.Failed);
      }
    } catch (e) {
      console.log(e);
      return new CalculateChangeResponse(eCashRegisterStatusMessages.Failed, moneyIn)
    }
  }

  generateCashArray(): string[][] {
    return [
      [this.penny.plural, this.penny.unitCount.toString(), `$${this.penny.value().toFixed(2)}`],
      [this.nickel.plural, this.nickel.unitCount.toString(), `$${this.nickel.value().toFixed(2)}`],
      [this.dime.plural, this.dime.unitCount.toString(), `$${this.dime.value().toFixed(2)}`],
      [this.quarter.plural, this.quarter.unitCount.toString(), `$${this.quarter.value().toFixed(2)}`],
      [this.one.plural, this.one.unitCount.toString(), `$${this.one.value().toFixed(2)}`],
      [this.five.plural, this.five.unitCount.toString(), `$${this.five.value().toFixed(2)}`],
      [this.ten.plural, this.ten.unitCount.toString(), `$${this.ten.value().toFixed(2)}`],
      [this.twenty.plural, this.twenty.unitCount.toString(), `$${this.twenty.value().toFixed(2)}`],
      [this.fifty.plural, this.fifty.unitCount.toString(), `$${this.fifty.value().toFixed(2)}`],
      [this["hundred"].plural, this["hundred"].unitCount.toString(), `$${this["hundred"].value().toFixed(2)}`]
    ]
  }
}
