import { Repository } from "./repository";
import { Card } from "../entities/card/card.entity"

export const CARD_REPOSITORY = Symbol('CARD_REPOSITORY');

export interface CardRepository extends Repository<Card> {
  findByUserId(userId: string): Promise<Card[]>;
}