import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';

import MoneyIcon from '@material-ui/icons/AttachMoney';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 4,
  textAlign: 'center',
  padding: theme.spacing(2, 0),
  color: theme.palette.tertiary.darker,
  backgroundColor: theme.palette.tertiary.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.tertiary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.tertiary.dark, 0)} 0%, ${alpha(
    theme.palette.tertiary.dark,
    0.24
  )} 100%)`
}));

export default function JobSection() {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <MoneyIcon/>
      </IconWrapperStyle>
      <Typography variant="h5">Jobs</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Make some legit money
      </Typography>
    </RootStyle>
  );
}