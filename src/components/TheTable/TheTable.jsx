import React from 'react';
import { Table } from "antd";

const TheTable = ({users, columns}) => {
    return (
        <div>
            <Table dataSource={users} columns={columns} />
        </div>
    );
};

export default TheTable;