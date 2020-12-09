import React from "react";
import MaterialTable from "material-table";
import OrderStatus from "./OrderStatus";
import profilePic from "../../images/profilePic.jpg";

function MaterialTableSample() {
  return (
    <MaterialTable
      title="Буюртмалар"
      columns={[
        { title: "Магазин Номи", field: "storeName" },
        { title: "Исм Шарифи", field: "customerName" },
        { title: "Буюртма #", field: "orderNumber", type: "numeric" },
        { title: "Буюртмалар Сони", field: "orderCount", type: "numeric" },
        { title: "Status", field: "status" },
        { title: "Телефон #", field: "customerPhoneNum" },
        { title: "Манзил", field: "customerAddress" },
      ]}
      // data={this.state.OrderList}
      data={[
        {
          storeName: "Musaffo Osmon Corp",
          customerName: "Polonchi Pistonchi",
          orderNumber: "AA11122",
          orderCount: 3,
          status: "Qabul Qilindi",
          customerPhoneNum: "91-333-33-22",
          customerAddress: "Oq Yer Qishlogi",
        },
        {
          storeName: "Rishton Inc",
          customerName: "Pistonchi Baranov",
          orderNumber: "AA11133",
          orderCount: 4,
          status: "Tayyor",
          customerPhoneNum: "91-666-33-11",
          customerAddress: "Buston Qishlogi",
        },
        {
          storeName: "Oq Yer Inc",
          customerName: "Pidyonchixon Baranova",
          orderNumber: "AA11134",
          orderCount: 7,
          status: "Bajarilmoqda",
          customerPhoneNum: "91-666-33-00",
          customerAddress: "Bojoy Qishlogi",
        },
      ]}
      detailPanel={[
        {
          tooltip: "Buyurtma Statusi",
          render: (rowData) => {
            // TODO: use rowData to get Status number, 1,2,3,4
            return <OrderStatus />;
          },
        },
        {
          icon: "account_circle",
          tooltip: "Xaridor Rasmi",
          render: (rowData) => {
            return (
              <div
                style={{
                  textAlign: "center",
                }}
              >
                <img
                  alt="Mijoz rasmi"
                  src={profilePic}
                  style={{ height: "5rem", width: "5rem" }}
                />
                {/* {rowData.surname} */}
              </div>
            );
          },
        },
        // {
        //   icon: "account_circle",
        //   tooltip: "Show Surname",
        //   render: (rowData) => {
        //     return (
        //       <div
        //         style={{
        //           fontSize: 100,
        //           textAlign: "center",
        //           color: "white",
        //           backgroundColor: "#E53935",
        //         }}
        //       >
        //         {rowData.surname}
        //       </div>
        //     );
        //   },
        // },
      ]}
    />
  );
}

export default MaterialTableSample;
