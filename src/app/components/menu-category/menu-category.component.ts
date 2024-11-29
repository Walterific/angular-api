import { Component, OnInit } from '@angular/core';
import { MenuCategory } from "../../model/menu-category";
import { MenuCategoryService } from "../../services/menu-category.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.css'],
})
export class MenuCategoryComponent implements OnInit {
  categories: MenuCategory[] = [];
  selectedCategory: MenuCategory | null = null;

  constructor(private categoryService: MenuCategoryService) {}

  ngOnInit(): void {
    this.getMenuCategories();
  }

  getMenuCategories() {
    this.categoryService.getMenuCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error(err),
    });
  }

  getCategoryDetails(id: string | undefined) {
    this.categoryService.getMenuCategoryById(id).subscribe({
      next: (category) => {
        alert(`Category Name: ${category.name}`);
      },
      error: (err) => console.error(err),
    });
  }

  updateCategory(id: string | undefined, category: MenuCategory) {
    const newName = prompt('Enter new name:', category.name || '');

    if (!newName) {
      alert('Update canceled. Name is required.');
      return;
    }

    const updatedCategory: MenuCategory = {
      name: newName,
    };

    this.categoryService.updateMenuCategory(id, updatedCategory).subscribe({
      next: () => {
        alert('Category updated successfully!');
        this.getMenuCategories();
      },
      error: (err) => {
        console.error(err);
        alert('Error updating category.');
      },
    });
  }

  deleteCategory(id: string | undefined) {
    const isConfirmed = confirm('Are you sure you want to delete this category?');
    if (isConfirmed) {
      this.categoryService.deleteMenuCategory(id).subscribe({
        next: () => {
          alert('Category deleted successfully');
          this.getMenuCategories();
        },
        error: (err) => {
          console.error(err);
          alert('Error deleting category.');
        },
      });
    }
  }

  createMenuCategory(form: NgForm) {
    if (form.invalid) {
      alert('Please fill out the category name');
      return;
    }
  
    const category: MenuCategory = { name: form.value.name };
  
    this.categoryService.createMenuCategory(category).subscribe({
      next: () => {
        this.getMenuCategories();
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
