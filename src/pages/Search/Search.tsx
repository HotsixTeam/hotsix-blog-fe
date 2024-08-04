import { useState } from "react";
import Header from "../../components/Header/Header";
import SearchInput from "../../components/Search/SearchInput";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    
    const handleSearch = () => {
        console.log('Search :', searchQuery);
    }

    return (
        <div className='flex flex-col'>
            <Header />
            <div className="flex flex-row justify-center pt-20">
                <SearchInput 
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSearch={handleSearch}
                    />
            </div>
        </div>
        
    )
}

export default Search;

// TODO : 검색 기능 미완, 검색 results 컴포넌트 만들어야 함.