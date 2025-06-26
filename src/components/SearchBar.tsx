import { useCity } from "../context/CityContext";

interface SearchBarProps {
    onSearch: (city: string) => void;
    isLoading: boolean
}

export default function SearchBar({onSearch, isLoading}: SearchBarProps) {
    const {city, setCity} = useCity();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (city.trim().toLocaleLowerCase()) {
            onSearch(city)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center m-2 gap-2 flex-wrap ">
            <input 
                type="text" 
                name="city" 
                id="city" 
                placeholder="Dublin" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                  className="border border-slate-300 focus:border-sky-500 focus:ring focus:ring-sky-200 focus:outline-none rounded-md px-3 py-2 shadow-sm"
                // className="flex-1 p-2 rounded-lg border border-slate-600 focus:outline-none" 
            />
            <button 
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Searching' : 'Search'}
            </button>
        </form>
    )
}