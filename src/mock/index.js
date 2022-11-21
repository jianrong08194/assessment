import { createServer } from 'miragejs';

import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', () => {
      return data;
    });

    this.get('/:id/post', (schema, request) => {
      const id = request.params.id;
      var post = data.posts.filter(post => post.id.match(id))[0];
      return post;
    });

    this.get('/category', (schema, request) => {
      const id = request.params.id;
      var result =[];
      data.posts.map((post) =>post.categories.map((categories) => {
        return result.includes(categories.name)? null : result.push(categories.name);
      }))
      return result;
    });
  },
});
