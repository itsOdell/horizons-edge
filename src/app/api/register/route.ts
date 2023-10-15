import connectToDB from "@/db/connect"
import User from "@/models/User"


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
            const user = new User({
                hwid_slots: [mac_address],
                activated: false
            })
            await user.save()
        }
        return new Response("", {status: 200})
    } catch (error) {
        console.error(error)
        return new Response(`An error has occured: ${error}`, {
            status: 500
        })
    }
}