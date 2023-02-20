import React from 'react';
import {
    DownloadOutlined,
  } from '@ant-design/icons';
import { Button } from 'antd';


const TheButton = ({value, onClick }) => {
    return (
        <div>
            <Button onClick={() => onClick()} type="primary"><DownloadOutlined />{value}</Button>
        </div>
    );
};

export default TheButton;