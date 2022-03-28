import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import JobSection from '../../components/JobSection';

export default class Home extends Component {
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
        <Grid item sm={4} md={3}>
          <JobSection />
        </Grid>
      </Grid>
    )
  }
}