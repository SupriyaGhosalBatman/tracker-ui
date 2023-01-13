import Chart from "react-apexcharts";
import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import axios from 'axios';


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
  
  export default function Chartdemo({yearName, month, userId,monthlyExpenseTrackerId}) {
    const [barData, setBarData] = useState([]);
    const [expenseTypeData, setExpenseTypeData] = useState(null);
    const classes = useStyles();
    const [graphs] = React.useState([
      { label: "expenses in current month", value: "perMonthEexpense"},
      { label: "each months savings", value: "eachMonthsSavings"},
      { label: "each months expenses", value: "eachMonthsExpenses"},
      { label: "each months incomes", value: "eachMonthsIncomes"},
      { label: "each months photography works", value: "eachMonthsPhotographyWorks"},
      { label: "each months income from photography income", value: "eachMonthsIncomeFromPhotographyIncome"},
      { label: "each months expense for a particular type of expense", value: "eachMonthsExpenseForaParticularExpenseType"},
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
  console.log(yearName, month, userId,monthlyExpenseTrackerId);
    const [barOptions, setBarOptions] = useState([]);
    const listOfNumbers =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
    const state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: barOptions,
          axisBorder: {
                  show: false
          },
          axisTicks: {
                  show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#BED1E6',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
        }
      },
      series: [
        {
          name: "series-1",
          data: barData
        }
      ]
    };
    //console.log("sup");
    
   const [state1, setState1] = React.useState([]);
   const [graphType, setGraphType] = React.useState(false);
   useEffect(() => {
    callExpenseForParticularMonth();  
  },[yearName, month]);

  const callExpenseForParticularMonth = () =>  {
    axios.get('http://localhost:8080/v1/expense/expensetypechartpermonth/'
    + userId+'/'+yearName +"-"+month +"-"+'30')
    .then(response => {     
      setState1(response.data);
     
      console.log("chart data : ",response.data);
      setBarData(response.data.listOfAmount);
      setBarOptions(response.data.listOfExpenseType);
      state.options.xaxis.categories = response.data.listOfExpenseType;
      state.series = response.data.listOfAmount;
    })
    .catch(error => {
      console.log(error);}) 
  }

  const callExpenseForParticularExpenseType = () =>  {
    axios.get('http://localhost:8080/v1/expense/expnspertypeinayear/'
    + userId+'/'+yearName +"-"+month +"-"+'30'+ '/'+ expenseTypeData)
    .then(response => { 
      setState1(response.data);
     
      console.log("chart data : ",response.data);
      setBarData(response.data.listOfExpenseType);
      setBarOptions(response.data.listOfNumbers);
      state.options.xaxis.categories = response.data.listOfExpenseType;
      state.series = response.data.listOfNumbers;
    })
    .catch(error => {
      console.log(error);}) 
  }

  const handleGraphChange = (event) =>{
    axios.get('http://localhost:8080/v1/expense/expnsincminayear/'+
    userId +'/'+yearName )
    .then(response => {     
      setState1(response.data);
      console.log("response from expnsincminayear: ",response.data);
      console.log("state : ",event.target.value);
      setBarOptions(listOfNumbers); 
      setGraphType(false);
      if(event.target.value === "eachMonthsSavings"){
        setBarData(response.data.perMonthSaving);
      }else if(event.target.value === "eachMonthsExpenses"){
        setBarData(response.data.perMonthExpense);
      }else if(event.target.value === "eachMonthsIncomes"){
        setBarData(response.data.perMonthIncome);
      }else if(event.target.value === "eachMonthsPhotographyWorks"){
        setBarData(response.data.perMonthPhotographyWork);
      }else if(event.target.value === "eachMonthsIncomeFromPhotographyIncome"){
        setBarData(response.data.perMonthPhotographyIncome);
      }else if(event.target.value === "perMonthEexpense"){
        callExpenseForParticularMonth();
      }else if(event.target.value === "eachMonthsExpenseForaParticularExpenseType"){
        //setBarData([]);
        setGraphType(true);
        
      }
    })
    .catch(error => {
      console.log(error);}) 
  };
  const handleExpenseChange = (event) =>{
    setExpenseTypeData(event.target.value);
    console.log("expense type : ", event.target.value);
    axios.get('http://localhost:8080/v1/expense/expnspertypeinayear/'
    + userId+'/'+yearName + '/'+ event.target.value)
    .then(response => {     
      setState1(response.data);
     
      console.log("chart data : ",response.data);
      // setBarData(response.data.listOfAmount);
      // setBarOptions(response.data.perMonthPerTypeExpense);
      state.options.xaxis.categories = response.data.listOfExpenseType;
      state.series = response.data.listOfNumbers;
      console.log("response data : ", response.data.perMonthPerTypeExpense);
      setBarOptions(listOfNumbers);
      setBarData(response.data.perMonthPerTypeExpense);
      console.log("bar data : ",barData);
      setBarOptions(listOfNumbers);
      // state.options.xaxis.categories = response.data.listOfExpenseType;
      // state.series = response.data.listOfNumbers;
    })
    .catch(error => {
      console.log(error);}) 
   // callExpenseForParticularExpenseType();
  }
    return (
      <div > 
        <label htmlFor="Expense Type">Graph Type</label>
            {/* <Field name="expenseType" type="text" className={classes.expenseType} /> */}
            <select onChange = {handleGraphChange} className={classes.expenseType} >
              {graphs.map(item => (
                <option
                key={item.value}
                value={item.value}  >
              {item.label}
                </option>
              ))}
           </select>
           {graphType  ?<div> 
           <label htmlFor="Expense Type">Expense Type</label>
           <select onChange = {handleExpenseChange} className={classes.expenseType} >
              {expenses.map(item => (
                <option
                key={item.value}
                value={item.value}  >
              {item.label}
                </option>
              ))}
           </select>
           </div> : null }
           
        <Chart
          options={state.options}
          series={state.series}
          type="bar"
          width="900"
          />
      </div>

    );
  }