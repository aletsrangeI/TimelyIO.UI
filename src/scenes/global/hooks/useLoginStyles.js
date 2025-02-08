import { useTheme } from '@emotion/react';
import { tokens } from '../../../theme';

const useLoginStyles = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return {
    formWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100%',
      padding: '20px',
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '25px',
      backgroundColor: colors.primary[400],
      padding: '40px 30px',
      borderRadius: '16px',
      boxShadow: `0px 10px 30px ${colors.grey[900]}`,
      maxWidth: '450px',
      margin: '0 auto',
      width: '100%', // Para que se ajuste al padding del wrapper
    },
    title: {
      textAlign: 'center',
      color: colors.grey[100],
      fontWeight: '600',
      marginBottom: '15px',
    },
    textField: {
      '& .MuiInputBase-root': {
        borderRadius: '8px',
        backgroundColor: colors.primary[600],
      },
      '& .MuiInputLabel-root': {
        color: colors.grey[300],
      },
      '& .Mui-focused': {
        color: colors.greenAccent[500] + '!important',
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: colors.greenAccent[500] + '!important',
        },
      },
    },
    submitButton: {
      borderRadius: '8px',
      padding: '12px 0',
      fontSize: '16px',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      backgroundColor: colors.greenAccent[600],
      '&:hover': {
        backgroundColor: colors.greenAccent[700],
        transform: 'translateY(-1px)',
      },
      transition: 'all 0.3s ease',
    },
    forgotPasswordLink: {
      textAlign: 'right',
      '& a': {
        color: colors.grey[300],
        textDecoration: 'underline',
        fontSize: '0.875rem',
        '&:hover': {
          color: colors.greenAccent[500],
        },
      },
    },
    socialButtonsContainer: {
      display: 'flex',
      gap: '15px',
      justifyContent: 'center',
    },
    socialButton: {
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      minWidth: 'auto',
      padding: '0',
      '&:hover': {
        transform: 'scale(1.1)',
      },
      transition: 'all 0.3s ease',
    },
    signupLink: {
      textAlign: 'center',
      color: colors.grey[300],
      '& a': {
        // Ahora funcionará con el componente Link
        color: colors.greenAccent[500],
        marginLeft: '5px',
        fontWeight: '600',
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
    },
  };
};

export default useLoginStyles;
