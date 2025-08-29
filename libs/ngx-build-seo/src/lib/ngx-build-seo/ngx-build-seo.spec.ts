import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxBuildSeo } from './ngx-build-seo';

describe('NgxBuildSeo', () => {
  let component: NgxBuildSeo;
  let fixture: ComponentFixture<NgxBuildSeo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxBuildSeo],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxBuildSeo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
