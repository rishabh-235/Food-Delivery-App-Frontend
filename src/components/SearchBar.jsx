import './styles/searchbar.css'

function SearchBar({searchText, setSearchText}) {
  const handleChange = (event) => {
    setSearchText(event.target.value);
  }
  return (
    <input className='search-bar' placeholder='Search...' type="text" value={searchText} onChange={handleChange} />
  )
}

export default SearchBar