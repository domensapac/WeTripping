import NotificationsTab from "@/components/NotificationsTab";
import { getNotifications } from "../trip/actions";

export default async function NotificationsPage(){

    const notifications = await getNotifications() 
    return(
        <NotificationsTab notifications={notifications}/>
    )
}