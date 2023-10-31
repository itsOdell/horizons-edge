import connectToDB from "@/db/connect"
import { nanoid } from "nanoid"
import { addDays, formatDate } from "@/utils/date"
import AdbotUser from "@/models/Adbot/User"
import RevCheckerUser from "@/models/RevChecker/User"
import type { UserDocument } from "@/models/User"


export async function POST(req, {params}) {
    try {
        const {auth} = params;
        const User = auth === "adbot" ? AdbotUser : RevCheckerUser
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