import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import ReactDOM from "react-dom";
import { Formik, Field, Form } from "formik";
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import { Alert } from 'react-alert';
import {END_POINT} from '../constant/constants';
//import MonthDropDown from './monthDropDown';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            // '& .MuiListItemIcon-root': {
            // 	marginLeft: '35%'
            // }
        },
        heading:{
            marginLeft: '2%'
        },
        addButton :{
            height: '2%',
            width: '3%',
            marginTop: '5%',
            marginLeft: '-10%',
        },
        heading2:{
            height: '24%',
            width: '90%',
            marginTop: '12%',
            marginLeft: '-79%',
        },
        expenseType :{
            marginLeft: '1%'
        },
        button:{
          marginBottom: '1%',
        }
    })
);


export default function AddIncome({yearName, month, userId,monthlyExpenseTrackerId,monthlyIncomeTrackerId}) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'incomeTypes', headerName: 'incomeType', width: 250 },
    { field: 'incomeAmount', headerName: 'amount', width: 250 },
    { field: 'incomeDetails', headerName: 'details', width: 350 },
    { field: 'createdOn', headerName: 'date', width: 150 },
  ];
  
  const [items] = React.useState([
    { label: "01", value: "01"},
    { label: "02", value: "02"},
    { label: "03", value: "03"},
    { label: "04", value: "04"},
    { label: "05", value: "05"},
    { label: "06", value: "06"},
    { label: "07", value: "07"},
    { label: "08", value: "08"},
    { label: "09", value: "09"},
    { label: "10", value: "10"},
    { label: "11", value: "11"},
    { label: "12", value: "12"},
  ]);

  const [years] = React.useState([
    { label: "2020", value: "2020"},
    { label: "2021", value: "2021"},
    { label: "2022", value: "2022"},
  ]);

  const [incomeTypes] = React.useState([
    { label: "business", value: "business"},
    { label: "job", value: "job"},
    { label: "photography", value: "photography"},
    { label: "freelancing", value: "freelancing"},
  ]);

  const [month2, setMonth2] = useState();
    const [year, setYear] = useState();
    const [incomeType, setIncomeType] = useState();
    const [mnth, setMnth] = useState("");
    const [yr, setYr] = useState("");
    const handleChange = (event) => {
      setMonth2(event.target.value);  
        console.log("month is : ",event.target.value);
    };

    const handleChange3 = (event) => {
        setIncomeType(event.target.value);
      console.log("income type is : ",event.target.value);
    }

    const handleChange2 = (event) => {
      setYear(event.target.value);  
      console.log("year is : ",event.target.value);
      axios.get(END_POINT+'/v1/helper/getallincome/'+userId+'/'
      +yearName+'/'+month)
    .then(response => {     
      setState(response.data);
      console.log("response : ",response.data);
      console.log("state : ",state);
    })
    .catch(error => {
      console.log(error);}) 
  };

const [state, setState] = React.useState([]);
  var baseUrl = END_POINT+'/v1/expense/addincome';
 
  function refresh(){
    if(month===" " || month===null){
      month=localStorage.getItem('month');
    }
     if(yearName===" " || yearName===null){
      month=localStorage.getItem('yearName');
    }
    axios.get(END_POINT+'/v1/expense/getallincome/'+userId+'/'+
    yearName +"-"+month +"-"+'30')
    .then(response => {     
      setState(response.data);
      console.log("response : ",response.data);
      console.log("state : ",state);
    })
    .catch(error => {
      console.log(error);}) 
  }
  

  useEffect(() => {
   // getInitialData();
    refresh();
  },[yearName, month]);

  function getInitialData() {
    localStorage.setItem("yearName", "");
    localStorage.setItem("month","");
    localStorage.setItem("monthlyExpenseTrackerId", "");
    localStorage.setItem("monthlyIncomeTrackerId", "");
    axios.get(END_POINT+'/v1/helper/getinitialdata/1')
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

  let incomeObj = {
    "incomeTypes": "",
    "incomeAmount": "",
    "date": "",
    "incomeDetails": "",
    "userId": userId,
    "monthlyExpenseTrackerId": monthlyExpenseTrackerId, 
    "incomeDetailsId": "",
    "incomeTrackerId": monthlyIncomeTrackerId,
};
    const classes = useStyles();
    
    const handleSubmit = (fields :any) => {
        incomeObj.incomeTypes = incomeType;
        incomeObj.incomeAmount = fields.amount;
        incomeObj.date = fields.date;
        incomeObj.incomeDetails = fields.details;
      console.log(incomeObj);
      axios({
        method: 'post',
        url: baseUrl,
        data: incomeObj,
        }).then(response =>{ 
          console.log(response.data);
          setIncomeDetailsInLocalStorage();
          refresh();
        alert("Data is saved!")}  //alert should be modified later(https://material-ui.com/components/alert/)
        ).catch(error => {
          alert("Data is already there in income tracker table")
          console.log(error);}) 
      };
      function setIncomeDetailsInLocalStorage() {
        localStorage.setItem("yearName", "");
        localStorage.setItem("month","");
        localStorage.setItem("monthlyExpenseTrackerId", "");
        localStorage.setItem("monthlyIncomeTrackerId", "");
        axios.get(END_POINT+'/v1/helper/getinitialdata/1')
        .then(response => {
            //(response.data);
            console.log("setIncomeDetailsInLocalStorage response : ", response.data);
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
          initialValues={{ date: "",amount:"", details: "" }}
        onSubmit={handleSubmit}
        >
            
          <Form>
            <label htmlFor="Income Type">Income Type</label>
            {/* <Field name="expenseType" type="text" className={classes.expenseType} /> */}
            <select onChange = {handleChange3} className={classes.expenseType} >
              {incomeTypes.map(item => (<option key={item.value} value={item.value} >
              {item.label} </option> ))}
           </select>
            <label htmlFor="Date" className={classes.expenseType}>Date of Income</label>
            <Field name="date" type="text" className={classes.expenseType} />

            <label htmlFor="Amount" className={classes.expenseType}>Amount</label>
            <Field name="amount" type="text" className={classes.expenseType} />

            <label htmlFor="Details" className={classes.expenseType}>Details</label>
            <Field name="details" type="text" className={classes.expenseType} />

            <button type="submit" className={classes.button}>Submit</button>
          </Form>
        </Formik>
        <select onChange = {handleChange} defaultValue= {localStorage.getItem("month")}>
        {items.map(item => (
          <option
            key={item.value}
            value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <select onChange = {handleChange2} defaultValue= {localStorage.getItem("yearName")}>
        {years.map(item => (
          <option
            key={item.value}
            value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
        <div style={{ height: 350, width: '107%' }}>
        <DataGrid rows={state} columns={columns} />
        </div>
      </div>
    );
}
