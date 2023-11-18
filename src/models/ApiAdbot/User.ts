import mongoose from "mongoose";
import extendSchema from "@/utils/extendSchema";
import UserSchema from "../User";

const ApiAdbotUserSchema = extendSchema(UserSchema);

const ApiAdbotUserModel = mongoose.models["Api Adbot Users"] || mongoose.model("Api Adbot Users", ApiAdbotUserSchema, "Api Adbot Users");

export default ApiAdbotUserModel;