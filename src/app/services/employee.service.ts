import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';

export interface Employee {
  id: string ;
  name: string;
  email: string;
  department: string;
  joiningDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.get<Employee[]>(this.apiUrl).pipe(
      map((employees) => {
        const maxId = employees.reduce((max, emp) => Math.max(max, Number(emp.id)), 0);      
        employee.id = (maxId + 1).toString();
        return employee;
      }),
      switchMap((employeeWithId) => {
        return this.http.post<Employee>(this.apiUrl, employeeWithId);
      })
    );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.id}`, employee);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
