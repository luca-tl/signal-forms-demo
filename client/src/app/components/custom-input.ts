import {ChangeDetectionStrategy, Component, input, model, signal} from '@angular/core';
import {DisabledReason, FormValueControl, ValidationError, WithOptionalFieldTree,} from '@angular/forms/signals';

@Component({
  selector: 'app-text-input',
  template: `
    @if (!hidden()) {
      <div class="flex flex-col w-full">
        @if (label()) {
          <span class="pl-3 pb-2 font-h6 uppercase text-gray-700">{{ label() }}</span>
        }
        @if (!readonly()) {
          <div class="flex relative">
            <input
              class="px-3 py-2 font-p grow rounded-md border-2 border-gray-400 focus:outline-none focus:border-blue-400"
              [placeholder]="placeholder() ?? ''"
              [type]="showPassword() ? 'text' : (type() ?? 'text')"
              [value]="value()"
              (input)="onInput($event)"
              [disabled]="disabled()"
              [class.border-red-500]="invalid() && touched()"
              [attr.aria-invalid]="invalid()"
              (blur)="touched.set(true)"/>
            @if (type() === 'password') {
              <button
                type="button"
                (click)="togglePasswordVisibility()"
                class="absolute right-2 top-1/2 -translate-y-1/2"
              >
                @if (showPassword()) {
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" class="size-6 text-gray-700">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/>
                  </svg>
                } @else {
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" class="size-6 text-gray-700">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.644C3.413 8.131 7.244 4.5 12 4.5c4.756 0 8.773 3.162 10.065 7.498a1.012 1.012 0 0 1 0 .644C20.587 15.869 16.756 19.5 12 19.5c-4.756 0-8.773-3.162-10.065-7.498ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                  </svg>
                }
              </button>
            }
          </div>
          @if (invalid() && touched()) {
            <div class="flex flex-col min-h-5">
              @for (error of errors(); track error.kind) {
                <span class="text-red-500 font-h5 min-h-5">{{ error.kind }}</span>
              }
            </div>
          }
        } @else {
          <span class="px-3">{{ value() }}</span>
        }
      </div>
    }
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent implements FormValueControl<string> {
  // Signal forms implementation
  value = model<string>('');
  touched = model<boolean>(false);
  disabled = input<boolean>(false);
  disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);
  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);

  readonly label = input<string | undefined>(undefined);
  readonly placeholder = input<string | undefined>();
  readonly type = input<string | undefined>();

  readonly showPassword = signal<boolean>(false);

  protected onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
  }

  protected togglePasswordVisibility() {
    this.showPassword.update((prev) => !prev);
  }
}
