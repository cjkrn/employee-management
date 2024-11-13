import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService, Employee } from '../services/employee.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit {

  @Input() employee: Employee = { id: '', name: '', email: '', department: '', joiningDate: '' }; 
  @Output() employeeDeleted : EventEmitter<void> = new EventEmitter();

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  // openDeleteDialog() {
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     width: '300px',
  //     data: { name: this.employee?.name }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == 'delete') {
  //       this.deleteEmployee();
  //     }
  //   });
  // }

  openDeleteDialog() {
    const isConfirmed = window.confirm('Are you sure you want to delete this employee?');
    
    if (isConfirmed) {
      this.deleteEmployee();
    }
  }
  

  deleteEmployee() {
    let id = this.employee?.id;
    if (id == null || id == undefined) return;
    debugger
    this.employeeService.deleteEmployee(id.toString()).subscribe({
      next: () => {
          console.log('Employee deleted successfully');
          this.employeeDeleted.emit();  
      },
      error: (err) => {
          console.error('Error deleting employee:', err);
      }
  });

  }

  updateEmployee(updatedEmployee: Employee) {
    if (!updatedEmployee) return;
    this.employeeService.updateEmployee(updatedEmployee).subscribe(() => {
      console.log('Employee updated successfully');
    });
  }
}
