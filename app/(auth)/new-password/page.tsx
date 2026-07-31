import InfoToast from "@/components/InfoToast";
import { updatePassword } from "../actions";

export default async function NewPassword({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  const error = params.error

    return(
        <div>
            <form action={updatePassword}>
                <InfoToast error={error}/>
                <span className="flex text-3xl p-3 mb-8 w-full justify-center text-black"> Choose new password </span>
                <div className="flex flex-col justify-center items-center sm:m-7 ">
                    <div className="w-2/3 lg:w-1/2">
                        <div className="flex flex-col mt-1 text-black">
                            <label>New Password</label>
                            <input className="border-1 rounded-md p-1 text-gray-600" id="password" name="password" type="password" required/>
                        </div>
                        <div className="flex flex-col mt-1 text-black">
                            <label>Repeat new password</label>
                            <input className="border-1 rounded-md p-1 text-gray-600" id="repeatPassowrd" name="repeatPassword" type="password" required/>
                        </div>
                    </div>
                    <button className="text-black hover:cursor-pointer mt-7 px-2 py-1 border-1 rounded-sm" type="submit">Confirm</button>
                </div>
            </form>
        </div>
    )
}