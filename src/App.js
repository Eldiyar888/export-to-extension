import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import './App.css';
import Table from "./components/TheTable/TheTable";
import Button from "./components/TheButton/TheButton";
import { CSVLink } from "react-csv";
import autoTable from 'jspdf-autotable'
import jsPDF from "jspdf";

function App() {
  const [users, setUsers] = useState([]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'age',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    }
  ];

  const getUsers = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    console.log(response.data)
    const res = response.data.map(item => {
      const user = {
        name: item.name,
        username: item.username,
        email: item.email,
        phone: item.phone,
        website: item.website
      }
      return user;
    })

    setUsers(res);
  }

  useEffect(() => {
    getUsers();
  }, [])

  const csvLinkRef = useRef()

  const getTableDataToExportXML = () => {
    if (csvLinkRef && csvLinkRef.current) {
      csvLinkRef.current.link.click(); 
    }
  }

  const getTableDataToExportPDF = () => {
    const doc = new jsPDF();
    const headers = [columns];
    const data = users.map(item=> [item.name, item.username, item.email, item.phone, item.website]);

    let content = {
      head: headers,
      body: data
    };

    doc.autoTable(content);
    doc.save("table.pdf")
  }

  return (
    <div className="App">
      <div className="users">
        <Table users={users} columns={columns} />
        <div className="buttons">
          <Button onClick={getTableDataToExportPDF} value={'PDF'} />
          <Button onClick={getTableDataToExportXML} value={'XLSX'} />
          <CSVLink 
            data={users} 
            filename={"my-file.csv"} 
            enclosingCharacter={` `}
            separator={";"} 
            ref={csvLinkRef} />
        </div>
      </div>
    </div>
  );
}

export default App;
