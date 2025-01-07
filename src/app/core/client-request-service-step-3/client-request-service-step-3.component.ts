import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';


// Validador personalizado
export function atLeastOneNonZero(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const bedroomsNumber = parseInt(control.get('bedroomsNumber')?.value || '0', 10);
    const bathroomsNumber = parseInt(control.get('bathroomsNumber')?.value || '0', 10);

    if (bedroomsNumber > 0 && bathroomsNumber > 0) {
      return null; // Es válido
    }
    return { atLeastOneNonZero: true }; // No es válido
  };
}

@Component({
  selector: 'app-client-request-service-step-3',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CurrencyPipe, NgFor, NgIf],
  templateUrl: './client-request-service-step-3.component.html',
  styleUrls: ['./client-request-service-step-3.component.css']
})
export class ClientRequestServiceStep3Component {
  @Output() nextStep = new EventEmitter<any>();
  @Input() stepData!: string | null;
  selectedType: string | null = null;
  servicePrice = 0;
  bathroomsOptions: string[] = [];
  bedroomsOptions: string[] = [];

  step3Form = new FormGroup({
    typeOfConstruction: new FormControl('', Validators.required),
    bedroomsNumber: new FormControl(0, Validators.required),
    bathroomsNumber: new FormControl(0, Validators.required),
  },
    { validators: atLeastOneNonZero() });

  ngOnInit(): void {
    if (this.stepData) {
      const stepData = JSON.parse(this.stepData);
      this.normalizeDataForForm(stepData); // Convertir valores numéricos a cadenas
    }
  }

  selectType(type: string, room: number, bath: number) {
    this.selectedType = type;
    this.step3Form.controls.typeOfConstruction.setValue(type);
    this.step3Form.controls.bedroomsNumber.setValue(room);
    this.step3Form.controls.bathroomsNumber.setValue(bath);
    this.updateServicePrice()
  }

  onNextStep() {
    if (this.step3Form.valid) {
      const dataToEmit = this.normalizeDataForBackend(this.step3Form.value); // Convertir valores cadenas a números
      this.nextStep.emit(dataToEmit);
    }
  }

  private updateServicePrice() {
    const formValue = this.step3Form.value;

    const bedroomsNumber = formValue.bedroomsNumber;
    const bathroomsNumber = formValue.bathroomsNumber;

    // Resto de las condiciones
    if ((bedroomsNumber === 1) && (bathroomsNumber === 1)) {
      this.servicePrice = 100;
    } else if ((bedroomsNumber === 2) && (bathroomsNumber === 1)) {
      console.log("2+1")
      this.servicePrice = 120;
    } else if ((bedroomsNumber === 2) && (bathroomsNumber === 2)) {
      console.log("2+2")
      this.servicePrice = 140;
    } else if ((bedroomsNumber === 3) && (bathroomsNumber === 2)) {
      console.log("3+2")
      this.servicePrice = 160;
    } else {
      this.servicePrice = 0; // Valor por defecto si no cumple ninguna condición
    }
  }


  private normalizeDataForForm(stepData: any) {
    const bedroomsNumber = stepData.bedroomsNumber;
    const bathroomsNumber = stepData.bathroomsNumber;

    this.step3Form.patchValue({
      typeOfConstruction: stepData.typeOfConstruction,
      bedroomsNumber,
      bathroomsNumber,
    });

    this.selectedType = stepData.typeOfConstruction;
    this.updateServicePrice();

  }

  private normalizeDataForBackend(formValue: any) {
    const bedroomsNumber = formValue.bedroomsNumber;
    const bathroomsNumber = formValue.bathroomsNumber;

    return {
      typeOfConstruction: formValue.typeOfConstruction,
      bedroomsNumber,
      bathroomsNumber,
    };
  }
}
