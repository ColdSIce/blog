import { Component, OnInit, HostBinding, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';
import { moveIn, fallIn, moveInLeft } from '../../router.animation';
import { Observable } from 'rxjs';

interface Image {
    path: string;
    filename: string;
    downloadURL?: string;
    $key?: string;
}

@Component({
  selector: 'app-images-management',
  templateUrl: './images-management.component.html',
  styleUrls: ['./images-management.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class ImagesManagementComponent implements OnInit {

  isLoading = false;
  fileList : FirebaseListObservable<Image[]>;
  imageList : Observable<Image[]>;

  constructor(@Inject(FirebaseApp) private firebaseApp: firebase.app.App, private af: AngularFire) { }

  ngOnInit() {
    this.isLoading = true; 
    let storage = this.firebaseApp.storage();
    this.fileList = this.af.database.list(`/images`);
    this.imageList = this.fileList.map( itemList =>
        itemList.map( item => {
            var pathReference = storage.ref(item.path);
            let result = {$key: item.$key, downloadURL: pathReference.getDownloadURL(), path: item.path, filename: item.filename};
            console.log(result);
            return result;
        })
    );
    this.isLoading = false; 
  }

  upload(){
    let storageRef = this.firebaseApp.storage().ref();
    let input:HTMLInputElement = <HTMLInputElement>document.getElementById("upload");
    if(input.files[0]){
      this.isLoading = true; 
      let path = '/images/' + input.files[0].name;
      let iRef = storageRef.child(path);
      iRef.put(input.files[0]).then((snapshot) => {
        this.af.database.list(`/images`).push({ path: path, filename: input.files[0].name });
        input.value = "";
        this.isLoading = false; 
      });
    }
  }

  delete(image:Image){
    this.isLoading = true; 
    let storagePath = image.path;
    let referencePath = `/images` + image.$key;
    firebase.storage().ref().child(storagePath).delete()
    .then(
        () => {this.isLoading = false;},
        (error) => console.error("Error deleting stored file",storagePath)
    );
    this.af.database.object(referencePath).remove();
  }

}
