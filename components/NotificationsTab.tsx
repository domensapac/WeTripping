'use client'

import { PartyPopper, EllipsisVertical, MoveLeft} from 'lucide-react';
import React, { useRef, useEffect, useState } from "react";
import { format } from "date-fns"
import Link from 'next/link';
import { markAsRead, deleteNotification } from '@/app/(app)/trip/actions';

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
};

export default function NotificationsTab({notifications} : NotificationProps){
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

    const [localNotifications, setLocalNotifications] = useState(notifications ?? [])
    const [shown, setShown] = useState<string>('')
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    async function handleMarkAsRead(id: string){
        const data = await markAsRead(id)
        setLocalNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, was_read: true } : n))
    }

    async function handleDelete(id: string){
        const data = await deleteNotification(id)
        setLocalNotifications(prev => prev.filter(n => n.id !== id))
    }

    return(
        <div className="w-full flex flex-col gap-10 ">
            <div className="flex relative justify-center p-8 pt-10 w-full">
                <Link href="/"> <span className="absolute left-8"><MoveLeft/> </span></Link>
                <span className="font-semibold">Notifications</span>
            </div>
            <div className="flex flex-col w-full my-2 ">
                {localNotifications.map(notification => (
                    <div className={`relative border-b border-t border-gray-100 ps-18 pe-16 py-2 flex justify-center items-center text-left ${notification.was_read === false ? "bg-sky-100" : "bg-white"} `} key={notification.id}>
                        <div className="absolute left-8">
                            {notification.type === 'welcome_message' ? <PartyPopper color="green"/> : <PartyPopper color="green"/>}
                        </div>
                        <div className={`w-full flex flex-col h-20 gap-1`}>
                            <span className="w-full text-sm font-semibold"> {notification.title}</span>
                            <span className="w-full text-xs text-gray-600 pe-8"> {notification.description}</span>
                            <span className="w-full text-xs text-gray-600"> {format(notification.created_at, "LLL dd")}</span>
                            <button onClick={() => setShown(notification.id)}>
                                <EllipsisVertical className="absolute right-8 top-1/2 -translate-y-1/2" />
                            </button>
                            {shown === notification.id ? 
                            <>
                            <div ref={wrapperRef} className={`bg-white absolute right-4 top-1/2 mt-5 border-1 rounded-sm w-35 h-20 z-999 flex flex-col`}>
                                <span className="absolute right-5 -top-1.5 w-[11px] h-[11px] rotate-45 bg-white border-t border-l z-10"></span>
                                <div className="w-full h-1/2 p-1 text-sm">
                                    <button onClick={() => handleMarkAsRead(notification?.id)} className={`${notification.was_read === true ? "disabled text-gray-300" : ""}`}><span className="font-semibold">Mark as read</span></button>
                                </div>
                                <div className="w-full h-1/2 p-1 text-sm">
                                    <button onClick={() => handleDelete(notification?.id)}><span className="font-semibold">Delete</span></button>
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