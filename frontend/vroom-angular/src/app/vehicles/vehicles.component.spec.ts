import { type ComponentFixture, TestBed } from "@angular/core/testing"

import { VehiclesComponent } from "./vehicles.component"

describe("VehiclesComponent", () => {
  let component: VehiclesComponent
  let fixture: ComponentFixture<VehiclesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehiclesComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(VehiclesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", () => {
    expect(component).toBeTruthy()
  })
})

