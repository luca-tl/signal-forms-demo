import {Component, signal} from '@angular/core';
import {disabled, form, FormField, minLength, required} from '@angular/forms/signals';
import {TextInputComponent} from '../components/custom-input';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-custom-controls',
  standalone: true,
  imports: [TextInputComponent, FormField, JsonPipe],
  template: `
    <div class="container">
      <h2>Custom Controls Demo</h2>

      <div class="demo-grid">
        <div class="form-section">
          <h3>Custom Input Component</h3>

          <form>
            <div class="mb-6">
              <app-text-input
                label="Full Name"
                placeholder="Enter your full name"
                [formField]="profileForm.fullName"/>
            </div>

            <div class="mb-6">
              <app-text-input
                label="Password"
                type="password"
                placeholder="Enter your password (min 6 chars)"
                [formField]="profileForm.password"/>
            </div>

            <div class="flex gap-4">
              <button type="button" (click)="resetForm()" class="btn-secondary">Reset Form</button>
              <button type="button" (click)="toggleDisabled()" class="btn-secondary">
                {{ isFullNameDisabled() ? 'Enable' : 'Disable' }} FullName
              </button>
            </div>
          </form>
        </div>

        <div class="state-preview">
          <h3>Form State</h3>
          <p>Value:</p>
          <pre><code>{{ profile() | json }}</code></pre>

          <div class="mt-4">
            <p>Is Valid: <span [class.text-red-500]="profileForm().invalid()"
                               [class.text-green-500]="!profileForm().invalid()">
              {{ !profileForm().invalid() }}
            </span></p>
            <p>Is Disabled: {{ profileForm().disabled() }}</p>
            <p>Errors:</p>
            <pre><code>{{ profileForm.fullName().errors() | json }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
    }

    .demo-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      margin-top: 20px;
    }

    .form-section {
      background: white;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .state-preview {
      background: #f8f9fa;
      padding: 24px;
      border-radius: 8px;
      border: 1px solid #dee2e6;
    }

    pre {
      background: #212529;
      color: #f8f9fa;
      padding: 16px;
      border-radius: 4px;
      overflow-x: auto;
    }

    .mb-6 {
      margin-bottom: 24px;
    }

    .mt-4 {
      margin-top: 16px;
    }

    .btn-secondary {
      background-color: #6c757d;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }

    .btn-secondary:hover {
      background-color: #5a6268;
    }

    .flex {
      display: flex;
    }

    .gap-4 {
      gap: 16px;
    }

    .text-red-500 {
      color: #dc3545;
    }

    .text-green-500 {
      color: #198754;
    }

    @media (max-width: 768px) {
      .demo-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class CustomControls {
  public profile = signal({
    fullName: 'Jane Doe',
    password: '',
  });

  public isFullNameDisabled = signal(false);

  public profileForm = form(this.profile, schemaPath => {
    required(schemaPath.fullName);
    minLength(schemaPath.fullName, 6);
    disabled(schemaPath.fullName, () => this.isFullNameDisabled());
    minLength(schemaPath.password, 6);
    disabled(schemaPath.password, ({valueOf}) => valueOf(schemaPath.fullName) === '');
  });

  public resetForm() {
    this.profile.set({
      fullName: '',
      password: '',
    });
    this.profileForm().reset();
  }

  public toggleDisabled() {
    this.isFullNameDisabled.update(v => !v);
  }
}
