import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
});

export default function Nav() {
    
    const classes = useStyles();
    const [user, setUser] = useState(localStorage.getItem('auth'));

    const logoutSubmit = () => {
        localStorage.clear();
        setUser(null);
    };

    

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ background: 'black' }}> 
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Button color="inherit" component={RouterLink} to="/">
                            Notes
                        </Button>
                    </Typography>
                    <Button color="inherit" component={RouterLink} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/profile">
                        Create Note
                    </Button>
                    {user ? (
                        <Button color="inherit" onClick={logoutSubmit} component={RouterLink} to="/">
                            Logout
                        </Button>
                    ) : (
                        <Button color="inherit" component={RouterLink} to="/login">
                            LogIn
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}
