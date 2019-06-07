import { Subscription } from 'rxjs';
import { EmployeeSelect } from 'src/app/employee/_interfaces/employee-select';
import { EmployeeService } from 'src/app/employee/_services/employee.service';
import { Payment } from 'src/app/order/_interfaces/payment';
import { SupplierSelect } from 'src/app/supplier/_interfaces/supplier-select';
import { SupplierService } from 'src/app/supplier/_services/supplier.service';

import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { Cost } from '../../_interfaces/cost';
import { OrderBuy } from '../_interfaces/order-buy';
import { OrderBuyProducts } from '../_interfaces/order-buy-products';
import { OrderBuyWithNavigations } from '../_interfaces/order-buy-with-details-to-add-dto';
import { OrderBuyService } from '../_services/order-buy.service';

@Component({
  selector: 'app-order-buy-create',
  templateUrl: './order-buy-create.component.html',
  styleUrls: ['./order-buy-create.component.css']
})
export class OrderBuyCreateComponent implements OnInit, OnDestroy {
  subscription = new Subscription();

  title = 'Add new order';
  orderForms: FormGroup;
  order: OrderBuy;
  suppliers: SupplierSelect[];
  employees: EmployeeSelect[];
  supplierName: string;
  orderToAdd: OrderBuyWithNavigations;

  // Get from child component
  productsToAdd: OrderBuyProducts[] = [];
  paymentsToAdd: Payment[] = [];
  costsToAdd: Cost[] = [];

  constructor(
    private orderService: OrderBuyService,
    private supplierService: SupplierService,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createForm();
    this.getSuppliersSelect();
    this.getEmployeesSelect();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.orderForms = this.fb.group({
      orderNumber: ['', Validators.required],
      dateOfIssue: ['', Validators.required],
      timeForPayment: ['', Validators.required],
      personId: ['', Validators.required],
      employeeId: ['', Validators.required]
    });
  }

  getSuppliersSelect() {
    this.subscription = this.supplierService.getSuppliersSelect().subscribe((suppliers: SupplierSelect[]) => {
      this.suppliers = suppliers;
    });
  }

  getEmployeesSelect() {
    this.subscription = this.employeeService.getEmployeesSelect().subscribe((employees: EmployeeSelect[]) => {
      this.employees = employees;
    });
  }

  getSupplierName() {
    const supplier = this.suppliers.find(p => p.personId === this.orderForms.value.personId);

    this.supplierName = supplier.fullName;
  }

  getProductsToAddFromChild($event: OrderBuyProducts[]) {
    this.productsToAdd = $event;
  }

  getPaymentsToAddFromChild($event: Payment[]) {
    this.paymentsToAdd = $event;
  }

  getCostsToAddFromChild($event: Cost[]) {
    this.costsToAdd = $event;
  }

  onSubmit() {
    this.order = this.orderForms.value;

    this.orderToAdd = {
      orderId: 0,
      orderNumber: this.order.orderNumber,
      dateOfIssue: this.order.dateOfIssue,
      timeForPayment: this.order.timeForPayment,
      personId: this.order.personId,
      employeeId: this.order.employeeId,

      productOrders: this.productsToAdd,
      payments: this.paymentsToAdd,
      costs: this.costsToAdd
    };
    this.orderService.addOrder(this.orderToAdd).subscribe(
      (order: HttpResponse<OrderBuyWithNavigations>) => {
        this.snackBar.open(`Order ${this.order.orderNumber} added`, 'Success');
        this.router.navigate(['/order-buy']);
      },
      error => {
        if (error.status === 409) {
          this.snackBar.open(`${error.error}`, 'Error');
        }
      }
    );
  }

  onCancel() {
    this.router.navigate(['order-buy']);
  }

  get(name: string): AbstractControl {
    return this.orderForms.get(name);
  }

  getErrorMessage(formControl: FormControl) {
    return formControl.hasError('required')
      ? 'You must enter a value'
      : formControl.hasError('email')
      ? 'Not a valid email'
      : formControl.hasError('pattern')
      ? 'Please enter a number!'
      : '';
  }
}
