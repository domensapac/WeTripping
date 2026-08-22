'use client'

import { X, PartyPopper, EllipsisVertical, DollarSign} from 'lucide-react';
import { useState } from 'react';
import React, { useRef, useEffect } from "react";

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
    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShown('')
            }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const [shown, setShown] = useState<string>('')
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return(
        <div className="fixed inset-0 p-8 top-0 left-0 w-full h-screen bg-white z-100">
            <div className="flex relative justify-center w-full mt-2 mb-5">
                <span className="font-semibold">Notifications</span>
                <button className="absolute right-0" onClick={()=> setVisible(false)}><X/></button>
            </div>
            <div className="flex flex-col w-full my-6 gap-7 ">
                {notifications?.map(notification => (
                    <div className={`flex items-center text-left ${notification.was_read === true ? "bg-gray-100" : "bg-white"} `} key={notification.id}>
                        <div className="w-1/6">
                            {notification.type === 'welcome_message' ? <PartyPopper color="green"/> : <DollarSign color="black"/>}
                        </div>
                        <div className={`relative w-full flex flex-col gap-1`}>
                            <span className="w-full text-sm font-semibold"> {notification.title}</span>
                            <span className="w-full text-xs text-gray-600 pe-5"> {notification.description}</span>
                            <button onClick={() => setShown(notification.id)}>
                                <EllipsisVertical className="absolute right-0 top-1/2 -translate-y-1/2" />
                            </button>
                            {shown === notification.id ? 
                            <>
                            <div ref={wrapperRef} className={`bg-white absolute right-0 top-1/2 mt-5 border-1 rounded-sm w-30 h-20 z-999 flex flex-col`}>
                                <span className="absolute right-1.5 -top-1.5 w-[11px] h-[11px] rotate-45 bg-white border-t border-l z-10"></span>
                                <div className="w-full h-1/2 p-1 text-sm">
                                    <span className="font-semibold">Mark as read</span>
                                </div>
                                <div className="w-full h-1/2 p-1 text-sm">
                                    <span className="font-semibold">Delete</span>
                                </div>
                            </div>
                            </>: ""}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}