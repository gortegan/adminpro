import { Usuario } from './../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../service.index';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  alertify = require('alertifyjs');

  constructor(public http: HttpClient, public router: Router, public _subirArchivo: SubirArchivoService) {
    this.cargarStorage();
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;

    }
  }

  logOut() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  loginGoogle(token) {
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token})
          .map( (resp: any) => {
            this.guardarStorage(resp.id, resp.token, resp.usuario);
            return true;
          });
  }

  login (usuario: Usuario, recordar: boolean) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
          .map((resp: any) => {
            this.guardarStorage(resp.id, resp.token, resp.usuario);
            return true;
          });

  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario)
            .map( (resp: any) => {
                return resp.usuario;
            });
  }

  actualizarUsuario(usuario: Usuario) {
    console.log(usuario);
    let url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;
    console.log(url);
    return this.http.put(url, usuario)
              .map( (resp: any) => {
                this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
                return true;
              });
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cambiarImagen(file: File, id: string) {
    this._subirArchivo.subirArchivo(file, 'usuarios' , id)
              .then( (resp:any) => {
                this.usuario.img = resp.img;
                this.guardarStorage(id, this.token, this.usuario);
              })
              .catch( err => {
                console.log(err);
              });
  }
}
