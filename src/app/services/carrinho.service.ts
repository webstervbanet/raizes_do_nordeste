import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  produtos = signal<any[]>([]);

  adicionar(produto: any) {
    this.produtos.update((lista) => {
      const existente = lista.find((x) => x.id === produto.id);

      if (existente) {
        return lista.map((x) =>
          x.id === produto.id
            ? {
                ...x,
                quantidade: (x.quantidade += produto.quantidade || 1),
              }
            : x,
        );
      }

      return [
        ...lista,
        {
          ...produto,
          quantidade: produto.quantidade || 1,
        },
      ];
    });
  }

  remover(id: any) {
    this.produtos.update((lista) => lista.filter((x) => x.id !== id));
  }

  resetar() {
    this.produtos.set([]);
  }

  getQuantidade() {
    return this.produtos().reduce((total, produto) => total + produto.quantidade, 0);
  }

  getProdutos() {
    return this.produtos();
  }

  getTotal() {
    return this.produtos().reduce(
      (total, produto) => total + produto.preco * produto.quantidade,
      0,
    );
  }

  getPrecoComDesconto() {
    const total = this.getTotal();

    return total >= 100 ? total * 0.8 : total;
  }

  getFrete() {
    return this.getTotal() >= 100 ? 0 : 10;
  }

  getTotalFinal() {
    return this.getPrecoComDesconto() + this.getFrete();
  }
}
