import { Table, Button } from '@mantine/core';
import { useState } from 'react';

// Добавляем поле `id` для уникальной идентификации каждого сотрудника
interface Employee {
  id: number;
  name: string;
  salary: number;
}

interface EmployeeTableProps {
  employees: Employee[];
  onRemoveEmployee: (id: number) => void; // Изменяем параметр на `id`
}

export function EmployeeTable({ employees, onRemoveEmployee }: EmployeeTableProps) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedEmployees = [...employees].sort((a, b) =>
    sortOrder === 'asc' ? a.salary - b.salary : b.salary - a.salary
  );

  return (
    <div className="employee-table">
      <Table>
        <thead>
          <tr>
            <th>
              <div className="table-element">ФИО сотрудника</div>
            </th>
            <th>
              <div className="table-element">
                Заработная плата
                <Button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  styles={(theme) => ({
                    root: {
                      marginLeft: '10px',
                      backgroundColor: theme.colors.blue[6],
                      color: theme.white,
                      '&:hover': {
                        backgroundColor: theme.colors.blue[7],
                      },
                    },
                  })}
                >
                  {sortOrder === 'asc' ? '⬆️' : '⬇️'}
                </Button>
              </div>
            </th>
            <th>
              <div className="table-element">Действия</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <div className="table-element">{employee.name}</div>
              </td>
              <td>
                <div className="table-element">{employee.salary}</div>
              </td>
              <td>
                <div className="table-element">
                  <Button
                    color="red"
                    onClick={() => onRemoveEmployee(employee.id)} // Используем `id` для удаления
                    styles={{
                      root: {
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        '&:hover': {
                          backgroundColor: '#c82333',
                        },
                      },
                    }}
                  >
                    Удалить
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <style jsx>{`
        .employee-table {
          margin-top: 20px;
        }
        .table-element {
          margin: 10px;
          border: 1px solid #ddd;
          padding: 8px;
        }
        th,
        td {
          border: 1px solid #ddd;
        }
      `}</style>
    </div>
  );
}