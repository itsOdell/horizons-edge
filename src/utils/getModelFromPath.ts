import mongoose from "mongoose";
import RevCheckerUserModel from "@/models/RevChecker/User";
import AdbotUserModel from "@/models/Adbot/User";
import ApiAdbotUserModel from "@/models/ApiAdbot/User";

export default function getModelFromPath(path: string): mongoose.Model<any, {}, {}, {}, any, any> | Error {
    switch (path) {
        case "adbot":
            return AdbotUserModel;
        case "revchecker":
            return RevCheckerUserModel;
        case "api-adbot":
            return ApiAdbotUserModel;
        default:
            return Error("Invalid path")
    }
}