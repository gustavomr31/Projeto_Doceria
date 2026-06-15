import { Routes } from '@angular/router';
import { Inicial } from './page/inicial/inicial';
import { Motivos } from './page/motivos/motivos';
import { LoginComponent } from './page/login/login';
import { Carrinhos } from './page/carrinhos/carrinhos';
import { CadastroComponent } from './page/cadastro/cadastro';
import { Pagamento } from './page/pagamento/pagamento';
import { AuthService } from './services/auth';

export const routes: Routes = [
  { path: '', component: Inicial },
  { path: 'motivos', component: Motivos },
  { path: 'login', component: LoginComponent },
  { path: 'carrinho', component: Carrinhos },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'pagamento', component: Pagamento },
  { path: '**', redirectTo: '' }
];