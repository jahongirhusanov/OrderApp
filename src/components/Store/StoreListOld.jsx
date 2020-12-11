import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

export default function StoreList() {
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    
  });
  useEffect(() => {
    axios
      .get("http://localhost:5000/stores")
      .then((res) => {
        const orders = res.data;
        console.log(orders);
        setData(orders);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <MaterialTable
      style={{ margin: "0px 10px" }}
      title="Store list"
      columns={state.columns}
      data={data}
      options={{
        paginationType: "stepped",
        pageSizeOptions: [5, 7, 10, 15, 20],

        exportButton: {
          csv: true,
          pdf: true,
        },
        actionsColumnIndex: -1,
        headerStyle: {
          backgroundColor: "#01579b",
          color: "#FFF",
        },
      }}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              setData([...data, newData]);
              resolve();
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);
              resolve();
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);
              resolve();
            }, 600);
          }),
      }}
    />
  );
}
