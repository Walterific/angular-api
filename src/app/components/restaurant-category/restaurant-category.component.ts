import { Component, OnInit } from '@angular/core';
import { RestaurantCategory } from "../../model/restaurant-category";
import { RestaurantCategoryService } from "../../services/restaurant-category.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-restaurant-category',
  templateUrl: './restaurant-category.component.html',
  styleUrls: ['./restaurant-category.component.css'],
})
export class RestaurantCategoryComponent implements OnInit {
  categories: RestaurantCategory[] = [];
  selectedCategory: RestaurantCategory | null = null;

  constructor(private categoryService: RestaurantCategoryService) {}

  ngOnInit(): void {
    this.getRestaurantCategories();
  }

  getRestaurantCategories() {
    this.categoryService.getRestaurantCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error(err),
    });
  }

  getCategoryDetails(uuid: string | undefined) {
    this.categoryService.getRestaurantCategoryByUUID(uuid).subscribe({
      next: (category) => {
        alert(
          `Category Name: ${category.name}`
        );
      },
      error: (err) => console.error(err),
    });
  }

  updateCategory(uuid: string | undefined, category: RestaurantCategory) {
    const newName = prompt('Enter new name:', category.name || '');

    if (!newName) {
      alert('Update canceled. Name is required.');
      return;
    }

    const updatedCategory: RestaurantCategory = {
      name: newName,
    };

    this.categoryService.updateRestaurantCategory(uuid, updatedCategory).subscribe({
      next: () => {
        alert('Category updated successfully!');
        this.getRestaurantCategories();
      },
      error: (err) => {
        console.error(err);
        alert('Error updating category.');
      },
    });
  }

  deleteCategory(uuid: string | undefined) {
    const isConfirmed = confirm('Are you sure you want to delete this category?');
    if (isConfirmed) {
      this.categoryService.deleteRestaurantCategory(uuid).subscribe({
        next: () => {
          alert('Category deleted successfully');
          this.getRestaurantCategories();
        },
        error: (err) => {
          console.error(err);
          alert('Error deleting category.');
        },
      });
    }
  }

  createRestaurantCategory(form: NgForm) {
    if (form.invalid) {
      alert('Please fill out the category name');
      return;
    }
  
    const category: RestaurantCategory = { name: form.value.name };
  
    this.categoryService.createRestaurantCategory(category).subscribe({
      next: (response) => {
        this.getRestaurantCategories();
        form.reset();
        alert('Category created successfully');
      },
      error: (err) => {
        console.error('Error creating category:', err);
        alert('Error creating category.');
      },
    });
  }
}
