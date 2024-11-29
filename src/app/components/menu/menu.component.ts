import { Component, OnInit } from '@angular/core';
import { Menu } from "../../model/menu";
import { MenuService } from "../../services/menu.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  menus: Menu[] = [];
  selectedMenu: Menu | null = null;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.getMenus();
  }

  getMenus() {
    this.menuService.getMenus().subscribe({
      next: (data) => (this.menus = data),
      error: (err) => console.error(err),
    });
  }

  getMenuDetails(uuid: string | undefined) {
    this.menuService.getMenuByUUID(uuid).subscribe({
      next: (menu) => {
        alert(`Menu Name: ${menu.name}\nPrice: ${menu.price}`);
      },
      error: (err) => console.error(err),
    });
  }

  updateMenu(uuid: string | undefined, menu: Menu) {
    const newName = prompt('Enter new name:', menu.name || '');
    const newPrice = prompt('Enter new price:', menu.price.toString() || '');

    if (!newName || !newPrice) {
      alert('Update canceled. Name and price are required.');
      return;
    }

    const updatedMenu: Menu = {
      name: newName,
      price: +newPrice,
    };

    this.menuService.updateMenu(uuid, updatedMenu).subscribe({
      next: () => {
        alert('Menu updated successfully!');
        this.getMenus();
      },
      error: (err) => {
        console.error(err);
        alert('Error updating menu.');
      },
    });
  }

  deleteMenu(uuid: string | undefined) {
    const isConfirmed = confirm('Are you sure you want to delete this menu?');
    if (isConfirmed) {
      this.menuService.deleteMenu(uuid).subscribe({
        next: () => {
          alert('Menu deleted successfully');
          this.getMenus();
        },
        error: (err) => {
          console.error(err);
          alert('Error deleting menu.');
        },
      });
    }
  }

  createMenu(form: NgForm) {
    if (form.invalid) {
      alert('Please fill out all the fields');
      return;
    }

    const menu: Menu = { name: form.value.name, price: form.value.price };

    this.menuService.createMenu(menu).subscribe({
      next: () => {
        this.getMenus();
        form.reset();
        alert('Menu created successfully');
      },
      error: (err) => {
        console.error('Error creating menu:', err);
        alert('Error creating menu.');
      },
    });
  }
}
