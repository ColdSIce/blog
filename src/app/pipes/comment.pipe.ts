import { Pipe } from "@angular/core";
import { Comment } from '../model/comment';

@Pipe({
  name: "commentOrderByCreated"
})
export class CommentSortPipe {
  transform(array: Array<Comment>, args: string): Array<Comment> {
    array.sort((a: any, b: any) => {
      if (a.created < b.created) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}