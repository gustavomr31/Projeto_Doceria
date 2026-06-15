import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css']
})
export class CadastroComponent {

  nome: string = '';
  telefone: string = '';
  email: string = '';
  senha: string = '';
  mostrarSenha: boolean = false;

  nomeInvalido: boolean = false;
  telefoneInvalido: boolean = false;
  emailInvalido: boolean = false;
  senhaInvalida: boolean = false;

  nomeTocado: boolean = false;
  telefoneTocado: boolean = false;
  emailTocado: boolean = false;
  senhaTocada: boolean = false;

  formSubmitido: boolean = false;
  carregando: boolean = false;
  emailJaCadastrado: boolean = false;

  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient, private router: Router) {}

  validarNome(): void {
    this.nomeTocado = true;
    const partes = this.nome.trim().split(/\s+/);
    this.nomeInvalido = this.nome.trim().length < 3 || partes.length < 2;
  }

  validarTelefone(): void {
    this.telefoneTocado = true;
    const regex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
    this.telefoneInvalido = !regex.test(this.telefone.trim());
  }

  validarEmail(): void {
    this.emailTocado = true;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    this.emailInvalido = !regex.test(this.email.trim());
  }

  validarSenha(): void {
    this.senhaTocada = true;
    this.senhaInvalida = this.senha.length < 6;
  }

  mascaraTelefone(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.substring(0, 11);
    let formatado = '';
    if (valor.length > 0) formatado = '(' + valor.substring(0, 2);
    if (valor.length > 2) formatado += ') ' + valor.substring(2, valor.length > 10 ? 7 : 6);
    if (valor.length > (valor.length > 10 ? 7 : 6)) formatado += '-' + valor.substring(valor.length > 10 ? 7 : 6);
    this.telefone = formatado;
    input.value = formatado;
    this.validarTelefone();
  }

  onSubmit(): void {
    this.formSubmitido = true;
    this.emailJaCadastrado = false;

    this.validarNome();
    this.validarTelefone();
    this.validarEmail();
    this.validarSenha();

    if (this.nomeInvalido || this.telefoneInvalido || this.emailInvalido || this.senhaInvalida) {
      return;
    }

    this.carregando = true;

    // Verifica se e-mail já existe
    this.http.get<any[]>(`${this.apiUrl}?email=${this.email.trim()}`).subscribe({
      next: (usuarios) => {
        if (usuarios.length > 0) {
          this.emailJaCadastrado = true;
          this.carregando = false;
          return;
        }

        // Salva novo usuário no db.json
        const novoUsuario = {
          nome: this.nome.trim(),
          telefone: this.telefone.trim(),
          email: this.email.trim(),
          senha: this.senha
        };

        this.http.post<any>(this.apiUrl, novoUsuario).subscribe({
          next: (usuarioCriado) => {
            // Guarda no localStorage para manter sessão
            localStorage.setItem('usuarioLogado', JSON.stringify({
              id: usuarioCriado.id,
              nome: usuarioCriado.nome,
              email: usuarioCriado.email
            }));

            this.carregando = false;
            this.router.navigate(['/']);
          },
          error: () => {
            this.carregando = false;
            alert('Erro ao salvar cadastro. Verifique se o JSON Server está rodando.');
          }
        });
      },
      error: () => {
        this.carregando = false;
        alert('Erro ao conectar. Verifique se o JSON Server está rodando.');
      }
    });
  }
}