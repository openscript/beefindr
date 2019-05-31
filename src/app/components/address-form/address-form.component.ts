import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  public static readonly DEFAULT_ADDRESS_FORM = {
    address: new FormGroup({
      street: new FormControl(''),
      zip: new FormControl(''),
      place: new FormControl('')
    }),
  };

  @Input() public parentForm: FormGroup;

  public constructor() { }

  public ngOnInit() {
  }

}
