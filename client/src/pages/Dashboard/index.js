import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import JobSection from '../../components/JobSection';
import GamblingSection from '../../components/GamblingSection';

export default class Dashboard extends Component {
  render() {
    return (
      <Grid 
      container 
      spacing={3}
      style={{marginTop: '20px', marginLeft: '10px'}}
      >
        <Grid item sm={4} md={3}>
          <JobSection />
        </Grid>
        <Grid item sm={4} md={3}>
          <GamblingSection />
        </Grid>
        <Grid item sm={4} md={3}>
          <JobSection />
        </Grid>
        <Grid item sm={4} md={3}>
          <JobSection />
        </Grid>
        <Grid item sm={4} md={3}>
          <JobSection />
        </Grid>
        <Grid item sm={4} md={3}>
          <JobSection />
        </Grid>
      </Grid>
    )
  }
}