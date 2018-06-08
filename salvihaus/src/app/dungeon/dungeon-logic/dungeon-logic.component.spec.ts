import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DungeonLogicComponent } from './dungeon-logic.component';

describe('DungeonLogicComponent', () => {
  let component: DungeonLogicComponent;
  let fixture: ComponentFixture<DungeonLogicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DungeonLogicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DungeonLogicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
