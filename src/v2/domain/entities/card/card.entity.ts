export class Card{
  
  constructor(
    public  readonly id: string | null, 
    public name: string,
    public brand: string,
    public creditLimit: number,
    public closingDay: number,
    public dueDay: number,
    public userId: string
  ){}
}