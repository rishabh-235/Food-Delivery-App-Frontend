import "./PagesStyle/tables.css";
import SearchBar from "../components/SearchBar";
import chairIcon from "../assets/chairIcon.png";
import deleteIcon from "../assets/deleteIcon.png";
import editIcon from "../assets/editIcon.png";
import { useAddTableMutation, useGetTablesQuery, useRemoveTableMutation } from "../redux/slices/api/admin.api.slice";
import { useEffect, useState } from "react";

function TablesPage() {
  const [addTable] = useAddTableMutation();
  const [removeTable] = useRemoveTableMutation();
  const { data: tables, isLoading } = useGetTablesQuery();
  const [tableArray, setTableArray] = useState([]);
  const [tableName, setTableName] = useState("");
  const [chairCount, setChairCount] = useState("2");

  useEffect(()=>{
    setTableArray(tables);
  },[tables]);

  const handleCreateTable = async () => {

    console.log("Creating table with name:", tableName, "and chair count:", chairCount);

    try {
      const result = await addTable({ name: tableName, capacity: chairCount }).unwrap();
      setTableArray([...tableArray, result.table]);
      setTableName("");
      setChairCount("2");
      document.getElementsByClassName("create-table-form")[0].style.display = "none";
    } catch (error) {
      console.error("Failed to create table:", error);
    }
  };

  const handleDeleteTable = async (tableId) => {
    console.log("Deleting table with ID:", tableId);

    try {
      await removeTable(tableId).unwrap();
      setTableArray(tableArray.filter((table) => table._id !== tableId));
    } catch (error) {
      console.error("Failed to delete table:", error);
    }
  }

  return (
    <div className="tables-page-container">
      <div className="analytics-searchbar-container">
        <SearchBar />
      </div>

      <div className="table-content-container">
        <p className="table-content-title">Tables</p>

        <div className="edit-table-container">
          {tableArray?.map((table, index) => {
            return (
              <div key={table._id} className="edit-table-card">
                <button onClick={() => handleDeleteTable(table._id)} className="edit-table-delete-button">
                  <img height={18} width={16} src={deleteIcon} alt="delete" />
                </button>
                <p className="edit-table-title">Table</p>
                <p className="edit-table-no">{index + 1}</p>
                <div className="edit-table-chair-count">
                  <button className="edit-table-chair-icon">
                    <img height={15} width={15} src={chairIcon} alt="" />
                  </button>
                  <p>{table.capacity}</p>
                </div>
              </div>
            );
          })}

          <div className="create-table-form">
            <p>Table name (optional)</p>
            <input value={tableName} onChange={(e) => setTableName(e.target.value)} type="text" />
            <p>Chair</p>
            <select value={chairCount} onChange={(e) => setChairCount(e.target.value)}>
              <option value="2">02</option>
              <option value="3">03</option>
              <option value="5">05</option>
              <option value="6">06</option>
            </select>
            <button onClick={handleCreateTable}>Create</button>
          </div>

          <button onClick={() => {document.getElementsByClassName("create-table-form")[0].style.display = "flex"}} className="edit-table-button">
            <img src={editIcon} width={15} height={15} alt=""  />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TablesPage;
