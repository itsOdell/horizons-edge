import connectToDB from "@/db/connect";
import User from "@/models/User"
import { formatDate } from "@/utils/date";

export async function POST(req: Request): Promise<Response> {
    try {
        await connectToDB()
        const current_date = formatDate(new Date()); //yy/mm/dd
        const {license_key, mac_address} = await req.json()
    
        const user = await User.findOne({license_key});

        if (!user) {
            return new Response("This key doesn't exist", {status: 400})
        } 
        if (!user.hwid_slots.includes(mac_address)) {
            return new Response("HWID doesn't match the registered HWID", {status: 401})
        }
        if (current_date > user.expiry_date) {
            return new Response("Key has expired", {status: 402})
        }
        if (!user.activated) {
            return new Response("Key is not activated", {status: 403})
        }
        return new Response("You have successfully logged in", {status: 200})
    } catch (error) {
        console.error(error)
        return new Response(`An error has occured: ${error}`, {status: 500})
    }
}
