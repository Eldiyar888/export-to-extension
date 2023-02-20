import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import './App.css';
import Table from "./components/TheTable/TheTable";
import Button from "./components/TheButton/TheButton";
import { CSVLink } from "react-csv";
import autoTable from 'jspdf-autotable'
import jsPDF from "jspdf";
import { message } from 'antd';

function App() {
  const [users, setUsers] = useState([]);
  const csvLinkRef = useRef()

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
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
        id: item.id,
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

  const addUsersDate = () => {
    const currentDate = new Date().toLocaleDateString();
    let lastKey = null;
    if (users && users.length > 0) {
      const keys = Object.keys(users[users.length - 1]);
      lastKey = keys[keys.length - 1];
    }

    return [...users, {}, { [lastKey]: `Exported on: ${currentDate}` }]
  }


  const getTableDataToExportXML = () => {
    if (csvLinkRef && csvLinkRef.current) {
      csvLinkRef.current.link.click();
    }
    handleMessage('Таблица была экспортирована в файл с расширением xlsx');
  }

  const getTableDataToExportPDF = () => {
    const doc = new jsPDF();

    let content = {
      head: [columns],
      body: users.map(item => Object.values(item))
    };

    const currentDate = new Date().toLocaleDateString();
    content.body.push([]);
    content.body.push([`Exported on: ${currentDate}`]);

    doc.autoTable(content);
    doc.save("table.pdf")
    handleMessage('Таблица была экспортирована в файл с расширением pdf');
  }

  const handleMessage = (txtMessage) => {
    message.success(txtMessage);
  };

  return (
    <div className="App">
      <div className="users">
        <Table users={users} columns={columns} />
        <div className="buttons">
          <Button onClick={getTableDataToExportPDF} value={'PDF'} />
          <Button onClick={getTableDataToExportXML} value={'XLSX'} />
          <CSVLink
            data={addUsersDate()}
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
