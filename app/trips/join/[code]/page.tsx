import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getInviteData, getTripData, getUserData, joinTrip } from '../../actions';
import ErrorToast from '@/components/ErrorToast';

interface PropType {
  params: Promise<{code: string;}>;
}

export default async function Page({ params } : PropType) {
    const { code } = await params

    const invite = await getInviteData(code)

    const trip = await getTripData(invite.trip_id)

    return(
        <div className="bg-[url('/test_bg.png')]">
            <ErrorToast/>
            <div className="flex flex-col justify-center items-center min-h-screen w-full">
                <div className="w-90">
                    <form action={joinTrip}>
                        <div className="tracking-[1px] flex w-full text-black">
                            <div className="flex m-6 w-90 h-72 flex-col border-1 rounded-sm justify-center items-center bg-white">
                                <div className="flex flex-col gap-2">
                                    <span>Invited to join <span className="font-bold text-xl">{trip.name}</span> </span>
                                    <span>by {invite.created_by}</span>
                                </div>
                                <button type="submit">
                                    Join
                                </button>
                                <input className="hidden" id="trip_code" name="trip_code" type="text" value={code} readOnly/>
                                <input className="hidden" id="trip_id" name="trip_id" type="text" value={invite.trip_id} readOnly/>
                            </div>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    )
}