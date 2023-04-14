import { useCallback, useMemo, useState } from "react";
import { z } from "zod";

type UseFormParams<IntitialValues> = {
  initialValues: IntitialValues;
  handleSubmit: (values: IntitialValues) => void;
  validationSchema?: z.ZodSchema<IntitialValues, any, IntitialValues>;
};

type UseFormReturn<InitialValues> = {
  values: InitialValues;
  isValid: boolean;
  onSubmit: () => void;
  setFieldValue: <Key extends keyof InitialValues>(
    key: Key,
    value: InitialValues[Key]
  ) => void;
};

export default function useForm<
  InitialValues extends Record<string | number, any>
>({
  initialValues,
  validationSchema,
  handleSubmit,
}: UseFormParams<InitialValues>): UseFormReturn<InitialValues> {
  const [form, setForm] = useState<InitialValues>(initialValues);

  const values = useMemo(() => form, [form]);

  const setFieldValue = useCallback(
    <Key extends keyof InitialValues>(key: Key, value: InitialValues[Key]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const onSubmit = useCallback(() => {
    let payload = form;

    if (validationSchema) payload = validationSchema.parse(form);

    handleSubmit(payload);
  }, [form, handleSubmit, validationSchema]);

  const isValid = useMemo(
    () => Object.keys(form).every((key) => !!form[key as keyof InitialValues]),
    [form]
  );

  return {
    setFieldValue,
    values,
    onSubmit,
    isValid,
  };
}
