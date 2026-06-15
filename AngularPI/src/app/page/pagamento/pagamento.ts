import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagamento',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './pagamento.html',
  styleUrl: './pagamento.css',
})
export class Pagamento {
  formaSelecionada: 'pix' | 'cartao' | null = null;

  cartao = {
    nome: '',
    numero: '',
    validade: '',
    cvv: ''
  };

  constructor(private router: Router) {}

  selecionarForma(forma: 'pix' | 'cartao') {
    this.formaSelecionada = forma;
  }

  confirmarPagamento() {
    if (this.formaSelecionada === 'pix') {
      alert('Pagamento via PIX confirmado! Obrigado pela compra 💖');
      this.router.navigate(['/']);
    } else if (this.formaSelecionada === 'cartao') {
      if (!this.cartao.nome || !this.cartao.numero || !this.cartao.validade || !this.cartao.cvv) {
        alert('Preencha todos os campos do cartão!');
        return;
      }
      alert('Pagamento via cartão confirmado! Obrigado pela compra 💖');
      this.router.navigate(['/']);
    } else {
      alert('Selecione uma forma de pagamento!');
    }
  }

  formatarNumero(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    valor = valor.match(/.{1,4}/g)?.join(' ') || valor;
    this.cartao.numero = valor;
  }

  formatarValidade(event: any) {
    let valor = event.target.value.replace(/\D/g, '');
    if (valor.length >= 2) {
      valor = valor.slice(0, 2) + '/' + valor.slice(2, 4);
    }
    this.cartao.validade = valor;
  }
}