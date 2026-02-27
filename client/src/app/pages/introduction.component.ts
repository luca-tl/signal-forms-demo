import {Component} from '@angular/core';

@Component({
  selector: 'app-introduction',
  template: `
    <div class="container">
      <h2>Introduction to Angular Signal Forms</h2>
      <p>
        Angular Signal Forms is a modern, reactive approach to building forms in Angular that leverages the power of
        <strong>Signals</strong> for state management. It provides a more intuitive and performant alternative to
        traditional Template-driven and Reactive Forms.
      </p>

      <h3>Key Features</h3>
      <ul>
        <li>⚡ <strong>Reactive form state:</strong> Built directly on top of Angular Signals for seamless reactivity.
        </li>
        <li>✅ <strong>Built-in and custom validation:</strong> Easy-to-use validation API that integrates with Signals.
        </li>
        <li>🔄 <strong>Real-time UI updates:</strong> UI reflects changes instantly as the underlying signal state
          updates.
        </li>
        <li>🧩 <strong>Minimal, readable logic:</strong> Reduces boilerplate and makes form code easier to maintain.</li>
        <li>🛠️ <strong>Deeply integrated:</strong> Works naturally with Angular's modern features like
          <code>&#64;if</code>
          and <code>&#64;for</code> blocks.
        </li>
      </ul>

      <h3>Why use Signal Forms?</h3>
      <p>
        By using Signals, form state becomes more transparent and easier to track. You get fine-grained reactivity,
        meaning only the parts of the DOM that actually change will be updated, leading to better performance
        in complex forms.
      </p>

      <h4>Simple Initialization</h4>
      <div class="example-box">
        <pre><code>
public user = signal(&#123; name: '', email: '' &#125;);
public userForm = form(this.user);
        </code></pre>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
    }

    .example-box {
      background-color: #f4f4f4;
      padding: 1rem;
      border-radius: 4px;
      margin-top: 1.5rem;
    }

    pre {
      margin: 0;
    }

    ul {
      line-height: 1.6;
    }

    li {
      margin-bottom: 0.5rem;
    }
  `]
})
export class Introduction {
}
