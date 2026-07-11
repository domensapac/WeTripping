import { MapPinned } from 'lucide-react';

export default function DestinationForm() {
    return (
    <div className="tracking-[1px] min-h-screen flex bg-gray-400 w-full justify-center items-center">
      <div className="flex-1 m-6 h-72 flex flex-col border-1 rounded-sm justify-center items-center">
        <div className="my-3">
          <span className="text-2xl flex "><MapPinned /> Where to?</span>
        </div>
        <div className="my-3">
          <input className="border-1 rounded-sm p-0.5" type="text" />
        </div>
        <div>
          <button className="border-1 rounded-sm p-1 hover:cursor-pointer" onClick={() => setStep('dates')}>Continue</button>
        </div>
      </div>
    </div>
    );
}