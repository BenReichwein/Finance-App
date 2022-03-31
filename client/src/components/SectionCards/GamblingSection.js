import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';

import CasinoIcon from '@material-ui/icons/Casino';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 4,
  textAlign: 'center',
  padding: theme.spacing(2, 0),
  borderRadius: '15px 50px',
  color: theme.palette.primary.contrastText,
  border: `3px solid ${theme.palette.secondary.main}`,
  backgroundColor: theme.palette.tertiary.opacity,
  cursor: 'grab'
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
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

export function GamblingSection({onClick}) {
  return (
    <RootStyle onClick={onClick}>
      <IconWrapperStyle>
        <CasinoIcon/>
      </IconWrapperStyle>
      <Typography variant="h5">Gambling</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Gamble against friends
      </Typography>
    </RootStyle>
  );
}