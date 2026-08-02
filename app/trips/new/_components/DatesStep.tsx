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
        <div className="tracking-[1px] flex w-full text-black">
        <div className="relative m-6 h-72 w-90 flex flex-col border-1 rounded-sm justify-center items-center bg-white">
          <span className="hover:cursor-pointer absolute top-4 left-4" onClick={() => {setStep('destination')}}><MoveLeft /></span>
          <div className="my-3">
            <span className="text-2xl flex ">Travel period?</span>
          </div>
          <div className="my-3">
            <DatePickerWithRange date={date} setDate={setDate}/>
          </div>
          <div className="mt-5">
            <button className="w-23 text-black border-1 border-black rounded-sm p-1 hover:cursor-pointer w-18" onClick={() => setStep('confirmation')} disabled={!date}>Continue</button>
          </div>
        </div>
      </div>
    )
}