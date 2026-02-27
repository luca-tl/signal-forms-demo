import {Component, signal} from '@angular/core';
import {form, FormField} from '@angular/forms/signals';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-basic-example',
  imports: [JsonPipe, FormField],
  template: `
    <div class="container">
      <h2>Basic Signal Form Example</h2>
      <p>
        A basic example showcasing how to use Angular Signal Forms to manage state across different input types
        using the <code>form()</code> function and <code>[formField]</code> directive.
      </p>

      <div class="form-container">
        <form>
          <!-- Text Input -->
          <div class="form-group">
            <label for="username">Username</label>
            <input id="username" type="text" [formField]="userForm.username" placeholder="Enter username"/>
          </div>

          <!-- Number Input -->
          <div class="form-group">
            <label for="age">Age</label>
            <input id="age" type="number" [formField]="userForm.age" placeholder="Enter age"/>
          </div>

          <!-- Select Input -->
          <div class="form-group">
            <label for="country">Country</label>
            <select id="country" [formField]="userForm.country">
              <option value="">Select a country</option>
              <option value="CH">Switzerland</option>
              <option value="DE">Germany</option>
              <option value="JP">Japan</option>
              <option value="BR">Brazil</option>
            </select>
          </div>

          <!-- Radio Buttons -->
          <div class="form-group">
            <label>Gender</label>
            <div class="radio-group">
              <label><input type="radio" [formField]="userForm.gender" value="male"/> Male</label>
              <label><input type="radio" [formField]="userForm.gender" value="female"/> Female</label>
              <label><input type="radio" [formField]="userForm.gender" value="other"/> Other</label>
            </div>
          </div>

          <!-- Checkbox -->
          <div class="form-group checkbox-group">
            <label>
              <input type="checkbox" [formField]="userForm.subscribe"/> Subscribe to newsletter
            </label>
          </div>
        </form>

        <div class="state-preview">
          <h3>Form State Preview</h3>
          <p>This is the real-time value of the underlying signal:</p>
          <pre><code>{{ user() | json }}</code></pre>
          <p>You can also access the form value via the <code>userForm</code> signal:</p>
          <pre><code>{{ userForm.age().value() | json }}</code></pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 900px;
    }

    .form-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-top: 2rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    input[type="text"],
    input[type="number"],
    select {
      width: 100%;
      padding: 0.6rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
    }

    .radio-group {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }

    .radio-group label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0;
      font-weight: normal;
      cursor: pointer;
    }

    .checkbox-group label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    .state-preview {
      background-color: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      border: 1px solid #e9ecef;
    }

    .state-preview h3 {
      margin-top: 0;
    }

    pre {
      background-color: #212529;
      color: #f8f9fa;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
    }

    @media (max-width: 768px) {
      .form-container {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class BasicExample {
  public user = signal({
    username: 'JohnDoe',
    age: 30,
    country: 'CH',
    gender: 'male',
    subscribe: true,
  });

  public userForm = form(this.user);
}
