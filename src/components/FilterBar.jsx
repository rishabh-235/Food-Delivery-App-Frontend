
function FilterBar({ filter, setFilter }) {

    const handleFilterChange = (event) => {
        setFilter(event.target.textContent);
    }

  return (
    <div onClick={(e)=>{
        const display = document.getElementById("filter-options").style.display;
        if (display === "none" || display === "") {
            document.getElementById("filter-options").style.display = "flex";
        } else {
            document.getElementById("filter-options").style.display = "none";
        }
    }} className='search-bar' >
        <p>Filter...</p>
        <div id="filter-options">
            <button onClick={handleFilterChange}>Order Summary</button>
            <button onClick={handleFilterChange}>Revenue Analysis</button>
            <button onClick={handleFilterChange}>Table Analysis</button>
        </div>
    </div>
  )
}

export default FilterBar