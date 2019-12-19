import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BgServiceService } from 'src/app/shared/services/bg-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  getAllUsers: Array<any>
  getAllUsersAdmin: Array<any>
  formData: any;
  hide: boolean;
  usersID: string;

  constructor(private bgServiceService: BgServiceService,
    private firestore: AngularFirestore) {
    this.getUsers()
  }

  ngOnInit() {
    this.resetForm();
  }
  public resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.formData = {
      id: null,
      admin: ''
    }
  }
  public onSubmit(form: NgForm) {
    const data = Object.assign({}, form.value);
    delete data.id;
    this.firestore.doc('users/' + this.usersID).update(data);
    this.hide = false;
    this.resetForm();
  }
  onEdit(item) {
    this.usersID = item.id;
    this.formData = Object.assign({}, item);
    this.hide = true;
  }
  onDeleteAdmin(item) {
    if (confirm('Are you sure to delete this record')) {
      // this.firestore.doc('users/' + item.id).delete();
      let washingtonRef = this.firestore.collection("users").doc(`${item.id}`);
      return washingtonRef.update({
        "admin": '0'
      })
    }
  }
  onDelete(item) {
    if (confirm('Are you sure to delete this record')) {
      this.firestore.doc('users/' + item.id).delete();
    }
  }

  public getUsers(): void {
    this.bgServiceService.getUsers().subscribe(
      arraySub => {
        this.getAllUsers = arraySub.map(sub => {
          return {
            id: sub.payload.doc.id,
            ...sub.payload.doc.data()
          } as any;
        });
        this.filterUserbyAdmin()
      }
    )
  }
  filterUserbyAdmin() {
    this.getAllUsersAdmin = this.getAllUsers.filter(adm => adm.admin > 0)
    // words.filter(word => word.length > 6);
  }

}
