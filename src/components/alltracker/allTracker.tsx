import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
//import AddIncome from './addIncome';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import {END_POINT} from '../constant/constants';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            // '& .MuiListItemIcon-root': {
            // 	marginLeft: '35%'
            // }
        },
        heading:{
            marginLeft: '4%'
        },
        addButton :{
            height: '2%',
            width: '4%',
            marginTop: '6%',
            marginLeft: '-10%',
        },
        
        heading2:{
            height: '12%',
            width: '13%',
            marginTop: '5%',
            marginLeft: '1%',
        },
        heading3:{
            height: '12%',
            width: '11%',
            marginTop: '5%',
            marginLeft: '4%',
        },
        heading4:{
            height: '12%',
            width: '11%',
            marginTop: '6%',
            marginLeft: '4%',
        },
        heading5:{
            height: '12%',
            width: '11%',
            marginTop: '5%',
            marginLeft: '3%',
        },
        heading6:{
            height: '12%',
            width: '11%',
            marginTop: '6%',
            marginLeft: '6%',
        },
        heading7:{
            height: '12%',
            width: '11%',
            marginTop: '8%',
            marginLeft: '1%',
        },
        grid:{
            height: '178%',
            width: '179%',
            marginTop: '22%',
            marginLeft: '-82%',
        },
    })
);

export default function AllTracker({yearName, month, userId,monthlyExpenseTrackerId,monthlyIncomeTrackerId}) {
    const classes = useStyles();
    const [saving, setSavings] = React.useState(0);
    const [income, setIncome] = React.useState(0);
    const [state, setState] = React.useState([]);
    function refresh(){
        if(month===" " || month===null){
          month=localStorage.getItem('month');
        }
         if(yearName===" " || yearName===null){
          month=localStorage.getItem('yearName');
        }
        axios.get(END_POINT+'/v1/helper/getAllExpenseIncomeStatistic/'+userId)
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
    const columns = [
        { field: 'id', headerName: 'Year', width: 150 },
        // { field: 'year', headerName: 'Year', width: 180 },
        { field: 'totalSavings', headerName: 'Total Savings', width: 180 },
        { field: 'totalPhotographyIncome', headerName: 'Total PG Income', width: 200 },
        { field: 'totalIncome', headerName: 'Total Income', width: 180 },
        { field: 'avgPhotographyIncomePerMonth', headerName: 'Avg PGIncome/Month', width: 200 },
        { field: 'totalPhotographyWork', headerName: 'Total PG Work', width: 200 },
        { field: 'avgIncomePerMonth', headerName: 'Avg Income/Month', width: 200 },
        { field: 'avgSavingsPerMonth', headerName: 'Avg Savings/Month', width: 200 },
        { field: 'totalExpense', headerName: 'Total  Expense', width: 180 },
        { field: 'avgExpensePerMonth', headerName: 'Avg Expense/Month', width: 200 },
        { field: 'totalPhotographyExpense', headerName: 'Total PG Expense', width: 200 },
        { field: 'avgPhotographyExpensePerMonth', headerName: 'Avg PGExpense/Month', width: 200 },
        { field: 'avgPhotographyWorkPerMonth', headerName: 'Avg PGWork/Month', width: 200 },
        { field: 'mostPhotographyWorkMonth', headerName: 'Most PGWork/Month', width: 200 },
        { field: 'mostPhotographyWorkCountonThatMonth', headerName: 'Most PGWorkCount/Month', width: 220 },
        { field: 'mostPhotographyWorkIncomeonThatMonth', headerName: 'Most PGWorkIncome/Month', width: 220 },
        { field: 'nameOfMonth', headerName: 'Month', width: 150 },
      ];
    if(month===" " || month===null){
        month=localStorage.getItem('month');
    }
    if(yearName===" " || yearName===null){
        month=localStorage.getItem('yearName');
    }

    // useEffect(() => {
    //     axios.get(END_POINT+'/v1/helper/getAllExpenseIncomeStatistic/'+userId)
    //     .then(response => {     
    //         setSavings(response.data.savings);
    //         setIncome(response.data.income);
    //       console.log("SAVING : ",response.data);
    //     })
    //     .catch(error => {
    //       console.log(error);}) 
    //   },[yearName, month]);
    return (
        <div className={classes.root}>
            <h3 className={classes.heading}>OverAll Tracker</h3>
            {/* <Fab color="primary" aria-label="add" className={classes.addButton}>
            <AddIcon />
            </Fab> 
            <h4 className={classes.heading2}>Add New Income</h4>*/}
            <h4 className={classes.heading3}>Income per month</h4>
            <h4 className={classes.heading4}>{income}/-</h4>
            <h4 className={classes.heading5}>Savings per month</h4>
            <h4 className={classes.heading6}>{saving}/-</h4>
            <div style={{ height: 187, width: '107%' }}>
                <div className={classes.grid}>
                <DataGrid rows={state} columns={columns} />
                </div>
       
        </div>
        </div>
        
    );
}
