import { AbstractControl, FormGroup } from '@angular/forms';

export class ErrorProvider {
  public static showError(controlName: string, form: FormGroup) {
    const control: AbstractControl = form.get(controlName);

    return control.invalid && control.touched;
  }
}
