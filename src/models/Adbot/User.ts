import mongoose from "mongoose";
import extendSchema from "@/utils/extendSchema";
import UserSchema from "../User";

const AdbotUserSchema = extendSchema(UserSchema, {
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

const AdbotUserModel = mongoose.models["Adbot Pro Users"] || mongoose.model("Adbot Pro Users", AdbotUserSchema, "Adbot Pro Users");

export default AdbotUserModel;