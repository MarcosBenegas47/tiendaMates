import { SearchIcon } from "lucide-react"

export const Search =({onSearch}:{onSearch:(elem:string)=> void})=>{
    return (
<div className="w-full  ">
  <div className="relative flex  items-center ">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
        <SearchIcon/>
    </svg>
 
    <input
    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-4 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
    placeholder="Buscar..." 
    onChange={(event) => onSearch(event.target.value)}
    />
    
    {/* <button
      className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
      type="button"
    >
      Search
    </button>  */}
  </div>
</div>

    )
}