import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IBcategory } from 'src/app/shared/interfaces/blogscategory.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { BgServiceService } from 'src/app/shared/services/bg-service.service';
import { AuthService } from 'src/app/auth/auth.service';
import { IBlog } from 'src/app/shared/interfaces/blogs.interface';
@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.css']
})
export class AdminBlogsComponent implements OnInit {
  user: firebase.User;
  arrayBlogs: Array<IBcategory>;
  formData: IBcategory;
  postsID: string;
  checkEdit: boolean;
  getBlogs: Array<IBlog>;
  lastCat: string;
  constructor(private firestore: AngularFirestore,
    private bgServiceService: BgServiceService,
    private auth: AuthService) {
    this.getCategorisBlog();
    this.authUser();
    this.getPostsBlogs()
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
      author: ''
    }
  }
  public onSubmit(form: NgForm) {
    let today = new Date();
    let jstoday: string;
    jstoday = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`;

    const data = Object.assign({}, form.value);
    data.date = jstoday;
    data.author = this.user.displayName;
    data.nameCategory = data.nameCategory.toLowerCase();
    data.postCate = data.nameCategory;
    delete data.id;
    if (/^[a-zA-Z]{2,25}$/.test(data.nameCategory)) {
      if (this.postsID == null) {
        this.firestore.collection('blogs').add(data);
      } else {
        this.checkEdit = false;
        this.getBlogs.map((val, i, arr) => {
          if (this.lastCat === val.postCate) {
            let washingtonRef = this.firestore.collection("posts").doc(`${val.id}`);
            return washingtonRef.update({
              "postCate": `${data.postCate}`
            })
          }
        })
        this.firestore.doc('blogs/' + this.postsID).update(data);
      }
      this.resetForm();
    }
  }
  public getCategorisBlog(): void {
    this.firestore.collection('blogs').snapshotChanges().subscribe(
      arrayBlogCat => {
        this.arrayBlogs = arrayBlogCat.map(blog => {
          return {
            id: blog.payload.doc.id,
            ...blog.payload.doc.data()
          } as IBcategory;
        });
      }
    )
  }
  editPosts(posts) {
    this.lastCat = posts.nameCategory;
    this.checkEdit = true;
    this.formData = Object.assign({}, posts);
    this.postsID = posts.id;
  }
  onDelete(id: string): void {
    if (confirm('Are you sure to delete this record')) {
      this.firestore.doc('blogs/' + id).delete();
    }
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
