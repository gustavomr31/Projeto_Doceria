import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Carrinho } from '../../services/carrinho';
import { ChangeDetectorRef } from '@angular/core';
import { LoginComponent } from '../login/login';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-carrinhos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrinhos.html',
  styleUrls: ['./carrinhos.css']
})
export class Carrinhos implements OnInit {
  itens: any[] = [];

  constructor(
    private carrinhoService: Carrinho,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.atualizar();
  }

  atualizar() {
    this.carrinhoService.listarItens().subscribe({
      next: (res: any) => {
        this.itens = [...res];
        this.cdRef.detectChanges();
      },
      error: (err) => console.log(err)
    });
  }

  aumentar(item: any) {
    item.quantidade += 1;
    this.carrinhoService.atualizarItem(item).subscribe();
  }

  diminuir(item: any) {
    if (item.quantidade > 1) {
      item.quantidade -= 1;
      this.carrinhoService.atualizarItem(item).subscribe();
    } else {
      this.remover(item.id);
    }
  }

  total(): number {
    return this.itens.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
  }

  remover(id: string) {
    this.carrinhoService.removerItem(id).subscribe({
      next: () => {
        this.itens = this.itens.filter(item => item.id !== id);
        this.carrinhoService.atualizarContagem();
      },
      error: (err) => console.log(err)
    });
  }

  finalizar() {
    const usuárioSalvo = localStorage.getItem('usuarioLogado');
    
    if (usuárioSalvo && usuárioSalvo!== 'null' && usuárioSalvo !== 'undefined'){
    this.router.navigate(['/pagamento']);
    } else{
      alert('Você precisa estar logado para finalizar o pagamento!')
    this.router.navigate(['/login'])
    }
  }
}