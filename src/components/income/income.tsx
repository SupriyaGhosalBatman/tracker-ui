import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddIncome from './addIncome';
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
            marginLeft: '2%'
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
        }
    })
);

export default function Income({yearName, month, userId,monthlyExpenseTrackerId,monthlyIncomeTrackerId}) {
    const classes = useStyles();
    const [saving, setSavings] = React.useState(0);
    const [income, setIncome] = React.useState(0);
    if(month===" " || month===null){
        month=localStorage.getItem('month');
    }
    if(yearName===" " || yearName===null){
        month=localStorage.getItem('yearName');
    }
    useEffect(() => {
        axios.get(END_POINT+'/v1/helper/getexpensesaving/'+userId +
        '/'+ month +'/'+yearName )
        .then(response => {     
            setSavings(response.data.savings);
            setIncome(response.data.income);
          console.log("SAVING : ",response.data);
        })
        .catch(error => {
          console.log(error);}) 
      },[yearName, month]);
    return (
        <div className={classes.root}>
            <h3 className={classes.heading}>Income Tracker</h3>
            <Fab color="primary" aria-label="add" className={classes.addButton}>
            <AddIcon />
            </Fab>
            <h4 className={classes.heading2}>Add New Income</h4>
            <h4 className={classes.heading3}>Income per month</h4>
            <h4 className={classes.heading4}>{income}/-</h4>
            <h4 className={classes.heading5}>Savings per month</h4>
            <h4 className={classes.heading6}>{saving}/-</h4>
            <AddIncome yearName={localStorage.getItem('yearName')}
                        month={localStorage.getItem('month')} userId={localStorage.getItem('userId')}
                        monthlyExpenseTrackerId={localStorage.getItem('monthlyExpenseTrackerId')}
                        monthlyIncomeTrackerId={localStorage.getItem('monthlyIncomeTrackerId')} 
                        />
        </div>
        
    );
}
