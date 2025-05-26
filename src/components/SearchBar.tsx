import { useState } from "react";

interface SearchBarProps {
    onSearch: (city: string) => void;
    isLoading: boolean
}

export default function SearchBar({onSearch, isLoading}: SearchBarProps) {
    const [city, setCity] = useState('');

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
                className="flex-1 p-2 rounded-lg border border-b-gray-800 focus:outline-none" 
            />
            <button 
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Searching' : 'Search'}
            </button>
        </form>
    )
}