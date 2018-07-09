import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteWindowComponent } from './note-window.component';

describe('NoteWindowComponent', () => {
  let component: NoteWindowComponent;
  let fixture: ComponentFixture<NoteWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
