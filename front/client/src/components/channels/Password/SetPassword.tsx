import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import {
  resetContact,
  showSnackbar,
  toggleDialog,
} from "../../../redux/slices/contact";
import { useAppDispatch } from "../../../redux/store/store";
import FormProvider from "../../hook-form/FormProvider";
import { Button, IconButton, InputAdornment, Stack } from "@mui/material";
import { RHFTextField } from "../../hook-form";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import {
  FetchChannels,
  FetchPrivatesChannels,
  FetchProtectedChannels,
  FetchPublicChannels,
} from "../../../redux/slices/channels";

const SetPassword = ({ handleClose, el, user_id }: any) => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

  const SetPasswordShema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    passwordConfirm: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), "null"], "Passwords must match"),
  });

  const defaultValues = {
    password: "",
    passwordConfirm: "",
  };

  const methods = useForm({
    resolver: yupResolver(SetPasswordShema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    try {
      data.channel_id = el.id_channel;
      data.user_id = user_id;
      const res = await axios.post(
        "http://localhost:3000/channels/setPass",
        data,
        {
          withCredentials: true,
        }
      );
      if (res.data == true) {
        dispatch(toggleDialog());
        dispatch(FetchChannels());
        dispatch(FetchProtectedChannels());
        dispatch(FetchPublicChannels());
        dispatch(FetchPrivatesChannels());
        dispatch(resetContact());
        dispatch(
          showSnackbar({
            severity: "success",
            message: "You upgrated to Protected channel",
          })
        );
      } else {
        dispatch(
          showSnackbar({
            severity: "error",
            message: "Updated to Protected channel has been failed",
          })
        );
      }
      handleClose();
    } catch (err) {
      console.error(err);
      reset();
      dispatch(
        showSnackbar({
          severity: "error",
          message: "update into Protected Channel Failed",
        })
      );
    }
    handleClose();
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} mb={4}>
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="passwordConfirm"
          label="Confirm New Password"
          type={showPasswordConfirm ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  edge="end"
                >
                  {showPasswordConfirm ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction={"row"}
        alignContent={"center"}
        justifyContent={"space-evenly"}
      >
        <Button
          sx={{
            color: "#3D3C65",
            borderRadius: "12px",
            width: "150px",
            height: "50px",
            fontSize: "18px",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#3D3C65",
              color: "#b7b7c9",
            },
          }}
          variant="outlined"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          sx={{
            backgroundColor: "#3D3C65",
            color: "#f78562",
            borderRadius: "12px",
            height: "50px",
            fontSize: "18px",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#3D3C65",
              color: "#b7b7c9",
            },
          }}
          type="submit"
          variant="contained"
        >
          Set New Password
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default SetPassword;
