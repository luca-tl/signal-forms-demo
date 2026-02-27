import {Component} from '@angular/core';

@Component({
  selector: 'app-design-philosophy',
  template: `
    <div class="container">
      <h2>Design Philosophy</h2>
      <p>
        The core design philosophy of Angular Signal Forms is to provide a <strong>signal-first</strong> approach to form
        management, moving away from the imperative and boilerplate-heavy models of the past.
      </p>

      <div class="philosophy-grid">
        <div class="philosophy-item">
          <h3>⚡ Signal-First State</h3>
          <p>
            Form state is not an isolated object but a first-class citizen in the Angular Signals ecosystem.
            The form model is derived directly from your signals, ensuring the UI and state are always in sync.
          </p>
        </div>

        <div class="philosophy-item">
          <h3>🔍 Fine-Grained Reactivity</h3>
          <p>
            Unlike traditional forms that might trigger broad change detection, Signal Forms leverage fine-grained
            updates. Only the specific fields or validation messages that change will trigger a UI refresh.
          </p>
        </div>

        <div class="philosophy-item">
          <h3>🧩 Declarative over Imperative</h3>
          <p>
            Define <em>what</em> your form should do, not <em>how</em> to update it. Validation, derived values,
            and state transitions are defined declaratively, making the code more predictable and easier to test.
          </p>
        </div>

        <div class="philosophy-item">
          <h3>🛡️ Type Safety by Default</h3>
          <p>
            By building on top of TypeScript and Signals, form controls inherit the types of the underlying data.
            This reduces runtime errors and provides excellent developer experience with IDE autocompletion.
          </p>
        </div>
      </div>

      <h3>Comparison at a Glance</h3>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Traditional Forms</th>
            <th>Signal Forms</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>State Management</td>
            <td>Imperative (FormGroup/FormControl)</td>
            <td>Reactive (Signals)</td>
          </tr>
          <tr>
            <td>Boilerplate</td>
            <td>High (Manual tracking/updates)</td>
            <td>Low (Derived from data)</td>
          </tr>
          <tr>
            <td>Reactivity</td>
            <td>Broad (Zone-based/ValueChanges)</td>
            <td>Fine-grained (Signal-based)</td>
          </tr>
          <tr>
            <td>Type Safety</td>
            <td>Partial / Opt-in</td>
            <td>Deeply Integrated</td>
          </tr>
        </tbody>
      </table>

      <div class="quote-box">
        <p>
          "The goal is to make form development feel like writing standard Angular logic,
          leveraging the same reactive primitives you use for the rest of your application."
        </p>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 900px;
    }

    .philosophy-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin: 2rem 0;
    }

    .philosophy-item h3 {
      margin-top: 0;
      color: #007bff;
    }

    .comparison-table {
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
    }

    .comparison-table th, .comparison-table td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }

    .comparison-table th {
      background-color: #f8f9fa;
      font-weight: bold;
    }

    .comparison-table tr:nth-child(even) {
      background-color: #fcfcfc;
    }

    .quote-box {
      border-left: 4px solid #007bff;
      padding: 1rem 1.5rem;
      background-color: #f0f7ff;
      font-style: italic;
      margin-top: 2rem;
    }
  `]
})
export class DesignPhilosophy {
}
