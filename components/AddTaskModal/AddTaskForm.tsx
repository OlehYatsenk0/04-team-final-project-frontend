'use client';

import * as Yup from 'yup';
import toast from 'react-hot-toast';
import styles from './AddTaskModal.module.css';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { createTask } from '@/lib/api/clientApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../Button/Button';

interface AddTaskFormProps {
  onSuccess: () => void;
}

interface FormValues {
  name: string;
  date: string;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Мінімум 3 символи')
    .max(96, 'Максимум 96 символів')
    .required('Введіть назву завдання'),
  date: Yup.date()
    .required('Оберіть дату')
    .min(today, 'Дата не може бути в минулому'),
});

export default function AddTaskForm({ onSuccess }: AddTaskFormProps) {
  const queryClient = useQueryClient();

  const initialValues: FormValues = {
    name: '',
    date: new Date().toISOString().split('T')[0],
  };

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Завдання успішно створено');
      onSuccess();
    },
    onError: () => {
      toast.error('Помилка створення завдання');
    },
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) => {
    createTaskMutation.mutate(values, {
      onSettled: () => setSubmitting(false),
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <label className={styles.label}>
            Назва завдання
            <Field name="name" type="text" className={styles.input} />
            <ErrorMessage
              name="name"
              component="span"
              className={styles.error}
            />
          </label>

          <label className={styles.label}>
            Дата
            <Field name="date" type="date" className={styles.input} />
            <ErrorMessage
              name="date"
              component="span"
              className={styles.error}
            />
          </label>

          <Button
            type="submit"
            className={styles.submit}
            disabled={isSubmitting || createTaskMutation.isPending}
          >
            Зберегти
          </Button>
        </Form>
      )}
    </Formik>
  );
}
