import React from 'react';
import { connect } from "react-redux";

import clsx from 'clsx';
import {
    makeStyles,
    useTheme
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DeleteIcon from '@material-ui/icons/Delete';

import NoteContent from './NoteContent';
import Login from './Login';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export function Home(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        G Note
          </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <Typography variant='h4'>Menu</Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['LOGIN', 'CREATE NOTES'].map((text, index) => (
                        <ListItem button key={text} onClick={() => {
                            if (text === 'LOGIN') {
                                props.setLogin(true);
                            }
                            else {
                                props.setLogin(false);
                            }
                        }}>
                            <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                {props.notes !== undefined &&
                    <List>
                        {props.notes.map(({ title, content }, i) => (
                            <ListItem button key={i} onClick={() => props.selectNote({ title: title, content: content, index: i })}>
                                <ListItemIcon>{<DeleteIcon onClick={(e) => {
                                    props.deleteNote({ title: title, content: content, index: i });
                                    props.clearAllField();
                                    e.stopPropagation();
                                }} />}</ListItemIcon>
                                <ListItemText primary={title} />
                            </ListItem>
                        ))}
                    </List>
                }

            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {props.login ? <Login></Login> : <NoteContent></NoteContent>}
            </main>
        </div>
    );
}
const mapStateToProps = (state) => ({
    notes: state.notes.length !== 0 ? state.notes : undefined,
    login: state.login,
});

const mapDispatchToProps = dispatch => {
    return {
        selectNote: (selectedNote) => {
            dispatch({ type: "SELECT_NOTE", payload: selectedNote })
        },
        deleteNote: (selectedNote) => {
            dispatch({ type: "DELETE_NOTE", payload: selectedNote })
        },
        clearAllField: () => {
            dispatch({ type: "CLEAR_ALL_FIELD" })
        },
        setLogin: (isLogin) => {
            dispatch({ type: "SET_LOGIN", payload: isLogin })
        },
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)