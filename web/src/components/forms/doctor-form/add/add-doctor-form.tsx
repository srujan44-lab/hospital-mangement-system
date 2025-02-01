import { Form } from "@/components/ui/form";
import { addDoctorFormFiels } from "./add-doctor-form.strings";
import { handleAddDoctor } from "./add-doctor-form.utils";
import { Dispatch, SetStateAction } from "react";

export const AddDoctorForm = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Form
      formFields={addDoctorFormFiels}
      onSubmit={(formData) => handleAddDoctor(formData, setOpen)}
      submitBtnLabel="Add Doctor"
    />
  );
};
