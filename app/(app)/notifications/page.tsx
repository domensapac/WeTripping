import { getNotifications } from "@/app/(auth)/actions";
import NotificationsTab from "@/components/NotificationsTab";

export default async function NotificationsPage(){

    const notifications = await getNotifications() 
    
    return(
        <NotificationsTab notifications={notifications}/>
    )
}