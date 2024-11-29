import { TestBed } from '@angular/core/testing';
import { RestaurantCategoryService } from './restaurant-category.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RestaurantCategoryService', () => {
  let service: RestaurantCategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestaurantCategoryService],
    });
    service = TestBed.inject(RestaurantCategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
