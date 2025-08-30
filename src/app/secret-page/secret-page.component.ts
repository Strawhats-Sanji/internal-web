import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SecretsService, SecretPayload } from '../services/secrets.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-secret-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-2xl mx-auto p-6">
      <h1 class="text-2xl font-semibold mb-4">Send Secret</h1>

      <form (ngSubmit)="submit()" #form="ngForm" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium mb-1">Email</label>
          <input id="email" name="email" [(ngModel)]="email" type="email" required
            class="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label for="content" class="block text-sm font-medium mb-1">Content</label>
          <textarea id="content" name="content" [(ngModel)]="content" rows="6" required
            class="w-full border rounded px-3 py-2"></textarea>
        </div>

        <button type="submit" [disabled]="sending || !form.form.valid"
          class="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">
          {{ sending ? 'Sending...' : 'Send Secret' }}
        </button>
      </form>

      <div *ngIf="responseMessage" class="mt-4 p-3 rounded bg-green-50 text-green-800">
        {{ responseMessage }}
      </div>
      <div *ngIf="errorMessage" class="mt-4 p-3 rounded bg-red-50 text-red-800">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [`
    .max-w-2xl { max-width: 42rem; }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .p-6 { padding: 1.5rem; }
    .mb-4 { margin-bottom: 1rem; }
    .space-y-4 > * + * { margin-top: 1rem; }
    .text-2xl { font-size: 1.5rem; line-height: 2rem; }
    .font-semibold { font-weight: 600; }
    .text-sm { font-size: .875rem; line-height: 1.25rem; }
    .font-medium { font-weight: 500; }
    .w-full { width: 100%; }
    .border { border: 1px solid #e5e7eb; }
    .rounded { border-radius: .375rem; }
    .px-3 { padding-left: .75rem; padding-right: .75rem; }
    .py-2 { padding-top: .5rem; padding-bottom: .5rem; }
    .bg-blue-600 { background-color: #2563eb; }
    .text-white { color: #fff; }
    .px-4 { padding-left: 1rem; padding-right: 1rem; }
    .disabled\\:opacity-50:disabled { opacity: .5; }
    .mt-4 { margin-top: 1rem; }
    .p-3 { padding: .75rem; }
    .bg-green-50 { background-color: #ecfdf5; }
    .text-green-800 { color: #065f46; }
    .bg-red-50 { background-color: #fef2f2; }
    .text-red-800 { color: #991b1b; }
  `]
})
export class SecretPageComponent implements OnInit {
  private readonly secretsService = inject(SecretsService);
  private readonly authService = inject(AuthService);

  content = 'client_id: Cardfusion, client_secret: Q0ByZGZ1NTEwbg==';
  email = '';
  sending = false;
  responseMessage: string | null = null;
  errorMessage: string | null = null;

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.email = user?.email || 'user@summitbankng.com';
  }

  async submit(): Promise<void> {
    this.responseMessage = null;
    this.errorMessage = null;
    this.sending = true;
    try {
      const payload: SecretPayload = { content: this.content, email: this.email };
      const result = await this.secretsService.sendSecret(payload);
      this.responseMessage = result?.responseMessage || 'Secret sent successfully';
    } catch (err: any) {
      this.errorMessage = err?.message || 'Failed to send secret';
    } finally {
      this.sending = false;
    }
  }
}


