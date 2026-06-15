import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  senha = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

 entrar() {
  this.auth.login(this.email, this.senha).subscribe({
    next: (usuarios: any[]) => {
      
      // 1. Verifica se encontrou algum usuário com esse e-mail
      if (usuarios && usuarios.length > 0) {
        const usuarioEncontrado = usuarios[0];

        // 2. Compara a senha digitada com a senha do banco (convertendo ambas para texto com String())
        if (String(usuarioEncontrado.senha).trim() === String(this.senha).trim()) {
          
          alert('Login OK');

          localStorage.setItem('usuarioLogado', JSON.stringify({
            id: usuarioEncontrado.id,
            nome: usuarioEncontrado.nome,
            email: usuarioEncontrado.email
          }));

          this.router.navigate(['/']);
          
        } else {
          alert('Senha incorreta!');
        }

      } else {
        alert('E-mail não cadastrado!');
      }
    },
    error: () => {
      alert('Erro ao conectar ao servidor.');
    }
  });
}
}