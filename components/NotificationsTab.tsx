'use client'

import { X, PartyPopper, EllipsisVertical, DollarSign} from 'lucide-react';

type Notification = {
    id: string,
    created_at: Date
    user_id: string,
    was_read: boolean,
    title: string,
    description: string,
    type: string
}

type NotificationProps = {
  notifications: Notification[] | null,
  setVisible : React.Dispatch<React.SetStateAction<boolean>>
};


export default function NotificationsTab({notifications, setVisible} : NotificationProps){

    return(
        <div className="fixed inset-0 p-8 top-0 left-0 w-full h-screen bg-white z-100">
            <div className="flex relative justify-center w-full mt-2 mb-5">
                <span className="font-semibold">Notifications</span>
                <button className="absolute right-0" onClick={()=> setVisible(false)}><X/></button>
            </div>
            <div className="flex flex-col w-full my-6 gap-5 ">
                {notifications?.map(notification => (
                    <div className="flex items-center text-left" key={notification.id}>
                        <div className="w-1/6">
                            {notification.type === 'welcome_message' ? <PartyPopper color="green"/> : <DollarSign color="black"/>}
                        </div>
                        <div className="relative w-full flex flex-col">
                            <span className="w-full text-sm font-semibold"> {notification.title}</span>
                            <span className="w-full text-xs text-gray-600 pe-5"> {notification.description}</span>
                            <EllipsisVertical className="absolute right-0 top-1/2 -translate-y-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}