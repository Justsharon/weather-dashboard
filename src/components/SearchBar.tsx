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
        <form onSubmit={handleSubmit} className="flex gap">
            <input 
                type="text" 
                name="city" 
                id="city" 
                placeholder="Nairobi" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                className="flex-1 p-2 rounded-lg border focus:outline-none focus:border-[#3f51b5]" 
            />
            <button 
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-[#3f51b5] text-white rounded-lg hover:bg-[#41497f] disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Searching' : 'Search'}
            </button>
        </form>
    )
}