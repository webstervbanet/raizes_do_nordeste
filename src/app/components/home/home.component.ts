import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideMapPin } from '@lucide/angular';
import { Button } from '../../shared/button/button';
import { FormsModule } from '@angular/forms';
import { InputNumberComponent } from '../../shared/input-number/input-number';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LucideMapPin, Button, FormsModule, InputNumberComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  unidades = [
    {
      unidade: 'Unidade Teresina - PI',
      endereco: 'Rua Professor Joca Vieira, 1227 - Fátima, Teresina - PI',
      cardapio: [
        {
          nome: 'Maria-Isabel',
          descricao: 'Arroz preparado com carne de sol, cebola, alho e temperos regionais.',
          imagem:
            'https://www.comidaereceitas.com.br/wp-content/uploads/2010/03/Arroz_maria_isabela.jpg',
          preco: 29.9,
        },
        {
          nome: 'Baião de Dois',
          descricao:
            'Arroz e feijão-de-corda preparados com queijo coalho, carne de sol e temperos.',
          imagem: 'https://maispinhais.com.br/wp-content/uploads/2025/05/baiao-de-dois.jpg',
          preco: 32.9,
        },
        {
          nome: 'Carne de Sol com Macaxeira',
          descricao: 'Carne de sol grelhada acompanhada de macaxeira cozida e manteiga de garrafa.',
          imagem: 'https://jornaldafronteira.com.br/wp-content/uploads/2026/02/Heloisa-L-2.png',
          preco: 39.9,
        },

        {
          nome: 'Paçoca de Carne de Sol',
          descricao: 'Carne de sol desfiada e pilada com farinha de mandioca e cebola.',
          imagem:
            'https://static.itdg.com.br/images/640-400/71c5615d27b8f7cd8df81bc21c472ac8/pacoca-de-carne-de-sol.jpg',
          preco: 27.9,
        },
      ],
    },

    {
      unidade: 'Unidade Fortaleza - CE',
      endereco: 'Av. Washington Soares, 999 - Edson Queiroz, Fortaleza - CE',
      cardapio: [
        {
          nome: 'Baião de Dois',
          descricao: 'Arroz e feijão-de-corda combinados com queijo coalho e temperos nordestinos.',
          imagem: 'https://maispinhais.com.br/wp-content/uploads/2025/05/baiao-de-dois.jpg',
          preco: 30.0,
        },
        {
          nome: 'Carne de Sol com Queijo Coalho',
          descricao: 'Carne de sol grelhada servida com queijo coalho e manteiga de garrafa.',
          imagem:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0f88eq1XZywjxGz3ku7eY3zIkL_VrPgXt4YlRCmtNtNpuA4jsBFtr4R0&s=10',
          preco: 42.9,
        },
        {
          nome: 'Peixada Cearense',
          descricao: 'Peixe cozido com legumes, leite de coco, ovos e temperos regionais.',
          imagem: 'https://cdn0.tudoreceitas.com/pt/posts/6/8/0/peixada_cearense_3086_1200.jpg',
          preco: 45.9,
        },
        {
          nome: 'Caranguejada',
          descricao: 'Caranguejo preparado com molho de tomate, leite de coco e temperos.',
          imagem:
            'https://cdn.casaeculinaria.com/wp-content/uploads/2024/02/20115015/Caranguejada.webp',
          preco: 49.9,
        },
        {
          nome: 'Buchada de Bode',
          descricao:
            'Prato tradicional nordestino preparado com miúdos de bode e temperos regionais.',
          imagem:
            'https://www.sabornamesa.com.br/media/k2/items/cache/973d452191c64a038927e95436dac7d2_XL.jpg',
          preco: 39.9,
        },
      ],
    },

    {
      unidade: 'Unidade Recife - PE',
      endereco: 'Av. República do Líbano, 251 - Pina, Recife - PE',
      cardapio: [
        {
          nome: 'Carne de Sol com Macaxeira',
          descricao: 'Carne de sol grelhada acompanhada de macaxeira e manteiga de garrafa.',
          imagem: 'https://jornaldafronteira.com.br/wp-content/uploads/2026/02/Heloisa-L-2.png',
          preco: 38.9,
        },
        {
          nome: 'Arrumadinho de Charque',
          descricao: 'Charque desfiada acompanhada de feijão-verde, farofa, vinagrete e macaxeira.',
          imagem:
            'https://receitadaboa.com.br/wp-content/uploads/2026/06/ChatGPT-Image-25-de-jun.-de-2026-10_56_27-1-1200x660.jpg',
          preco: 34.9,
        },
        {
          nome: 'Caldeirada Pernambucana',
          descricao:
            'Peixes e frutos do mar cozidos em caldo temperado com legumes e leite de coco.',
          imagem:
            'https://umapitanganacozinha.wordpress.com/wp-content/uploads/2012/04/caldeirada_00.jpg',
          preco: 49.9,
        },
        {
          nome: 'Sarapatel',
          descricao: 'Prato tradicional preparado com miúdos, sangue e temperos marcantes.',
          imagem:
            'https://cdn0.tudoreceitas.com/pt/posts/5/8/7/sarapatel_nordestino_tradicional_1785_orig.jpg',
          preco: 29.9,
        },
        {
          nome: 'Bolo de Rolo',
          descricao:
            'Tradicional sobremesa pernambucana feita com finas camadas de massa e goiabada.',
          imagem:
            'https://www.receitasnestle.com.br/sites/default/files/srh_recipes/d5c3b12263781084d3e84b11c2d33027.jpg',
          preco: 15.9,
        },
      ],
    },

    {
      unidade: 'Unidade Salvador - BA',
      endereco: 'Av. Tancredo Neves, 148 - Caminho das Árvores, Salvador - BA',
      cardapio: [
        {
          nome: 'Moqueca Baiana',
          descricao: 'Peixe cozido com leite de coco, azeite de dendê, tomate, cebola e pimentão.',
          imagem:
            'https://i0.wp.com/www.leiliane.com.br/wp-content/uploads/2017/08/moqueca_baiana_1.jpg?ssl=1',
          preco: 49.9,
        },
        {
          nome: 'Acarajé',
          descricao:
            'Bolinho de feijão-fradinho frito no azeite de dendê, servido com vatapá e camarão.',
          imagem:
            'https://acozinhabrasileira.com.br/wp-content/uploads/2021/09/receita-de-acaraje.jpg',
          preco: 18.9,
        },
        {
          nome: 'Vatapá',
          descricao:
            'Creme típico baiano preparado com pão, camarão, leite de coco, amendoim e dendê.',
          imagem: 'https://www.receiteria.com.br/wp-content/uploads/vatapa-de-frango-1.jpg',
          preco: 27.9,
        },
        {
          nome: 'Bobó de Camarão',
          descricao: 'Camarões preparados com creme de mandioca, leite de coco e azeite de dendê.',
          imagem: 'https://guiadacozinha.com.br/wp-content/uploads/2018/05/Bobo-de-camarao.jpg',
          preco: 46.9,
        },
        {
          nome: 'Cocada Baiana',
          descricao: 'Doce tradicional preparado com coco ralado, açúcar e leite condensado.',
          imagem: 'https://pilotandofogao.com.br/wp-content/uploads/2022/08/cocada-baiana.jpg',
          preco: 12.9,
        },
      ],
    },
  ];

  unidadeSelecionada: any = signal(null);

  constructor(private router: Router) {}

  selecionarUnidade(unidade: any) {
    this.unidadeSelecionada.set(unidade);
  }

  limparSelecao() {
    this.unidadeSelecionada.set(null);
  }

  adicionarAoCarrinho(prato: any) {
    // Aqui você pode implementar a lógica para adicionar o prato ao carrinho
    console.log('Prato adicionado ao carrinho:', prato);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
