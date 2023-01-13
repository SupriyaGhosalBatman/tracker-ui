import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles, IconButton, Box } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Alert } from 'react-alert';
import {createMuiTheme} from '@material-ui/core/styles';
import { styled, createTheme, ThemeProvider } from "@mui/system";
// import { IgrDataGrid, IgrTextColumn } from 'igniteui-react-grids';
//import MonthDropDown from './monthDropDown';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      // '& .MuiListItemIcon-root': {
      // 	marginLeft: '35%'
      // }
    },
    heading: {
      marginLeft: '2%'
    },
    addButton: {
      height: '2%',
      width: '3%',
      marginTop: '5%',
      marginLeft: '-10%',
    },
    heading2: {
      height: '24%',
      width: '90%',
      marginTop: '12%',
      marginLeft: '-79%',
    },
    expenseType: {
      marginLeft: '1%'
    },
    button: {
      marginBottom: '1%',
    }
  })
);


export default function AddExpense({yearName, month, userId,monthlyExpenseTrackerId}) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'expenseType', headerName: 'expenseType', width: 250 },
    { field: 'amount', headerName: 'amount', width: 250 },
    { field: 'details', headerName: 'details', width: 350 },
    { field: 'createdDate', headerName: 'date', width: 150 },
    // {
    //   field: "actions",
    //   headerName: "",
    //   width: 120,
    //   sortable: false,
    //   disableColumnMenu: true,
    //   renderCell: (params) => {
    //     if (hoveredRow === params.id) {
    //       return (
    //         <Box 
    //           // sx={{
    //           //   // backgroundColor: "whitesmoke",
    //           //   width: "100%",
    //           //   height: "100%",
    //           //   display: "flex",
    //           //   justifyContent: "center",
    //           //   alignItems: "center"
    //           // }}
    //         >
    //           <IconButton onClick={() => console.log(params.id)}>
    //             <EditIcon />
    //           </IconButton>
    //           <IconButton onClick={() => console.log(params.id)}>
    //             <DeleteIcon />
    //           </IconButton>
    //         </Box>
    //       );
    //     } else return null;
    //   }
    // }
  ];
  const rows = [
    { id: 1, expenseType: 'Gourav', details: 'abbcd', amount: 12, date: 'Gourav' },
    { id: 2, name: 'Geek', age: 43 },
    { id: 3, name: 'Pranav', age: 41 },
  ];

  const [items] = React.useState([
    { label: "01", value: "01" },
    { label: "02", value: "02" },
    { label: "03", value: "03" },
    { label: "04", value: "04" },
    { label: "05", value: "05" },
    { label: "06", value: "06" },
    { label: "07", value: "07" },
    { label: "08", value: "08" },
    { label: "09", value: "09" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
  ]);

  const [hoveredRow, setHoveredRow] = React.useState(null);
  const [mnth, setMnth] = useState("");
  const [yr, setYr] = useState("");
  const [years] = React.useState([
    { label: "2020", value: "2020" },
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
  ]);

  const [expenses] = React.useState([
    { label: "medical", value: "medical" },
    { label: "transport", value: "transport" },
    { label: "sweets", value: "sweets" },
    { label: "outside foods", value: "outside foods" },
    { label: "shopping", value: "shopping" },
    { label: "grocerry", value: "grocerry" },
    { label: "family", value: "family" },
    { label: "credit card", value: "credit card" },
    { label: "emi", value: "emi" },
    { label: "fruits", value: "fruits" },
    { label: "pet", value: "pet" },
    { label: "essential", value: "essential" },
    { label: "phone & internet", value: "phone & internet" },
    { label: "photography", value: "photography" },
    { label: "marraige", value: "marraige" },
    { label: "social activity", value: "social activity" },
    { label: "education", value: "education" },
    { label: "office spent", value: "office spent" },
    { label: "Entertainment", value: "Entertainment" },
    { label: "Technical Repair", value: "Technical Repair" },
    { label: "Government Related", value: "Government Related" },
    { label: "Room Rent", value: "Room Rent" },
  ]);

  const [month2 , setMonth2] = useState(null);
  const [year, setYear] = useState(null);
  const [expenseType, setExpenseType] = useState();
  const handleChange = (event) => {
    if (event.target.value === ("select")) {
      setMonth2(localStorage.getItem("month"));
    } else {
      setMonth2(event.target.value);
    }

    console.log("month is : ", event.target.value);
  };

  const handleChange3 = (event) => {
    setExpenseType(event.target.value);
    console.log("expense type is : ", event.target.value);
  }

  const handleChange2 = (event) => {
    if (event.target.value === ("select")) {
      setYear(localStorage.getItem("yearName"));
  } else{
    setYear(event.target.value);
  }
    
    console.log("year is : ", event.target.value);
    axios.get('http://localhost:8080/v1/helper/getallexpense/' + userId +'/'
    + yearName + '/' + month)
      .then(response => {
        setState(response.data);
        console.log("response : ", response.data);
        console.log("state : ", state);
      })
      .catch(error => {
        console.log(error);
      })
  };

  const [state, setState] = React.useState([]);
  var baseUrl = 'http://localhost:8080/v1/expense/addexpense';

  function refresh() {
    if(month===" " || month===null){
      month=localStorage.getItem('month');
    }
    if(yearName===" " || yearName===null){
      month=localStorage.getItem('yearName');
    }
    axios.get('http://localhost:8080/v1/expense/getallexpense/'+ userId+'/'+
     yearName+"-"+ month+"-"+'30')
      .then(response => {
        setState(response.data);
        console.log("response : ", response.data);
        console.log("state : ", state);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const onMouseEnterRow = (event) => {
    const id = Number(event.currentTarget.getAttribute("data-id"));
    setHoveredRow(id);
  };

  const onMouseLeaveRow = (event) => {
    setHoveredRow(null);
  };

  useEffect(() => {
    //getInitialData();
    refresh();
  }, [yearName, month]);

  function getInitialData() {
    localStorage.setItem("yearName", "");
    localStorage.setItem("month","");
    localStorage.setItem("monthlyExpenseTrackerId", "");
    localStorage.setItem("monthlyIncomeTrackerId", "");
    axios.get('http://localhost:8080/v1/helper/getinitialdata/1')
    .then(response => {
        //setState(response.data);
        console.log("refresh response : ", response.data);
        console.log("refresh state : ", state);
        setYr(response.data.year);
        console.log("year : ", response.data.year);
        localStorage.setItem("yearName", response.data.year);
        setMnth(response.data.month);
        localStorage.setItem("month", response.data.month);
        localStorage.setItem("monthlyExpenseTrackerId", response.data.monthlyExpenseTrackerId);
        localStorage.setItem("monthlyIncomeTrackerId", response.data.incomeTrackerId);
        localStorage.setItem("userId", response.data.userId);
    })
    .catch(error => {
        console.log(error);
    })

}

  let expenseObj = {
    "expenseType": "",
    "amount": "",
    "date": "",
    "details": "",
    "userId": userId,
    "monthlyExpenseTrackerId": monthlyExpenseTrackerId,
    "dailyExpenseTrackerId": ""
  };
  const classes = useStyles();

  const handleSubmit = (fields: any) => {
    expenseObj.expenseType = expenseType;
    expenseObj.amount = fields.amount;
    expenseObj.date = fields.date;
    expenseObj.details = fields.details;
    console.log(expenseObj);
    axios({
      method: 'post',
      url: baseUrl,
      data: expenseObj,
    }).then(response => {
      console.log(response.data);
      setExpenseDetailsInLocalStorage();
      refresh();
      alert("Data is saved!")
    }  //alert should be modified later(https://material-ui.com/components/alert/)

    ).catch(error => {
      alert("Data is already there in monthly exprense tracker table")
      console.log(error);
    })
  };
  function setExpenseDetailsInLocalStorage() {
    localStorage.setItem("yearName", "");
    localStorage.setItem("month","");
    localStorage.setItem("monthlyExpenseTrackerId", "");
    localStorage.setItem("monthlyIncomeTrackerId", "");
    axios.get('http://localhost:8080/v1/helper/getinitialdata/1')
    .then(response => {
        //(response.data);
        console.log("setExpenseDetailsInLocalStorage response : ", response.data);
        //console.log("refresh state : ", state);
        // setYear(response.data.year);
        console.log("year : ", response.data.year);
        localStorage.setItem("yearName", response.data.year);
        //setMonth(response.data.month);
        localStorage.setItem("month", response.data.month);
        localStorage.setItem("monthlyExpenseTrackerId", response.data.monthlyExpenseTrackerId);
        localStorage.setItem("monthlyIncomeTrackerId", response.data.incomeTrackerId);
        localStorage.setItem("userId", response.data.userId);
    })
    .catch(error => {
        console.log(error);
    })

}
  return (
    <div className={classes.heading2}>
      <Formik
        initialValues={{ date: "", amount: "", details: "" }}
        onSubmit={handleSubmit}
      >

        <Form>
          <label htmlFor="Expense Type">Expense Type</label>
          {/* <Field name="expenseType" type="text" className={classes.expenseType} /> */}
          <select onChange={handleChange3} className={classes.expenseType} >
            {expenses.map(item => (
              <option
                key={item.value}
                value={item.value}  >
                {item.label}
              </option>
            ))}
          </select>

          <label htmlFor="Date" className={classes.expenseType}>Date of Expense</label>
          <Field name="date" type="text" className={classes.expenseType} />

          <label htmlFor="Amount" className={classes.expenseType}>Amount</label>
          <Field name="amount" type="text" className={classes.expenseType} />

          <label htmlFor="Details" className={classes.expenseType}>Details</label>
          <Field name="details" type="text" className={classes.expenseType} />

          <button type="submit" className={classes.button}>Submit</button>
        </Form>
      </Formik>
      <select onChange={handleChange} defaultValue= {localStorage.getItem("month")}>
        {items.map(item => (
          <option
            key={item.value}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>
      <select onChange={handleChange2} defaultValue= {localStorage.getItem("yearName")}>
        {years.map(item => (
          <option
            key={item.value}
            value={item.value} >
            {item.label}
          </option>
        ))}
      </select>;
      <div style={{ height: 350, width: '107%' }}>
      <DataGrid rows={state} columns={columns} />
      {/* initialState={{ pinnedColumns: { right: ["actions"] } }}
        componentsProps={{
          row: {
            onMouseEnter: onMouseEnterRow,
            onMouseLeave: onMouseLeaveRow
          }
        }}
        sx={{
          "& .MuiDataGrid-iconSeparator": {
            display: "none"
          },
          "& .MuiDataGrid-pinnedColumnHeaders": {
            boxShadow: "none",
            backgroundColor: "transparent"
          },
          "& .MuiDataGrid-pinnedColumns": {
            boxShadow: "none",
            // backgroundColor: "transparent",
            "& .MuiDataGrid-cell": {
              padding: 0
            }
          },
          "& .MuiDataGrid-row": {
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "whitesmoke"
            },
            "&:first-child": {
              borderTop: "1px solid rgba(224, 224, 224, 1)"
            }
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none"
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none"
          }
        }} /> */}
        
        {/* <IgrDataGrid dataSource={state}  activationMode="Cell">
        <IgrTextColumn field="i" headerText="Product Name"   />
        <IgrTextColumn field="amount" headerText="Status" width="110"  horizontalAlignment="center"   />
        <IgrTextColumn field="details" headerText="Status" width="110"  horizontalAlignment="center"   />
        <IgrTextColumn field="date" headerText="Status" width="110"  horizontalAlignment="center"   />
        <IgrTextColumn field="expense_type" headerText="Status" width="110"  horizontalAlignment="center"   />
        </IgrDataGrid> 
         cellValueChanging={this.onCellValueChanging}
      dataCommitting={this.onDataCommitting} */}
        
      </div>
    </div>
  );
}