import React from 'react'
import { Col, Row , Tooltip  } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function DiscountHeader() {
  return (
    <Row style={{ marginBottom: "20px" }} >
    <Col span={18} push={6}></Col>
    <Col span={6} pull={18}>
    <Tooltip title="Add Discount"  color={'#2b80ec'} >        
      <Link to="/adddiscount" >
        <AppstoreAddOutlined
          style={{
            fontSize: "30px",
            color: "#2b80ec",
          }}
        />
      </Link>
    </Tooltip>
    </Col>
  </Row>
  )
}

export default DiscountHeader