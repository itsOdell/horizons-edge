import mongoose from "mongoose";
import type { Document, Types } from "mongoose";

export interface IUser {
    license_key: string,
    hwid_slots: string[],
    creation_date: string|Date,
    expiry_date: string|Date,
    activated: boolean
}

export type UserDocument =
    | (Document<unknown, {}, IUser> &
          Omit<
              IUser & {
                  _id: Types.ObjectId;
              },
              never
          >)
    | null;

const UserSchema = new mongoose.Schema<IUser>({
    license_key: {
        type: String,
    },
    hwid_slots: {
        type: [String],
        default: []
    },
    expiry_date: {
        type: String
    },
    activated: {
        type: Boolean
    }
}, {timestamps: {
    createdAt: "creation_date"
}});

// const UserModel = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

export default UserSchema;