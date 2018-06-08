import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DungeonInterpreterComponent } from './dungeon-interpreter.component';

describe('DungeonInterpreterComponent', () => {
  let component: DungeonInterpreterComponent;
  let fixture: ComponentFixture<DungeonInterpreterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DungeonInterpreterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DungeonInterpreterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
