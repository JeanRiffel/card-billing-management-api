export class Purchase {
 
  constructor(
    public readonly id: string | null,
    public date: Date,
    public totalAmount: number,
    public description: string,
    public installments: number,
    public cardId: string,
    public invoiceId: string,
  ){}

}
