import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChooserComponent } from './add-chooser.component';

describe('AddChooserComponent', () => {
  let component: AddChooserComponent;
  let fixture: ComponentFixture<AddChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
