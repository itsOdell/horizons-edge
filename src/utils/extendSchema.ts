import mongoose from "mongoose";
import type {Schema} from "mongoose";

export default function extendSchema<T>(schema: Schema, obj: T): Schema {
    return new mongoose.Schema(Object.assign({}, schema.obj, obj))
}