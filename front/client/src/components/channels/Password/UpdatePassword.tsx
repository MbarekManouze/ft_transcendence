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
import LoadingButton from "@mui/lab/LoadingButton";

const UpdatePassword = ({ handleClose, el, user_id }: any) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);

  const UpdatePasswordShema = Yup.object().shape({
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
    resolver: yupResolver(UpdatePasswordShema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      data.channel_id = el.id_channel;
      data.user_id = user_id;
      const res = await axios.post(
        "http://localhost:3000/channels/updatePass",
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
      handleClose();
      dispatch(
        showSnackbar({
          severity: "error",
          message: "update into Protected Channel Failed",
        })
      );
    } finally {
      setIsLoading(false);
    }
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
            // backgroundColor: "#806EA9", // Change the background color to purple
            color: "#3D3C65", // Change the text color to white
            borderRadius: "12px",
            width: "150px",
            height: "50px",
            fontSize: "18px",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#3D3C65", // Change the background color on hover
              color: "#b7b7c9",
            },
          }}
          variant="outlined"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <LoadingButton
          loading={isLoading}
          sx={{
            backgroundColor: "#3D3C65", // Change the background color to purple 3D3C65
            color: "#f78562", // Change the text color to white
            borderRadius: "12px",
            height: "50px",
            fontSize: "18px",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#3D3C65", // Change the background color on hover
              color: "#b7b7c9",
            },
          }}
          type="submit"
          variant="contained"
        >
          Update Password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default UpdatePassword;