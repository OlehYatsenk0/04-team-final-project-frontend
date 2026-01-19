'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import css from './AddDiaryEntryForm.module.css';
import type { Emotion } from '@/types/diary';

type Props = {
  onSuccess: () => void;

  // ✅ для редагування (передзаповнення)
  initialValues?: Partial<DiaryFormValues>;

  // ✅ якщо передали — форма НЕ робить POST, а викликає це (PATCH у твоєму кейсі)
  onSubmitToApi?: (values: DiaryFormValues) => Promise<void>;

  // ✅ текст кнопки (наприклад: "Зберегти" / "Оновити")
  submitText?: string;
};

export type DiaryFormValues = {
  title: string;
  description: string;
  emotions: string[]; // ids
};

const validationSchema = Yup.object({
  title: Yup.string()
    .min(1, 'Мінімум 1 символ')
    .max(64, 'Максимум 64 символи')
    .required('Введіть заголовок'),
  description: Yup.string()
    .min(1, 'Мінімум 1 символ')
    .max(1000, 'Максимум 1000 символів')
    .required('Введіть текст запису'),
  emotions: Yup.array()
    .of(Yup.string().required())
    .min(1, 'Оберіть мінімум 1 емоцію')
    .max(12, 'Максимум 12 емоцій')
    .required('Оберіть емоції'),
});

const todayYYYYMMDD = () => new Date().toISOString().slice(0, 10);

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={open ? css.chevronOpen : css.chevron}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M6.7 9.3a1 1 0 0 1 1.4 0L12 13.2l3.9-3.9a1 1 0 1 1 1.4 1.4l-4.6 4.6a1 1 0 0 1-1.4 0L6.7 10.7a1 1 0 0 1 0-1.4z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function AddDiaryEntryForm({
  onSuccess,
  initialValues,
  onSubmitToApi,
  submitText = 'Зберегти',
}: Props) {
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [isLoadingEmotions, setIsLoadingEmotions] = useState(true);

  // dropdown logic
  const dropdownId = useId();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const emotionsById = useMemo(() => {
    const m = new Map<string, Emotion>();
    emotions.forEach((e) => m.set(e._id, e));
    return m;
  }, [emotions]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setIsLoadingEmotions(true);

        const res = await fetch('/api/emotions');
        if (!res.ok) throw new Error('Failed to load emotions');

        const json: unknown = await res.json();

        let list: Emotion[] = [];
        if (Array.isArray(json)) {
          list = json as Emotion[];
        } else if (
          typeof json === 'object' &&
          json !== null &&
          'data' in json
        ) {
          const data = (json as Record<string, unknown>).data;
          if (Array.isArray(data)) list = data as Emotion[];
        }

        if (mounted) setEmotions(list);
      } catch {
        if (mounted) setEmotions([]);
        toast.error('Не вдалося завантажити емоції');
      } finally {
        if (mounted) setIsLoadingEmotions(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isDropdownOpen) return;

    const onDocMouseDown = (e: MouseEvent) => {
      const node = dropdownRef.current;
      if (!node) return;
      if (!node.contains(e.target as Node)) setIsDropdownOpen(false);
    };

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDropdownOpen(false);
    };

    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onEsc);

    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onEsc);
    };
  }, [isDropdownOpen]);

  const formInitialValues: DiaryFormValues = {
    title: initialValues?.title ?? '',
    description: initialValues?.description ?? '',
    emotions: initialValues?.emotions ?? [],
  };

  const handleSubmit = async (
    values: DiaryFormValues,
    { setSubmitting }: FormikHelpers<DiaryFormValues>,
  ) => {
    try {
      if (onSubmitToApi) {
        // ✅ edit mode (PATCH виконується зовні)
        await onSubmitToApi(values);
      } else {
        // ✅ create mode (POST виконується тут як і раніше)
        const payload = {
          title: values.title,
          description: values.description,
          date: todayYYYYMMDD(),
          emotions: values.emotions,
        };

        const res = await fetch('/api/diaries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error('Create diary failed');
      }

      // ✅ тости залишаємо "як у Новий запис"
      toast.success('Запис створено!');
      onSuccess();
    } catch {
      toast.error('Помилка створення запису');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik<DiaryFormValues>
      initialValues={formInitialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue, isSubmitting }) => {
        const toggleEmotion = (id: string) => {
          const checked = values.emotions.includes(id);
          const next = checked
            ? values.emotions.filter((x) => x !== id)
            : [...values.emotions, id];

          setFieldValue('emotions', next);
        };

        const selected = values.emotions
          .map((id) => emotionsById.get(id))
          .filter(Boolean) as Emotion[];

        return (
          <Form className={css.form}>
            <label className={css.label}>
              Заголовок
              <Field
                name="title"
                type="text"
                className={css.input}
                placeholder="Введіть заголовок запису"
              />
              <ErrorMessage
                name="title"
                component="div"
                className={css.error}
              />
            </label>

            {/* Категорії */}
            <div className={css.label}>
              <span className={css.labelText}>Категорії</span>

              <div className={css.dropdownRoot} ref={dropdownRef}>
                <button
                  type="button"
                  className={css.dropdownField}
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                  aria-controls={dropdownId}
                  onClick={() => setIsDropdownOpen((v) => !v)}
                >
                  <span className={css.dropdownValue}>
                    {selected.length === 0 ? (
                      <span className={css.placeholder}>Оберіть категорію</span>
                    ) : (
                      <span className={css.selectedChips}>
                        {selected.map((e) => (
                          <span key={e._id} className={css.chip}>
                            {e.title}
                          </span>
                        ))}
                      </span>
                    )}
                  </span>

                  <span className={css.chevronBtn} aria-hidden="true">
                    <ChevronIcon open={isDropdownOpen} />
                  </span>
                </button>

                {isDropdownOpen && (
                  <div
                    className={css.dropdownPanel}
                    id={dropdownId}
                    role="listbox"
                  >
                    {isLoadingEmotions ? (
                      <div className={css.dropdownHint}>Завантаження…</div>
                    ) : (
                      <ul className={css.dropdownList}>
                        {emotions.map((e) => {
                          const checked = values.emotions.includes(e._id);

                          return (
                            <li key={e._id} className={css.dropdownItem}>
                              <label className={css.itemLabel}>
                                <input
                                  type="checkbox"
                                  className={css.checkbox}
                                  checked={checked}
                                  onChange={() => toggleEmotion(e._id)}
                                />
                                <span className={css.itemText}>{e.title}</span>
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              <ErrorMessage
                name="emotions"
                component="div"
                className={css.error}
              />
            </div>

            <label className={css.label}>
              Запис
              <Field
                as="textarea"
                name="description"
                className={css.textarea}
                rows={7}
                placeholder="Запишіть, як ви себе відчуваєте"
              />
              <ErrorMessage
                name="description"
                component="div"
                className={css.error}
              />
            </label>

            <button
              type="submit"
              className={css.submit}
              disabled={isSubmitting}
            >
              {submitText}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
