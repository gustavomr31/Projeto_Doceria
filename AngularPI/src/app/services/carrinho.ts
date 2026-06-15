import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Carrinho {
  api = 'http://localhost:3000/carrinho';

  private _quantidade = new BehaviorSubject<number>(0);
  quantidade$ = this._quantidade.asObservable();

  constructor(private http: HttpClient) {
    this.atualizarContagem();
  }

  atualizarContagem() {
    this.http.get<any[]>(this.api).subscribe({
      next: (itens) => this._quantidade.next(itens.length),
      error: () => console.log('Erro ao atualizar contagem. Verifique o JSON Server.')
    });
  }

  adicionarItem(item: any): Observable<any> {
    return this.http.post(this.api, item);
  }

  listarItens(): Observable<any> {
    return this.http.get(this.api);
  }

  removerItem(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  // ← método novo adicionado aqui
  atualizarItem(item: any): Observable<any> {
    return this.http.put(`${this.api}/${item.id}`, item);
  }
}