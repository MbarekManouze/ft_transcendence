import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack } from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { RHFAutocomplete, RHFTextField } from "../../components/hook-form";
import FormProvider from "../../components/hook-form/FormProvider";
import { RHFUploadAvatar } from "../../components/hook-form/RHFUploadAvatar";
import { showSnackbar } from "../../redux/slices/contact";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import {
  FetchChannels,
  FetchPrivatesChannels,
} from "../../redux/slices/channels";
import LoadingButton from "@mui/lab/LoadingButton";

const CreatePrivateForm = ({ handleClose }: any) => {
  const { friends } = useAppSelector((state) => state.app);
  const [isLoading, setIsLoading] = React.useState(false);
  const [file, setFile] = React.useState<any>();
  const dispatch = useAppDispatch();
  const PrivateSchema = Yup.object().shape({
    title: Yup.string().required("Title is Required!!"),
    members: Yup.array().min(2, "Must have at least 2 Members"),
    avatar: Yup.string().required("Avatar is required").nullable(),
  });

  const defaultValues = {
    title: "",
    members: [],
    type: "private",
    avatar:
      "https://cdn6.aptoide.com/imgs/1/2/2/1221bc0bdd2354b42b293317ff2adbcf_icon.png",
  };

  const methods = useForm({
    resolver: yupResolver(PrivateSchema),
    defaultValues,
  });

  const {
    reset, // reset the form
    handleSubmit, // form submit function
    setValue, // setValue by input name
    formState: {}, // errors and form state
  } = methods; // useful methods from useForm()

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const dataAvatar: any = await axios.patch(
          "http://localhost:3000/users/upload/avatar",
          formData,
          {
            withCredentials: true,
          }
        );

        data.avatar = dataAvatar.data;
      } else {
        data.avatar =
          "https://cdn6.aptoide.com/imgs/1/2/2/1221bc0bdd2354b42b293317ff2adbcf_icon.png";
      }
      const res: any = await axios.post(
        "http://localhost:3000/channels/create",
        data,
        {
          withCredentials: true,
        }
      );

      if (res.data === true) {
        dispatch(
          showSnackbar({
            severity: "success",
            message: "New Private Channel has Created",
          })
        );
        dispatch(FetchChannels());
        dispatch(FetchPrivatesChannels());
        handleClose();
      } else {
        dispatch(
          showSnackbar({
            severity: "error",
            message: "Create Private Channel Failed",
          })
        );
        reset();
        handleClose();
      }
    } catch (error) {
      console.log("error", error);
      dispatch(
        showSnackbar({
          severity: "error",
          message: "Create Private Channel Failed",
        })
      );
      reset();
      handleClose();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = React.useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles[0];

      setFile(file);

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      const title = "avatar";

      if (file) {
        setValue(title, newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFUploadAvatar name="avatar" maxSize={3145728} onDrop={handleDrop} />
        <RHFTextField name="title" label="Title" />
        <RHFAutocomplete
          name="members"
          label="Members"
          multiple
          freeSolo
          options={friends.map((friend: any) => friend?.name)}
          ChipProps={{ size: "medium" }}
        />
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
            Create Channel
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default CreatePrivateForm;
