import { TextInput, NumberInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';

interface EmployeeFormProps {
  onAddEmployee: (employee: { name: string; salary: number }) => void;
}

export function EmployeeForm({ onAddEmployee }: EmployeeFormProps) {
  const form = useForm({
    initialValues: {
      name: '',
      salary: 0,
    },
    validate: {
      name: (value) => (value.trim().length === 0 ? 'ФИО не может быть пустым' : null),
      salary: (value) => (value <= 0 ? 'Заработная плата должна быть больше нуля' : null),
    },
  });

  const handleSubmit = (values: { name: string; salary: number }) => {
    onAddEmployee(values);
    form.reset();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className="employee-form">
      <div className="form-element">
        <TextInput
          label="ФИО сотрудника"
          placeholder="Введите ФИО"
          {...form.getInputProps('name')}
          required
          styles={{
            input: { width: '200px', height: '25px' },
          }}
        />
      </div>
      <div className="form-element">
        <NumberInput
          label="Заработная плата"
          placeholder="Введите заработную плату"
          {...form.getInputProps('salary')}
          min={1}
          required
          styles={{
            input: { width: '200px', height: '25px' },
            control: {
              width: '30px', // Увеличиваем ширину кнопок
              height: '30px', // Увеличиваем высоту кнопок
              fontSize: '16px', // Увеличиваем текст
            },
          }}
        />
      </div>
      <div className="form-element">
        <Button
          type="submit"
          styles={(theme) => ({
            root: {
              backgroundColor: theme.colors.blue[6],
              color: theme.white,
              padding: '10px 20px',
              fontSize: '16px',
              '&:hover': {
                backgroundColor: theme.colors.blue[7],
              },
            },
          })}
        >
          Добавить
        </Button>
      </div>

      <style jsx>{`
        .employee-form {
          margin: 20px 0;
        }
        .form-element {
          margin-bottom: 20px;
        }
      `}</style>
    </form>
  );
}
