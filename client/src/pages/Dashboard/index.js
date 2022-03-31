import React from 'react'
import {Grid, AppBar, Toolbar, Typography} from '@mui/material';
import {
  GamblingSection, 
  InvestmentSection, 
  JobSection, 
  TreasureSection,
  ComingSoonSection
} from '../../components/SectionCards';

export default function Dashboard() {
  return (
    <Grid 
    container 
    spacing={3}
    sx={{marginTop: '20px', marginLeft: '10px'}}
    >
      <AppBar 
      elevation={0}
      position="static" 
      sx={{backgroundColor: 'transparent'}}>
        <Toolbar>
          <Typography
          onClick={()=> console.log('test')}
          variant="h6" 
          sx={{
            flexGrow: 1,
            textAlign: 'right',
            cursor: 'grab'
          }}>
            Profile
          </Typography>
          <Typography variant="h3" sx={{
            flexGrow: 1,
            textAlign: 'center'
          }}>
            DASHBOARD
          </Typography>
          <Typography variant="h6" sx={{
            flexGrow: 1,
            textAlign: 'left'
          }}>
            Balance
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid item sm={4} md={3}>
        <JobSection 
          onClick={()=> console.log('here')}
        />
      </Grid>
      <Grid item sm={4} md={3}>
        <GamblingSection 
          onClick={()=> console.log('here')}
        />
      </Grid>
      <Grid item sm={4} md={3}>
        <InvestmentSection 
          onClick={()=> console.log('here')}
        />
      </Grid>
      <Grid item sm={4} md={3}>
        <TreasureSection 
          onClick={()=> console.log('here')}
        />
      </Grid>
      <Grid item sm={4} md={3}>
        <ComingSoonSection 
          onClick={()=> console.log('here')}
        />
      </Grid>
    </Grid>
  )
}