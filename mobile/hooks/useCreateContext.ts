import { Values } from "@/interface/createEntry";
import { useFormikContext } from "formik";

export const useCreateContext = () => useFormikContext<Values>();
