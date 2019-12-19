import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { IBlog } from 'src/app/shared/interfaces/blogs.interface';
import { IBcategory } from 'src/app/shared/interfaces/blogscategory.interface';
import { BgServiceService } from 'src/app/shared/services/bg-service.service';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.css']
})
export class AdminPostsComponent implements OnInit {

  formData: IBlog;
  blogsImage: string;
  imgID: string;
  getBlogsCat: Array<IBcategory>
  getBlogs: Array<IBlog>
  user: firebase.User;
  catPost: string;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  urlImage: string;

  postsID: string;
  hide: boolean;
  editImg: string;
  editImgID: string;
  constructor(private firestore: AngularFirestore,
    private prStorage: AngularFireStorage,
    private bgServiceService: BgServiceService,
    private auth: AuthService
  ) {
    this.getCategorisBlog();
    this.getPostsBlogs();
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
      title: '',
      postCate: '',
      date: '',
      author: '',
      text: '',
      img: '',
      imgID: '',
      postNotes: []
    }
  }
  public getCatelogiesName(event): void {
    this.catPost = event.target.value;
  }
  public onSubmit(form: NgForm) {
    debugger
    let today = new Date();
    let jstoday: string;
    jstoday = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`;

    const data = Object.assign({}, form.value);
    data.date = jstoday;
    data.author = this.user.displayName;
    if(this.editImgID){
      data.imgID = this.editImgID;
      data.img = this.editImg;
    }
    else{
      data.imgID = this.imgID;
      data.img = this.blogsImage;
    }
    data.postNotes = [];
    delete data.id;
    if(data.title && data.postCate && data.text && data.img){
      if (this.postsID == null) {
        this.firestore.collection('posts').add(data);
      } else {
        this.firestore.doc('posts/' + this.postsID).update(data);
        this.hide = false;
      }
      this.resetForm();
    }
  }

  edit(item) {
    this.postsID = item.id;
    this.editImg = item.img;
    this.editImgID = item.imgID;
    this.hide = true;
    this.formData = Object.assign({}, item);
  }

  public upload(event): void {
    if (this.editImgID) {
      const filePath = `/${this.editImgID}`;
      const storageRef = this.prStorage.ref('/images/posts');
      storageRef.child(filePath).delete();

      this.ref = this.prStorage.ref(`images/posts/${this.editImgID}`)
      this.task = this.ref.put(event.target.files[0])
      this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
      this.uploadProgress = this.task.percentageChanges();
      this.task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = this.ref.getDownloadURL()
          this.downloadURL.subscribe(url => this.blogsImage = url)
        })
      ).subscribe();
    }
    else {
      this.imgID = Math.random().toString(36).substring(2)
      this.ref = this.prStorage.ref(`images/posts/${this.imgID}`)
      this.task = this.ref.put(event.target.files[0])
      this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
      this.uploadProgress = this.task.percentageChanges();
      this.task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = this.ref.getDownloadURL()
          this.downloadURL.subscribe(url => this.blogsImage = url)
        })
      ).subscribe();
    }
  }

  onDelete(item): void {
    console.log(item.id)
    console.log(item.imgID)
    if (confirm('Are you sure to delete this record')) {
      this.firestore.doc('posts/' + item.id).delete();
      const filePath = `/${item.imgID}`;
      const storageRef = this.prStorage.ref('/images/posts');
      storageRef.child(filePath).delete();
    }
  }

  public getCategorisBlog(): void {
    this.bgServiceService.getCategoryBlogs().subscribe(
      arrayCat => {
        this.getBlogsCat = arrayCat.map(cat => {
          return {
            id: cat.payload.doc.id,
            ...cat.payload.doc.data()
          } as IBcategory;
        });
      }
    )
  }

  public getPostsBlogs(): void {
    this.bgServiceService.getPosts().subscribe(
      arrayCat => {
        this.getBlogs = arrayCat.map(cat => {
          return {
            id: cat.payload.doc.id,
            ...cat.payload.doc.data()
          } as IBlog;
        });
      }
    )
  }
}
