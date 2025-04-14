export enum eCashRegisterStatusMessages {
  "insuf" = "Insufficient funds providided - No transaction completed - Return Money Paid to customer. Await additional funds or cancel transaction!",
  "open" = "Sale Completed. Customer change due.",
  "systemError" = "Unknown System Error, could not process change request.",
  "exact" = "No change due - customer paid with exact cash",
  "load" = "Loading new cash ammount.",
  "Failed" = "Cannot provide correct change - No transaction completed - Return Money Paid to customer. Await different funds or cancel transaction!",
  "closed" = "All transactions complete, Cash Drawer Secured.",
  "empty" = "All cash removed, ready for new cash amounts",
  "new" = "Please provide starting cash value."
};