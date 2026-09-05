import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getInviteData, getTripData, getUserData, joinTrip } from '../../actions';
import ErrorToast from '@/components/ErrorToast';
import { format } from 'date-fns';
import { getAuthenticatedUser } from '@/app/(auth)/actions';

interface PropType {
  params: Promise<{code: string;}>;
}

export default async function Page({ params } : PropType) {
    const { code } = await params

    const invite = await getInviteData(code)

    const [trip, user, authUser] = await Promise.all([
        getTripData(invite.trip_id),
        getUserData(invite.created_by),
        getAuthenticatedUser()
    ])

    return(
        <div className="w-full">
            <ErrorToast/>
            <div className="flex flex-col justify-center items-center h-full w-full">
                <div className="w-90">
                    <div className="tracking-[1px] flex w-full text-black">
                        <div className="flex m-6 w-90 h-80 flex-col border-1 border-gray-200 shadow-sm rounded-sm justify-center items-center bg-white">
                            { (invite?.valid === false || invite?.created_by == authUser?.id) ? 
                            <>
                                <div className="text-2xl">Invalid invite</div>
                            </> : 
                                <form action={joinTrip}>
                                    <div className="my-3 text-center">
                                        <span className="text-2xl text-center">Invited to join</span>
                                    </div>
                                    <div className="my-3 flex flex-col">
                                        <div className="my-1 flex flex-col">
                                            <span className="text-xs">
                                            DESTINATION
                                            </span>
                                            <span className="text-2xl">
                                            {trip.name}
                                            </span>
                                        </div>
                                        <div className="my-1 flex flex-col">
                                            <span className="text-xs">
                                            BY
                                            </span>
                                            <span className="text-2xl">
                                                {user.first_name} {user.last_name}
                                            </span>
                                        </div>
                                        <div className="my-1 flex flex-col">
                                            <span className="text-xs">
                                            PERIOD
                                            </span>
                                            <span className="text-2xl">
                                                {trip?.start_date && trip?.end_date ? (`${format(trip?.start_date, "LLL dd, yy")} - ${" "}  ${format(trip?.end_date, "LLL dd, yy")}`) : ('Missing data')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-5 flex justify-center">
                                        <button type="submit" className="w-23 border-1 border-black rounded-sm">
                                            Join
                                        </button>
                                    </div>
                                    <input className="hidden" type="text" name="created_by" id="created_by" defaultValue={invite?.created_by}></input>
                                </form>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}