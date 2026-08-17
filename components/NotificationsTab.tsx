'use client'


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
  notifications: Notification[] | null;
};


export default function NotificationsTab({notifications} : NotificationProps){

    return(
        <div className="z-900 absolute right-0 top-full border-1 border-gray-200 bg-white rounded-sm shadow-sm p-1 w-60 h-30 ">
            <div className="flex flex-col w-full">
                {notifications?.map(notification => (
                    <div className="flex flex-col text-left" key={notification.id}>
                        <span className="w-full text-sm font-semibold"> {notification.title}</span>
                        <span className="w-full text-xs"> {notification.description}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}