import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular'
import { SQLite, SQLiteObject } from '@ionic-native/sqlite'

import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
/*
  Generated class for the SqlStorage2 provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.


*/

export interface DBUser {
  id: string;
  username: string;
  email: string;
  password: string;
}

@Injectable()
export class SqlStorage {

  storage:any;
  DB_NAME: string = '__ionicstorage';

  constructor(public platform: Platform, public sqlite: SQLite) {

    this.platform.ready().then(() => {

            this.sqlite.create({ name: this.DB_NAME, location: 'default' })
                .then((db: SQLiteObject) => {
                    this.storage = db;
                    this.tryInit();
            });
        });
  }

  public myDbUsers: DBUser[] = [];

  proveri() {
    console.log(this.myDbUsers[0].email);
  }




  tryInit() {
        console.log("USO");

        this.query('CREATE TABLE IF NOT EXISTS userTable(id text primary key, email text, username text, password text)')
        .catch(err => {
            console.error('Unable to create initial storage tables', err.tx, err.err);
        });
    }

    query(query: string, params: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.storage.transaction((tx: any) => {
                        tx.executeSql(query, params,
                            (tx: any, res: any) => resolve({ tx: tx, res: res }),
                            (tx: any, err: any) => reject({ tx: tx, err: err }));
                    },
                    (err: any) => reject({ err: err }));
            } catch (err) {
                reject({ err: err });
            }
        });
    }


    get(id: string): Promise<any> {
        return this.query('select id, email, username, password from userTable where id=?',[id])
        .then(data => {
          console.log(data);

            if (data.res.rows.length > 0) {
                console.log("Uso u IF GET funkcija");

                return data.res.rows.item(0); //OVAKO TREBAAAAA!
            }
        });
    }



    gelAll(): Promise<any> {

        return  this.query('select * from userTable',[])
        .then(data => {
            //console.log(data);
            let  i;
            for (i = 0; i < data.res.rows.length; i++) {
               //DBUser dbuser[i] = data.rows.item(i).value;
                console.log(data.res.rows.item(i));
               //users.push(data.res.rows.item(i));
               //console.log("PUSH");
               /*
               this.myDbUsers[i].id = data.res.rows.item(i).id;
               this.myDbUsers[i].username = data.res.rows.item(i).username;
               this.myDbUsers[i].email = data.res.rows.item(i).email;
               this.myDbUsers[i].password = data.res.rows.item(i).password;
               */

            }
        });

    }

    gelAll2(): Promise<any> {

        return  this.query('select * from userTable',[])
        .then(data => {
            return data;
        });

    }
  private errorHandler(error) { alert(`SQLite error: ${JSON.stringify(error)}`); }

    public getUsers(): Observable<DBUser[]> {
        let usersSubject: Subject<DBUser[]> = new Subject();

          this.query('select * from userTable', [])
            .then((result) => {
              console.log(result);
              let users: DBUser[] = [];
              let i;
              for (i = 0; i < result.rows.length; i++) {

                let dbPlace: DBUser = result.rows.item(i);
                users.push(dbPlace);
              }
              usersSubject.next(users);
              usersSubject.complete();
            })
            .catch(this.errorHandler);


        return usersSubject;
      }


    set(id: string, email: string, username: string, password: string): Promise<any> {
        return this.query('insert into userTable(id, email, username, password) values (?, ?, ?, ?)', [id, email, username, password]);
    }


      remove(key: string): Promise<any> {
        return this.query('delete from userTable where key = ?', [key]);
    }

}
