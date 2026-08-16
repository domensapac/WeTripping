import { InputGroupIcon } from "@/components/LocationInput";

type PropType = {
    destination : string; 
    setDestination : React.Dispatch<React.SetStateAction<string>>
    setStep : React.Dispatch<React.SetStateAction<string>>
}

export default function DestinationStep({destination, setDestination, setStep} : PropType){
    return( 
    <div className="tracking-[1px] flex w-full text-black">
      <div className="flex m-6 w-90 h-72 flex-col border-1 rounded-sm justify-center items-center bg-white">
        <div className="my-3">
          <span className="text-2xl">Where to next?</span>
        </div>
        <div className="my-3">
            <InputGroupIcon destination={destination} setDestination={setDestination}/>
        </div>
        <div className="mt-5">
          <button className="w-23 border-1 rounded-sm border-black p-1 hover:cursor-pointer" onClick={() => setStep('dates')} disabled={!destination}>Continue</button>
        </div>
      </div>
    </div>
    )
}