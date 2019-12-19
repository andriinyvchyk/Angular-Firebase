import { Component, OnInit } from '@angular/core';
import { IBlog } from 'src/app/shared/interfaces/blogs.interface';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { BgServiceService } from 'src/app/shared/services/bg-service.service';
import { ActivatedRoute } from '@angular/router';
import { IComment } from 'src/app/shared/interfaces/comment.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { IBcategory } from 'src/app/shared/interfaces/blogscategory.interface';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  formData;
  postNotes: string
  user: firebase.User;
  post: IBlog;
  postID: string;
  postComment: Array<IComment> = [];
  numberComment: number;
  getBlogsCat: Array<IBcategory>;
  getBlogsPostAll: Array<IBlog>
  checkDelete: boolean = false;

  constructor(
    private firestore: AngularFirestore,
    private bgServiceService: BgServiceService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.getpostOne();
    this.authUser();
    this.getCategorisBlog();
    this.getCategorisBlogPost()
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

  public getCategorisBlog(): void {
    this.bgServiceService.getCategoryBlogs().subscribe(
      arrayBlogCat => {
        this.getBlogsCat = arrayBlogCat.map(blog => {
          return {
            id: blog.payload.doc.id,
            ...blog.payload.doc.data()
          } as IBcategory;
        });
      }
    )
  }

  public getCategorisBlogPost(): void {
    this.bgServiceService.getPosts().subscribe(
      arrayBlogCat => {
        this.getBlogsPostAll = arrayBlogCat.map(blog => {
          return {
            id: blog.payload.doc.id,
            ...blog.payload.doc.data()
          } as IBlog;
        });
        this.getBlogsPostAll.map(val => {
          if (val.postNotes.length > 0) {
            this.postComment = val.postNotes;
          }
        })
      }
    )
  }

  getpostOne() {
    this.postID = this.route.snapshot.paramMap.get('id');
    this.bgServiceService.getPost(this.postID).subscribe(
      doc => {
        this.post = doc.data();
        if (this.post.postNotes.length > 0) {
          this.numberComment = this.post.postNotes.length
        }
      }
    );
  }

  public resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.formData = {
      id: null
    }
  }
  deleteComment(item) {
    console.log(item.id)
    console.log(this.postComment)
    this.postComment.map((val, i, arr) => {
      if(this.user.displayName === val.author){
        if (val.id === item.id) {
          arr.splice(i, 1)
        }
      }
    })
    this.checkDelete = true;
    this.onSubmit(item)
  }
  public onSubmit(form: NgForm) {
    debugger
    if (this.checkDelete == false) {
      let today = new Date();
      let jstoday: string;
      jstoday = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`;
      let number = Math.random() // 0.9394456857981651
      number.toString(36); // '0.xtis06h6'
      let id = number.toString(36).substr(2, 9); // 'xtis06h6'
      id.length >= 9; // false
      const data = Object.assign({}, form.value);
      this.postComment.push({ id: id, text: data.postNotes, date: jstoday, author: this.user.displayName, email: this.user.email })
      data.postNotes = this.postComment;
      delete data.id;
      this.firestore.doc('posts/' + this.postID).update(data);
    }
    else {
      const data = Object.assign({}, form.value);
      data.postNotes = this.postComment;
      delete data.id;
      this.firestore.doc('posts/' + this.postID).update(data);
      this.checkDelete = false;
    }
    this.getpostOne();
    this.resetForm();
  }

}
