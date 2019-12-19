import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { ICommodity } from 'src/app/shared/interfaces/commodity.interface';
import { BgServiceService } from 'src/app/shared/services/bg-service.service';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-admin-commodity',
  templateUrl: './admin-commodity.component.html',
  styleUrls: ['./admin-commodity.component.css']
})
export class AdminCommodityComponent implements OnInit {
  formData: ICommodity;
  productImage: string;
  prodImgID: string;
  arrayCategory: Array<ICategory>;
  arrayCommodity: Array<ICommodity>
  commodity: ICommodity;
  user: firebase.User;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  urlImage: string;
  show: boolean;
  editImgID: string;
  editImg: string;
  postsID: string;
  constructor(private firestore: AngularFirestore,
    private getCatService: BgServiceService,
    private prStorage: AngularFireStorage,
    private auth: AuthService
  ) {
    this.getCategoris();
    this.getCommodity();
    this.authUser();
  }

  ngOnInit() {
    this.resetForm();
  }

  authUser() {
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
      })
  }

  public resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.formData = {
      id: null,
      nameCategory: '',
      date: '',
      author: '',
      name: '',
      description: '',
      price: '',
      img: '',
      imgID: ''
    }
  }
  public onSubmit(form: NgForm) {
    let today = new Date();
    let jstoday: string;
    jstoday = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`;

    const data = Object.assign({}, form.value);
    data.date = jstoday;
    data.author = this.user.displayName;
    // data.imgID = this.prodImgID;
    if(this.editImgID){
      data.imgID = this.editImgID;
      data.img = this.editImg;
    }
    else{
      data.imgID = this.prodImgID;
      data.img = this.productImage;
    }
    delete data.id;
    if(data.name && data.nameCategory && data.description && /^[0-9]{1,25}$/.test(data.price) && data.img){
      if (this.postsID == null) {
        this.firestore.collection('commodity').add(data);
      } else {
        this.firestore.doc('commodity/' + this.postsID).update(data);
        this.show = false;
      }
      this.resetForm();
    }
  }
  public upload(event): void {
    if (this.editImgID) {
      const filePath = `/${this.editImgID}`;
      const storageRef = this.prStorage.ref('/images/commodity');
      storageRef.child(filePath).delete();

      this.ref = this.prStorage.ref(`images/commodity/${this.editImgID}`)
      this.task = this.ref.put(event.target.files[0])
      this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
      this.uploadProgress = this.task.percentageChanges();
      this.task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = this.ref.getDownloadURL()
          this.downloadURL.subscribe(url => this.productImage = url)
        })
      ).subscribe();
    }
    else {
      this.prodImgID = Math.random().toString(36).substring(2)
      this.ref = this.prStorage.ref(`images/commodity/${this.prodImgID}`)
      this.task = this.ref.put(event.target.files[0])
      this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
      this.uploadProgress = this.task.percentageChanges();
      this.task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = this.ref.getDownloadURL()
          this.downloadURL.subscribe(url => this.productImage = url)
        })
      ).subscribe();
    }
  }

  onEdit(item) {
    this.postsID = item.id;
    this.editImg = item.img;
    this.editImgID = item.imgID;
    this.show = true;
    this.formData = Object.assign({}, item);
  }

  public getCategoris(): void {
    this.getCatService.getCategory().subscribe(
      arrayCat => {
        this.arrayCategory = arrayCat.map(cat => {
          return {
            id: cat.payload.doc.id,
            ...cat.payload.doc.data()
          } as ICategory;
        });
      }
    )
  }
  public getCommodity(): void {
    this.getCatService.getCommodityAll().subscribe(
      arrayComm => {
        this.arrayCommodity = arrayComm.map(comm => {
          return {
            id: comm.payload.doc.id,
            ...comm.payload.doc.data()
          } as ICommodity;
        });
      }
    )
  }
  onDelete(item): void {
    if (confirm('Are you sure to delete this record')) {
      this.firestore.doc('commodity/' + item.id).delete();
      const filePath = `/${item.imgID}`;
      const storageRef = this.prStorage.ref('/images/commodity');
      storageRef.child(filePath).delete();
    }
  }
}