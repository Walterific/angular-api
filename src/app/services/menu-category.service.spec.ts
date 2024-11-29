import { TestBed } from '@angular/core/testing';
import { MenuCategoryService } from './menu-category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('MenuCategoryService', () => {
  let service: MenuCategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MenuCategoryService],
    });
    service = TestBed.inject(MenuCategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
