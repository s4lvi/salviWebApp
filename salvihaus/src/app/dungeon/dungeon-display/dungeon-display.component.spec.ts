import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DungeonDisplayComponent } from './dungeon-display.component';

describe('DungeonDisplayComponent', () => {
  let component: DungeonDisplayComponent;
  let fixture: ComponentFixture<DungeonDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DungeonDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DungeonDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
