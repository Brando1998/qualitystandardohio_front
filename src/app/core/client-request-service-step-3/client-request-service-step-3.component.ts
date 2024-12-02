import { CurrencyPipe, NgClass, NgFor } from '@angular/common';
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
  imports: [ReactiveFormsModule, NgClass, CurrencyPipe, NgFor],
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
    bedroomsNumber: new FormControl('0', Validators.required),
    bathroomsNumber: new FormControl('0', Validators.required),
  },
  { validators: atLeastOneNonZero() });

  ngOnInit(): void {
    // Suscribirse a los cambios del formulario
    this.step3Form.valueChanges.subscribe(() => {
      this.updateServicePrice();
      this.updateOptions();
    });

    if (this.stepData) {
      const stepData = JSON.parse(this.stepData);
      this.normalizeDataForForm(stepData); // Convertir valores numéricos a cadenas
    }
  }

  selectType(type: string) {
    this.selectedType = type;
    this.step3Form.controls.typeOfConstruction.setValue(type);
  }

  onNextStep() {
    if (this.step3Form.valid) {
      const dataToEmit = this.normalizeDataForBackend(this.step3Form.value); // Convertir valores cadenas a números
      this.nextStep.emit(dataToEmit);
    }
  }

  updateOptions() {
    const typeOfConstruction = this.step3Form.controls.typeOfConstruction.value;

    if (typeOfConstruction === 'apartment') {
      this.bathroomsOptions = ['1']; // Solo la opción 1 para baños
      this.bedroomsOptions = ['1', '2']; // Solo las primeras dos opciones para habitaciones
    } else if (typeOfConstruction === 'familiar') {
      this.bathroomsOptions = ['1', '2', '+2']; // Todas las opciones para baños
      this.bedroomsOptions = ['1', '2', '3', '+3']; // Todas las opciones para habitaciones
    } else {
      this.bathroomsOptions = [];
      this.bedroomsOptions = [];
    }
  }

  private updateServicePrice() {
    const formValue = this.step3Form.value;
  
    // Aseguramos que los valores sean cadenas
    const typeOfConstruction = formValue.typeOfConstruction || '';
    const bedroomsNumber = formValue.bedroomsNumber?.toString() || '';
    const bathroomsNumber = formValue.bathroomsNumber?.toString() || '';
  
    // Nuevo ajuste: Si cualquier campo tiene '+3' o '+2', el precio es 170
    if (bedroomsNumber === '+3' || bathroomsNumber === '+2') {
      this.servicePrice = 170;
      return; // Salimos de la función porque ya sabemos el precio
    }
  
    // Resto de las condiciones
    if (
      typeOfConstruction === 'apartment' &&
      (bedroomsNumber === '0' || bedroomsNumber === '1' || bedroomsNumber === '2') &&
      (bathroomsNumber === '0' || bathroomsNumber === '1')
    ) {
      this.servicePrice = 130;  
    } else if (
      typeOfConstruction === 'familiar' &&
      (bedroomsNumber === '2' || bedroomsNumber === '3') &&
      (bathroomsNumber === '0' || bathroomsNumber === '1' || bathroomsNumber === '2')
    ) {
      this.servicePrice = 150;
    } else {
      this.servicePrice = 0; // Valor por defecto si no cumple ninguna condición
    }
  }
  

  private normalizeDataForForm(stepData: any) {
    const bedroomsNumber = stepData.bedroomsNumber === 4 ? '+3' : stepData.bedroomsNumber.toString();
    const bathroomsNumber = stepData.bathroomsNumber === 4 ? '+2' : stepData.bathroomsNumber.toString();

    this.step3Form.patchValue({
      typeOfConstruction: stepData.typeOfConstruction,
      bedroomsNumber,
      bathroomsNumber,
    });

    this.selectedType = stepData.typeOfConstruction;
  }

  private normalizeDataForBackend(formValue: any) {
    const bedroomsNumber = formValue.bedroomsNumber === '+3' ? 4 : parseInt(formValue.bedroomsNumber || '0', 10);
    const bathroomsNumber = formValue.bathroomsNumber === '+2' ? 4 : parseInt(formValue.bathroomsNumber || '0', 10);

    return {
      typeOfConstruction: formValue.typeOfConstruction,
      bedroomsNumber,
      bathroomsNumber,
    };
  }
}
