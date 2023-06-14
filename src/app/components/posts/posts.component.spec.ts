import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import { PostService } from '../../services/post/post.service';
import { of } from 'rxjs';
import { Post } from '../../interfaces/post';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let POSTS: Post[];
  let postServiceSpy: any;

  beforeEach(() => {
    POSTS = [
      {
        id: 1,
        body: 'body 1',
        title: 'title 1',
      },
      {
        id: 2,
        body: 'body 2',
        title: 'title 2',
      },
      {
        id: 3,
        body: 'body 3',
        title: 'title 3',
      },
    ];
    postServiceSpy = jasmine.createSpyObj<PostService>([
      'getPosts',
      'deletePost',
    ]);
    postServiceSpy.getPosts.and.callFake(function () {
      return of([
        {
          id: 1,
          title:
            'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
          body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        },
        {
          id: 2,
          title: 'qui est esse',
          body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
        },
        {
          id: 3,
          title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
          body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
        },
      ]);
    });
    TestBed.configureTestingModule({
      declarations: [PostsComponent],
      providers: [
        {
          provide: PostService,
          useValue: postServiceSpy,
        },
      ],
    });
    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('delete', () => {
    beforeEach(() => {
      postServiceSpy.deletePost.and.returnValue(of(true));
      component.posts = POSTS;
      component.delete(POSTS[1]);
    });

    it('should delete the selected Post from the posts', () => {
      component.delete(POSTS[0]);
      expect(component.posts.length).toBe(1);
    });

    it('should delete the actual selected Post in the posts', () => {
      for (let post of component.posts) {
        expect(post).not.toEqual(POSTS[1]);
      }
    });

    it('should call the delete method in Post Service only once', () => {
      expect(postServiceSpy.deletePost).toHaveBeenCalledTimes(1);
    });
  });
});
