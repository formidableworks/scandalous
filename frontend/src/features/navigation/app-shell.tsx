import { AppBar, Button, createStyles, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexGrow: {
      flexGrow: 1,
    },
  })
);

export function AppShell(): JSX.Element {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Scandal</Typography>
        <div className={classes.flexGrow} />
        <Button startIcon={<WallpaperIcon />} color="inherit">
          Scan
        </Button>
      </Toolbar>
    </AppBar>
  );
}
