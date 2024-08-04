import React from 'react';
import searchIcon from '../../assets/images/search.png';

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void; // 검색 버튼 클릭 시 사용하는 함수
}

const SearchInput: React.FC<SearchInputProps> = ({ searchQuery, setSearchQuery, onSearch }) => {
  return (
    <div className="flex items-center border p-2 rounded">
      <img
        src={searchIcon}
        alt="search icon"
        className="w-6 h-6 mx-2 cursor-pointer"
        onClick={onSearch}
      />
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-96 h-14 p-2 outline-none"
      />
    </div>
  );
};

export default SearchInput;
