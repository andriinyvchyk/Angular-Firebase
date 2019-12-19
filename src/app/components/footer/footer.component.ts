import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  formData: any;
  wrongEmail: boolean;
  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.resetForm();
  }
  public resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.formData = {
      id: null,
      email: ''
    }
  }
  public onSubmit(form: NgForm) {
    const data = Object.assign({}, form.value);
    delete data.id;
    if (data.email) {
      if(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(data.email)){
        this.firestore.collection('subscribe').add(data);
        this.wrongEmail = false;
        this.resetForm();
      }
      else{
        this.wrongEmail = true;
      }
    }
    else{
      this.wrongEmail = true;
    }
  }
}
