import { DatePickerWithRange } from "@/components/DatePicker";
import { MoveLeft } from 'lucide-react';
import { DateRange } from "react-day-picker";

type PropType = {
    date: DateRange | undefined;
    setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
    setStep: React.Dispatch<React.SetStateAction<string>>
}

export default function DatesStep({date, setDate, setStep} : PropType){
    return(
        <div className="tracking-[1px] min-h-screen flex bg-[#99f0ff] w-full justify-center items-center text-black">
        <div className="relative flex-1 m-6 h-72 flex flex-col border-1 rounded-sm justify-center items-center bg-white">
          <span className="absolute top-4 left-4" onClick={() => {setStep('destination')}}><MoveLeft /></span>
          <div className="my-3">
            <span className="text-2xl flex ">When?</span>
          </div>
          <div className="my-3">
            <DatePickerWithRange date={date} setDate={setDate}/>
          </div>
          <div className="mt-5">
            <button className="disabled:text-gray-500 border-1 rounded-sm p-1 hover:cursor-pointer w-18" onClick={() => setStep('confirmation')} disabled={!date}>Continue</button>
          </div>
        </div>
      </div>
    )
}