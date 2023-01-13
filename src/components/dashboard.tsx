import { makeStyles, Theme, createStyles, fade, List, ListItem, Tooltip, ListItemIcon, CssBaseline, AppBar, Toolbar, Typography, InputBase, Box, IconButton, Button, Drawer } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import IconDetails from "../utils/IconDetails";
import SearchIcon from '@material-ui/icons/Search';
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';
import ForumIcon from '@material-ui/icons/Forum';
import ExpenseTracker from '../assets/images/expense-tracker.png'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import AccountTreeRoundedIcon from '@material-ui/icons/AccountTreeRounded';
import EventRoundedIcon from '@material-ui/icons/EventRounded';
import LabelImportantRoundedIcon from '@material-ui/icons/LabelImportantRounded';
import ExplicitRoundedIcon from '@material-ui/icons/ExplicitRounded';
import Chartdemo from './chartdemo';
import axios from 'axios';
import Expense from '../components/expense/expense';
import Income from '../components/income/income';

let drawerWidth = 140;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            // '& .MuiListItemIcon-root': {
            // 	marginLeft: '35%'
            // }
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            backgroundColor: '#262b40',
            color: 'white'
        },
        search: {
            position: 'relative',
            color: 'white',
            display: 'flex',
            flexDirection: 'row-reverse',
            borderRadius: 20,
            backgroundColor: fade("#A6A6A6", 0.15),
            '&:hover': {
                backgroundColor: fade('#DEDEDE', 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            borderColor: '#000000',
            width: '30%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            }
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
            marginRight: '18%'
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        drawer: {
            width: drawerWidth,
            // flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(1),
        },
        update: {
            fontSize: "0.7rem",
            height: 17,
            lineheight: 15,
            minWidth: 15,
            textAlign: "center",
            marginLeft: 2,
            marginTop: '6%',
            borderRadius: 10,
            color: "white",
            backgroundColor: "lightgray",
            padding: "0 3px",
        }
    }),
);

const navigation = {
    "0": {
        "sortOrder": "0",
        "icon": 'Dashboard',
        "displayName": "Dashboard",
        "path": "/dashboard"
    },
    "1": {
        "sortOrder": "1",
        "icon": "ExplicitRounded",
        "displayName": "Expense Tracker",
        "path": "/expense-tracker"
    },
    "2": {
        "sortOrder": "2",
        "icon": "LabelImportantRounded",
        "displayName": "Income Tracker",
        "path": "/income-tracker"
    },
    "3": {
        "sortOrder": "3",
        "icon": "EventRounded",
        "displayName": "EMI",
        "path": "/emi-details"
    },
    "4": {
        "sortOrder": "4",
        "icon": "AccountTreeRounded",
        "displayName": "Projects",
        "path": "/project"
    },
    "5": {
        "sortOrder": "5",
        "icon": "AccountCircleRounded",
        "displayName": "Profile",
        "path": "/profile"
    }
}

export default function Dashboard(props: any) {

    const classes = useStyles();
    const history = useHistory();
    const [graphs] = React.useState([
        { label: "expenses in current month", value: "perMonthEexpense" },
        { label: "each months savings", value: "eachMonthsSavings" },
        { label: "each months expenses", value: "eachMonthsExpenses" },
        { label: "each months incomes", value: "eachMonthsIncomes" },
        { label: "each months photography works", value: "eachMonthsPhotographyWorks" },
        { label: "each months income from photography works", value: "eachMonthsIncomeFromPhotographyIncome" },
    ]);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [monthlyExpenseTrackerId, setMonthlyExpenseTrackerId] = useState(null);
    const [monthlyIncomeTrackerId, setMonthlyIncomeTrackerId] = useState("");    
    const [navContent, setNavContent]: any = useState({
        "menu": {},
        "menuIndex": "0",
        "subMenuIndex": "0"
    })
    const [items] = React.useState([
        { label: "select", value: "select" },
        { label: "January", value: "01" },
        { label: "February", value: "02" },
        { label: "March", value: "03" },
        { label: "April", value: "04" },
        { label: "May", value: "05" },
         //refreshLocalStorage();
        { label: "June", value: "06" },
        { label: "July", value: "07" },
        { label: "August", value: "08" },
        { label: "September", value: "09" },
        { label: "October", value: "10" },
        { label: "November", value: "11" },
        { label: "December", value: "12" },
    ]);

    const [state, setState] = React.useState([]);
    const [yearItems] = React.useState([
        { label: "select", value: "select" },
        { label: "2020", value: "2020" },
        { label: "2021", value: "2021" },
        { label: "2022", value: "2022" },
        { label: "2023", value: "2023" },
        { label: "2024", value: "2024" },
        { label: "2025", value: "2025" },
    ]);

    const handleChange = (event) => {
        if (event.target.value === ("select")) {
            setMonth(localStorage.getItem("month"));
        } else if (event.target.value === ("01")) {
            setMonth("January");
            localStorage.setItem("month", "01");
        } else if (event.target.value === ("02")) {
            setMonth("February");
            localStorage.setItem("month", "02");
        } else if (event.target.value === ("03")) {
            setMonth("March");
            localStorage.setItem("month", "03");
        } else if (event.target.value === ("04")) {
            setMonth("April");
            localStorage.setItem("month", "04");
        } else if (event.target.value === ("05")) {
            setMonth("May");
            localStorage.setItem("month", "05");
        } else if (event.target.value === ("06")) {
            setMonth("June");
            localStorage.setItem("month", "06");
        } else if (event.target.value === ("07")) {
            setMonth("July");
            localStorage.setItem("month", "07");
        } else if (event.target.value === ("08")) {
            setMonth("08");
            localStorage.setItem("month", "08");
        } else if (event.target.value === ("09")) {
            setMonth("09");
            localStorage.setItem("month", "09");
        } else if (event.target.value === ("10")) {
            setMonth("October");
            localStorage.setItem("month", "10");
        } else if (event.target.value === ("11")) {
            setMonth("November");
            localStorage.setItem("month", "11");
        } else if (event.target.value === ("12")) {
            setMonth("December");
            localStorage.setItem("month", "12");
        }
        refreshLocalStorage();
        console.log("month is : ", event.target.value);
        //localStorage.setItem("month",  event.target.value);
       // refresh() ;
     };

    const handleChangeYear = (event) => {
        if (event.target.value === ("select")) {
            setYear(localStorage.getItem("yearName"));
        } else if (event.target.value === ("2020")) {
            setYear("2020");
            localStorage.setItem("yearName", "2020");
        } else if (event.target.value === ("2021")) {
            setYear("2021");
            localStorage.setItem("yearName", "2021");
        } else if (event.target.value === ("2022")) {
            setYear("2022");
            localStorage.setItem("yearName", "2022");
        } else if (event.target.value === ("2023")) {
            setYear("2023");
            localStorage.setItem("yearName", "2023");
        } else if (event.target.value === ("2024")) {
            setYear("2024");
            localStorage.setItem("yearName", "2024");
        } else if (event.target.value === ("2025")) {
            setYear("2025");
            localStorage.setItem("yearName", "2025");
        }
        refreshLocalStorage();
        console.log("year is : ", event.target.value);
        //localStorage.setItem("yearName",  event.target.value); 
      //  refresh();

    };

    const onMainMenuClick = (menuIndex: string) => {
        const menuData: any = { ...navContent }
        menuData["menuIndex"] = menuIndex
        console.log("menu index", menuData.menu[menuIndex].path)
        history.push(menuData.menu[menuIndex].path)
        setNavContent(menuData)
    }

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (instruction: any) => {
        setAnchorEl(null);
        if (instruction == "logout") {
        }

    };
    let incomeObj = {
        "month": "",
        "userId": 1,
        "year": "",
    };
    useEffect(() => {
        setNavContent({
            "menu": navigation,
            "menuIndex": "0",
            "subMenuIndex": "0"
        })
        // history.push("/dashboard")
        //handleChange();
        //handleChangeYear();
        refresh();
        fetchTotalExpenseIncome();
         //refreshLocalStorage();
    }, [])

    function fetchTotalExpenseIncome(){
      axios.get('http://localhost:8080/v1/helper/getexpensesaving/'+  localStorage.getItem('userId') +
      '/'+ localStorage.getItem('month') +'/'+localStorage.getItem('yearName')  )
      .then(response => {     
        localStorage.setItem("Income",response.data.income);
        localStorage.setItem("Savings", response.data.savings);
        localStorage.setItem("Expense", response.data.expense);
        console.log("Savings : ", response.data.savings);
        console.log("Income : ",response.data.income);
      })
      .catch(error => {
        console.log(error);}) 
    }
    
    function refreshLocalStorage() {
        //month=
        incomeObj.month=  localStorage.getItem("month");
            incomeObj.year=localStorage.getItem("yearName");
            // localStorage.setItem("yearName", "");
            // localStorage.setItem("month","");
            // localStorage.setItem("monthlyExpenseTrackerId", "");
            // localStorage.setItem("monthlyIncomeTrackerId", "");
           //  localStorage.setItem("userId", "");
            axios({
                method: 'post',
                url: 'http://localhost:8080/v1/helper/getnewinitialdata/1',
                data: incomeObj,
                }).then(response =>{ 
                    setState([]);
                    setState(response.data);
                console.log("after axios call refreshLocalStorage response : ", response.data);
                console.log("after axios call  refreshLocalStorage state : ", state);
                setYear((response.data!=null || response.data!=[]) && (response.data.year!=null && response.data.year!='') ?  response.data.year : localStorage.getItem("yearName"));
                console.log("after axios call year : ", response.data.year);
                localStorage.setItem("yearName",(response.data!=null || response.data!=[]) && (response.data.year!=null && response.data.year!='') ?  response.data.year : localStorage.getItem("yearName"));
                setMonth((response.data!=null || response.data!=[]) && (response.data.month!=null && response.data.month!='')  ? response.data.month :localStorage.getItem("month") );
                localStorage.setItem("month",(response.data!=null || response.data!=[]) && (response.data.month!=null && response.data.month!='')  ? response.data.month :localStorage.getItem("month") );//ternary operator
                localStorage.setItem("monthlyExpenseTrackerId",(response.data!=null || response.data!=[]) && (response.data.monthlyExpenseTrackerId!=null && response.data.monthlyExpenseTrackerId!='')  ? response.data.monthlyExpenseTrackerId : '');
                localStorage.setItem("monthlyIncomeTrackerId",(response.data!=null || response.data!=[]) && (response.data.incomeTrackerId!=null && response.data.incomeTrackerId!='')  ? response.data.incomeTrackerId : '');
                localStorage.setItem("userId",(response.data!=null || response.data!=[]) && (response.data.userId!=null && response.data.userId!='')  ? response.data.userId : '');
                console.log("after axios call monthlyExpenseTrackerId & monthlyIncomeTrackerId", localStorage.getItem('monthlyExpenseTrackerId'));
                }) .catch(error => {
                    console.log("after axios call ",error);
                })
    }
    function refresh() {
            // localStorage.setItem("yearName", "");
            // localStorage.setItem("month","");
            // localStorage.setItem("monthlyExpenseTrackerId", "");
            // localStorage.setItem("monthlyIncomeTrackerId", "");
            axios.get('http://localhost:8080/v1/helper/getinitialdata/1')
            .then(response => {
                setState(response.data);
                console.log("refresh response : ", response.data);
                console.log("refresh state : ", state);
                setYear((response.data!=null || response.data!=[]) && (response.data.year!=null && response.data.year!='') ?  response.data.year : localStorage.getItem("yearName"));
                console.log("year : ", response.data.year);
                localStorage.setItem("yearName",(response.data!=null || response.data!=[]) && (response.data.year!=null && response.data.year!='') ?  response.data.year : localStorage.getItem("yearName"));
                setMonth((response.data!=null || response.data!=[]) && (response.data.month!=null && response.data.month!='')  ? response.data.month :localStorage.getItem("month") );
                localStorage.setItem("month",(response.data!=null || response.data!=[]) && (response.data.month!=null && response.data.month!='')  ? response.data.month :localStorage.getItem("month") );//ternary operator
                localStorage.setItem("monthlyExpenseTrackerId",(response.data!=null || response.data!=[]) && (response.data.monthlyExpenseTrackerId!=null && response.data.monthlyExpenseTrackerId!='')? response.data.monthlyExpenseTrackerId : '');
                localStorage.setItem("monthlyIncomeTrackerId",(response.data!=null || response.data!=[]) && (response.data.incomeTrackerId!=null && response.data.incomeTrackerId!='') ? response.data.incomeTrackerId : '');
                localStorage.setItem("userId",(response.data!=null || response.data!=[]) && (response.data.userId!=null && response.data.userId!='')  ?  response.data.userId : '');
            })
            .catch(error => {
                console.log(error);
            })
      
    }
    const renderMainMenu = () => {
        return (
            <List style={{ marginTop: '10px' }}>
                {Object.keys(navContent.menu).sort().map((navItem: any, index: any) => (
                    <ListItem
                        onClick={() => onMainMenuClick(navItem)}
                        style={(navContent["menu"][navItem]["sortOrder"] === navContent.menuIndex) ? {
                            height: '50px'
                            // backgroundColor: '#0078D7',
                            // borderTopLeftRadius: '10px',
                            // borderBottomLeftRadius: '10px'
                        } : { height: '50px' }} button key={navContent["menu"][navItem]["AppId"]}>
                        <Tooltip title={navContent["menu"][navItem]["displayl"]}>
                            <ListItemIcon style={{ marginLeft: '34%' }} >
                                <IconDetails icon={navContent["menu"][navItem].icon}></IconDetails>
                            </ListItemIcon>
                        </Tooltip>
                    </ListItem>
                ))}
            </List>
        )
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar} >
                <Toolbar style={{ justifyContent: 'space-between' }} >
                    <div style={{ display: 'flex' }}>
                        <Typography variant="h6" noWrap color="primary">
                            Hi! Supriya
                        </Typography>

                        {/* <div className={classes.search} style={{ flex: 0.5 }}>
                            <InputBase
                                placeholder="Type Something"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                        </div> */}
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Typography style={{ color: '#3572A7', fontSize: '12px', fontWeight: 'bold', marginTop: '6%', width: 100 }}>
                            {/* {month} */}
                            {/* </Typography> */}
                            <select onChange={handleChange} defaultValue={localStorage.getItem("month")}>
                                {items.map(item => (
                                    <option key={item.value} value={item.value} >
                                        {item.label} </option>))}
                            </select>
                        </Typography>
                        <Typography style={{ color: '#3572A7', fontSize: '12px', fontWeight: 'bold', marginTop: '6%', width: 100 }}>
                            {/* {month} */}
                            {/* </Typography> */}
                            <select onChange={handleChangeYear} defaultValue={localStorage.getItem("yearName")}>
                                {yearItems.map(item => (
                                    <option key={item.value} value={item.value} >
                                        {item.label} </option>))}
                            </select>
                        </Typography>
                        {/* <Box display="flex" marginLeft="2%" marginTop='4%'>
                            <ForumIcon
                                style={{ color: "#757575", cursor: "pointer" }}
                                onClick={(event: any) => {
                                    // history.push('/message');
                                }} />
                            {cartQty !== 0 ? (
                                <div className={classes.update}>{cartQty}</div>
                            ) : null}
                        </Box> */}
                        <div style={{ display: 'flex', marginLeft: "2%" }}>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle style={{ color: '#0078D7' }} />
                            </IconButton>
                            <Typography style={{ color: '#3572A7', fontSize: '12px', fontWeight: 'bold', marginTop: '11%', width: 100 }}>Supriya Ghosal</Typography>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                {/* <Divider /> */}
                <div style={{
                    display: "flex",
                    flexDirection: 'row',
                    height: '100%'
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: 'column',
                        width: '100%',
                        backgroundColor: '#004f96',
                        height: '100%'
                    }} >
                        <div style={{
                            height: '17%', display: 'flex', justifyContent: 'center', alignContent: 'center',
                            backgroundColor: '#262b40',
                            // color: 'white'
                        }}>
                            <img src={ExpenseTracker} style={{ width: '55%', height: 65, marginTop: '10px' }} />
                        </div>
                        <div style={{
                            height: '83%',
                            backgroundColor: '#262b40',
                            color: 'white'
                        }}>
                            {renderMainMenu()}
                        </div>
                    </div>
                </div>

            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    {/* <Route path="/dashboard" render={() => <Chartdemo yearName={localStorage.getItem('yearName')}
                        month={localStorage.getItem('month')} userId={localStorage.getItem('userId')}
                        monthlyExpenseTrackerId={localStorage.getItem('monthlyExpenseTrackerId')} />} />
            
                    <Route path="/expense-tracker" render={() => <Expense yearName={localStorage.getItem('yearName')}
                        month={localStorage.getItem('month')} userId={localStorage.getItem('userId')}
                        monthlyExpenseTrackerId={localStorage.getItem('monthlyExpenseTrackerId')} />} /> */}
                    {/* <Route path="/" render={() => <Chartdemo yearName={localStorage.getItem('yearName')}
                        month={localStorage.getItem('month')} userId={localStorage.getItem('userId')}
                        monthlyExpenseTrackerId={localStorage.getItem('monthlyExpenseTrackerId')} />} /> */}
                    {/* <Route path="/expense-tracker" component={Expense} /> */}
                    {/* <Route path="/income-tracker" component={Income} /> */}
                    <Route path="/dashboard">
                        <Chartdemo yearName={localStorage.getItem('yearName')}
                        month={localStorage.getItem('month')} userId={localStorage.getItem('userId')}
                        monthlyExpenseTrackerId={localStorage.getItem('monthlyExpenseTrackerId')}/>
                    </Route>
                    <Route path="/expense-tracker">
                        <Expense yearName={localStorage.getItem('yearName')}
                        month={localStorage.getItem('month')} userId={localStorage.getItem('userId')}
                        monthlyExpenseTrackerId={localStorage.getItem('monthlyExpenseTrackerId')}/>
                    </Route>
                    <Route path="/income-tracker">
                        <Income yearName={localStorage.getItem('yearName')}
                        month={localStorage.getItem('month')} userId={localStorage.getItem('userId')}
                        monthlyExpenseTrackerId={localStorage.getItem('monthlyExpenseTrackerId')}
                        monthlyIncomeTrackerId={localStorage.getItem('monthlyIncomeTrackerId')} />
                    </Route>
                </Switch>
                {/* <Switch>
                <Route path="/dashboard" component={Chartdemo} />
                </Switch>
                <Switch>
                <Route path="/expense-tracker" component={Expense} />
                </Switch>
                <Switch>
                <Route path="/income-tracker" component={Income} />
                </Switch> */}
            </main>

            {/* <Chartdemo/> */}
        </div>
    );
}