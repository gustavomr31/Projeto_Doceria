import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

api = 'https://projeto-doceria.onrender.com/usuarios';
  constructor(
    private http: HttpClient
  ) {}

 
 
  login(email:string, senha:string): Observable<any[]>{

email = email.trim();

senha = senha.trim();

console.log(email);
console.log(senha);

return this.http.get<any[]>(

`${this.api}?email=${encodeURIComponent(email)}`

);

}
}