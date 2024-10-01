"use client";

import { useState } from 'react';
import { EmployeeForm } from '../../components/EmployeeForm';
import { EmployeeTable } from '../../components/EmployeeTable';

interface Employee {
  id: number;
  name: string;
  salary: number;
}

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee = { ...employee, id: Date.now() }; // Используем текущее время как уникальный id
    setEmployees((current) => [...current, newEmployee]);
  };

  const removeEmployee = (id: number) => {
    setEmployees((current) => current.filter((employee) => employee.id !== id));
  };

  return (
    <div className="container">
      <h1>Учёт заработной платы сотрудников</h1>
      <div className="form-container">
        <EmployeeForm onAddEmployee={addEmployee} />
      </div>
      <div className="table-container">
        <EmployeeTable employees={employees} onRemoveEmployee={removeEmployee} />
      </div>

      <style jsx>{`
        .container {
          padding: 20px;
        }
        .form-container {
          margin-top: 20px;
          width: 400px; /* Устанавливаем конкретную ширину для формы */
        }
        .table-container {
          margin-top: 20px;
          width: 600px; /* Устанавливаем конкретную ширину для таблицы */
          max-height: 400px; /* Устанавливаем максимальную высоту для таблицы */
          overflow-y: auto; /* Добавляем прокрутку по вертикали, если содержимое превышает высоту */
        }
        h1 {
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
}