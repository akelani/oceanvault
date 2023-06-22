import { Schema, model, models } from 'mongoose';
import CircleDepositAddressSchema from './circle_deposit_address';

const CircleWalletSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  walletId: {
    type: Number,
    unique: [true, 'Wallet id already exists!'],
    required: [true, 'Wallet id is required!'],
  },
  entityId: {
    type: String,
    required: [true, 'Entity id is required!'],
  },
  type: {
    type: String,
    required: [true, 'Type is required!'],
  },
  description: {
    type: String,
    required: [true, 'Type is required!'],
  },
  depositAddresses: [{
    type: Schema.Types.ObjectId,
    ref: 'CircleDepositAddress',
  }],
});

const CircleWallet = models.CircleWallet || model("CircleWallet", CircleWalletSchema);

export default CircleWallet;