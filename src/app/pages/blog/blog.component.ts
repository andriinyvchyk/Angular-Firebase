import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IBlog } from 'src/app/shared/interfaces/blogs.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { IBcategory } from 'src/app/shared/interfaces/blogscategory.interface';
import { BgServiceService } from 'src/app/shared/services/bg-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  getBlogsCat: Array<IBcategory>
  filterBlog: Array<IBlog>
  getBlogs: Array<IBlog>
  constructor(private firestore: AngularFirestore,
              private bgServiceService: BgServiceService,
              private route: ActivatedRoute) {
    this.getCategorisBlog();
    this.getPostsBlogs();
  }
  
  ngOnInit() {
  }
  checkRouting(){
    let text = this.route.snapshot.paramMap.get('category');
    if(text){
      this.filterBlog = this.getBlogs.filter(product => product.postCate === text)
    }
  }

  public getCategorisBlog(): void{
    this.bgServiceService.getCategoryBlogs().subscribe(
      arrayBlogCat => {
        this.getBlogsCat = arrayBlogCat.map(blog => {
          return {
            id: blog.payload.doc.id,
            ...blog.payload.doc.data()
          } as IBcategory;
        });
        this.checkRouting()
        
      }
    )
  }
  public getPostsBlogs(): void{
    this.bgServiceService.getPosts().subscribe(
      arrayPost => {
        this.getBlogs = arrayPost.map(post => {
          return {
            id: post.payload.doc.id,
            ...post.payload.doc.data()
          } as IBlog;
        });
      }
    )
  }
}
