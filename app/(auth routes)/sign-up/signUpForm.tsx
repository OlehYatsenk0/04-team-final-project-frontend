'use client';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuthStore } from '@/lib/store/authStore';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

// YUP SETTINGS
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Імʼя обов'язкове")
    .max(32, 'Імʼя має бути коротшим за 32 символи'),
  email: Yup.string()
    .email('Невірний формат email')
    .max(64, 'Пошта має бути коротшою за 64 символи')
    .required("Пошта обов'язкова"),
  password: Yup.string()
    .min(8, 'Пароль має бути не менше 8 символів')
    .max(128, 'Занадто великий пароль')
    .required("Пароль обов'язковий"),
});

export default function SignUpForm() {
  const register = useAuthStore((state) => state.register);
  const router = useRouter();

  // Initial values formik + onSubmit
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await register(values);
        router.push('/profile/edit'); // вот тут будет редайрект на онбоардинг
      } catch (error: any) {
        toast.error(error.message);
      }
    },
  });
  return (
    <div>
      <div>Тут будет картинка(наверное), слева сверху</div>
      <h1>Реєстрація</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* NAME */}
        <div>
          <label htmlFor="name">Імʼя*</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Ваше імʼя"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {/* show error for name */}
          {formik.touched.name && formik.errors.name ? (
            <div className="error-message">{formik.errors.name}</div>
          ) : null}
        </div>
        {/* EMAIL */}
        <div>
          <label htmlFor="email">Пошта*</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="hello@leleka.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {/* show error for email */}
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}
        </div>
        {/* PASSWORD */}
        <div>
          <label htmlFor="password">Пароль*</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error-message">{formik.errors.password}</div>
          ) : null}
        </div>
        {/* SUBMIT BUTTON, disabled можно будет отключить если не устроит по UI Kit-у */}
        <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
          Зареєструватись
        </button>
        {/* УЖЕ ЕСТЬ АКК? пока выдаёт 404 так как проект не собран и нет формы входа*/}
        <p>
          Вже маєте аккаунт?{` `}
          <Link href="/auth/login">Увійти</Link>
        </p>
      </form>
    </div>
  );
}
