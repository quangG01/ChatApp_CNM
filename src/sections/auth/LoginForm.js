import React, { useState } from "react";
import * as Yup from "yup";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
    Button,
    IconButton,
    InputAdornment,
    Link,
    Stack,
    TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useFormik } from "formik"
import { setUser } from "../../redux/slices/userSlice";
import { useSnackbar } from "notistack";

const LoginForm = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            phoneNumber: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            phoneNumber: Yup
                .string()
                .required('Vui lòng nhập số điện thoại'),
            password: Yup.string()
                .required('Vui lòng nhập mật khẩu')
        }),
        onSubmit: async values => {
            await axios
                .post("http://localhost:8080/auth/login", values)
                .then(res => {
                    localStorage.setItem("accessToken", res.data.token);
                    navigate("/app ")
                    dispatch(setUser({
                        _id: res.data.userId
                    }));
                })
                .catch(err => {
                    enqueueSnackbar(`Sai số điện thoại hoặc mật khẩu`, {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right'
                        }
                    });
                });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
                <TextField
                    fullWidth
                    id="phoneNumber"
                    label="Số điện thoại"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.phoneNumber && formik.touched.phoneNumber}
                    helperText={formik.errors.phoneNumber}
                    value={formik.values.phoneNumber}
                />
                <TextField
                    fullWidth
                    id="password"
                    label="Mật khẩu"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.password && formik.touched.password}
                    helperText={formik.errors.password}
                    value={formik.values.password}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment>
                                <IconButton
                                    onClick={() => {
                                        setShowPassword(!showPassword);
                                    }}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>
            <Stack alignItems={"flex-end"} sx={{ my: 2 }}>
                <Link
                    component={RouterLink}
                    to="/auth/reset-Password"
                    varient="body2"
                    color="inherit"
                    underline="always">
                    Quên Mật Khẩu?
                </Link>
            </Stack>
            <Button
                fullWidth
                color="inherit"
                size="large"
                type="submit"
                variant="contained">
                Đăng nhập
            </Button>
        </form>
    );
};
export default LoginForm;
