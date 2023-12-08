import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { CookieOptions, CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})
export class ApiDataservice {
  public host:string = 'https://api.mmo-soft.com/';
  static AccessTokenJwt: string = '';
  public static CookieName: string = "MyCookie";
  public static RoleCookliName: string = "RoleCookli";
  public headersOptions: any

  constructor( private http: HttpClient, private cook: CookieService) {
      ApiDataservice.AccessTokenJwt = this.getCookie(ApiDataservice.CookieName)
      ApiDataservice.AccessTokenJwt = this.getCookie(ApiDataservice.RoleCookliName)
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ApiDataservice.AccessTokenJwt}`
      });
      this.headersOptions = { headers: headers };
  }

  public setCookie(name: string, value: string, expireDays: number, path: string = '') {
      let d: Date = new Date();
      d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
      let expires: string = `expires=${d.toUTCString()}`;
      let cpath: string = path ? `; path=${path}` : '';
      document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }

  public getCookie(name: string) {
      let ca: Array<string> = document.cookie.split(';');
      let caLen: number = ca.length;
      let cookieName = `${name}=`;
      let c: string;

      for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
          return c.substring(cookieName.length, c.length);
      }
      }
      return '';
  }
  public logedIn() {
    return localStorage.getItem
  }

  // Xóa cookki khi đăng xuất k nhận thồn tin nào
    public deleteCookie(name: string) {
      this.cook.deleteAll(name);
    }

    // GET
    get(url: string): Observable<any> {
        return this.http.get<any>(this.host + url, this.headersOptions)
    }
    // POST
    post(url: string, data: any): Observable<any> {
        return this.http.post<any>(this.host + url, data, this.headersOptions)
    }
    // PUT
    put(url: string, data: any): Observable<any> {
      return this.http.put<any>(this.host + url, data, this.headersOptions)
    }
     // Delete
     delete(id: number): Observable<any> {
      return this.http.put<any>(this.host + id, this.headersOptions)
    }

    
}