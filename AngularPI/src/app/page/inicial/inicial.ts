import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Carrinho } from '../../services/carrinho';

@Component({
  selector: 'app-inicial',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './inicial.html',
  styleUrls: ['./inicial.css']
})
export class Inicial implements OnInit {

  usuarioLogado: any = null;

  bolos = false;
  salgados = false;
  tortas = false;
  mousses = false;
  brigadeiros = false;
  donuts = false;
  doces = false;
  caseiros = false;

  constructor(private carrinhoService: Carrinho) { }

  ngOnInit(): void {
    const dados = localStorage.getItem('usuarioLogado');
    if (dados) {
      this.usuarioLogado = JSON.parse(dados);
    }
    this.carrinhoService.atualizarContagem();
  }

  sair(): void {
    localStorage.removeItem('usuarioLogado');
    this.usuarioLogado = null;
  }

  irParaCatalogo(): void {
    const elemento = document.getElementById('catalogo');
    elemento?.scrollIntoView({ behavior: 'smooth' });
  }

  adicionarCarrinho(nome: string, preco: number) {
    const item = {
      nome: nome,
      preco: preco,
      quantidade: 1
    };

    this.carrinhoService.adicionarItem(item).subscribe({
      next: () => {
        alert(`${nome} adicionado ao carrinho!`);
        this.carrinhoService.atualizarContagem();
      },
      error: (err) => {
        console.error('Erro ao adicionar:', err);
        alert('Não foi possível adicionar. O servidor JSON Server está ligado?');
      }
    });
  }
}