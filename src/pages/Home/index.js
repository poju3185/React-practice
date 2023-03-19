import { useEffect, useState, useRef } from "react";
import { API_GET_DATA } from "../../global/constants";
import Edit from "./components/Edit";
import List from "./components/List";
import "./index.css";


async function fetchData(setData) {
  const res = await fetch(API_GET_DATA);
  const { data } = await res.json();
  setData(data);
}
async function fetchSetData(data) {
  await fetch(API_GET_DATA, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ data }),
  });
}
const Home = () => {
  const [data, setData] = useState([]);  // data用來儲存所有note
  const submittingStatus = useRef(false);  // 用來防止在載入頁面時觸發useEffect

  // 當data有變動時寫進DB
  useEffect(() => { 
    if (!submittingStatus.current) {
      return;
    }
    fetchSetData(data).then((data) => (submittingStatus.current = false));
  }, [data]);

  // 將DB資料寫進data
  useEffect(() => {
    fetchData(setData);
  }, []);

  return (
    <div className="app">
      <Edit add={setData} submittingStatus={submittingStatus} />
      <List
        listData={data}
        deleteData={setData}
        submittingStatus={submittingStatus}
      />
    </div>
  );
};

export default Home;
