import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// component
import { dateFormate } from '../../../utils/formatTime';
import Iconify from '../../../components/Iconify';
import { login, callOnHeader, ForCompanyFundZero } from '../../../services';
import * as Common from '../../../utils/CommonMessage';
import AlertMessages from '../../../utils/AlertMessages';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [alertMsg, setAlertMsg] = useState(false)
  const [alertColor, setAlertColor] = useState("")
  const [textAlert, setTextAlert] = useState("")




  // console.log("SuperAdminToken" ,SuperAdminToken);




  const LoginSchema = Yup.object().shape({
    email: Yup.string().email(Common.EMAIL_VALIDATION).required(Common.EMAIL_REQUIRE),
    password: Yup.string().required(Common.PASSWORD),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      const response = await login({
        email: values.email,
        password: values.password
      });
      console.log(response.data.roles);
      const currentDate = new Date().toISOString().split('T')[0];
      if (response.status === 200) {
        // Put the object into storage
        if (response.data.roles[0] === "ROLE_SUPERADMIN") {
          localStorage.setItem('superadmin', JSON.stringify(response.data));
          navigate('/superadmin/dashboard', { replace: true });
        }

        // status_active
        else if (response.data.roles[0] === "ROLE_ADMIN") {
          if (dateFormate(response.data.expiry_date) < currentDate) {
            setAlertMsg(true)
            const respo = await ForCompanyFundZero({ "admin_id": response.data.id })
            setAlertColor("error")
            setTextAlert(' Your Plan Is Expire ,  Please Contact To Your Service Provider')
            return
          }
          if (response.data.status_active === 0) {
            setAlertMsg(true)
            setAlertColor("error")
            setTextAlert(' You Are Inactive ,  Please Contact To Your Service Provider')
            return
          }


          localStorage.setItem('admin', JSON.stringify(response.data));
          navigate('/admin/dashboard', { replace: true });
        }

        else if (response.data.roles[0] === "ROLE_USER") {
          localStorage.setItem('user', JSON.stringify(response.data));
          navigate('/user/dashboard', { replace: true });
        }
      }
      else {
        setAlertMsg(true)
        setAlertColor("error")
        setTextAlert(response.data.message)
      }
    },
  });


  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const hideClose = () => {
    setAlertMsg(false)
  }


  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          {/* <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          /> */}

          <Link component={RouterLink} variant="subtitle2" to="/forgotpassword" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loadingIndicator=" Please Wait...." loading={isSubmitting}>
          Login
        </LoadingButton>
      </Form>
      {alertMsg &&
        <AlertMessages
          hideAlert={hideClose}
          showAlert={alertMsg}
          message={textAlert}
          alertColor={alertColor}
        />
      }
    </FormikProvider>
  );
}
