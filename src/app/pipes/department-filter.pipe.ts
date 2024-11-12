import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../services/employee.service';

@Pipe({
  name: 'departmentFilter'
})
export class DepartmentFilterPipe implements PipeTransform {
  transform(employees: Employee[], department: string): Employee[] {
    if (!department) return employees;
    return employees.filter(employee => employee.department === department);
  }
}
