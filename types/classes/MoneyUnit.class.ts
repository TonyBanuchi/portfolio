export class MoneyUnit {
  unitCount: number;
  valueMultiplier: number;
  plural: string;

  constructor(unitCount: number, valueMultiplier: number, plural: string){
    this.unitCount = unitCount;
    this.valueMultiplier = valueMultiplier
    this.plural = plural;
  }

  public value = () => parseFloat((this.valueMultiplier * this.unitCount).toFixed(2));

}