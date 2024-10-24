import * as yup from "yup";
export const patchUserSchema = yup.object({
    name: yup.string()
        .required('Name is required'),
    job: yup
        .string()
        .required("Job is required")
});