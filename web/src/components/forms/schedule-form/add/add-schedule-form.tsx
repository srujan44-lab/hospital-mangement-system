import { Form } from "@/components/ui/form";
import { addDoctorFormFiels } from "./add-schedule-form.strings";
import { handleAddDoctor } from "./add-schedule-form.utils";
import { Dispatch, SetStateAction } from "react";

export const AddScheduleForm = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Form
      formFields={addDoctorFormFiels}
      onSubmit={(formData) => handleAddDoctor(formData, setOpen)}
      submitBtnLabel="Add Schedule"
    />
  );
};
