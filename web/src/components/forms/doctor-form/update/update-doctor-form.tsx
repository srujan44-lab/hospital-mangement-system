import { Form } from "@/components/ui/form";
import { updateDoctorFormFiedls } from "./update-doctor-form.strings";
import { handleUpdateDoctor } from "./update-doctor-form.utils";
import { UpdateDoctorFormProps } from "./update-doctor-form.types";

export const UpdateDoctorForm = ({
  setOpen,
  defaultValues,
}: UpdateDoctorFormProps) => {
  return (
    <Form
      formFields={updateDoctorFormFiedls(defaultValues)}
      onSubmit={(formData) => handleUpdateDoctor(formData, setOpen, defaultValues.email)}
      submitBtnLabel="Update Details"
    />
  );
};
