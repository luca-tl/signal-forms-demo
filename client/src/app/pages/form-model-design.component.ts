import {Component, signal} from '@angular/core';
import {form, FormField, schema} from '@angular/forms/signals';
import {JsonPipe} from '@angular/common';

// This is a placeholder for 'hidden' as it's not standard but requested in the example.
// In a real scenario, this would be part of the signal-forms library or a custom extension.
const hidden = (path: any, condition: (options: { valueOf: (field: any) => any }) => boolean) => {
  // Mock implementation for the example
};

interface BillPayFormModel {
  name: string;
  positions: string[];
  method: {
    type: string;
    card: {
      cardNumber: string;
      expiration: string;
    };
    bank: {
      iban: string;
    };
  };
}

const billPaySchema = schema<BillPayFormModel>((billPay) => {
  // Hide credit card details when user has selected a method other than credit card.
  hidden(billPay.method.card, ({valueOf}) => valueOf(billPay.method.type) !== 'card');
  // Hide bank account details when user has selected a method other than bank account.
  hidden(billPay.method.bank, ({valueOf}) => valueOf(billPay.method.type) !== 'bank');
});

@Component({
  selector: 'app-form-model-design',
  standalone: true,
  imports: [JsonPipe, FormField],
  template: `
    <div class="container">
      <h2>Form Model Design</h2>
      <p>
        Designing your form model correctly is crucial for a smooth experience with Signal Forms.
        Follow these three key principles:
      </p>

      <ul class="principles-list">
        <li>
          <strong>Always initialize all the fields:</strong>
          Signals work best when the entire structure is known upfront. Even if a field is initially empty,
          it should be present in your initial state.
        </li>
        <li>
          <strong>Avoid undefined:</strong>
          Prefer empty strings, null, or default values over <code>undefined</code>.
          This keeps your types clean and avoids unexpected behavior in the UI.
        </li>
        <li>
          <strong>You can nest complex types:</strong>
          Signal Forms naturally handle deeply nested objects and arrays, allowing you to mirror your
          domain model directly in your form.
        </li>
      </ul>

      <h3>Example Model & Schema</h3>
      <p>
        The following example demonstrates a nested model for a bill payment form, including
        conditional visibility logic defined in the schema.
      </p>

      <div class="demo-section">
        <h3>Live Demo</h3>
        <div class="form-container">
          <form>
            <div class="form-group">
              <label for="name">Payee Name</label>
              <input id="name" type="text" [formField]="billPayForm.name"/>
            </div>

            <div class="nested-group">
              <h4>Positions</h4>
              <ul class="positions-list">
                @for (pos of billPay().positions; track $index) {
                  <li>
                    {{ pos }}
                    <button type="button" class="btn-remove" (click)="removePosition($index)">×</button>
                  </li>
                }
              </ul>
              <div class="add-position">
                <input
                  type="text"
                  placeholder="New position..."
                  [value]="newPosition()"
                  (input)="newPosition.set($any($event.target).value)"
                  (keyup.enter)="addPosition()"
                />
                <button type="button" (click)="addPosition()" class="btn-add">Add</button>
              </div>
            </div>

            <div class="form-group">
              <label for="methodType">Payment Method</label>
              <select id="methodType" [formField]="billPayForm.method.type">
                <option value="">Select Method</option>
                <option value="card">Credit Card</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>

            @if (billPay().method.type === 'card') {
              <div class="nested-group">
                <h4>Card Details</h4>
                <div class="form-group">
                  <label for="cardNumber">Card Number</label>
                  <input id="cardNumber" type="text" [formField]="billPayForm.method.card.cardNumber"/>
                  <label for="cardNumber">Expiration</label>
                  <input id="cardNumber" type="text" [formField]="billPayForm.method.card.expiration"/>
                </div>
              </div>
            }

            @if (billPay().method.type === 'bank') {
              <div class="nested-group">
                <h4>Bank Details</h4>
                <div class="form-group">
                  <label for="accountNumber">Account Number</label>
                  <input id="accountNumber" type="text" [formField]="billPayForm.method.bank.iban"/>
                </div>
              </div>
            }
          </form>

          <div class="state-preview">
            <h4>Model State</h4>
            <pre><code>{{ billPay() | json }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 900px;
    }

    .principles-list {
      margin: 1.5rem 0;
      padding-left: 1.5rem;
    }

    .principles-list li {
      margin-bottom: 0.75rem;
      line-height: 1.5;
    }

    .code-example {
      background: #f4f4f4;
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
    }

    .form-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-top: 1.5rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.3rem;
      font-weight: 500;
    }

    input, select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .nested-group {
      border-left: 3px solid #007bff;
      padding-left: 1rem;
      margin: 1rem 0;
    }

    .state-preview {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 8px;
    }

    pre {
      margin: 0;
      white-space: pre-wrap;
    }

    .positions-list {
      list-style: none;
      padding: 0;
      margin: 0.5rem 0;
    }

    .positions-list li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.3rem 0.5rem;
      background: #eee;
      margin-bottom: 0.3rem;
      border-radius: 4px;
    }

    .btn-remove {
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      line-height: 18px;
      text-align: center;
      cursor: pointer;
      font-weight: bold;
    }

    .add-position {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .add-position input {
      flex: 1;
    }

    .btn-add {
      background: #28a745;
      color: white;
      border: none;
      padding: 0 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class FormModelDesign {
  public newPosition = signal('');

  public billPay = signal<BillPayFormModel>({
    name: 'Default Payee',
    positions: [],
    method: {
      type: '',
      card: {
        cardNumber: '',
        expiration: '',
      },
      bank: {
        iban: '',
      }
    }
  });

  public billPayForm = form(this.billPay, billPaySchema);

  public addPosition() {
    const position = this.newPosition();
    if (position) {
      this.billPay.update((state) => ({
        ...state,
        positions: [...state.positions, position],
      }));
      this.newPosition.set('');
    }
  }

  public removePosition(index: number) {
    this.billPay.update((state) => ({
      ...state,
      positions: state.positions.filter((_, i) => i !== index),
    }));
  }
}
