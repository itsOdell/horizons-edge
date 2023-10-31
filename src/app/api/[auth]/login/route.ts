import connectToDB from "@/db/connect";
import AdbotUser from "@/models/Adbot/User"
import RevCheckerUser from "@/models/RevChecker/User"
import { formatDate } from "@/utils/date";

export async function POST(req: Request, {params}: any): Promise<Response> {
    try {
        const {auth} = params;
        const User = auth == "adbot" ? AdbotUser : RevCheckerUser
        await connectToDB()
        const current_date = formatDate(new Date()); //yy/mm/dd
        const {license_key, mac_address} = await req.json()
    
        
        const user = await User.findOne({license_key: license_key});
        
        if (!user) {
            return new Response("This key doesn't exist", {status: 400})
        } 
        if (!user.hwid_slots.includes(mac_address) && !user.hwid_slots.includes("0000")) {
            return new Response("HWID doesn't match the registered HWID", {status: 401})
        }
        // console.log(new Date(current_date), new Date(user.expiry_date))
        if (new Date(current_date) > new Date(user.expiry_date)) {
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
