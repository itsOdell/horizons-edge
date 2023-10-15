import connectToDB from "@/db/connect"
import User from "@/models/User"
import { addDays, formatDate } from "@/utils/date"
import type { UserDocument } from "@/models/User"


export async function POST(req: Request) {
    try {
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