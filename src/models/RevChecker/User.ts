import mongoose from "mongoose";
import extendSchema from "@/utils/extendSchema";
import UserSchema from "../User";

const RevCheckerUserSchema = extendSchema(UserSchema, {
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
});

const RevCheckerUserModel = mongoose.models["Rev Checker Users"] || mongoose.model("Rev Checker Users", RevCheckerUserSchema, "Rev Checker Users");

export default RevCheckerUserModel;