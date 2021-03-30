import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { AuthService } from 'src/app/services/auth/auth.service';
import { APP_API_URL, PLATFORM_URL } from 'src/app/app-injection-tokens';
import { OrderLineUpdate } from 'src/app/models/order-line/order-line-update';

@Injectable({
  providedIn: 'root'
})
export abstract class SignalrService {
  protected hubConnection!: HubConnection
  protected platformUrl = `${this.platformApiUrl}api/platform/`;
  protected hubUrl = `${this.platformApiUrl}signalr`;
  protected baseApiUrl = `${this.apiUrl}api/`;
  
  constructor(
    @Inject(PLATFORM_URL) private platformApiUrl: string,
    @Inject(APP_API_URL) private apiUrl: string,
    protected http: HttpClient,
    private as: AuthService
    ) { }

  abstract addListeners(): void;

  public connect() {
    this.startConnection();
    this.addListeners();
  }

  public disconnect() {
    if(this.hubConnection != null) {
      this.hubConnection.stop()
        .then(() => console.log('Signalr disconnected'))
        .catch((err) => console.log('Error in connection disconnection: ' + err));
    }  
  }

  protected updateOrderLine(orderLineUpdate: OrderLineUpdate) {
    this.http.put(`${this.platformUrl}update-order-line/${orderLineUpdate.id}`, orderLineUpdate)
      .subscribe( 
        ()=> console.log("Order status was changed"),
        error => console.log(error)
      );
  }

  public getAccountId() {
    return this.as.getAccountId();
  }

  protected logout() {
    this.as.logout();
  }
  
  private startConnection() {
    this.hubConnection = this.getConnection();
   
    this.hubConnection.start()
    .then(() => {
      console.log('Connection signalr started')
    })
    .catch((err) => console.log('Error while establishing signalr connection: ' + err));
  }

  private getConnection(): HubConnection {
    return new HubConnectionBuilder()
      .withUrl(this.hubUrl)
      .build(); 
  }
  
}
