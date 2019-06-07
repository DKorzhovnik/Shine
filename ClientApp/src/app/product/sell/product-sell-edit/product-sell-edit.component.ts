import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ProductSell } from '../_interfaces/product-sell';
import { CategorySell } from 'src/app/category/sell/_interfaces/category-sell';
import { environment } from 'src/environments/environment';
import { ProductSellService } from '../_services/product-sell.service';
import { CategorySellService } from 'src/app/category/sell/_services/category-sell.service';
import { CategorySellDialogComponent } from 'src/app/category/sell/_dialogs/category-sell-dialog/category-sell-dialog.component';
import { ConfirmDialogService } from 'src/app/_shared/_services/confirm-dialog.service';


@Component({
  selector: 'app-product-sell-edit',
  templateUrl: './product-sell-edit.component.html',
  styleUrls: ['./product-sell-edit.component.css']
})
export class ProductSellEditComponent implements OnInit {
  baseUrl = environment.URL;
  productSell: ProductSell;
  categories: CategorySell[];
  formGroup: FormGroup;
  editMode: boolean;
  actButton: boolean;
  title: string;

  constructor(private fb: FormBuilder,
    private productSellService: ProductSellService,
    private categorySellService: CategorySellService,
    private confirmService: ConfirmDialogService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute) {

    this.createForm();

    const id = +this.route.snapshot.params.productId;

    if (id) {
      this.editMode = true;

      this.productSellService.getProduct(id).subscribe(result => {
        this.productSell = result;
        this.title = 'Edit ' + this.productSell.name;

        this.updateForm();
      });
    } else {
      this.editMode = false;
      this.title = 'Create new product';
    }
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categorySellService.getCategoryList().subscribe(result => {
      this.categories = result;
    });
  }

  createForm() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      specification: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  updateForm() {
    this.formGroup.setValue({
      name: this.productSell.name,
      specification: this.productSell.specification,
      categoryId: this.productSell.categoryId
    });

  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '400px';
    dialogConfig.minHeight = '250px';

    // TODO: Pass data from main component to dialog
    // use to edit value (product)
    // dialogConfig.data = {
    //   name: 'exp',
    //   specification: 'exp'
    //   ...
    // };

    // this.dialog.open(CategoryBuyEditComponent, dialogConfig);

    // TODO: pass data from dialog in to main component
    const dialogRef = this.dialog.open(CategorySellDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data: CategorySell) => {
      this.categorySellService.addCategory(data).subscribe((res: CategorySell) => {
        // Add new category in to categories
        this.categories.push(res);
        // Update formControl with new added value
        this.formGroup.patchValue({
          categoryId: res.categoryId
        });
      });
    });
  }

  onSubmit() {
    this.actButton = true;
    const tempProductSell = <ProductSell>{};

    tempProductSell.name = this.formGroup.value.name;
    tempProductSell.specification = this.formGroup.value.specification;
    tempProductSell.categoryId = this.formGroup.value.categoryId;

    if (this.editMode) {
      tempProductSell.productId = this.productSell.productId;
      this.productSellService.updateProduct(tempProductSell).subscribe(() => {
        this.router.navigate(['product-sell/list']);
      });
    } else {
      this.productSellService.addProduct(tempProductSell).subscribe(() => {
        this.router.navigate(['/product-sell/list']);
      });
    }
  }

  onBack() {
    this.actButton = true;
    this.router.navigate(['/product-sell/list']);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.actButton) {
      if (this.formGroup.dirty) {
        const dialogRef = this.confirmService.openDialog('Discard changes?');
        dialogRef.afterClosed().subscribe(res => {
          return res;
        });
      }
    }
    return true;
  }

  get(name: string): AbstractControl {
    return this.formGroup.get(name);
  }

  getErrorMessage(formControl: FormControl) {
    return formControl.hasError('required') ? 'You must enter a value' :
      formControl.hasError('email') ? 'Not a valid email' :
        formControl.hasError('pattern') ? 'Please enter a number!' : '';
  }

}
