import { eCashRegisterStatusMessages } from "../enums/cashRegisterStatusMessages.enum";
import { MoneyBreakdown } from "./MoneyBreakdown.class";

export default class CalculateChangeResponse{
  status: eCashRegisterStatusMessages;
  change: MoneyBreakdown;

  constructor(
    status: eCashRegisterStatusMessages,
    change: MoneyBreakdown
  ){
    this.status = status;
    this.change = change;
  }
}