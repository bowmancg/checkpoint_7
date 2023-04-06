import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TowerEventSchema } from '../models/TowerEvents'
import { TicketSchema } from '../models/Ticket';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  TowerEvents = mongoose.model('TowerEvent', TowerEventSchema)
  Ticket = mongoose.model('Ticket', TicketSchema)
}

export const dbContext = new DbContext()
