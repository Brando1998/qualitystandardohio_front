import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocationService } from '../../services/location.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-client-request-service-step-2',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './client-request-service-step-2.component.html',
  styleUrl: './client-request-service-step-2.component.css',
})
export class ClientRequestServiceStep2Component implements OnInit {
  @Output() nextStep = new EventEmitter<any>();
  @Input() stepData!: string | null;
  states: any[] = ["Ohio"];
  cities: any[] = [
    "Akron",
    "Alliance",
    "Ashtabula",
    "Athens",
    "Barberton",
    "Bedford",
    "Bellefontaine",
    "Bowling Green",
    "Canton",
    "Chillicothe",
    "Cincinnati",
    "Cleveland",
    "Columbus",
    "Cuyahoga Falls",
    "Dayton",
    "Defiance",
    "Delaware",
    "East Cleveland",
    "East Liverpool",
    "Elyria",
    "Findlay",
    "Fostoria",
    "Fremont",
    "Gahanna",
    "Gallipolis",
    "Garfield Heights",
    "Girard",
    "Green",
    "Hamilton",
    "Kent",
    "Lakewood",
    "Lancaster",
    "Lima",
    "Lorain",
    "Mansfield",
    "Marietta",
    "Marion",
    "Martins Ferry",
    "Massillon",
    "Mentor",
    "Middletown",
    "Mount Vernon",
    "Newark",
    "Niles",
    "North Olmsted",
    "Norwalk",
    "Oberlin",
    "Painesville",
    "Parma",
    "Portsmouth",
    "Salem",
    "Sandusky",
    "Shaker Heights",
    "Springfield",
    "Steubenville",
    "Tiffin",
    "Toledo",
    "Uhrichsville",
    "Upper Arlington",
    "Warren",
    "Wooster",
    "Xenia",
    "Youngstown",
    "Zanesville"
  ];

  step2Form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    address_1: new FormControl(''),
    zip_code: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  });

  constructor(private locationService: LocationService){}

  ngOnInit(): void {
    if (this.stepData) {
      this.step2Form.patchValue(JSON.parse(this.stepData))
    }

    // this.locationService.getStates().subscribe((data) => {
    //   console.log(data)
    //   this.states = data;
    // });
  }

  onNextStep() {
    if (this.step2Form.valid) {
      this.nextStep.emit(this.step2Form.value);
    }
  }

  // onStateChange() {
  //   console.log("CHANGE")
  //   if (this.step2Form.controls.state.value) {
  //     this.locationService.getCitiesByState(this.step2Form.controls.state.value).subscribe((data) => {
  //       console.log(data)
  //       this.cities = data;
  //     });
  //   } else {
  //     this.cities = [];
  //   }
  // }
}
