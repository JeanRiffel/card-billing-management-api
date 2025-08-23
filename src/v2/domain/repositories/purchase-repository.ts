import { Purchase } from "../entities/purchase/purchase.entity";
import { Repository } from "./repository";

export const PURCHASE_REPOSITORY = Symbol('PURCHASE_REPOSITORY');

export interface PurchaseRepository extends Repository<Purchase> {
  findByCardId(id: string): Promise<Purchase[]>;
}