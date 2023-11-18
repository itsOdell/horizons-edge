import connectToDB from "@/db/connect"
import getModelFromPath from "@/utils/getModelFromPath"
import { nanoid } from "nanoid"
import { addDays, formatDate } from "@/utils/date"
import type { UserDocument } from "@/models/User"
import type { Model } from "mongoose"


export async function POST(req: Request, {params}: any) {
    try {
        const {auth} = params;
        const User = getModelFromPath(auth) as Model<any, {}, {}, {}, any, any>
        await connectToDB()
        const {
            mac_address
        } = await req.json()
        const user = await User.findOne({
            hwid_slots: mac_address
        })
        if (!user) {
            const user: UserDocument = new User({
                hwid_slots: [mac_address],
                license_key: nanoid(),
                activated: false,
            })
            user!.expiry_date = formatDate(new Date(+new Date() + addDays(30)))
            await user?.save()
        }
        return new Response("", {status: 200})
    } catch (error) {
        console.error(error)
        return new Response(`An error has occured: ${error}`, {
            status: 500
        })
    }
}