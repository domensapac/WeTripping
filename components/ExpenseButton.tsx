import { Plus } from "lucide-react";

export default function ExpenseButton(){
    return(
        <button className="absolute -right-8 bottom-10 border-1 rounded-xl shadow-lg p-2 py-1 bg-black text-white flex gap-2 items-center">
            <Plus className="text-white" size={15}/>
            <span>Expense</span> 
        </button>
    )
}