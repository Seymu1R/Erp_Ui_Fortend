import React, { useContext, useEffect, useState } from "react";
import ErpContext from "../store/erp-context";
import { Col, Row, Input, Button, Form } from "antd";
import { unitservices } from "../APIs/Services/UnitsServices";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import ErorModal from "../UI/ErorModal";

function UpdateUnit() {
  const [{ id }] = useContext(ErpContext);
  const [form] = useForm();
  const navigate = useNavigate();
  const [modalHandler, setModalHandler] = useState(false);
  const [errorName, setErrorname] = useState("");

  useEffect(() => {
    unitservices.getUnit(id).then(({ data: unit }) => {
      form.setFieldsValue({
        unitName: unit.data.unitName,
        unitType: unit.data.unitType,
      });
    });
  }, [id, form]);

  const editBrand = (body) => {
    unitservices
      .updateUnit(body)
      .then(({ data: response }) => {
        if (response.statusCode) {
          navigate("/productlist");
        }
      })
      .catch(function (error) {
        if (error.response) {
          setErrorname("Oops, something went wrong");
          setModalHandler(true);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  return (
    <>
      {modalHandler && (
      <ErorModal usename={errorName} setmodalHandler={setModalHandler} />
    )}
     <Form
      form={form}
      autoComplete="off"
      onFinish={(values) => {
        console.log(values);
        const Obj = {
          id: `${id}`,
          unitName: `${values.unitName}`,
          unitType: `${values.unitType}`,
        };
        editBrand(Obj);
      }}
    >
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your unitName",
                whitespace: true,
                min: 3,
                max: 20,
              },
            ]}
            hasFeedback
            name="unitName"
            label="UnitName"
          >
            <Input
              type="text"
              id="unitName"
              size="large"
              placeholder="unitName"
              style={{ width: "90%" }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your UnitType",
                whitespace: true,
                min: 3,
                max: 20,
              },
            ]}
            hasFeedback
            name="unitType"
            label="UnitType"
          >
            <Input
              type="text"
              id="unitType"
              size="large"
              placeholder="UnitType"
              style={{ width: "90%" }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Button htmlType={"submit"} type="primary">
        Update
      </Button>
    </Form>
    </>   
  );
}

export default UpdateUnit;
