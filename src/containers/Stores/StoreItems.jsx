import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import StoreList from '../../components/Store/StoreList'

const useStyles = makeStyles({
  root: {},
})

function StoreItems() {
  const classes = useStyles()
  return (
    <Grid container direction='column' className={classes.root}>
      <StoreList />
    </Grid>
  )
}

export default StoreItems
