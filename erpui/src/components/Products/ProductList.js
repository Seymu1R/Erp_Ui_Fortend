import React, { useContext, useEffect, useRef, useState } from "react";
import ErpContext from "../store/erp-context";
import { Table } from "antd";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import ProductHeader from "./ProductHeader";
import DeleteModal from "../UI/DeleteModal";
import { productservices } from "../APIs/Services/ProductServices";
import Loading from "../UI/Loading";

function ProductList() {
  const tableRef = useRef(null);
  const [{ deleteState, setDeleteState, setId, loading, setLoading }] =
    useContext(ErpContext);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    productservices
      .getAllpRoducts()
      .then(({ data: Products }) => {
        setProductList(Products.data);
      })
      .finally(setLoading(false));
  }, [loading, setLoading]);

  const deleteProduct = (id) => {
    productservices.deleteProduct(id).then((data) => {
      setLoading(true);
    });
  };

  const deleteMOdalHandling = (id) => {
    setId(id);
    setDeleteState(true);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
    },
    {
      title: "Name",
      dataIndex: "name",
      filters: productList.map((product) => {
        return { text: product.name, value: product.name };
      }),
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: "25%",
      key: "name",
    },
    {
      title: "UnitPrice",
      dataIndex: "purchasePrice",
      key: "purchasePrice",
    },
    {
      title: "SellingPrice",
      dataIndex: "sellingPrice",
      key: "sellingPrice",
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <div className="d-flex ">
          <Button
            id={record.id}
            onClick={() => {
              deleteMOdalHandling(record.id);
            }}
            className="margin "
            variant="danger"
          >
            Delete
          </Button>

          <Link to={`/productlist/${record.id}`}>
            <Button
              id={record.id}
              onClick={() => {
                setId(record.id);
              }}
              variant="info"
            >
              View
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      {loading && <Loading />}
      {deleteState && <DeleteModal deleteItem={deleteProduct} />}
      <ProductHeader tableRef = {tableRef} />
      <Table
       ref={tableRef}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={productList}
      />
    </>
  );
}

export default ProductList;
